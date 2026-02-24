import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['subscription'] });
    queryClient.invalidateQueries({ queryKey: ['featureSet'] });
  }, [queryClient]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="pt-10 pb-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Your subscription has been activated. You now have access to all the features included in your plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/generate">
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="w-4 h-4" />
                Start Creating
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
