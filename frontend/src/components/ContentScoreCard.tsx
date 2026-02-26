import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface ContentScoreCardProps {
  hookStrength: number;
  retentionPotential: number;
  monetizationPotential: number;
  viralityExplanation?: string;
}

function getScoreColor(value: number): string {
  if (value >= 75) return 'text-[oklch(0.72_0.22_140)]'; // lime green — high
  if (value >= 50) return 'text-[oklch(0.80_0.22_90)]';  // vivid yellow — medium
  return 'text-primary'; // electric orange — improving
}

function getProgressClass(value: number): string {
  if (value >= 75) return '[&>div]:bg-[oklch(0.72_0.22_140)]';
  if (value >= 50) return '[&>div]:bg-[oklch(0.80_0.22_90)]';
  return '[&>div]:bg-primary';
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
    <Card className="border-[oklch(0.55_0.22_250/0.3)] hover:border-[oklch(0.55_0.22_250/0.5)] transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold">
          <div className="w-6 h-6 rounded-lg bg-[oklch(0.55_0.22_250/0.15)] flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-[oklch(0.55_0.22_250)]" />
          </div>
          Content Score
          <span className={`ml-auto text-2xl font-extrabold ${getScoreColor(average)}`}>{average}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scores.map((score, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground font-medium">{score.label}</span>
              <span className={`font-bold ${getScoreColor(score.value)}`}>{score.value}/100</span>
            </div>
            <Progress value={score.value} className={`h-2.5 rounded-full ${getProgressClass(score.value)}`} />
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
