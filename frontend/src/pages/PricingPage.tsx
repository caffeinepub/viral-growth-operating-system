import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateStripeCheckoutSession } from '../hooks/useQueries';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { TierLevel } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Crown, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

function TrendingUpIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

const plans = [
  {
    tier: TierLevel.free,
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with content creation.',
    icon: <Zap className="w-5 h-5" />,
    badge: null,
    badgeStyle: '',
    cardStyle: 'border-border hover:border-[oklch(0.72_0.22_140/0.6)]',
    iconBg: 'bg-[oklch(0.72_0.22_140/0.15)] text-[oklch(0.72_0.22_140)]',
    checkColor: 'text-[oklch(0.72_0.22_140)]',
    btnClass: 'border-[oklch(0.72_0.22_140/0.5)] text-[oklch(0.55_0.20_140)] hover:bg-[oklch(0.72_0.22_140/0.1)]',
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
    badgeStyle: 'bg-primary text-primary-foreground shadow-glow',
    cardStyle: 'border-primary shadow-vibrant scale-105',
    iconBg: 'bg-primary/15 text-primary',
    checkColor: 'text-primary',
    btnClass: 'shadow-glow hover:shadow-glow-lg',
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
    badgeStyle: 'bg-[oklch(0.58_0.28_340)] text-white shadow-glow-pink',
    cardStyle: 'border-[oklch(0.58_0.28_340/0.5)] hover:border-[oklch(0.58_0.28_340)] hover:shadow-glow-pink',
    iconBg: 'bg-[oklch(0.58_0.28_340/0.15)] text-[oklch(0.58_0.28_340)]',
    checkColor: 'text-[oklch(0.58_0.28_340)]',
    btnClass: 'bg-[oklch(0.58_0.28_340)] hover:bg-[oklch(0.52_0.28_340)] text-white shadow-glow-pink hover:shadow-glow-pink',
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

export default function PricingPage() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const createCheckout = useCreateStripeCheckoutSession();
  const cardsRef = useScrollAnimationGroup<HTMLDivElement>();

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
        <div className="text-center mb-14 scroll-animate">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Simple,{' '}
            <span className="gradient-text-orange">Transparent</span>{' '}
            Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the plan that fits your content creation goals. Upgrade or downgrade anytime.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, idx) => (
            <PricingCard
              key={plan.tier}
              plan={plan}
              idx={idx}
              onSelect={handleSelectPlan}
              isPending={createCheckout.isPending}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All paid plans include a 7-day money-back guarantee. Secure payments via Stripe.
        </p>
      </div>
    </div>
  );
}

interface PricingCardProps {
  plan: typeof plans[0];
  idx: number;
  onSelect: (tier: TierLevel) => void;
  isPending: boolean;
}

function PricingCard({ plan, idx, onSelect, isPending }: PricingCardProps) {
  const { ref: btnRef, createRipple } = useRippleEffect<HTMLButtonElement>();

  return (
    <Card
      className={`scroll-animate stagger-${idx + 1} relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.cardStyle}`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${plan.badgeStyle}`}>
            {plan.badge === 'Most Popular' && <Sparkles className="w-3 h-3" />}
            {plan.badge}
          </span>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-9 h-9 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
            {plan.icon}
          </div>
          <CardTitle className="text-xl font-extrabold">{plan.name}</CardTitle>
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
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.checkColor}`} />
              <span className="font-medium">{feature}</span>
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
            ref={btnRef}
            onMouseDown={createRipple}
            variant={plan.tier === TierLevel.elite ? 'default' : plan.variant}
            className={`w-full font-bold transition-all btn-ripple ${plan.btnClass}`}
            onClick={() => onSelect(plan.tier)}
            disabled={isPending}
          >
            {isPending && plan.tier !== TierLevel.free ? (
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
  );
}
