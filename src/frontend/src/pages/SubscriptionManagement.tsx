import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubscription } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CreditCard, ArrowUpCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SubscriptionManagement() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: subscription, isLoading } = useGetMySubscription();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to manage your subscription</h2>
        <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
      </div>
    );
  }

  const tierName = subscription?.tier ? String(subscription.tier) : 'free';
  const tierDisplay = tierName.charAt(0).toUpperCase() + tierName.slice(1);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'elite':
        return 'bg-gradient-to-r from-chart-4 to-chart-5';
      case 'pro':
        return 'bg-gradient-to-r from-chart-1 to-chart-2';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Subscription Management
          </h1>
          <p className="text-muted-foreground">
            Manage your plan and billing settings
          </p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription tier</CardDescription>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <Badge className={getTierColor(tierName)}>
                  {tierDisplay}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-sm text-muted-foreground">
                  {subscription?.status ? String(subscription.status) : 'Active'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Billing Cycle</p>
                <p className="text-sm text-muted-foreground">Monthly</p>
              </div>
            </div>

            {tierName !== 'elite' && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center flex-shrink-0">
                    <ArrowUpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Upgrade Your Plan</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Unlock more features and maximize your content's potential
                    </p>
                    <Button
                      onClick={() => navigate({ to: '/pricing' })}
                      className="bg-gradient-to-r from-chart-1 to-chart-2"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      View Upgrade Options
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing Information */}
        {tierName !== 'free' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing Information
              </CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Payment processing is handled securely by Stripe. Click below to manage your payment methods,
                view invoices, or update billing information.
              </p>
              <Button variant="outline">
                Manage Payment Methods
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle>Your Plan Features</CardTitle>
            <CardDescription>What's included in your {tierDisplay} plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tierName === 'free' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>3 scroll-stopping hooks per request</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✗</span>
                    <span>Full scripts and captions</span>
                  </div>
                </>
              )}
              {tierName === 'pro' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>5 scroll-stopping hooks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>3 original scripts (30-45s)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>5 engagement captions & hashtag clusters</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>1 monetization angle</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>Content performance scores</span>
                  </div>
                </>
              )}
              {tierName === 'elite' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>All Pro features</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>2 monetization angles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>7-day content calendar</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>Niche domination roadmap</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-chart-4">✓</span>
                    <span>Faceless content adaptation</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
