import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Sparkles } from 'lucide-react';

interface UpgradePromptProps {
  feature: string;
  requiredTier: 'Pro' | 'Elite';
}

export default function UpgradePrompt({ feature, requiredTier }: UpgradePromptProps) {
  const navigate = useNavigate();

  return (
    <Card className="border-2 border-dashed border-muted-foreground/30">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
          <Lock className="w-6 h-6 text-muted-foreground" />
        </div>
        <CardTitle className="text-xl">Unlock {feature}</CardTitle>
        <CardDescription>
          This feature is available on the {requiredTier} tier
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Upgrade to access {feature.toLowerCase()} and unlock your content's full potential.
        </p>
        <Button
          onClick={() => navigate({ to: '/pricing' })}
          className="bg-gradient-to-r from-chart-1 to-chart-2"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          View Pricing
        </Button>
      </CardContent>
    </Card>
  );
}
