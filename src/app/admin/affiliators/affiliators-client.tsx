"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { localeDateTag } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  affiliatorService,
  type AffiliatorAccount,
} from "@/services/affiliator.service";

export function AdminAffiliatorsClient() {
  const { locale } = useLocale();
  const dateTag = localeDateTag(locale);
  const [items, setItems] = useState<AffiliatorAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const labels =
    locale === "ko"
      ? {
          title: "파트너 목록",
          subtitle: "파트너 계정을 관리합니다.",
          add: "파트너 추가",
          loading: "불러오는 중...",
          empty: "파트너가 없습니다.",
          errorTitle: "파트너를 연결할 수 없습니다",
          errorDescription: "Affiliator API에 접근할 수 없습니다.",
          colName: "이름",
          colEmail: "이메일",
          colJoined: "가입일",
          colStatus: "상태",
          colActions: "작업",
          active: "활성",
          inactive: "비활성",
          detail: "상세",
        }
      : locale === "en"
        ? {
            title: "Affiliators",
            subtitle: "Manage partner accounts.",
            add: "Add affiliator",
            loading: "Loading...",
            empty: "No affiliators yet.",
            errorTitle: "Affiliators not connected",
            errorDescription: "Affiliator API is unavailable.",
            colName: "Name",
            colEmail: "Email",
            colJoined: "Joined",
            colStatus: "Status",
            colActions: "Actions",
            active: "Active",
            inactive: "Inactive",
            detail: "Detail",
          }
        : {
            title: "Afiliator",
            subtitle: "Kelola akun partner.",
            add: "Tambah afiliator",
            loading: "Memuat...",
            empty: "Belum ada afiliator.",
            errorTitle: "Afiliator belum terhubung",
            errorDescription: "API afiliator belum bisa diakses.",
            colName: "Nama",
            colEmail: "Email",
            colJoined: "Bergabung",
            colStatus: "Status",
            colActions: "Aksi",
            active: "Aktif",
            inactive: "Nonaktif",
            detail: "Detail",
          };

  const load = useCallback(async () => {
    const rows = await affiliatorService.list();
    setItems(rows);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error(labels.errorTitle);
        return;
      }
      try {
        await load();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : labels.errorTitle);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, labels.errorTitle]);

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{labels.loading}</p>
    );
  }

  if (!ready) {
    return (
      <ErrorState
        title={labels.errorTitle}
        description={labels.errorDescription}
        onRetry={() => {
          setLoading(true);
          void load().finally(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {labels.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {labels.subtitle}
          </p>
        </div>
        <Button type="button" disabled>
          {labels.add}
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        {items.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
            {labels.empty}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="px-5 py-3 font-medium">{labels.colName}</th>
                  <th className="px-5 py-3 font-medium">{labels.colEmail}</th>
                  <th className="px-5 py-3 font-medium">{labels.colJoined}</th>
                  <th className="px-5 py-3 font-medium">{labels.colStatus}</th>
                  <th className="px-5 py-3 font-medium text-right">{labels.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="px-5 py-3 font-medium text-black dark:text-white">
                      {row.name?.trim() || row.email.split("@")[0]}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {row.email}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {new Date(row.createdAt).toLocaleDateString(dateTag, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={row.isActive ? "success" : "default"}>
                        {row.isActive ? labels.active : labels.inactive}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/affiliators/${row.id}`}
                        className={cn(
                          buttonVariants({ variant: "secondary", size: "sm" }),
                        )}
                      >
                        {labels.detail}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
