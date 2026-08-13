"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, Suspense, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { usageService } from "@/services/usage.service";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState((searchParams.get("email") ?? "").trim());
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      toast.success(`Masuk sebagai ${user.name}`);
      const next = searchParams.get("next");
      const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : null;

      if (user.role === "AFFILIATOR") {
        if (safeNext) {
          router.push(safeNext);
          return;
        }
        try {
          const usage = await usageService.getDashboard();
          router.push(usage.planId ? "/affiliate" : "/affiliate/plans");
        } catch {
          router.push("/affiliate/plans");
        }
        return;
      }

      router.push(authService.redirectPath(user));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-6">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-black dark:text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Masuk dengan email dan password akun AuraAI Anda.
        </p>

        <form onSubmit={(event) => void submit(event)} className="mt-8 space-y-4 text-left">
          <label className="block text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@email.com"
              className="mt-1 min-h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">
              Password
            </span>
            <span className="relative mt-1 block">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 8 karakter"
                className="min-h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 pr-11 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-neutral-400 transition hover:text-neutral-700 dark:hover:text-neutral-200"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </span>
          </label>
          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {loading ? "Masuk..." : "Masuk"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Belum punya akun afiliator?{" "}
          <Link
            href="/register"
            className="font-medium text-black underline-offset-2 hover:underline dark:text-white"
          >
            Daftar
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="/"
            className="transition hover:text-black dark:hover:text-white"
          >
            ← Back to landing
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
