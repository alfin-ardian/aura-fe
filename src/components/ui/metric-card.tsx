import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function MetricCard({
  metric,
}: {
  metric: {
    label: string;
    score: number;
    status: string;
    explanation: string;
  };
  className?: string;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-neutral-500">{metric.label}</p>
          <p className="mt-1 text-3xl font-semibold">{metric.score}</p>
        </div>
        <Badge>{metric.status}</Badge>
      </div>
      <ProgressBar value={metric.score} />
      <p className="text-sm text-neutral-500">{metric.explanation}</p>
    </Card>
  );
}
