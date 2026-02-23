import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useCheckUserTier, useAddContentRequest, useGenerateContent } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ContentOutput from '../components/ContentOutput';
import type { ContentGenerationRequest } from '../backend';

export default function ContentGenerator() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: featureSet } = useCheckUserTier();
  const addRequest = useAddContentRequest();
  const generateContent = useGenerateContent();

  const [formData, setFormData] = useState<ContentGenerationRequest>({
    tone: '',
    audience: '',
    platform: '',
    niche: '',
    goal: '',
  });

  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to generate content</h2>
        <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tone || !formData.audience || !formData.platform || !formData.niche || !formData.goal) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addRequest.mutateAsync(formData);
      const content = await generateContent.mutateAsync(formData);
      setGeneratedContent(content);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content');
      console.error(error);
    }
  };

  const handleChange = (field: keyof ContentGenerationRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isLoading = addRequest.isPending || generateContent.isPending;

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1.5" />
            AI Content Generator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create Viral Content
          </h1>
          <p className="text-muted-foreground">
            Tell us about your content strategy and we'll generate original, algorithm-optimized content
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Strategy</CardTitle>
            <CardDescription>
              Fill in the details below to generate personalized content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Input
                    id="tone"
                    placeholder="e.g., Energetic, Professional, Casual"
                    value={formData.tone}
                    onChange={(e) => handleChange('tone', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    How should your content sound?
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Young entrepreneurs, Fitness enthusiasts"
                    value={formData.audience}
                    onChange={(e) => handleChange('audience', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Who are you creating content for?
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Input
                    id="platform"
                    placeholder="e.g., TikTok, Instagram Reels, YouTube Shorts"
                    value={formData.platform}
                    onChange={(e) => handleChange('platform', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Which platform will you post on?
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche">Niche</Label>
                  <Input
                    id="niche"
                    placeholder="e.g., Personal finance, Fitness, Tech reviews"
                    value={formData.niche}
                    onChange={(e) => handleChange('niche', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    What's your content category?
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Content Goal</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Drive traffic to my course, Build brand awareness, Increase engagement"
                  value={formData.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  What do you want to achieve with this content?
                </p>
              </div>

              <Separator />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-chart-1 to-chart-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedContent && featureSet && (
          <ContentOutput content={generatedContent} featureSet={featureSet} />
        )}
      </div>
    </div>
  );
}
