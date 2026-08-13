"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { type DocsSectionId, useDocsUi } from "@/i18n/docs-ui";
import { resolveApiUrl } from "@/lib/api-url";
import { cn } from "@/lib/utils";

const API_BASE = resolveApiUrl();

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-[#0B0B0C] p-4 text-[13px] leading-relaxed text-neutral-100 dark:border-neutral-800">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  const ui = useDocsUi();
  const [active, setActive] = useState<DocsSectionId>("intro");
  const [jump, setJump] = useState("");

  const sections = useMemo(
    () => [
      { id: "intro" as const, label: ui.sections.intro, group: ui.groups.introduction },
      {
        id: "whitelabel" as const,
        label: ui.sections.whitelabel,
        group: ui.groups.introduction,
      },
      { id: "auth" as const, label: ui.sections.auth, group: ui.groups.gettingStarted },
      { id: "keys" as const, label: ui.sections.keys, group: ui.groups.gettingStarted },
      { id: "analyze" as const, label: ui.sections.analyze, group: ui.groups.aiService },
      { id: "me" as const, label: ui.sections.me, group: ui.groups.aiService },
      { id: "errors" as const, label: ui.sections.errors, group: ui.groups.reference },
    ],
    [ui],
  );

  type DocNavItem = (typeof sections)[number];

  const filtered = useMemo(() => {
    const q = jump.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.id.includes(q),
    );
  }, [jump, sections]);

  const groups = useMemo(() => {
    const map = new Map<string, DocNavItem[]>();
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
                {ui.navHome}
              </Link>
              <span className="font-medium text-black underline decoration-[#F4A7BC] underline-offset-8 dark:text-white">
                {ui.navApiReference}
              </span>
              <Link
                href="/affiliate/api-keys"
                className="text-neutral-500 hover:text-black dark:hover:text-white"
              >
                {ui.navApiKeys}
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
              {ui.getApiAccess}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-neutral-200 px-4 py-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-neutral-200 dark:border-neutral-800">
          <label className="block">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-neutral-400">
              {ui.jumpTo}
            </span>
            <input
              value={jump}
              onChange={(event) => setJump(event.target.value)}
              placeholder={ui.searchPlaceholder}
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
              <p className="text-sm font-medium text-[#E879A9]">{ui.intro.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.intro.title}</h1>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                {ui.intro.body}
              </p>
              <div className="rounded-2xl bg-gradient-to-r from-[#F8E7EF] to-[#EDE4F5] p-5 dark:from-neutral-900 dark:to-neutral-800">
                <p className="text-sm font-medium">{ui.intro.baseUrl}</p>
                <p className="mt-1 font-mono text-sm">{API_BASE}</p>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                  {ui.intro.prefixNote}
                </p>
              </div>
            </article>
          ) : null}

          {active === "whitelabel" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">{ui.whitelabel.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.whitelabel.title}</h1>
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <li>{ui.whitelabel.steps[0]}</li>
                <li>
                  {ui.whitelabel.steps[1].includes("POST /api-keys") ? (
                    <>
                      {ui.whitelabel.steps[1].split(ui.whitelabel.dashboardLink)[0]}
                      <Link href="/affiliate/api-keys" className="text-[#E879A9] underline">
                        {ui.whitelabel.dashboardLink}
                      </Link>
                      {ui.whitelabel.steps[1].split(ui.whitelabel.dashboardLink)[1]}
                    </>
                  ) : (
                    ui.whitelabel.steps[1]
                  )}
                </li>
                <li>{ui.whitelabel.steps[2]}</li>
                <li>{ui.whitelabel.steps[3]}</li>
              </ol>
              <CodeBlock>{`curl -X POST "${API_BASE}/v1/analyze" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY" \\
  -F "image=@selfie.jpg"`}</CodeBlock>
            </article>
          ) : null}

          {active === "auth" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">{ui.auth.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.auth.title}</h1>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {ui.auth.body}
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                <li>
                  <code>Authorization: Bearer aura_…</code>
                </li>
                <li>
                  <code>X-API-Key: aura_…</code>
                </li>
              </ul>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {ui.auth.bearer}
                <br />
                {ui.auth.xApiKey}
              </p>
              <CodeBlock>{`Authorization: Bearer aura_xxxxxxxxxxxxxxxx`}</CodeBlock>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{ui.auth.storeNote}</p>
            </article>
          ) : null}

          {active === "keys" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">{ui.keys.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.keys.title}</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{ui.keys.body}</p>
              <CodeBlock>{`POST ${API_BASE}/api-keys
Authorization: Bearer <access_token>
Content-Type: application/json

{ "name": "Production app" }`}</CodeBlock>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {ui.keys.responseOnce}
              </p>
              <CodeBlock>{`{
  "id": "…",
  "name": "Production app",
  "keyPrefix": "aura_ab12cd…",
  "apiKey": "aura_…full_secret…",
  "warning": "${ui.keys.warningExample}"
}`}</CodeBlock>
              <Link
                href="/affiliate/api-keys"
                className="inline-flex rounded-full bg-[#1D1D1F] px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                {ui.keys.openManager}
              </Link>
            </article>
          ) : null}

          {active === "analyze" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">{ui.analyze.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.analyze.title}</h1>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {ui.analyze.body}
              </p>
              <CodeBlock>{`curl -X POST "${API_BASE}/v1/analyze" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY" \\
  -F "image=@face.jpg"`}</CodeBlock>
              <p className="text-sm font-medium">{ui.analyze.exampleResponse}</p>
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
              <p className="text-sm font-medium text-[#E879A9]">{ui.me.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.me.title}</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{ui.me.body}</p>
              <CodeBlock>{`curl "${API_BASE}/v1/me" \\
  -H "Authorization: Bearer aura_YOUR_API_KEY"`}</CodeBlock>
            </article>
          ) : null}

          {active === "errors" ? (
            <article className="max-w-3xl space-y-6">
              <p className="text-sm font-medium text-[#E879A9]">{ui.errors.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight">{ui.errors.title}</h1>
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th className="px-4 py-3 font-medium">{ui.errors.status}</th>
                      <th className="px-4 py-3 font-medium">{ui.errors.meaning}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ui.errors.rows.map(([code, meaning]) => (
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
