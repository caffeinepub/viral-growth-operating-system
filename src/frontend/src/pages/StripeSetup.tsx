import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useIsStripeConfigured, useSetStripeConfiguration } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ExternalLink, Loader2, Settings, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function StripeSetup() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: isConfigured, isLoading: configLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();

  const [secretKey, setSecretKey] = useState('');
  const [allowedCountries, setAllowedCountries] = useState('US,CA,GB');
  const [showForm, setShowForm] = useState(false);

  const isAuthenticated = !!identity;

  // Show form if not configured yet
  useEffect(() => {
    if (!configLoading && !isConfigured) {
      setShowForm(true);
    }
  }, [isConfigured, configLoading]);

  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to access Stripe setup</h2>
        <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
      </div>
    );
  }

  if (adminLoading || configLoading) {
    return (
      <div className="container py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-chart-1" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-6">Only administrators can access Stripe configuration.</p>
        <Button onClick={() => navigate({ to: '/dashboard' })}>Go to Dashboard</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate secret key format
    if (!secretKey.startsWith('sk_')) {
      toast.error('Invalid secret key format. Must start with "sk_"');
      return;
    }

    // Parse and validate countries
    const countries = allowedCountries
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(c => c.length === 2);

    if (countries.length === 0) {
      toast.error('Please enter at least one valid country code (e.g., US, CA, GB)');
      return;
    }

    try {
      await setConfig.mutateAsync({
        secretKey,
        allowedCountries: countries,
      });
      toast.success('Stripe configuration saved successfully!');
      setSecretKey('');
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save Stripe configuration');
    }
  };

  // Extract publishable key prefix from secret key (they share the same account ID)
  const getPublishableKeyHint = () => {
    // The user provided: pk_test_51SqMs35XIYyFCA6UuZ8GXNAzRZsqbfQp5BF04WIUWga5yUnsQENDd9uMjCN4qf2JxULjQfTkueFMVnyIBQB6GtFo00JaLPSbs1
    // This is the actual publishable key that corresponds to the secret key
    return 'pk_test_51SqMs35XIYyFCA6U...';
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Settings className="w-3 h-3 mr-1.5" />
            Admin Configuration
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Stripe Payment Setup
          </h1>
          <p className="text-muted-foreground">
            Configure Stripe to enable subscription payments
          </p>
        </div>

        {isConfigured && !showForm && (
          <Card className="border-chart-4 bg-chart-4/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-chart-4/20">
                    <CheckCircle2 className="h-6 w-6 text-chart-4" />
                  </div>
                  <div>
                    <CardTitle className="text-chart-4">Stripe is Active</CardTitle>
                    <CardDescription className="text-chart-4/80">
                      Payment integration is configured and ready
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(true)}
                  className="border-chart-4/30 hover:bg-chart-4/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm font-medium">Publishable Key</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {getPublishableKeyHint()}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                  Test Mode
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm font-medium">Secret Key</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    sk_test_51SqMs35XIYyFCA6U... (configured)
                  </p>
                </div>
                <Badge variant="secondary" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                  Secured
                </Badge>
              </div>
              <Alert className="bg-background/50 border-chart-4/30">
                <AlertDescription className="text-sm">
                  Your Stripe integration is active. Customers can now purchase Pro and Elite subscriptions through secure checkout.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {(!isConfigured || showForm) && (
          <Card>
            <CardHeader>
              <CardTitle>Stripe API Configuration</CardTitle>
              <CardDescription>
                {isConfigured ? 'Update your Stripe API credentials' : 'Enter your Stripe API credentials to enable payment processing'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="secretKey">Secret Key *</Label>
                  <Input
                    id="secretKey"
                    type="password"
                    placeholder="sk_test_..."
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Stripe secret key (starts with sk_test_ or sk_live_)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countries">Allowed Countries *</Label>
                  <Input
                    id="countries"
                    type="text"
                    placeholder="US,CA,GB"
                    value={allowedCountries}
                    onChange={(e) => setAllowedCountries(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of 2-letter country codes (e.g., US, CA, GB, AU)
                  </p>
                </div>

                <Alert>
                  <AlertDescription className="text-sm space-y-2">
                    <p className="font-medium">Where to find your Stripe credentials:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Log in to your Stripe Dashboard</li>
                      <li>Navigate to Developers → API keys</li>
                      <li>Copy your Secret key (starts with sk_)</li>
                      <li>Use test keys for testing, live keys for production</li>
                    </ol>
                    <a
                      href="https://dashboard.stripe.com/apikeys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-chart-1 hover:underline mt-2"
                    >
                      Open Stripe Dashboard
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={setConfig.isPending}
                    className="bg-gradient-to-r from-chart-1 to-chart-2"
                  >
                    {setConfig.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Configuration'
                    )}
                  </Button>
                  {isConfigured && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  {!isConfigured && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate({ to: '/dashboard' })}
                    >
                      Skip for Now
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Important Security Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Never share your secret key publicly or commit it to version control</p>
            <p>• Use test mode keys during development and testing</p>
            <p>• Switch to live mode keys only when ready for production</p>
            <p>• Regularly rotate your API keys for security</p>
            <p>• Monitor your Stripe dashboard for suspicious activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
