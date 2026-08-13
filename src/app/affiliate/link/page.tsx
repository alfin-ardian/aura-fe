"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAffiliateUi } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { getStoredUser } from "@/lib/auth-storage";
import { buildPublicScanLink } from "@/services/analytics.service";

export default function AffiliateLinkPage() {
  const { t } = useLocale();
  const ui = useAffiliateUi().link;
  const page = t.dashboard.pages.link;
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (user?.id) setLink(buildPublicScanLink(user.id));
  }, []);

  const copy = async () => {
    if (!link) {
      toast.error(ui.loginAgain);
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success(ui.copySuccess);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(ui.copyFail);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {page.subtitle}
        </p>
      </div>

      <Card className="space-y-5">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {ui.publicLink}
          </p>
          <p className="mt-2 break-all rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
            {link || ui.loginRequired}
          </p>
        </div>
        <Button type="button" onClick={() => void copy()} disabled={!link}>
          {copied ? ui.copied : ui.copyLink}
        </Button>
        <div className="border-t border-neutral-200 pt-4 text-sm dark:border-neutral-800">
          <p className="font-medium text-black dark:text-white">{ui.howItWorks}</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-neutral-600 dark:text-neutral-300">
            {ui.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  );
}
