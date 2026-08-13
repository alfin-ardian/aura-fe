"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/i18n/locale-provider";
import { getStoredUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types";

export default function AffiliateProfilePage() {
  const { t } = useLocale();
  const page = t.dashboard.pages.profile;
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight dark:text-white">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          {page.subtitle}
        </p>
      </div>

      <Card className="space-y-4">
        {[
          ["Name", user?.name ?? "—"],
          ["Email", user?.email ?? "—"],
          ["Role", user?.role ?? "—"],
          ["User ID", user?.id ?? "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="text-sm text-neutral-500">{label}</p>
            <p className="text-sm font-medium">{value}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
