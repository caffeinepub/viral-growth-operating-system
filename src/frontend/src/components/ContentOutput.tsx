import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, FileText, MessageSquare, Hash, DollarSign, Brain, Calendar, Target } from 'lucide-react';
import ContentScoreCard from './ContentScoreCard';
import UpgradePrompt from './UpgradePrompt';
import LegalDisclaimer from './LegalDisclaimer';
import type { FeatureSet } from '../backend';

interface ContentOutputProps {
  content: {
    hooks: string[];
    scripts: string[];
    captions: string[];
    hashtags: string[];
    monetizationAngles: string[];
    psychTriggers: string;
    postingRecommendation: string;
    painPoints: string[];
    scores: {
      hookStrength: number;
      retentionPotential: number;
      monetizationPotential: number;
      viralityExplanation: string;
    };
    calendar?: string;
    roadmap?: string;
    facelessVersion?: string;
  };
  featureSet: FeatureSet;
}

export default function ContentOutput({ content, featureSet }: ContentOutputProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="bg-gradient-to-r from-chart-1 to-chart-2 mb-2">
          <Sparkles className="w-3 h-3 mr-1.5" />
          Content Generated
        </Badge>
        <h2 className="text-2xl font-bold">Your Viral Content Strategy</h2>
      </div>

      {/* Hooks */}
      {featureSet.hooks && content.hooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-chart-1" />
              Scroll-Stopping Hooks
            </CardTitle>
            <CardDescription>Under 8 seconds spoken - grab attention instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {content.hooks.map((hook, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="flex-shrink-0">#{index + 1}</Badge>
                    <p className="text-sm leading-relaxed">{hook}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scripts */}
      {featureSet.scripts ? (
        content.scripts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-chart-2" />
                Original Scripts
              </CardTitle>
              <CardDescription>30-45 second engaging content scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.scripts.map((script, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-chart-2">Script {index + 1}</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{script}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Full Scripts" requiredTier="Pro" />
      )}

      {/* Captions */}
      {featureSet.captions ? (
        content.captions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-chart-4" />
                Engagement Captions
              </CardTitle>
              <CardDescription>Ready-to-use captions for your posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {content.captions.map((caption, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm leading-relaxed">{caption}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Engagement Captions" requiredTier="Pro" />
      )}

      {/* Hashtags */}
      {featureSet.hashtags ? (
        content.hashtags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-chart-5" />
                Hashtag Clusters
              </CardTitle>
              <CardDescription>Optimized hashtag sets for maximum reach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {content.hashtags.map((cluster, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <Badge variant="outline" className="mb-2">Cluster {index + 1}</Badge>
                    <p className="text-sm text-chart-5 font-mono">{cluster}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Hashtag Clusters" requiredTier="Pro" />
      )}

      {/* Content Score */}
      {featureSet.contentScore ? (
        <ContentScoreCard scores={content.scores} />
      ) : (
        <UpgradePrompt feature="Content Performance Scores" requiredTier="Pro" />
      )}

      {/* Monetization Angles */}
      {featureSet.monetizationAngles > 0 ? (
        content.monetizationAngles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-chart-4" />
                Monetization Angles
              </CardTitle>
              <CardDescription>Revenue opportunities for your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.monetizationAngles.slice(0, Number(featureSet.monetizationAngles)).map((angle, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <Badge className="mb-2 bg-chart-4">Angle {index + 1}</Badge>
                    <p className="text-sm leading-relaxed">{angle}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Monetization Angles" requiredTier="Pro" />
      )}

      {/* Psychological Triggers & Pain Points */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-chart-3" />
              Psychological Triggers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{content.psychTriggers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-chart-2" />
              Audience Pain Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.painPoints.map((point, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-chart-2 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Posting Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-chart-1" />
            Posting Frequency Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{content.postingRecommendation}</p>
        </CardContent>
      </Card>

      {/* 7-Day Calendar (Elite) */}
      {featureSet.calendar ? (
        content.calendar && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-chart-5" />
                7-Day Content Calendar
              </CardTitle>
              <CardDescription>Your personalized posting schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content.calendar}</p>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="7-Day Content Calendar" requiredTier="Elite" />
      )}

      {/* Roadmap (Elite) */}
      {featureSet.roadmap ? (
        content.roadmap && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-chart-4" />
                Niche Domination Roadmap
              </CardTitle>
              <CardDescription>Strategic plan for long-term growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content.roadmap}</p>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Niche Domination Roadmap" requiredTier="Elite" />
      )}

      {/* Faceless Version (Elite) */}
      {featureSet.facelessVersion ? (
        content.facelessVersion && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-chart-2" />
                Faceless Content Adaptation
              </CardTitle>
              <CardDescription>Alternative version for faceless content creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content.facelessVersion}</p>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <UpgradePrompt feature="Faceless Content Adaptation" requiredTier="Elite" />
      )}

      <Separator className="my-8" />
      <LegalDisclaimer />
    </div>
  );
}
