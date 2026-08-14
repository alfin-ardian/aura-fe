import { apiFetch } from "@/lib/api";
import type { UsagePlanId } from "@/services/usage.service";

export interface BillingOverview {
  planId: UsagePlanId | null;
  planName: string;
  priceIdr: number;
  priceLabel: string;
  quota: number;
  used: number;
  remaining: number;
  percent: number;
  periodStart: string;
  periodEnd: string;
  renewsAt: string;
  autoRenew: boolean;
  annualPromo: {
    enabled: boolean;
    title: string;
    body: string;
    savingsPercent: number;
    ctaLabel: string;
    ctaHref: string;
  };
  payment: {
    provider: string;
    methodLabel: string;
    status: string;
    last4: string | null;
    manageUrl: string | null;
  };
  includedUsage: Array<{
    item: string;
    allowance: string;
    usage: string;
    percent: number;
  }>;
  plans: Array<{
    id: UsagePlanId;
    name: string;
    priceIdr: number;
    scans: number;
    featured: boolean;
    contactSales?: boolean;
    description: string;
    active: boolean;
  }>;
}

export interface SpendingDashboard {
  monthToDate: number;
  previousMonth: number;
  currency: "IDR";
  projectedMonth: number;
  averagePerMonth: number;
  months: Array<{
    label: string;
    key: string;
    total: number;
    payments: number;
  }>;
  recent: Array<{
    id: string;
    invoiceNumber: string;
    planName: string;
    total: number;
    status: string;
    paidAt: string | null;
  }>;
}

export interface InvoiceListItem {
  id: string;
  invoiceNumber: string;
  planId: string;
  planName: string;
  method: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
  periodStart: string | null;
  periodEnd: string | null;
}

export interface InvoiceDetail extends InvoiceListItem {
  quota: number | null;
  lines: Array<{
    description: string;
    quantity: number;
    unitAmount: number;
    amount: number;
  }>;
}

export const billingService = {
  getBilling() {
    return apiFetch<BillingOverview>("/billing");
  },

  getSpending() {
    return apiFetch<SpendingDashboard>("/billing/spending");
  },

  listInvoices() {
    return apiFetch<{ items: InvoiceListItem[] }>("/billing/invoices");
  },

  getInvoice(invoiceNumber: string) {
    return apiFetch<InvoiceDetail>(
      `/billing/invoices/${encodeURIComponent(invoiceNumber)}`,
    );
  },

  getPlatformFinance() {
    return apiFetch<PlatformFinanceDashboard>("/billing/finance");
  },

  getPlatformFinanceReport() {
    return apiFetch<PlatformFinanceReport>("/billing/finance/report");
  },
};

export interface PlatformFinanceRow {
  affiliatorId: string;
  name: string;
  email: string;
  isActive: boolean;
  planId: string | null;
  planName: string;
  priceIdr: number;
  quota: number;
  used: number;
  remaining: number;
  usagePercent: number;
  revenueTotal: number;
  paidInvoices: number;
  periodStart: string | null;
  periodEnd: string | null;
}

export interface PlatformFinanceDashboard {
  currency: "IDR";
  totalRevenue: number;
  affiliatorCount: number;
  items: PlatformFinanceRow[];
}

export interface FinanceReportBucket {
  key: string;
  label: string;
  total: number;
  payments: number;
}

export interface PlatformFinanceReport {
  currency: "IDR";
  months: FinanceReportBucket[];
  years: FinanceReportBucket[];
  byPlan: Array<{
    planId: string;
    planName: string;
    total: number;
    payments: number;
  }>;
  thisMonthTotal: number;
  thisYearTotal: number;
}
