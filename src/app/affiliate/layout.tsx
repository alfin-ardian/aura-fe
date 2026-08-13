import { AFFILIATE_NAV } from "@/constants";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      titleKey="affiliate"
      nav={AFFILIATE_NAV}
      requiredRole="AFFILIATOR"
    >
      {children}
    </DashboardShell>
  );
}
