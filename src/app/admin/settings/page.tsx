import { Card } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Workspace preferences (dummy, no API).
        </p>
      </div>
      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <div>
            <p className="font-medium">Data source</p>
            <p className="text-sm text-neutral-500">Using local dummy datasets</p>
          </div>
          <span className="text-sm font-medium">Dummy</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Role</p>
            <p className="text-sm text-neutral-500">Super Admin</p>
          </div>
          <span className="text-sm font-medium">SUPER_ADMIN</span>
        </div>
      </Card>
    </div>
  );
}
