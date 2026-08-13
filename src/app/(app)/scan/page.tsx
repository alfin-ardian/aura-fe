import { Suspense } from "react";
import { PublicScanClient } from "./scan-client";

export default function PublicScanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500">
          Loading scan…
        </div>
      }
    >
      <PublicScanClient />
    </Suspense>
  );
}
