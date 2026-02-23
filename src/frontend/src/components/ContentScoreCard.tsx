import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Eye, DollarSign } from 'lucide-react';

interface ContentScoreCardProps {
  scores: {
    hookStrength: number;
    retentionPotential: number;
    monetizationPotential: number;
    viralityExplanation: string;
  };
}

export default function ContentScoreCard({ scores }: ContentScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-chart-4';
    if (score >= 6) return 'text-chart-1';
    return 'text-chart-5';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-chart-1" />
          Content Performance Score
        </CardTitle>
        <CardDescription>AI-powered analysis of your content's potential</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Hook Strength</span>
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(scores.hookStrength)}`}>
              {scores.hookStrength}/10
            </span>
          </div>
          <Progress value={scores.hookStrength * 10} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Retention Potential</span>
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(scores.retentionPotential)}`}>
              {scores.retentionPotential}/10
            </span>
          </div>
          <Progress value={scores.retentionPotential * 10} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Monetization Potential</span>
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(scores.monetizationPotential)}`}>
              {scores.monetizationPotential}/10
            </span>
          </div>
          <Progress value={scores.monetizationPotential * 10} className="h-2" />
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-2">Virality Analysis</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {scores.viralityExplanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
