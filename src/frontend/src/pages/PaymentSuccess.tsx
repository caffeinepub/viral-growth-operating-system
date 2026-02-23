import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate subscription and feature set queries to refetch updated tier data
    queryClient.invalidateQueries({ queryKey: ['subscription'] });
    queryClient.invalidateQueries({ queryKey: ['featureSet'] });
  }, [queryClient]);

  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-chart-4/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-chart-4" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your subscription has been activated and features are now unlocked
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Thank you for upgrading! You now have immediate access to all the features of your new plan. Start creating viral content right away.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate({ to: '/dashboard' })}
                className="bg-gradient-to-r from-chart-1 to-chart-2"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/generate' })}
              >
                Start Creating Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
