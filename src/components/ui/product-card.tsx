import { Card } from "@/components/ui/card";

export function ProductCard({
  product,
}: {
  product: {
    brand: string;
    name: string;
    ingredient: string;
    matchScore: number;
    reason: string;
    usage: string;
    affiliateUrl?: string | null;
  };
  className?: string;
}) {
  return (
    <Card className="space-y-2">
      <p className="text-xs uppercase text-neutral-400">{product.brand}</p>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-neutral-500">{product.reason}</p>
    </Card>
  );
}
