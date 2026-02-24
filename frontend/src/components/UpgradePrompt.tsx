import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight } from 'lucide-react';

interface UpgradePromptProps {
  feature: string;
  requiredTier: string;
}

export default function UpgradePrompt({ feature, requiredTier }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg border border-dashed border-border text-center">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
        <Lock className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">{feature} — {requiredTier} Plan Required</p>
      <p className="text-xs text-muted-foreground mb-4">
        Upgrade to {requiredTier} to unlock this feature and more.
      </p>
      <Link to="/pricing">
        <Button size="sm" className="gap-1.5">
          Upgrade to {requiredTier} <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
