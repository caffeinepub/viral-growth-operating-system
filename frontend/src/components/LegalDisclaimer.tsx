import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <Alert className="border-amber-500/30 bg-amber-500/5">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-xs text-muted-foreground">
        <strong className="text-foreground">Legal Notice:</strong> You are responsible for all content you create and publish. Ensure your content complies with applicable copyright laws, platform terms of service, and local regulations. Results are not guaranteed.
      </AlertDescription>
    </Alert>
  );
}
