export const APP_NAME = "AuraAI";
export const APP_TAGLINE = "Personalized Beauty, Made for You";
export const APP_SUPPORTING =
  "Turn a simple selfie into personalized skin insights with AI-powered facial analysis.";

export const TOKEN_KEYS = {
  user: "aura_user",
  accessToken: "aura_access_token",
  refreshToken: "aura_refresh_token",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export type DashboardNavKey =
  | "overview"
  | "referralLink"
  | "products"
  | "scanLeads"
  | "analytics"
  | "usage"
  | "spending"
  | "billing"
  | "invoices"
  | "apiKeys"
  | "affiliators"
  | "finance"
  | "settings"
  | "profile";

export const ADMIN_NAV = [
  { labelKey: "overview" as const, href: "/admin", icon: "LayoutDashboard" },
  { labelKey: "affiliators" as const, href: "/admin/affiliators", icon: "Users" },
  { labelKey: "finance" as const, href: "/admin/finance", icon: "Wallet" },
  { labelKey: "settings" as const, href: "/admin/settings", icon: "Settings" },
] as const;

export const AFFILIATE_NAV = [
  { labelKey: "overview" as const, href: "/affiliate", icon: "LayoutDashboard" },
  { labelKey: "products" as const, href: "/affiliate/products", icon: "Package" },
  { labelKey: "scanLeads" as const, href: "/affiliate/leads", icon: "ScanFace" },
  { labelKey: "analytics" as const, href: "/affiliate/analytics", icon: "BarChart3" },
  { labelKey: "apiKeys" as const, href: "/affiliate/api-keys", icon: "KeyRound" },
  { labelKey: "usage" as const, href: "/affiliate/usage", icon: "Activity" },
  { labelKey: "spending" as const, href: "/affiliate/spending", icon: "Gauge" },
  { labelKey: "billing" as const, href: "/affiliate/billing", icon: "CreditCard" },
  { labelKey: "invoices" as const, href: "/affiliate/invoices", icon: "Receipt" },
] as const;
