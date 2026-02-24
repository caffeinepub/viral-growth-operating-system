import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubscription, useCheckUserTier } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Crown, Zap, ArrowRight, Lock } from 'lucide-react';

const tierFeatures: Record<string, string[]> = {
  free: ['Viral hook generator', 'Basic platform support', 'Community access'],
  pro: [
    'Everything in Free',
    'Full video scripts',
    'Captions & hashtags',
    'Content score analysis',
    '1 monetization angle',
    'Affiliate suggestions',
    'Priority support',
  ],
  elite: [
    'Everything in Pro',
    '2 monetization angles',
    'Content calendar',
    'Growth roadmap',
    'Faceless content version',
    'Brand voice profile',
    'Dedicated support',
  ],
};

export default function SubscriptionManagement() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const { data: subscription, isLoading: subLoading } = useGetMySubscription();
  const { data: featureSet, isLoading: featuresLoading } = useCheckUserTier();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['subscription'] });
    queryClient.invalidateQueries({ queryKey: ['featureSet'] });
  }, [queryClient]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Manage Subscription</h1>
        <p className="text-muted-foreground mb-8">Please log in to manage your subscription.</p>
        <Link to="/pricing">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    );
  }

  const currentTier = subscription?.tier ?? 'free';
  const tierLabel = currentTier.charAt(0).toUpperCase() + currentTier.slice(1);
  const features = tierFeatures[currentTier] ?? tierFeatures.free;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
        <p className="text-muted-foreground">Manage your plan and billing details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold">{tierLabel}</span>
                  <Badge variant={currentTier === 'free' ? 'secondary' : 'default'}>
                    {subscription?.status ?? 'Active'}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {currentTier !== 'elite' && (
                  <Link to="/pricing" className="block mt-6">
                    <Button className="w-full gap-2">
                      Upgrade Plan <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Feature Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            {featuresLoading ? (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { label: 'Viral Hooks', enabled: featureSet?.hooks },
                  { label: 'Full Scripts', enabled: featureSet?.scripts },
                  { label: 'Captions', enabled: featureSet?.captions },
                  { label: 'Hashtags', enabled: featureSet?.hashtags },
                  { label: 'Content Score', enabled: featureSet?.contentScore },
                  { label: 'Content Calendar', enabled: featureSet?.calendar },
                  { label: 'Growth Roadmap', enabled: featureSet?.roadmap },
                  { label: 'Affiliate Suggestions', enabled: featureSet?.affiliateSuggestions },
                  { label: 'Faceless Content', enabled: featureSet?.facelessVersion },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                      item.enabled ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {item.enabled ? (
                      <CheckCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 shrink-0" />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
