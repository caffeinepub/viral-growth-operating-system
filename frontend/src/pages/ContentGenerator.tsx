import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useCheckUserTier,
  useGenerateHooks,
  useGenerateScripts,
  useGenerateCaptions,
  useAddContentRequest,
} from '../hooks/useQueries';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, ArrowRight, Sparkles } from 'lucide-react';
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
  const { ref: generateBtnRef, createRipple } = useRippleEffect<HTMLButtonElement>();

  const [form, setForm] = useState<ContentGenerationRequest>({
    niche: '',
    platform: '',
    tone: '',
    audience: '',
    goal: '',
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [submittedForm, setSubmittedForm] = useState<ContentGenerationRequest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
          <Zap className="w-8 h-8 text-white fill-white" />
        </div>
        <h1 className="text-3xl font-extrabold mb-4">Create Viral Content</h1>
        <p className="text-muted-foreground mb-8">Please log in to start generating viral content.</p>
        <Link to="/pricing">
          <Button size="lg" className="shadow-glow hover:shadow-glow-lg transition-shadow font-bold btn-ripple">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  const isFormValid = form.niche && form.platform && form.tone && form.audience && form.goal;

  const handleGenerate = async () => {
    if (!isFormValid) {
      toast.error('Please fill in all fields before generating content.');
      return;
    }

    setIsGenerating(true);
    setUpgradeError(null);
    setGeneratedContent(null);

    try {
      await addContentRequest.mutateAsync(form);

      const [hooks, scripts, captions] = await Promise.allSettled([
        generateHooks.mutateAsync(form),
        featureSet?.scripts ? generateScripts.mutateAsync(form) : Promise.resolve([]),
        featureSet?.captions ? generateCaptions.mutateAsync(form) : Promise.resolve([]),
      ]);

      setGeneratedContent({
        hooks: hooks.status === 'fulfilled' ? hooks.value : [],
        scripts: scripts.status === 'fulfilled' ? scripts.value : [],
        captions: captions.status === 'fulfilled' ? captions.value : [],
      });
      setSubmittedForm({ ...form });

      if (hooks.status === 'rejected') {
        const msg = hooks.reason?.message ?? '';
        if (msg.includes('subscription') || msg.includes('tier')) {
          setUpgradeError(msg);
        } else {
          toast.error('Failed to generate hooks. Please try again.');
        }
      } else {
        toast.success('Content generated successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-extrabold">
            <span className="gradient-text-orange">Content Generator</span>
          </h1>
        </div>
        <p className="text-muted-foreground ml-13">Fill in the details below to generate viral content tailored to your niche.</p>
      </div>

      <LegalDisclaimer />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Form */}
        <Card className="border-border hover:border-primary/30 transition-colors">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 font-extrabold">
              <Sparkles className="w-5 h-5 text-primary" />
              Content Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="niche" className="font-semibold text-foreground">
                Content Niche <span className="text-primary">*</span>
              </Label>
              <Input
                id="niche"
                placeholder="e.g. Fitness, Finance, Travel, Tech..."
                value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })}
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="audience" className="font-semibold text-foreground">
                Target Audience <span className="text-primary">*</span>
              </Label>
              <Input
                id="audience"
                placeholder="e.g. Young professionals, Fitness beginners..."
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold text-foreground">
                Platform <span className="text-primary">*</span>
              </Label>
              <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v })}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold text-foreground">
                Tone <span className="text-primary">*</span>
              </Label>
              <Select value={form.tone} onValueChange={(v) => setForm({ ...form, tone: v })}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold text-foreground">
                Goal <span className="text-primary">*</span>
              </Label>
              <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v })}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  {goals.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tier badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Your tier:</span>
              <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/5 font-semibold">
                {featureSet?.scripts ? (featureSet?.calendar ? '👑 Elite' : '⚡ Pro') : '🆓 Free'}
              </Badge>
            </div>

            <Button
              ref={generateBtnRef}
              onMouseDown={createRipple}
              onClick={handleGenerate}
              disabled={isGenerating || !isFormValid}
              className="w-full font-bold text-base py-5 shadow-glow hover:shadow-glow-lg transition-all btn-ripple"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <div className="space-y-4">
          {upgradeError && (
            <Card className="border-[oklch(0.58_0.28_340/0.4)] bg-[oklch(0.58_0.28_340/0.05)]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[oklch(0.58_0.28_340/0.15)] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-[oklch(0.58_0.28_340)]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[oklch(0.58_0.28_340)] mb-1">Upgrade Required</p>
                    <p className="text-sm text-muted-foreground mb-3">{upgradeError}</p>
                    <Link to="/pricing">
                      <Button size="sm" className="bg-[oklch(0.58_0.28_340)] hover:bg-[oklch(0.52_0.28_340)] text-white shadow-glow-pink btn-ripple">
                        View Plans <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {generatedContent && submittedForm ? (
            <ContentOutput
              hooks={generatedContent.hooks}
              scripts={generatedContent.scripts}
              captions={generatedContent.captions}
              featureSet={featureSet}
              request={submittedForm}
            />
          ) : (
            !isGenerating && (
              <div className="h-full min-h-64 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-primary/5 to-[oklch(0.58_0.28_340/0.05)]">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 shadow-glow animate-float">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <p className="font-bold text-lg mb-1">Your content will appear here</p>
                <p className="text-muted-foreground text-sm">Fill in the form and click Generate Content</p>
              </div>
            )
          )}

          {isGenerating && (
            <div className="h-full min-h-64 rounded-2xl border border-border flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="font-bold text-lg mb-1">Generating your content...</p>
              <p className="text-muted-foreground text-sm">This may take a few seconds</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
