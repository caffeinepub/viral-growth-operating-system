import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

interface UpgradePromptProps {
  feature: string;
  requiredTier: string;
}

export default function UpgradePrompt({ feature, requiredTier }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-[oklch(0.58_0.28_340/0.4)] bg-gradient-to-br from-[oklch(0.58_0.28_340/0.05)] to-[oklch(0.65_0.24_42/0.05)] text-center">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[oklch(0.58_0.28_340/0.2)] to-[oklch(0.65_0.24_42/0.2)] flex items-center justify-center mb-3">
        <Lock className="w-5 h-5 text-[oklch(0.58_0.28_340)]" />
      </div>
      <p className="text-sm font-bold mb-1">
        {feature}{' '}
        <span className="text-[oklch(0.58_0.28_340)]">— {requiredTier} Plan Required</span>
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Upgrade to {requiredTier} to unlock this feature and more.
      </p>
      <Link to="/pricing">
        <Button
          size="sm"
          className="gap-1.5 bg-gradient-to-r from-[oklch(0.58_0.28_340)] to-[oklch(0.65_0.24_42)] hover:opacity-90 text-white font-bold shadow-glow-pink transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Upgrade to {requiredTier} <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
