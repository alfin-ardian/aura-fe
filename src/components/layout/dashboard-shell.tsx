"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Package,
  Receipt,
  ScanFace,
  Settings,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { DashboardNavKey } from "@/constants";
import { getStoredUser } from "@/lib/auth-storage";
import { authService } from "@/services/auth.service";
import { usageService } from "@/services/usage.service";
import { useLocale } from "@/i18n/locale-provider";
import type { AuthUser } from "@/types";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_KEY = "aura_sidebar_collapsed";
const PLAN_ONBOARDING_PATHS = ["/affiliate/plans", "/affiliate/checkout"];

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, IconComponent> = {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Link2,
  Package,
  ScanFace,
  User,
  Activity,
  Gauge,
  CreditCard,
  Receipt,
  Wallet,
  KeyRound,
};

type NavItem = {
  label?: string;
  labelKey?: DashboardNavKey;
  href: string;
  icon: string;
};

interface DashboardShellProps {
  title?: string;
  titleKey?: "affiliate" | "admin";
  nav: readonly NavItem[];
  children: React.ReactNode;
  requiredRole: AuthUser["role"];
}

export function DashboardShell(props: DashboardShellProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
          Loading workspace...
        </div>
      }
    >
      <DashboardShellInner {...props} />
    </Suspense>
  );
}

function DashboardShellInner({
  title,
  titleKey,
  nav,
  children,
  requiredRole,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const shellTitle =
    titleKey === "affiliate"
      ? t.dashboard.affiliate
      : titleKey === "admin"
        ? t.dashboard.admin
        : title ?? "";

  const resolveNavLabel = (item: NavItem) =>
    item.labelKey ? t.dashboard.nav[item.labelKey] : (item.label ?? "");

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) {
      const query = searchParams.toString();
      const next = `${pathname}${query ? `?${query}` : ""}`;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
      return;
    }
    if (stored.role !== requiredRole) {
      router.replace(authService.redirectPath(stored));
      return;
    }
    setUser(stored);
  }, [pathname, requiredRole, router, searchParams]);

  useEffect(() => {
    if (!user || requiredRole !== "AFFILIATOR") return;
    if (PLAN_ONBOARDING_PATHS.some((path) => pathname.startsWith(path))) return;

    let cancelled = false;
    (async () => {
      const ok = await authService.ensureAffiliateApiSession();
      if (!ok || cancelled) return;
      try {
        const usage = await usageService.getDashboard();
        if (!cancelled && !usage.planId) {
          router.replace("/affiliate/plans");
        }
      } catch {
        // Leave page accessible if usage API fails; pages show their own errors.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, pathname, requiredRole, router]);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const toggleCollapsed = () => {
    setCollapsed((value) => {
      const next = !value;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await authService.logout();
    router.push("/login");
  };

  const isActive = (href: string) =>
    pathname === href || (href !== nav[0]?.href && pathname.startsWith(href));

  const profileHref =
    nav.find((item) => item.href.endsWith("/profile"))?.href ??
    (requiredRole === "AFFILIATOR" ? "/affiliate/profile" : null);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
        {t.workspace.loading}
      </div>
    );
  }

  const renderNav = (iconOnly: boolean) => (
    <nav className="flex-1 space-y-0.5 px-2" aria-label={shellTitle}>
      {nav.map((item) => {
        const Icon = icons[item.icon] ?? LayoutDashboard;
        const active = isActive(item.href);
        const label = resolveNavLabel(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            title={iconOnly ? label : undefined}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition",
              iconOnly && "justify-center px-0",
              active
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className={cn(iconOnly && "sr-only")}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const desktopSidebar = (
    <>
      <div
        className={cn(
          "flex h-14 items-center",
          collapsed ? "justify-center px-2" : "px-3",
        )}
      >
        <Logo
          href={nav[0]?.href ?? "/"}
          compact
          showWordmark={!collapsed}
        />
      </div>
      {!collapsed ? (
        <div className="px-3 pb-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            {shellTitle}
          </p>
        </div>
      ) : null}
      {renderNav(collapsed)}
      <div
        className={cn(
          "mt-auto border-t border-neutral-200 p-2 dark:border-neutral-800",
          collapsed && "flex justify-center",
        )}
      >
        <button
          type="button"
          onClick={toggleCollapsed}
          className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg text-neutral-600 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
          aria-label={
            collapsed ? t.workspace.expandSidebar : t.workspace.collapseSidebar
          }
          title={
            collapsed ? t.workspace.expandSidebar : t.workspace.collapseSidebar
          }
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="text-xs">{t.workspace.collapseSidebar}</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-neutral-200 bg-white transition-[width] duration-200 ease-out lg:flex dark:border-neutral-800 dark:bg-neutral-950",
          collapsed ? "w-14" : "w-56",
        )}
      >
        {desktopSidebar}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label={t.workspace.closeMenu}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-64 max-w-[85vw] flex-col border-r border-neutral-200 bg-white shadow-xl transition-transform duration-200 ease-out dark:border-neutral-800 dark:bg-neutral-950",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between px-3">
            <Logo href={nav[0]?.href ?? "/"} compact />
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              aria-label={t.workspace.closeMenu}
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-3 pb-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {shellTitle}
            </p>
          </div>
          {renderNav(false)}
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-neutral-200 bg-white/90 px-3 backdrop-blur sm:px-5 dark:border-neutral-800 dark:bg-neutral-950/90">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 lg:hidden dark:border-neutral-700 dark:text-neutral-300"
              aria-label={t.workspace.openMenu}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
            <p className="truncate text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {shellTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="h-8 w-8" />
            <LanguageSwitcher />
            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label={t.workspace.profile}
                onClick={() => setProfileOpen((v) => !v)}
                className="inline-flex h-8 max-w-[10rem] items-center gap-2 rounded-full border border-neutral-200 bg-white pl-1 pr-2.5 text-left transition hover:bg-neutral-50 sm:max-w-[14rem] dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white dark:bg-white dark:text-black">
                  {(user.name?.[0] ?? "U").toUpperCase()}
                </span>
                <span className="hidden min-w-0 sm:block">
                  <span className="block truncate text-xs font-medium leading-tight">
                    {user.name}
                  </span>
                </span>
              </button>

              {profileOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
                >
                  <div className="border-b border-neutral-100 px-3 py-2.5 dark:border-neutral-800">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                      {user.email}
                    </p>
                  </div>
                  {profileHref ? (
                    <Link
                      href={profileHref}
                      role="menuitem"
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="h-3.5 w-3.5" />
                      {t.workspace.profile}
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 transition hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {t.workspace.signOut}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
