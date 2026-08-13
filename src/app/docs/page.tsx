"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { resolveApiUrl } from "@/lib/api-url";
import { cn } from "@/lib/utils";

const API_BASE = resolveApiUrl();

type SectionId =
  | "intro"
  | "auth"
  | "keys"
  | "analyze"
  | "me"
  | "errors"
  | "whitelabel";

const SECTIONS: Array<{ id: SectionId; label: string; group: string }> = [
  { id: "intro", label: "About the API", group: "Introduction" },
  { id: "whitelabel", label: "White-label integration", group: "Introduction" },
  { id: "auth", label: "Authentication", group: "Getting started" },
  { id: "keys", label: "Create API keys", group: "Getting started" },
  { id: "analyze", label: "POST /v1/analyze", group: "AI service" },
  { id: "me", label: "GET /v1/me", group: "AI service" },
  { id: "errors", label: "Errors", group: "Reference" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-[#0B0B0C] p-4 text-[13px] leading-relaxed text-neutral-100 dark:border-neutral-800">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState<SectionId>("intro");
  const [jump, setJump] = useState("");

  const filtered = useMemo(() => {
    const q = jump.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.id.includes(q),
    );
  }, [jump]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof SECTIONS>();
    for (const item of filtered) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] dark:bg-neutral-950 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Logo compact />
            <nav className="hidden items-center gap-5 text-sm md:flex">
              <Link href="/" className="text-neutral-500 hover:text-black dark:hover:text-white">
                Home
              </Link>
              <span className="font-medium text-black underline decoration-[#F4A7BC] underline-offset-8 dark:text-white">
                API Reference
              </span>
              <Link
                href="/affiliate/api-keys"
                className="text-neutral-500 hover:text-black dark:hover:text-white"
              >
                API Keys
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href="/register"
              className="hidden rounded-full bg-[#1D1D1F] px-4 py-2 text-sm font-medium text-white sm:inline-flex dark:bg-white dark:text-black"
            >
              Get API access
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-neutral-200 px-4 py-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-neutral-200 dark:border-neutral-800">
          <label className="block">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-neutral-400">
              JUMP TO
            </span>
            <input
              value={jump}
              onChange={(event) => setJump(event.target.value)}
              placeholder="Search…"
              className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900"
            />
          </label>
          <div className="mt-6 space-y-6">
            {groups.map(([group, items]) => (
              <div key={group}>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-400">
                  {group.toUpperCase()}
                </p>
                <ul className="mt-2 space-y-1">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                          active === item.id
                            ? "bg-[#F8E7EF] font-medium text-[#1D1D1F] dark:bg-neutral-800 dark:text-white"
                            : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900",
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <main className="px-4 py-10 sm:px-8 lg:px-12 lg:py-12">
          {active === "intro" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">Introduction</p>
              <h1 className="text-4xl font-semibold tracking-tight">About the API Reference</h1>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                AuraAI Partner API memungkinkan brand / white-label menembak layanan analisis kulit
                kami langsung dari aplikasi mereka. Autentikasi memakai API key yang kami terbitkan
                ke akun afiliator.
              </p>
              <div className="rounded-2xl bg-gradient-to-r from-[#F8E7EF] to-[#EDE4F5] p-5 dark:from-neutral-900 dark:to-neutral-800">
                <p className="text-sm font-medium">Base URL</p>
                <p className="mt-1 font-mono text-sm">{API_BASE}</p>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  Semua endpoint white-label berada di bawah prefix <code>/v1</code>.
                </p>
              </div>
            </article>
          ) : null}

          {active === "whitelabel" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">Introduction</p>
              <h1 className="text-4xl font-semibold tracking-tight">White-label integration</h1>
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <li>Daftar sebagai afiliator AuraAI dan aktifkan akun via email.</li>
                <li>
                  Buat API key di{" "}
                  <Link href="/affiliate/api-keys" className="text-[#E879A9] underline">
                    Dashboard → API Keys
                  </Link>{" "}
                  (atau via <code>POST /api-keys</code>).
                </li>
                <li>
                  Kirim selfie pengguna ke <code>POST /v1/analyze</code> dengan header API key.
                </li>
                <li>Render hasil analisis di UI brand Anda (white-label).</li>
              </ol>
              <CodeBlock>{`curl -X POST "${API_BASE}/v1/analyze" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY" \\
  -F "image=@selfie.jpg"`}</CodeBlock>
            </article>
          ) : null}

          {active === "auth" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">Getting started</p>
              <h1 className="text-4xl font-semibold tracking-tight">Authentication</h1>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                Kirim API key pada setiap request partner:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                <li>
                  <code>Authorization: Bearer aura_…</code> (disarankan)
                </li>
                <li>
                  atau <code>X-API-Key: aura_…</code>
                </li>
              </ul>
              <CodeBlock>{`Authorization: Bearer aura_xxxxxxxxxxxxxxxx`}</CodeBlock>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Key hanya ditampilkan sekali saat dibuat. Simpan di server / secret manager — jangan
                expose di frontend publik.
              </p>
            </article>
          ) : null}

          {active === "keys" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">Getting started</p>
              <h1 className="text-4xl font-semibold tracking-tight">Create API keys</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Butuh JWT sesi afiliator (login dulu), lalu:
              </p>
              <CodeBlock>{`POST ${API_BASE}/api-keys
Authorization: Bearer <access_token>
Content-Type: application/json

{ "name": "Production app" }`}</CodeBlock>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Response (sekali saja):</p>
              <CodeBlock>{`{
  "id": "…",
  "name": "Production app",
  "keyPrefix": "aura_ab12cd…",
  "apiKey": "aura_…full_secret…",
  "warning": "Simpan API key ini sekarang…"
}`}</CodeBlock>
              <Link
                href="/affiliate/api-keys"
                className="inline-flex rounded-full bg-[#1D1D1F] px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                Buka pengelola API Keys →
              </Link>
            </article>
          ) : null}

          {active === "analyze" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">AI service</p>
              <h1 className="text-4xl font-semibold tracking-tight">POST /v1/analyze</h1>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                Analisis kulit dari selfie. Field multipart wajib: <code>image</code> (JPEG / PNG /
                WebP, max 10MB).
              </p>
              <CodeBlock>{`curl -X POST "${API_BASE}/v1/analyze" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY" \\
  -F "image=@face.jpg"`}</CodeBlock>
              <p className="text-sm font-medium">Example response</p>
              <CodeBlock>{`{
  "success": true,
  "data": {
    "partnerId": "uuid",
    "analysis": {
      "skinTone": "Fair",
      "undertone": "Cool",
      "faceShape": "Oval",
      "confidence": 0.82,
      "skinType": "Combination",
      "acne": 18,
      "oiliness": 44,
      "redness": 32,
      "concerns": [],
      "modelVersion": "auravision-s1-…"
    }
  }
}`}</CodeBlock>
            </article>
          ) : null}

          {active === "me" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">AI service</p>
              <h1 className="text-4xl font-semibold tracking-tight">GET /v1/me</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Validasi API key dan lihat identitas partner.
              </p>
              <CodeBlock>{`curl "${API_BASE}/v1/me" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY"`}</CodeBlock>
            </article>
          ) : null}

          {active === "errors" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">Reference</p>
              <h1 className="text-4xl font-semibold tracking-tight">Errors</h1>
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["401", "API key hilang / invalid / dicabut"],
                      ["400", "Validasi gagal (file kosong, format salah)"],
                      ["422", "Gambar tidak bisa diproses (mis. tidak ada wajah)"],
                      ["429", "Rate limit"],
                      ["500", "Error server / AI service"],
                    ].map(([code, meaning]) => (
                      <tr
                        key={code}
                        className="border-t border-neutral-200 dark:border-neutral-800"
                      >
                        <td className="px-4 py-3 font-mono">{code}</td>
                        <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                          {meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}
        </main>
      </div>
    </div>
  );
}
