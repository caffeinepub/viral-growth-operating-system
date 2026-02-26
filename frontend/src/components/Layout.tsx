import { useState } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Settings, Heart } from 'lucide-react';
import LandingPageNav from './LandingPageNav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { data: isAdmin } = useIsCallerAdmin();
  const { ref: loginBtnRef, createRipple } = useRippleEffect<HTMLButtonElement>();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const isLandingPage = routerState.location.pathname === '/';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    ...(isAuthenticated
      ? [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/generate', label: 'Create Content' },
          { to: '/subscription', label: 'Subscription' },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Vibrant gradient header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-extrabold text-xl group shrink-0">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="gradient-text-orange">ViralGrowth OS</span>
            </Link>

            {/* Desktop Nav — show landing page nav on home, regular nav elsewhere */}
            <div className="hidden md:flex items-center gap-1">
              {isLandingPage ? (
                <LandingPageNav />
              ) : (
                <nav className="flex items-center gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg transition-all"
                      activeProps={{ className: 'px-3 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link
                      to="/stripe-setup"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg transition-all"
                      activeProps={{ className: 'flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg' }}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Stripe Setup
                    </Link>
                  )}
                </nav>
              )}
            </div>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                ref={loginBtnRef}
                onMouseDown={createRipple}
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
                className={`btn-ripple transition-all ${!isAuthenticated ? 'shadow-glow hover:shadow-glow-lg font-semibold' : ''}`}
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/98 px-4 py-3 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg transition-colors"
                activeProps={{ className: 'flex items-center px-3 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/stripe-setup"
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg transition-colors"
                activeProps={{ className: 'flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-3.5 h-3.5" />
                Stripe Setup
              </Link>
            )}
            <div className="pt-2 border-t border-border/50">
              <Button
                onClick={() => { handleAuth(); setMobileMenuOpen(false); }}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
                className={`w-full btn-ripple ${!isAuthenticated ? 'shadow-glow font-semibold' : ''}`}
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/50 bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shadow-glow">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="gradient-text-orange">ViralGrowth OS</span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap justify-center">
              © {new Date().getFullYear()} ViralGrowth OS. Built with
              <Heart className="w-3.5 h-3.5 text-[oklch(0.58_0.28_340)] fill-[oklch(0.58_0.28_340)]" />
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'viralgrowth-os')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
