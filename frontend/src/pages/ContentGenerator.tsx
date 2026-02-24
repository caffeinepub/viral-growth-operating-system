import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useCheckUserTier,
  useGenerateHooks,
  useGenerateScripts,
  useGenerateCaptions,
  useAddContentRequest,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Lock, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import ContentOutput from '../components/ContentOutput';
import LegalDisclaimer from '../components/LegalDisclaimer';
import type { ContentGenerationRequest } from '../backend';

const platforms = ['TikTok', 'YouTube', 'Instagram', 'Twitter/X', 'LinkedIn', 'Facebook'];
const tones = ['Energetic', 'Professional', 'Casual', 'Inspirational', 'Educational', 'Humorous'];
const goals = ['Grow Audience', 'Drive Sales', 'Increase Engagement', 'Build Authority', 'Entertain'];

type GeneratedContent = {
  hooks: string[];
  scripts: string[];
  captions: string[];
};

export default function ContentGenerator() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: featureSet } = useCheckUserTier();
  const generateHooks = useGenerateHooks();
  const generateScripts = useGenerateScripts();
  const generateCaptions = useGenerateCaptions();
  const addContentRequest = useAddContentRequest();

  const [form, setForm] = useState<ContentGenerationRequest>({
    niche: '',
    platform: '',
    tone: '',
    audience: '',
    goal: '',
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Create Viral Content</h1>
        <p className="text-muted-foreground mb-8">Please log in to start generating content.</p>
        <Link to="/pricing">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!form.niche || !form.platform || !form.tone || !form.audience || !form.goal) {
      toast.error('Please fill in all fields before generating content.');
      return;
    }

    setIsGenerating(true);
    setUpgradeError(null);
    setGeneratedContent(null);

    try {
      const [hooks, scripts, captions] = await Promise.allSettled([
        generateHooks.mutateAsync(form),
        featureSet?.scripts ? generateScripts.mutateAsync(form) : Promise.resolve([]),
        featureSet?.captions ? generateCaptions.mutateAsync(form) : Promise.resolve([]),
      ]);

      const hooksResult = hooks.status === 'fulfilled' ? hooks.value : [];
      const scriptsResult = scripts.status === 'fulfilled' ? scripts.value : [];
      const captionsResult = captions.status === 'fulfilled' ? captions.value : [];

      if (hooks.status === 'rejected') {
        const errorMsg = hooks.reason?.message || '';
        if (errorMsg.includes('subscription tier') || errorMsg.includes('Unauthorized')) {
          setUpgradeError('Your current plan does not include this feature. Upgrade to access more content generation tools.');
          return;
        }
        throw hooks.reason;
      }

      setGeneratedContent({
        hooks: hooksResult,
        scripts: scriptsResult,
        captions: captionsResult,
      });

      await addContentRequest.mutateAsync(form);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      const errorMsg = error?.message || '';
      if (errorMsg.includes('subscription tier') || errorMsg.includes('Unauthorized')) {
        setUpgradeError('Your current plan does not include this feature. Upgrade to access more content generation tools.');
      } else {
        toast.error('Failed to generate content. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Generator</h1>
        <p className="text-muted-foreground">Fill in the details below to generate viral content for your platform.</p>
      </div>

      <LegalDisclaimer />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="niche">Your Niche *</Label>
                <Input
                  id="niche"
                  placeholder="e.g., Personal Finance, Fitness, Tech"
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Platform *</Label>
                <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tone *</Label>
                <Select value={form.tone} onValueChange={(v) => setForm({ ...form, tone: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audience">Target Audience *</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Millennials, entrepreneurs, parents"
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Goal *</Label>
                <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goals.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full mt-2 gap-2"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="pt-4">
              <p className="text-sm font-medium mb-3">Your Plan Features</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Hooks', enabled: featureSet?.hooks },
                  { label: 'Scripts', enabled: featureSet?.scripts },
                  { label: 'Captions', enabled: featureSet?.captions },
                  { label: 'Hashtags', enabled: featureSet?.hashtags },
                  { label: 'Content Score', enabled: featureSet?.contentScore },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {f.enabled ? (
                      <Badge variant="default" className="text-xs px-1.5 py-0">✓</Badge>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                    <span className={f.enabled ? 'text-foreground' : 'text-muted-foreground'}>{f.label}</span>
                  </div>
                ))}
              </div>
              {!featureSet?.scripts && (
                <Link to="/pricing" className="block mt-3">
                  <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                    Unlock More <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {upgradeError && (
            <Card className="mb-4 border-destructive/50 bg-destructive/5">
              <CardContent className="pt-4">
                <p className="text-sm text-destructive mb-3">{upgradeError}</p>
                <Link to="/pricing">
                  <Button size="sm" className="gap-1">
                    Upgrade Plan <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {generatedContent ? (
            <ContentOutput
              hooks={generatedContent.hooks}
              scripts={generatedContent.scripts}
              captions={generatedContent.captions}
              featureSet={featureSet}
              request={form}
            />
          ) : (
            <Card className="h-full min-h-64 flex items-center justify-center border-dashed">
              <CardContent className="text-center py-16">
                <Zap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Your generated content will appear here</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Fill in the form and click Generate Content</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
