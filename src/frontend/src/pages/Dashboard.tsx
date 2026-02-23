import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubscription, useGetContentRequests } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, Clock, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: subscription, isLoading: subLoading } = useGetMySubscription();
  const { data: contentRequests, isLoading: requestsLoading } = useGetContentRequests();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Ready to create viral content?</p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/generate' })}
            className="bg-gradient-to-r from-chart-1 to-chart-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Content
          </Button>
        </div>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>Current plan and features</CardDescription>
              </div>
              {subLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <Badge className={getTierColor(tierName)}>
                  {tierDisplay}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium text-sm">Hooks</p>
                  <p className="text-xs text-muted-foreground">
                    {tierName === 'free' ? '3 per request' : '5 per request'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium text-sm">Scripts & Captions</p>
                  <p className="text-xs text-muted-foreground">
                    {tierName === 'free' ? 'Not included' : 'Included'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Content Calendar</p>
                  <p className="text-xs text-muted-foreground">
                    {tierName === 'elite' ? 'Included' : 'Elite only'}
                  </p>
                </div>
              </div>
            </div>
            {tierName === 'free' && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: '/pricing' })}
                  className="w-full"
                >
                  Upgrade to unlock more features
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Content</h2>
          </div>

          {requestsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : contentRequests && contentRequests.length > 0 ? (
            <div className="grid gap-4">
              {contentRequests.slice(0, 5).map((request, index) => (
                <Card key={index} className="hover:border-chart-1 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{request.niche} Content</CardTitle>
                    <CardDescription>
                      {request.platform} • {request.tone} tone • Target: {request.audience}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Goal:</strong> {request.goal}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No content yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start creating viral content with AI-powered strategies
                </p>
                <Button onClick={() => navigate({ to: '/generate' })}>
                  Create Your First Content
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
