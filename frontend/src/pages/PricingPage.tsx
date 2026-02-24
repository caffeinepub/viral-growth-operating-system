import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateStripeCheckoutSession } from '../hooks/useQueries';
import { TierLevel } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Crown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const plans = [
  {
    tier: TierLevel.free,
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with content creation.',
    icon: <Zap className="w-5 h-5" />,
    badge: null,
    features: [
      'Viral hook generator',
      '3 hooks per request',
      'Basic platform support',
      'Community access',
    ],
    locked: [
      'Full scripts',
      'Captions & hashtags',
      'Content score',
      'Monetization angles',
      'Content calendar',
      'Growth roadmap',
    ],
    cta: 'Get Started Free',
    variant: 'outline' as const,
  },
  {
    tier: TierLevel.pro,
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious creators ready to scale their content.',
    icon: <TrendingUpIcon />,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Full video scripts',
      'Captions & hashtags',
      'Content score analysis',
      '1 monetization angle',
      'Affiliate suggestions',
      'Priority support',
    ],
    locked: ['Content calendar', 'Growth roadmap', 'Faceless content version'],
    cta: 'Upgrade to Pro',
    variant: 'default' as const,
  },
  {
    tier: TierLevel.elite,
    name: 'Elite',
    price: '$79',
    period: '/month',
    description: 'The complete system for professional content creators.',
    icon: <Crown className="w-5 h-5" />,
    badge: 'Best Value',
    features: [
      'Everything in Pro',
      '2 monetization angles',
      'Content calendar',
      'Growth roadmap',
      'Faceless content version',
      'Brand voice profile',
      'Dedicated support',
    ],
    locked: [],
    cta: 'Go Elite',
    variant: 'default' as const,
  },
];

function TrendingUpIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export default function PricingPage() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const createCheckout = useCreateStripeCheckoutSession();

  const handleSelectPlan = async (tier: TierLevel) => {
    if (tier === TierLevel.free) {
      if (!isAuthenticated) {
        try {
          await login();
        } catch {
          toast.error('Login failed. Please try again.');
        }
      } else {
        navigate({ to: '/dashboard' });
      }
      return;
    }

    if (!isAuthenticated) {
      try {
        await login();
      } catch {
        toast.error('Login failed. Please try again.');
        return;
      }
    }

    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const session = await createCheckout.mutateAsync({
        tier,
        successUrl: `${baseUrl}/payment-success`,
        cancelUrl: `${baseUrl}/payment-failure`,
      });
      if (!session?.url) throw new Error('Stripe session missing url');
      window.location.href = session.url;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create checkout session. Please try again.');
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the plan that fits your content creation goals. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`relative flex flex-col ${
                plan.badge === 'Most Popular'
                  ? 'border-primary shadow-lg shadow-primary/10 scale-105'
                  : 'border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-1 text-xs font-semibold">{plan.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-6">
                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.locked.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                      <span className="w-4 h-4 mt-0.5 shrink-0 text-center">—</span>
                      <span className="line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    variant={plan.variant}
                    className="w-full"
                    onClick={() => handleSelectPlan(plan.tier)}
                    disabled={createCheckout.isPending}
                  >
                    {createCheckout.isPending && plan.tier !== TierLevel.free ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All paid plans include a 7-day money-back guarantee. Secure payments via Stripe.
        </p>
      </div>
    </div>
  );
}
