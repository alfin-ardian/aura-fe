import { CheckoutClient } from "./checkout-client";

export default async function AffiliateCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }> | { plan?: string };
}) {
  const params = await Promise.resolve(searchParams);
  return <CheckoutClient planId={params.plan ?? "growth"} />;
}
