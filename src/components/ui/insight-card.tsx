import { Card } from "@/components/ui/card";

export function InsightCard({
  insight,
}: {
  insight: { title: string; body: string; confidence: number; reasons: string[] };
  className?: string;
}) {
  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">{insight.title}</h3>
      <p className="text-sm text-neutral-500">{insight.body}</p>
      <p className="text-xs text-neutral-400">Confidence {insight.confidence}%</p>
    </Card>
  );
}
