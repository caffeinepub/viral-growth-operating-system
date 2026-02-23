import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handleSelectTier = (tier: 'free' | 'pro' | 'elite') => {
    if (!isAuthenticated) {
      // Redirect to login first
      navigate({ to: '/' });
      return;
    }
    
    if (tier === 'free') {
      navigate({ to: '/dashboard' });
    } else {
      navigate({ to: '/subscription', search: { tier } });
    }
  };

  return (
    <div className="container py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1.5" />
            Flexible Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Growth Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you scale. All plans include original, copyright-safe content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for testing the waters</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">3 scroll-stopping hooks</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-30" />
                  <span className="text-sm line-through">Full scripts</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-30" />
                  <span className="text-sm line-through">Captions & hashtags</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-30" />
                  <span className="text-sm line-through">Monetization angles</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSelectTier('free')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="relative border-2 border-chart-1 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-chart-1 to-chart-2 text-white">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For serious content creators</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">5 scroll-stopping hooks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">3 original 30-45s scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">5 engagement captions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">5 hashtag clusters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">1 monetization angle</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Content performance scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Affiliate suggestions</span>
                </li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-chart-1 to-chart-2"
                onClick={() => handleSelectTier('pro')}
              >
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          {/* Elite Tier */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Elite</CardTitle>
              <CardDescription>Maximum growth potential</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Everything in Pro, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">2 monetization angles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">7-day content calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Niche domination roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Faceless content adaptation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSelectTier('elite')}
              >
                Upgrade to Elite
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All plans include 100% original content generation with strict copyright compliance.</p>
          <p className="mt-2">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </div>
  );
}
