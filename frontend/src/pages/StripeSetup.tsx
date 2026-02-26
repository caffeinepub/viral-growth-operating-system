import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsStripeConfigured, useSetStripeConfiguration, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Settings, Loader2, Shield, Eye, EyeOff, Info } from 'lucide-react';
import { toast } from 'sonner';

function getProductionWebhookUrl(): string {
  const hostname = window.location.hostname;
  // On IC mainnet the frontend is served from *.ic0.app or *.icp0.io
  // The backend webhook endpoint is on the same canister
  return `${window.location.protocol}//${hostname}/api/webhook`;
}

function isProductionDomain(): boolean {
  const hostname = window.location.hostname;
  return hostname.endsWith('.ic0.app') || hostname.endsWith('.icp0.io') || hostname.endsWith('.icp0.app');
}

export default function StripeSetup() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: isConfigured, isLoading: configLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();

  const [secretKey, setSecretKey] = useState('');
  const [allowedCountries, setAllowedCountries] = useState('US, CA, GB');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Stripe Setup</h1>
        <p className="text-muted-foreground">Please log in to access Stripe configuration.</p>
      </div>
    );
  }

  if (adminLoading || configLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground mt-4">Loading configuration...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground">Only administrators can access Stripe configuration.</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!secretKey.trim()) {
      toast.error('Please enter a Stripe secret key.');
      return;
    }
    if (!secretKey.startsWith('sk_')) {
      toast.error('Invalid Stripe secret key. It should start with "sk_".');
      return;
    }

    const countries = allowedCountries
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length === 2);

    try {
      await setConfig.mutateAsync({ secretKey, allowedCountries: countries });
      toast.success('Stripe configuration saved successfully!');
      setIsEditing(false);
      setSecretKey('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save configuration.');
    }
  };

  const isLiveKey = secretKey.startsWith('sk_live_');
  const isProduction = isProductionDomain();

  if (isConfigured && !isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stripe Configuration</h1>
          <p className="text-muted-foreground">Manage your Stripe payment integration.</p>
        </div>

        {isProduction && (
          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Production Deployment Detected</AlertTitle>
            <AlertDescription className="text-sm space-y-2 mt-1">
              <p>
                You are running on a production IC domain. Ensure your Stripe webhook endpoint is
                configured in the{' '}
                <a
                  href="https://dashboard.stripe.com/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Stripe Dashboard
                </a>{' '}
                to point to your production canister.
              </p>
              <p className="font-mono text-xs bg-muted rounded px-2 py-1 break-all">
                Webhook URL: {getProductionWebhookUrl()}
              </p>
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Stripe Connected
              </CardTitle>
              <Badge variant="default" className="gap-1">
                <Shield className="w-3 h-3" />
                Secured
              </Badge>
            </div>
            <CardDescription>Your Stripe integration is active and processing payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Secret Key</p>
              <p className="font-mono text-sm">sk_••••••••••••••••••••••••</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Update Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {isEditing ? 'Update Stripe Configuration' : 'Setup Stripe Payments'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? 'Update your Stripe secret key and configuration.'
            : 'Connect your Stripe account to start accepting payments.'}
        </p>
      </div>

      {isProduction && (
        <Alert className="mb-6 border-amber-500/30 bg-amber-500/5">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-700 dark:text-amber-300">Production Checklist</AlertTitle>
          <AlertDescription className="text-sm space-y-1 mt-1 text-amber-700/80 dark:text-amber-300/80">
            <p>You are configuring Stripe on a production IC deployment. Please ensure:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Use a <strong>live key</strong> (sk_live_...) for real payments</li>
              <li>
                Update your webhook endpoint in the{' '}
                <a
                  href="https://dashboard.stripe.com/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Stripe Dashboard
                </a>{' '}
                to:{' '}
                <span className="font-mono text-xs bg-amber-100 dark:bg-amber-900/30 rounded px-1 py-0.5 break-all">
                  {getProductionWebhookUrl()}
                </span>
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Stripe Configuration
          </CardTitle>
          <CardDescription>
            Enter your Stripe secret key from the{' '}
            <a
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Stripe Dashboard
            </a>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label htmlFor="secretKey">Stripe Secret Key *</Label>
            <div className="relative mt-1.5">
              <Input
                id="secretKey"
                type={showKey ? 'text' : 'password'}
                placeholder="sk_live_... or sk_test_..."
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isProduction
                ? 'Use a live key (sk_live_...) for production payments.'
                : 'Use a test key (sk_test_...) for testing or a live key (sk_live_...) for production.'}
            </p>
            {isLiveKey && !isProduction && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                <Info className="w-3 h-3" />
                You are using a live key on a non-production domain. Ensure this is intentional.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="countries">Allowed Countries</Label>
            <Input
              id="countries"
              placeholder="US, CA, GB, AU"
              value={allowedCountries}
              onChange={(e) => setAllowedCountries(e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated 2-letter country codes. Leave as default for US, CA, GB.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={setConfig.isPending}
              className="gap-2"
            >
              {setConfig.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Save Configuration
                </>
              )}
            </Button>
            {isEditing && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setSecretKey('');
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
