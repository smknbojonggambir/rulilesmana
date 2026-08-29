import React, { useState } from 'react';
import {
  X,
  Award,
  Calendar,
  Clock,
  Building2,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  FileText,
  Share2,
  Copy,
  Check,
  Download,
  FileCheck,
} from 'lucide-react';
import { CertificateItem } from '../types';
import { CertificateVisualCard } from './CertificateVisualCard';
import { Breadcrumb } from './Breadcrumb';
import { downloadCertificateDocument } from '../utils/downloadHelper';

interface CertificateModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const [activeTab, setActiveTab] = useState<'keterangan' | 'kurikulum' | 'verifikasi'>('keterangan');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!cert) return null;

  const handleCopyId = () => {
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadCertificateDocument(cert.title, cert.issuer, cert.year, cert.category);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div
      id="certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0B1120] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                DOKUMEN SERTIFIKAT DIGITAL
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                {cert.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: 'Sertifikat & Lisensi', sectionId: 'sertifikat', onClick: onClose },
              { label: cert.title, active: true },
            ]}
            onNavigateHome={onClose}
          />

          {/* Visual Certificate Card Preview (Image representation) */}
          <div className="w-full max-w-2xl mx-auto shadow-xl rounded-xl overflow-hidden">
            <CertificateVisualCard cert={cert} variant="full" />
          </div>

          {/* Download & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Salinan Digital</span>
              </button>
              {cert.credentialId && (
                <button
                  onClick={handleCopyId}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'ID Tersalin' : 'Salin No. Kredensial'}</span>
                </button>
              )}
            </div>

            {downloadSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" />
                Sertifikat berhasil diunduh!
              </span>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('keterangan')}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'keterangan'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Keterangan Lengkap</span>
            </button>

            {cert.curriculumModules && cert.curriculumModules.length > 0 && (
              <button
                onClick={() => setActiveTab('kurikulum')}
                className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'kurikulum'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Struktur Kurikulum & Materi ({cert.curriculumModules.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('verifikasi')}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'verifikasi'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Legalitas & Verifikasi</span>
            </button>
          </div>

          {/* Tab Content: Keterangan */}
          {activeTab === 'keterangan' && (
            <div className="space-y-5 animate-fade-in text-left">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deskripsi & Ruang Lingkup Sertifikasi
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                  {cert.description}
                </p>
              </div>

              {/* Quick Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Building2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Lembaga Penerbit</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{cert.issuer}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Tahun Terbit & Masa Berlaku</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {cert.year} {cert.validUntil ? `(Berlaku s.d ${cert.validUntil})` : '(Seumur Hidup)'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Beban Jam Pelatihan (JP)</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {cert.durationHours || 'Setara Pelatihan Profesional'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Kompetensi Teruji & Keterampilan Terkait
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-red-500" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Kurikulum */}
          {activeTab === 'kurikulum' && cert.curriculumModules && (
            <div className="space-y-4 animate-fade-in text-left">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Struktur materi dan alokasi durasi yang diselesaikan dalam sertifikasi ini:
              </p>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {cert.curriculumModules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 bg-slate-50/50 dark:bg-slate-900/40 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {mod.moduleName}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {mod.description}
                        </p>
                      </div>
                    </div>
                    {mod.hours && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-bold shrink-0">
                        {mod.hours}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Verifikasi */}
          {activeTab === 'verifikasi' && (
            <div className="space-y-5 animate-fade-in text-left">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Nomor Registrasi / Kredensial:</span>
                  {cert.credentialId && (
                    <button
                      onClick={handleCopyId}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin!' : 'Salin Nomor'}</span>
                    </button>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-950 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 select-all">
                  {cert.credentialId || 'TERCATAT DALAM ARSIP RESMI LEMBAGA'}
                </div>

                {cert.signatory && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500 block mb-0.5">Pejabat Penandatangan:</span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {cert.signatory}
                    </p>
                  </div>
                )}
              </div>

              {cert.verificationUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                  <div>
                    <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Tautan Verifikasi Resmi
                    </h5>
                    <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 font-mono">
                      {cert.verificationUrl}
                    </p>
                  </div>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Cek Validitas</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Dokumen Resmi Pendidik — Ruli Lesmana, S.T. Gr.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
