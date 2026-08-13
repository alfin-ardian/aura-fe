import { jsPDF } from "jspdf";
import type { InvoiceDetail } from "@/services/billing.service";

function formatDate(iso: string | null) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** jsPDF default fonts are WinAnsi — keep currency ASCII-safe. */
function formatIdrPdf(value: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

export function buildInvoicePdf(invoice: InvoiceDetail): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("AuraAI", margin, y);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Invoice pembayaran paket scan", margin, y + 18);
  doc.setTextColor(0);

  y += 48;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(invoice.invoiceNumber, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 22;
  doc.text(`Status: ${invoice.status.toUpperCase()}`, margin, y);
  y += 16;
  doc.text(`Plan: ${invoice.planName}`, margin, y);
  y += 16;
  doc.text(`Metode: ${invoice.method.toUpperCase()}`, margin, y);
  y += 16;
  doc.text(`Dibayar: ${formatDate(invoice.paidAt)}`, margin, y);
  y += 16;
  doc.text(
    `Periode: ${formatDate(invoice.periodStart)} - ${formatDate(invoice.periodEnd)}`,
    margin,
    y,
  );

  y += 32;
  doc.setDrawColor(220);
  doc.line(margin, y, 595 - margin, y);
  y += 24;

  doc.setFont("helvetica", "bold");
  doc.text("Deskripsi", margin, y);
  doc.text("Jumlah", 595 - margin, y, { align: "right" });
  y += 14;
  doc.setDrawColor(230);
  doc.line(margin, y, 595 - margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  for (const line of invoice.lines) {
    const description = line.description.replace(/·/g, "-").replace(/–/g, "-");
    doc.text(description, margin, y);
    doc.text(formatIdrPdf(line.amount), 595 - margin, y, { align: "right" });
    y += 18;
  }

  y += 8;
  doc.line(margin, y, 595 - margin, y);
  y += 22;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", margin, y);
  doc.text(formatIdrPdf(invoice.total), 595 - margin, y, { align: "right" });

  y += 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Dokumen digenerate otomatis oleh AuraAI.",
    margin,
    y,
    { maxWidth: 500 },
  );

  return doc;
}

export function invoicePdfBlob(invoice: InvoiceDetail): Blob {
  return buildInvoicePdf(invoice).output("blob");
}

export function invoicePdfFilename(invoice: InvoiceDetail): string {
  return `${invoice.invoiceNumber}.pdf`;
}
