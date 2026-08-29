import React, { useState } from 'react';
import {
  X,
  BookOpenCheck,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Shield,
  Sparkles,
  Printer,
  FileCheck,
} from 'lucide-react';
import { ADMIN_CHECKLIST } from '../data/portalData';
import { Breadcrumb } from './Breadcrumb';
import { downloadTeachingDocument } from '../utils/downloadHelper';

interface AdminModuleModalProps {
  moduleId: string | null;
  onClose: () => void;
  onOpenQuickJournal: () => void;
}

export const AdminModuleModal: React.FC<AdminModuleModalProps> = ({
  moduleId,
  onClose,
  onOpenQuickJournal,
}) => {
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  if (!moduleId) return null;

  const item = ADMIN_CHECKLIST.find((m) => m.id === moduleId);
  if (!item) return null;

  const handleDownloadDoc = (docTitle: string, className: string) => {
    downloadTeachingDocument(docTitle, item.category, className);
    setDownloadNotification(`Dokumen "${docTitle}" berhasil diunduh.`);
    setTimeout(() => setDownloadNotification(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bento-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 relative space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Administrasi', sectionId: 'administrasi', onClick: onClose },
            { label: item.title, active: true },
          ]}
          onNavigateHome={onClose}
        />

        {/* Header with Icon & Badges */}
        <div className="flex items-start gap-4 pr-8">
          <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/80 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
            <BookOpenCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                {item.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{item.lastUpdated}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Status and summary */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Status Verifikasi Pengawas & Kepala Sekolah:
            </span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                item.status === 'Lengkap'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {item.status === 'Lengkap' ? '🟢 Terverifikasi Lengkap' : '🟡 Sedang Berjalan'}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Feedback Alert if Downloaded */}
        {downloadNotification && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{downloadNotification}</span>
          </div>
        )}

        {/* List of files / sub-modules with REAL DOWNLOAD */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500" />
            <span>Daftar Berkas Perangkat ({item.documentCount} Dokumen Tersedia)</span>
          </h4>

          <div className="space-y-2">
            {/* File 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.title} — Fase E (Kelas X DKV & Informatika)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Format: Dokumen Resmi Kurikulum Merdeka • TA 2025/2026
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleDownloadDoc(
                    `${item.title} - Fase E X DKV & Informatika`,
                    'Fase E / Kelas X'
                  )
                }
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Dokumen</span>
              </button>
            </div>

            {/* File 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.title} — Fase F (Kelas XI DKV Kejuruan)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Format: Dokumen Resmi Kurikulum Merdeka • TA 2025/2026
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleDownloadDoc(`${item.title} - Fase F XI DKV`, 'Fase F / Kelas XI')
                }
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Dokumen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href="https://rpm.kangruli.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span>Buka di Portal RPM Cloud</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {item.id === 'jurnal' ? (
            <button
              onClick={() => {
                onClose();
                onOpenQuickJournal();
              }}
              className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Catat Jurnal Baru</span>
            </button>
          ) : (
            <button
              onClick={() =>
                handleDownloadDoc(`${item.title} - Master Arsip`, 'Kurikulum Merdeka 2026')
              }
              className="py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Paket Master</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
