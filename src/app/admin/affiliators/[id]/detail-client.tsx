"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Printer } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { InvoicePdfPreviewModal } from "@/components/billing/invoice-pdf-preview-modal";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { localeDateTag } from "@/i18n/affiliate-ui";
import { useLocale } from "@/i18n/locale-provider";
import { cn, formatIdr } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import {
  affiliatorService,
  type AffiliatorDashboard,
} from "@/services/affiliator.service";
import { buildPublicScanLink } from "@/services/analytics.service";
import type { InvoiceDetail } from "@/services/billing.service";

type TabId =
  | "info"
  | "products"
  | "leads"
  | "plan"
  | "invoices"
  | "earnings";

export function AdminAffiliatorDetailClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { locale } = useLocale();
  const dateTag = localeDateTag(locale);

  const [data, setData] = useState<AffiliatorDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabId>("info");
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(
    null,
  );

  const t =
    locale === "ko"
      ? {
          back: "목록으로",
          title: "파트너 상세",
          loading: "상세 불러오는 중...",
          errorTitle: "상세를 불러올 수 없습니다",
          errorDescription: "파트너를 찾을 수 없거나 API에 접근할 수 없습니다.",
          tabs: {
            info: "상세 정보",
            products: "등록 제품",
            leads: "리드 목록",
            plan: "이용 패키지",
            invoices: "청구서",
            earnings: "수익",
          },
          email: "이메일",
          status: "상태",
          joined: "가입일",
          updated: "업데이트",
          referral: "추천 링크",
          copy: "복사",
          copied: "복사됨",
          active: "활성",
          inactive: "비활성",
          scans: "총 스캔",
          matches: "제품 매칭",
          matchRate: "매칭률",
          revenue: "매출",
          products: "제품",
          invoices: "청구서",
          emptyProducts: "등록된 제품이 없습니다.",
          emptyLeads: "리드가 없습니다.",
          emptyInvoices: "청구서가 없습니다.",
          print: "인쇄",
          colActions: "작업",
          emptyPlan: "활성 패키지가 없습니다.",
          emptyEarnings: "수익 데이터가 없습니다.",
          colProduct: "제품",
          colBrand: "브랜드",
          colCategory: "카테고리",
          colStatus: "상태",
          colGuest: "게스트",
          colSummary: "요약",
          colDate: "날짜",
          colInvoice: "번호",
          colPlan: "패키지",
          colMethod: "수단",
          colAmount: "금액",
          plan: "패키지",
          price: "가격",
          usage: "사용률",
          period: "기간",
          earningsTrend: "월별 수익",
          totalEarnings: "총 수익",
          guest: "게스트",
        }
      : locale === "en"
        ? {
            back: "Back to list",
            title: "Affiliator detail",
            loading: "Loading detail...",
            errorTitle: "Detail unavailable",
            errorDescription: "Affiliator not found or API is unavailable.",
            tabs: {
              info: "Profile info",
              products: "Products added",
              leads: "Leads",
              plan: "Package",
              invoices: "Invoices",
              earnings: "Earnings",
            },
            email: "Email",
            status: "Status",
            joined: "Joined",
            updated: "Updated",
            referral: "Referral link",
            copy: "Copy",
            copied: "Copied",
            active: "Active",
            inactive: "Inactive",
            scans: "Total scans",
            matches: "Product matches",
            matchRate: "Match rate",
            revenue: "Revenue",
            products: "Products",
            invoices: "Invoices",
            emptyProducts: "No products yet.",
            emptyLeads: "No leads yet.",
            emptyInvoices: "No invoices yet.",
            print: "Print",
            colActions: "Actions",
            emptyPlan: "No active package.",
            emptyEarnings: "No earnings data yet.",
            colProduct: "Product",
            colBrand: "Brand",
            colCategory: "Category",
            colStatus: "Status",
            colGuest: "Guest",
            colSummary: "Summary",
            colDate: "Date",
            colInvoice: "Number",
            colPlan: "Package",
            colMethod: "Method",
            colAmount: "Amount",
            plan: "Package",
            price: "Price",
            usage: "Usage",
            period: "Period",
            earningsTrend: "Monthly earnings",
            totalEarnings: "Total earnings",
            guest: "Guest",
          }
        : {
            back: "Kembali ke daftar",
            title: "Detail afiliator",
            loading: "Memuat detail...",
            errorTitle: "Detail tidak tersedia",
            errorDescription: "Afiliator tidak ditemukan atau API belum tersedia.",
            tabs: {
              info: "Detail informasi",
              products: "Produk ditambahkan",
              leads: "List lead",
              plan: "Paket diambil",
              invoices: "Invoice",
              earnings: "Pendapatan",
            },
            email: "Email",
            status: "Status",
            joined: "Bergabung",
            updated: "Diperbarui",
            referral: "Link referral",
            copy: "Salin",
            copied: "Tersalin",
            active: "Aktif",
            inactive: "Nonaktif",
            scans: "Total scan",
            matches: "Produk match",
            matchRate: "Match rate",
            revenue: "Pendapatan",
            products: "Produk",
            invoices: "Invoice",
            emptyProducts: "Belum ada produk.",
            emptyLeads: "Belum ada lead.",
            emptyInvoices: "Belum ada invoice.",
            print: "Cetak",
            colActions: "Aksi",
            emptyPlan: "Belum ada paket aktif.",
            emptyEarnings: "Belum ada data pendapatan.",
            colProduct: "Produk",
            colBrand: "Brand",
            colCategory: "Kategori",
            colStatus: "Status",
            colGuest: "Tamu",
            colSummary: "Ringkasan",
            colDate: "Tanggal",
            colInvoice: "Nomor",
            colPlan: "Paket",
            colMethod: "Metode",
            colAmount: "Jumlah",
            plan: "Paket",
            price: "Harga",
            usage: "Usage",
            period: "Periode",
            earningsTrend: "Pendapatan bulanan",
            totalEarnings: "Total pendapatan",
            guest: "Tamu",
          };

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "info", label: t.tabs.info },
    { id: "products", label: t.tabs.products },
    { id: "leads", label: t.tabs.leads },
    { id: "plan", label: t.tabs.plan },
    { id: "invoices", label: t.tabs.invoices },
    { id: "earnings", label: t.tabs.earnings },
  ];

  const load = useCallback(async () => {
    const dashboard = await affiliatorService.getDashboard(id);
    setData(dashboard);
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (cancelled) return;
      setReady(ok);
      if (!ok) {
        setLoading(false);
        toast.error(t.errorTitle);
        return;
      }
      try {
        await load();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t.errorTitle);
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load, t.errorTitle]);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.earnings.months.map((month) => ({
      label: /^\d{4}-\d{2}$/.test(month.key)
        ? new Date(`${month.key}-01T00:00:00`).toLocaleDateString(dateTag, {
            month: "short",
            year: "numeric",
          })
        : month.label,
      total: month.total,
    }));
  }, [data, dateTag]);

  const copyLink = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(buildPublicScanLink(data.account.id));
      toast.success(t.copied);
    } catch {
      toast.error(t.copy);
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.loading}</p>
    );
  }

  if (!ready || !data) {
    return (
      <ErrorState
        title={t.errorTitle}
        description={t.errorDescription}
        onRetry={() => {
          setLoading(true);
          void load().finally(() => setLoading(false));
        }}
      />
    );
  }

  const account = data.account;
  const displayName = account.name?.trim() || account.email.split("@")[0];
  const maxTotal = Math.max(...chartData.map((item) => item.total), 1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin/affiliators"
            className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            ← {t.back}
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">
            {displayName}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {t.title}
          </p>
        </div>
        <Badge variant={account.isActive ? "success" : "default"}>
          {account.isActive ? t.active : t.inactive}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.scans}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">
            {data.summary.totalScans.toLocaleString(dateTag)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.matches}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">
            {data.summary.totalMatches.toLocaleString(dateTag)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.products}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">
            {data.summary.productCount.toLocaleString(dateTag)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.revenue}</p>
          <p className="mt-2 text-2xl font-semibold dark:text-white">
            {formatIdr(data.summary.revenueTotal)}
          </p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              tab === item.id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <Card className="space-y-4 p-5 sm:p-6">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">{t.email}</dt>
              <dd className="mt-0.5 font-medium dark:text-white">{account.email}</dd>
            </div>
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">{t.status}</dt>
              <dd className="mt-0.5 font-medium dark:text-white">
                {account.isActive ? t.active : t.inactive}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">{t.joined}</dt>
              <dd className="mt-0.5 font-medium dark:text-white">
                {new Date(account.createdAt).toLocaleDateString(dateTag, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">{t.updated}</dt>
              <dd className="mt-0.5 font-medium dark:text-white">
                {new Date(account.updatedAt).toLocaleDateString(dateTag, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.referral}</p>
            <p className="mt-2 break-all rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              {buildPublicScanLink(account.id)}
            </p>
            <button
              type="button"
              onClick={() => void copyLink()}
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-3")}
            >
              {t.copy}
            </button>
          </div>
        </Card>
      ) : null}

      {tab === "products" ? (
        <Card className="overflow-hidden p-0">
          {data.products.length === 0 ? (
            <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
              {t.emptyProducts}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">{t.colProduct}</th>
                    <th className="px-5 py-3 font-medium">{t.colBrand}</th>
                    <th className="px-5 py-3 font-medium">{t.colCategory}</th>
                    <th className="px-5 py-3 font-medium">{t.colStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <ProductThumb src={product.imageUrl} alt={product.name} />
                          <span className="min-w-0 truncate font-medium dark:text-white">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-neutral-600 dark:text-neutral-300">
                        {product.brand}
                      </td>
                      <td className="px-5 py-3">
                        <Badge>{product.subcategory || product.category}</Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={product.isActive ? "success" : "default"}>
                          {product.isActive ? t.active : t.inactive}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ) : null}

      {tab === "leads" ? (
        <Card className="overflow-hidden p-0">
          {data.leads.length === 0 ? (
            <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
              {t.emptyLeads}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">{t.colGuest}</th>
                    <th className="px-5 py-3 font-medium">{t.colSummary}</th>
                    <th className="px-5 py-3 font-medium">{t.colDate}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <td className="px-5 py-3 font-medium dark:text-white">
                        {lead.guestName || t.guest}
                      </td>
                      <td className="px-5 py-3 text-neutral-600 dark:text-neutral-300">
                        {lead.undertone} · {lead.faceShape}
                        {lead.topProduct ? ` · ${lead.topProduct}` : ""}
                      </td>
                      <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                        {new Date(lead.createdAt).toLocaleDateString(dateTag, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ) : null}

      {tab === "plan" ? (
        !data.subscription ? (
          <Card>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.emptyPlan}</p>
          </Card>
        ) : (
          <Card className="space-y-5 p-5 sm:p-6">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">{t.plan}</p>
                <p className="mt-1 text-lg font-semibold dark:text-white">
                  {data.subscription.planName}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">{t.price}</p>
                <p className="mt-1 text-lg font-semibold dark:text-white">
                  {formatIdr(data.subscription.priceIdr)}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-neutral-500 dark:text-neutral-400">{t.period}</p>
                <p className="mt-1 font-medium dark:text-white">
                  {new Date(data.subscription.periodStart).toLocaleDateString(dateTag, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  –{" "}
                  {new Date(data.subscription.periodEnd).toLocaleDateString(dateTag, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">{t.usage}</span>
                <span className="font-medium dark:text-white">
                  {data.subscription.usagePercent}% ·{" "}
                  {data.subscription.used.toLocaleString(dateTag)} /{" "}
                  {data.subscription.quota.toLocaleString(dateTag)}
                </span>
              </div>
              <ProgressBar value={data.subscription.usagePercent} />
            </div>
          </Card>
        )
      ) : null}

      {tab === "invoices" ? (
        <Card className="overflow-hidden p-0">
          {data.invoices.length === 0 ? (
            <p className="px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400">
              {t.emptyInvoices}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">{t.colInvoice}</th>
                    <th className="px-5 py-3 font-medium">{t.colPlan}</th>
                    <th className="px-5 py-3 font-medium">{t.colMethod}</th>
                    <th className="px-5 py-3 font-medium">{t.colDate}</th>
                    <th className="px-5 py-3 font-medium text-right">{t.colAmount}</th>
                    <th className="px-5 py-3 font-medium text-right">{t.colActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <td className="px-5 py-3 font-medium dark:text-white">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-5 py-3 text-neutral-600 dark:text-neutral-300">
                        {invoice.planName}
                      </td>
                      <td className="px-5 py-3 uppercase text-neutral-600 dark:text-neutral-300">
                        {invoice.method}
                      </td>
                      <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                        {new Date(
                          invoice.paidAt ?? invoice.createdAt,
                        ).toLocaleDateString(dateTag, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3 text-right font-medium dark:text-white">
                        {formatIdr(invoice.total)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setPdfOpen(true);
                          }}
                        >
                          <Printer className="h-3.5 w-3.5" />
                          {t.print}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ) : null}

      {tab === "earnings" ? (
        <div className="space-y-4">
          <Card>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.totalEarnings}
            </p>
            <p className="mt-2 text-2xl font-semibold dark:text-white">
              {formatIdr(data.earnings.total)}
            </p>
          </Card>
          <Card className="p-5 sm:p-6">
            <h2 className="mb-4 font-semibold dark:text-white">{t.earningsTrend}</h2>
            {chartData.every((item) => item.total === 0) ? (
              <p className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                {t.emptyEarnings}
              </p>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#737373", fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={56}
                      tick={{ fill: "#737373", fontSize: 12 }}
                      tickFormatter={(value: number) =>
                        value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
                      }
                      domain={[0, Math.ceil(maxTotal * 1.15)]}
                    />
                    <Tooltip
                      formatter={(value) => formatIdr(Number(value ?? 0))}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #e5e5e5",
                        boxShadow: "none",
                      }}
                    />
                    <Bar dataKey="total" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>
      ) : null}

      <InvoicePdfPreviewModal
        open={pdfOpen}
        invoice={selectedInvoice}
        onClose={() => {
          setPdfOpen(false);
          setSelectedInvoice(null);
        }}
      />
    </div>
  );
}

function ProductThumb({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-[10px] text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
        No img
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-xl bg-neutral-100 object-cover dark:bg-neutral-800"
    />
  );
}
