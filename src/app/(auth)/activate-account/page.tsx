"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

function ActivateAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = (searchParams.get("email") ?? "").trim();
  const tokenParam = (searchParams.get("token") ?? "").trim();
  const [email, setEmail] = useState(emailParam);
  const [status, setStatus] = useState<"idle" | "activating" | "success" | "error">(
    tokenParam ? "activating" : "idle",
  );
  const [message, setMessage] = useState(
    tokenParam
      ? "Mengaktifkan akun..."
      : "Kami sudah mengirim email aktivasi. Buka inbox dan klik tautannya.",
  );
  const [resending, setResending] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!tokenParam || startedRef.current) return;
    startedRef.current = true;

    void (async () => {
      try {
        const result = await authService.activateAccount(tokenParam);
        setStatus("success");
        setMessage(result.message);
        setEmail(result.email);
        toast.success("Akun aktif");
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Aktivasi gagal");
        toast.error(error instanceof Error ? error.message : "Aktivasi gagal");
      }
    })();
  }, [tokenParam]);

  const resend = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Email wajib diisi");
      return;
    }
    setResending(true);
    try {
      const result = await authService.resendActivation(email.trim());
      toast.success(result.message);
      // New email has the real link; stay on waiting state (do not auto-consume token).
      setStatus("idle");
      setMessage(
        "Email aktivasi baru sudah dikirim. Cek inbox (dan folder spam), lalu klik tautannya.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal kirim ulang");
    } finally {
      setResending(false);
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
          Aktifkan akun
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {message}
        </p>

        {status === "success" ? (
          <div className="mt-8 space-y-4 text-left">
            <Button
              className="w-full rounded-full"
              onClick={() =>
                router.push(
                  email
                    ? `/login?email=${encodeURIComponent(email)}&next=${encodeURIComponent("/affiliate/plans")}`
                    : `/login?next=${encodeURIComponent("/affiliate/plans")}`,
                )
              }
            >
              Masuk sekarang
            </Button>
          </div>
        ) : (
          <form onSubmit={(event) => void resend(event)} className="mt-8 space-y-4 text-left">
            <label className="block text-sm">
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                Email pendaftaran
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                className="mt-1 min-h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
              />
            </label>
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={resending || status === "activating"}
            >
              {resending
                ? "Mengirim..."
                : status === "activating"
                  ? "Mengaktifkan..."
                  : "Kirim ulang email aktivasi"}
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/login" className="transition hover:text-black dark:hover:text-white">
            Ke halaman masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ActivateAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
          Loading...
        </div>
      }
    >
      <ActivateAccountForm />
    </Suspense>
  );
}
