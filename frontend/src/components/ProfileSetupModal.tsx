import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  onSuccess?: () => void;
}

export default function ProfileSetupModal({ onSuccess }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    try {
      await saveProfile.mutateAsync({ name: name.trim(), email: email.trim() });
      toast.success('Profile saved! Welcome to ViralGrowth OS!');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile. Please try again.');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Welcome to ViralGrowth OS!</DialogTitle>
          <DialogDescription className="text-center">
            Let's set up your profile to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <Button
            className="w-full gap-2"
            onClick={handleSave}
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Get Started'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
