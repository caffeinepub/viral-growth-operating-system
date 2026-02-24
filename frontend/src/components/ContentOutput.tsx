import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UpgradePrompt from './UpgradePrompt';
import { Zap, FileText, Hash, Lock, Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { FeatureSet, ContentGenerationRequest } from '../backend';

interface ContentOutputProps {
  hooks: string[];
  scripts: string[];
  captions: string[];
  featureSet?: FeatureSet;
  request: ContentGenerationRequest;
}

function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };
  return (
    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
      <Copy className="w-3.5 h-3.5" />
    </Button>
  );
}

export default function ContentOutput({ hooks, scripts, captions, featureSet, request }: ContentOutputProps) {
  const hasHooks = hooks && hooks.length > 0;
  const hasScripts = scripts && scripts.length > 0;
  const hasCaptions = captions && captions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary" className="text-xs">
          {request.platform}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {request.niche}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {request.tone}
        </Badge>
      </div>

      {/* Hooks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="w-4 h-4 text-primary" />
            Viral Hooks
            <Badge variant="default" className="text-xs ml-auto">Included</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasHooks ? (
            <div className="space-y-2">
              {hooks.map((hook, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs font-bold text-primary mt-0.5 shrink-0">#{i + 1}</span>
                  <p className="text-sm flex-1">{hook}</p>
                  <CopyButton text={hook} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                Hooks will appear here after generation. The backend returns empty arrays — content generation is ready for AI integration.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scripts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-4 h-4 text-primary" />
            Video Scripts
            {featureSet?.scripts ? (
              <Badge variant="default" className="text-xs ml-auto">Included</Badge>
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
                  <div key={i} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm flex-1 whitespace-pre-wrap">{script}</p>
                    <CopyButton text={script} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg text-center">
                Scripts will appear here after generation.
              </p>
            )
          ) : (
            <UpgradePrompt feature="Full Video Scripts" requiredTier="Pro" />
          )}
        </CardContent>
      </Card>

      {/* Captions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="w-4 h-4 text-primary" />
            Captions & Hashtags
            {featureSet?.captions ? (
              <Badge variant="default" className="text-xs ml-auto">Included</Badge>
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
                  <div key={i} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm flex-1">{caption}</p>
                    <CopyButton text={caption} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg text-center">
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
