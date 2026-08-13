import { ADMIN_NAV } from "@/constants";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell titleKey="admin" nav={ADMIN_NAV} requiredRole="SUPER_ADMIN">
      {children}
    </DashboardShell>
  );
}
