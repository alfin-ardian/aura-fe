import { Suspense } from "react";
import { AffiliateInvoicesClient } from "./invoices-client";

export default function AffiliateInvoicesPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Memuat invoices...
        </p>
      }
    >
      <AffiliateInvoicesClient />
    </Suspense>
  );
}
