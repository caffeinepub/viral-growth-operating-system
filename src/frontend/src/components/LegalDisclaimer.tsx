import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <Alert className="bg-muted/50 border-muted-foreground/20">
      <Shield className="h-4 w-4" />
      <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
        <strong>Legal Notice:</strong> All generated outputs are newly created original works. End users retain full 
        commercial rights to use generated content. The system does not claim ownership of user ideas. AI assistance 
        does not guarantee growth or income. Generated content avoids copyrighted material and users are responsible 
        for final compliance verification.
      </AlertDescription>
    </Alert>
  );
}
