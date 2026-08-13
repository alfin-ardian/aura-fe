"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

const inputClassName =
  "mt-1 min-h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500";

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block text-sm">
      <span className="font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <span className="relative mt-1 block">
        <input
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${inputClassName} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-neutral-400 transition hover:text-neutral-700 dark:hover:text-neutral-200"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

export default function RegisterAffiliatorPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim() || !password || !confirmPassword) {
      toast.error("Semua field wajib diisi");
      return;
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("Password minimal 8 karakter, harus ada huruf dan angka");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }
    setLoading(true);
    try {
      const result = await authService.registerAffiliator({
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        password,
      });
      toast.success(result.message);
      router.push(`/activate-account?email=${encodeURIComponent(result.email)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registrasi gagal");
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
          Jadi Afiliator
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Buat akun partner AuraAI. Kami akan kirim email untuk mengaktifkan akun.
        </p>

        <form onSubmit={(event) => void submit(event)} className="mt-8 space-y-4 text-left">
          <label className="block text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">Nama</span>
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama lengkap"
              className={inputClassName}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@email.com"
              className={inputClassName}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">WhatsApp</span>
            <input
              type="tel"
              autoComplete="tel"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              placeholder="08xxxxxxxxxx"
              className={inputClassName}
            />
          </label>
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Minimal 8 karakter, huruf + angka"
            autoComplete="new-password"
          />
          <PasswordField
            label="Konfirmasi password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Ulangi password"
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Daftar Afiliator"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-black underline-offset-2 hover:underline dark:text-white"
          >
            Masuk
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="transition hover:text-black dark:hover:text-white">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
