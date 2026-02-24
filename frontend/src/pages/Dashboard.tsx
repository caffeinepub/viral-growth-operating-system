import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import { useCheckUserTier, useGetMySubscription, useGetContentRequests } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileSetupModal from '../components/ProfileSetupModal';
import {
  Zap,
  FileText,
  Hash,
  Calendar,
  DollarSign,
  TrendingUp,
  Lock,
  ArrowRight,
  Crown,
} from 'lucide-react';

const tierColors: Record<string, string> = {
  free: 'secondary',
  pro: 'default',
  elite: 'default',
};

const tierLabels: Record<string, string> = {
  free: 'Free',
  pro: 'Pro',
  elite: 'Elite',
};

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: featureSet, isLoading: featuresLoading } = useCheckUserTier();
  const { data: subscription, isLoading: subLoading } = useGetMySubscription();
  const { data: contentRequests } = useGetContentRequests();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['subscription'] });
    queryClient.invalidateQueries({ queryKey: ['featureSet'] });
  }, [queryClient]);

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Your Dashboard</h1>
        <p className="text-muted-foreground mb-8">Please log in to view your dashboard and content history.</p>
        <Link to="/pricing">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    );
  }

  const currentTier = subscription?.tier ?? 'free';
  const tierLabel = tierLabels[currentTier] ?? 'Free';

  const featureItems = [
    { label: 'Viral Hooks', enabled: featureSet?.hooks, icon: <Zap className="w-4 h-4" /> },
    { label: 'Full Scripts', enabled: featureSet?.scripts, icon: <FileText className="w-4 h-4" /> },
    { label: 'Captions', enabled: featureSet?.captions, icon: <FileText className="w-4 h-4" /> },
    { label: 'Hashtags', enabled: featureSet?.hashtags, icon: <Hash className="w-4 h-4" /> },
    { label: 'Content Score', enabled: featureSet?.contentScore, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Content Calendar', enabled: featureSet?.calendar, icon: <Calendar className="w-4 h-4" /> },
    { label: 'Growth Roadmap', enabled: featureSet?.roadmap, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Monetization Angles', enabled: (featureSet?.monetizationAngles ?? 0n) > 0n, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Affiliate Suggestions', enabled: featureSet?.affiliateSuggestions, icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Faceless Content', enabled: featureSet?.facelessVersion, icon: <Crown className="w-4 h-4" /> },
  ];

  return (
    <>
      {showProfileSetup && <ProfileSetupModal />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}!
            </h1>
            <p className="text-muted-foreground mt-1">Here's your content creation overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={tierColors[currentTier] as any} className="text-sm px-3 py-1">
              {currentTier === 'elite' && <Crown className="w-3.5 h-3.5 mr-1" />}
              {tierLabel} Plan
            </Badge>
            {currentTier === 'free' && (
              <Link to="/pricing">
                <Button size="sm" className="gap-1">
                  Upgrade <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {subLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold">{tierLabel}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Content Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{contentRequests?.length ?? 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Features Unlocked</CardTitle>
            </CardHeader>
            <CardContent>
              {featuresLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold">
                  {featureItems.filter((f) => f.enabled).length}/{featureItems.length}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Features</CardTitle>
            </CardHeader>
            <CardContent>
              {featuresLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {featureItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                        item.enabled
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {item.enabled ? item.icon : <Lock className="w-4 h-4" />}
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/generate" className="block">
                <Button className="w-full justify-between" variant="outline">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Generate New Content
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/subscription" className="block">
                <Button className="w-full justify-between" variant="outline">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Manage Subscription
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {currentTier === 'free' && (
                <Link to="/pricing" className="block">
                  <Button className="w-full gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Upgrade Your Plan
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
