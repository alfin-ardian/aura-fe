"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  invoicePdfBlob,
  invoicePdfFilename,
} from "@/lib/invoice-pdf";
import { useAffiliateUi } from "@/i18n/affiliate-ui";
import type { InvoiceDetail } from "@/services/billing.service";
import { cn } from "@/lib/utils";

interface InvoicePdfPreviewModalProps {
  open: boolean;
  invoice: InvoiceDetail | null;
  onClose: () => void;
}

export function InvoicePdfPreviewModal({
  open,
  invoice,
  onClose,
}: InvoicePdfPreviewModalProps) {
  const ui = useAffiliateUi().invoices;
  const [url, setUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !invoice) {
      setUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setError(null);
      return;
    }

    try {
      const blob = invoicePdfBlob(invoice);
      const next = URL.createObjectURL(blob);
      setError(null);
      setUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return next;
      });
      return () => {
        URL.revokeObjectURL(next);
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal membuat PDF invoice";
      setError(message);
      setUrl(null);
      toast.error(message);
    }
  }, [open, invoice]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleDownload = () => {
    if (!invoice || !url) return;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = invoicePdfFilename(invoice);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const handlePrint = () => {
    if (!url) return;
    const frame = document.createElement("iframe");
    frame.style.position = "fixed";
    frame.style.right = "0";
    frame.style.bottom = "0";
    frame.style.width = "0";
    frame.style.height = "0";
    frame.style.border = "0";
    frame.src = url;
    document.body.appendChild(frame);
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(frame);
      }, 1000);
    };
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 dark:bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label={invoice ? `Preview ${invoice.invoiceNumber}` : "Preview invoice"}
      onClick={onClose}
    >
      <div
        className={cn(
          "flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-950",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {invoice ? `Preview · ${invoice.invoiceNumber}` : "Preview invoice"}
          </h2>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            {error ? (
              <div className="flex h-[40vh] items-center justify-center px-6 text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : url ? (
              <iframe
                title={ui.pdfPreviewTitle}
                src={url}
                className="h-[65vh] w-full bg-white"
              />
            ) : (
              <div className="flex h-[40vh] items-center justify-center text-sm text-neutral-500">
                {ui.preparingPdf}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            {ui.close}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={!url}
            onClick={handlePrint}
          >
            <Printer className="h-3.5 w-3.5" />
            {ui.print}
          </Button>
          <Button type="button" size="sm" disabled={!url} onClick={handleDownload}>
            <Download className="h-3.5 w-3.5" />
            {ui.downloadPdf}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
