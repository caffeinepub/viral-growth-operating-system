import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface ContentScoreCardProps {
  hookStrength: number;
  retentionPotential: number;
  monetizationPotential: number;
  viralityExplanation?: string;
}

export default function ContentScoreCard({
  hookStrength,
  retentionPotential,
  monetizationPotential,
  viralityExplanation,
}: ContentScoreCardProps) {
  const scores = [
    { label: 'Hook Strength', value: hookStrength },
    { label: 'Retention Potential', value: retentionPotential },
    { label: 'Monetization Potential', value: monetizationPotential },
  ];

  const average = Math.round((hookStrength + retentionPotential + monetizationPotential) / 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="w-4 h-4 text-primary" />
          Content Score
          <span className="ml-auto text-2xl font-bold text-primary">{average}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {scores.map((score, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{score.label}</span>
              <span className="font-medium">{score.value}/100</span>
            </div>
            <Progress value={score.value} className="h-2" />
          </div>
        ))}
        {viralityExplanation && (
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
            {viralityExplanation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
