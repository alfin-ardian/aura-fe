"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  apiKeysService,
  type ApiKeyRow,
  type CreatedApiKey,
} from "@/services/api-keys.service";

export default function AffiliateApiKeysPage() {
  const [rows, setRows] = useState<ApiKeyRow[]>([]);
  const [name, setName] = useState("Production");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<CreatedApiKey | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await apiKeysService.list());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat API keys");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Nama key wajib diisi");
      return;
    }
    setCreating(true);
    try {
      const row = await apiKeysService.create(name.trim());
      setCreated(row);
      toast.success("API key dibuat — simpan sekarang");
      setName("Production");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal membuat key");
    } finally {
      setCreating(false);
    }
  };

  const onRevoke = async (id: string) => {
    if (!window.confirm("Cabut API key ini? Integrasi white-label akan berhenti.")) return;
    try {
      await apiKeysService.revoke(id);
      toast.success("API key dicabut");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mencabut key");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Untuk white-label: tembak{" "}
            <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">
              POST /v1/analyze
            </code>{" "}
            dengan key ini. Baca{" "}
            <Link href="/docs" className="text-[#E879A9] underline">
              dokumentasi API
            </Link>
            .
          </p>
        </div>
      </div>

      <form
        onSubmit={(event) => void onCreate(event)}
        className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-5 sm:flex-row sm:items-end dark:border-neutral-800"
      >
        <label className="block flex-1 text-sm">
          <span className="font-medium">Nama key</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#F4A7BC] dark:border-neutral-700 dark:bg-neutral-900"
            placeholder="Production app"
          />
        </label>
        <Button type="submit" className="rounded-full" disabled={creating}>
          {creating ? "Membuat..." : "Buat API key"}
        </Button>
      </form>

      {created ? (
        <div className="rounded-2xl border border-[#F4A7BC]/60 bg-[#FDF6F9] p-5 dark:border-[#F4A7BC]/30 dark:bg-neutral-900">
          <p className="text-sm font-medium text-[#9B6B8A]">{created.warning}</p>
          <p className="mt-3 break-all font-mono text-sm">{created.apiKey}</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 rounded-full"
            onClick={async () => {
              await navigator.clipboard.writeText(created.apiKey);
              toast.success("Disalin");
            }}
          >
            Salin key
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Prefix</th>
              <th className="px-4 py-3 font-medium">Terakhir dipakai</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-neutral-500">
                  Memuat…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-neutral-500">
                  Belum ada API key.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-neutral-200 dark:border-neutral-800"
                >
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.keyPrefix}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {row.lastUsedAt
                      ? new Date(row.lastUsedAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => void onRevoke(row.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Cabut
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
