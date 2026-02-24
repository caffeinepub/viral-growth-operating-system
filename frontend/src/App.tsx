import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import Dashboard from './pages/Dashboard';
import ContentGenerator from './pages/ContentGenerator';
import SubscriptionManagement from './pages/SubscriptionManagement';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import StripeSetup from './pages/StripeSetup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const contentGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/generate',
  component: ContentGenerator,
});

const subscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscription',
  component: SubscriptionManagement,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccess,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailure,
});

const stripeSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stripe-setup',
  component: StripeSetup,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  pricingRoute,
  dashboardRoute,
  contentGeneratorRoute,
  subscriptionRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  stripeSetupRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
