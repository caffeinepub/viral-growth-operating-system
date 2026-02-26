import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UpgradePrompt from './UpgradePrompt';
import { Zap, FileText, Hash, Lock, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { FeatureSet, ContentGenerationRequest } from '../backend';

interface ContentOutputProps {
  hooks: string[];
  scripts: string[];
  captions: string[];
  featureSet?: FeatureSet;
  request: ContentGenerationRequest;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
      onClick={handleCopy}
    >
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-[oklch(0.72_0.22_140)]" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  );
}

export default function ContentOutput({ hooks, scripts, captions, featureSet, request }: ContentOutputProps) {
  const hasHooks = hooks && hooks.length > 0;
  const hasScripts = scripts && scripts.length > 0;
  const hasCaptions = captions && captions.length > 0;

  return (
    <div className="space-y-4">
      {/* Meta badges */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge className="text-xs bg-primary/15 text-primary border-primary/30 font-semibold">
          {request.platform}
        </Badge>
        <Badge variant="outline" className="text-xs font-medium">
          {request.niche}
        </Badge>
        <Badge variant="outline" className="text-xs font-medium">
          {request.tone}
        </Badge>
      </div>

      {/* Hooks */}
      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            Viral Hooks
            <Badge className="text-xs ml-auto bg-[oklch(0.72_0.22_140/0.15)] text-[oklch(0.55_0.20_140)] border-[oklch(0.72_0.22_140/0.3)]">
              ✓ Included
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasHooks ? (
            <div className="space-y-2">
              {hooks.map((hook, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                  <span className="text-xs font-extrabold text-primary mt-0.5 shrink-0 w-5">#{i + 1}</span>
                  <p className="text-sm flex-1">{hook}</p>
                  <CopyButton text={hook} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <p className="text-sm text-muted-foreground">
                Hooks will appear here after generation. The backend returns empty arrays — content generation is ready for AI integration.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scripts */}
      <Card className={featureSet?.scripts ? 'border-[oklch(0.55_0.22_250/0.2)] hover:border-[oklch(0.55_0.22_250/0.4)] transition-colors' : 'border-border'}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${featureSet?.scripts ? 'bg-[oklch(0.55_0.22_250/0.15)]' : 'bg-muted'}`}>
              <FileText className={`w-3.5 h-3.5 ${featureSet?.scripts ? 'text-[oklch(0.55_0.22_250)]' : 'text-muted-foreground'}`} />
            </div>
            Video Scripts
            {featureSet?.scripts ? (
              <Badge className="text-xs ml-auto bg-[oklch(0.55_0.22_250/0.15)] text-[oklch(0.45_0.20_250)] border-[oklch(0.55_0.22_250/0.3)]">
                ✓ Included
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs ml-auto flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pro+
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {featureSet?.scripts ? (
            hasScripts ? (
              <div className="space-y-2">
                {scripts.map((script, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[oklch(0.55_0.22_250/0.05)] border border-[oklch(0.55_0.22_250/0.1)] rounded-xl">
                    <p className="text-sm flex-1 whitespace-pre-wrap">{script}</p>
                    <CopyButton text={script} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-xl text-center">
                Scripts will appear here after generation.
              </p>
            )
          ) : (
            <UpgradePrompt feature="Full Video Scripts" requiredTier="Pro" />
          )}
        </CardContent>
      </Card>

      {/* Captions */}
      <Card className={featureSet?.captions ? 'border-[oklch(0.58_0.28_340/0.2)] hover:border-[oklch(0.58_0.28_340/0.4)] transition-colors' : 'border-border'}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${featureSet?.captions ? 'bg-[oklch(0.58_0.28_340/0.15)]' : 'bg-muted'}`}>
              <Hash className={`w-3.5 h-3.5 ${featureSet?.captions ? 'text-[oklch(0.58_0.28_340)]' : 'text-muted-foreground'}`} />
            </div>
            Captions & Hashtags
            {featureSet?.captions ? (
              <Badge className="text-xs ml-auto bg-[oklch(0.58_0.28_340/0.15)] text-[oklch(0.50_0.26_340)] border-[oklch(0.58_0.28_340/0.3)]">
                ✓ Included
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs ml-auto flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pro+
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {featureSet?.captions ? (
            hasCaptions ? (
              <div className="space-y-2">
                {captions.map((caption, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[oklch(0.58_0.28_340/0.05)] border border-[oklch(0.58_0.28_340/0.1)] rounded-xl">
                    <p className="text-sm flex-1">{caption}</p>
                    <CopyButton text={caption} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-xl text-center">
                Captions will appear here after generation.
              </p>
            )
          ) : (
            <UpgradePrompt feature="Captions & Hashtags" requiredTier="Pro" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
