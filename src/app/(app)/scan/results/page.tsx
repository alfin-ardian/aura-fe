import { Suspense } from "react";
import { ScanResultsClient } from "./results-client";

export default function ScanResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500">
          Loading results…
        </div>
      }
    >
      <ScanResultsClient />
    </Suspense>
  );
}
