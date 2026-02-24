import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentFailure() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <Card className="border-destructive/20 shadow-lg">
        <CardContent className="pt-10 pb-10">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Your payment was cancelled and you have not been charged. You can try again or return to the pricing page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
