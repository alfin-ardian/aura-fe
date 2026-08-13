import { Card } from "@/components/ui/card";

export function RecommendationCard({
  item,
}: {
  item: { name: string; reason: string; timeOfDay?: string };
  className?: string;
}) {
  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-neutral-500">{item.reason}</p>
    </Card>
  );
}
