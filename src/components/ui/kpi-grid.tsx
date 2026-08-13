import type { KpiCard } from "@/types";
import { Card } from "@/components/ui/card";

export function KpiGrid({ items }: { items: KpiCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="space-y-2">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.label}</p>
          <p className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {item.value}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">{item.hint}</p>
        </Card>
      ))}
    </div>
  );
}
