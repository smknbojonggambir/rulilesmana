import React from 'react';
import { CertificateItem } from '../types';
import { Award, ShieldCheck, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';

interface CertificateVisualCardProps {
  cert: CertificateItem;
  variant?: 'thumbnail' | 'full';
}

export const CertificateVisualCard: React.FC<CertificateVisualCardProps> = ({
  cert,
  variant = 'thumbnail',
}) => {
  const isFull = variant === 'full';

  // Determine styling theme based on category & issuer
  const getTheme = () => {
    if (cert.issuer.includes('Google for Education') || cert.title.includes('Gemini')) {
      return {
        border: 'border-sky-500/70 dark:border-sky-400/60',
        bgGradient: 'from-blue-50/90 via-sky-50/40 to-indigo-50/80 dark:from-slate-900 dark:via-sky-950/30 dark:to-slate-900',
        badgeBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white',
        headerText: 'GOOGLE FOR EDUCATION',
        subHeader: 'PENDIDIK TERKUALIFIKASI GOOGLE AI (GEMINI CERTIFIED EDUCATOR)',
        titleDoc: 'PENDIDIK TERSERTIFIKASI GEMINI',
        sealType: 'google',
        themeColor: '#0284c7',
      };
    }
    if (cert.category === 'Sertifikat Pendidik') {
      return {
        border: 'border-emerald-600/60 dark:border-emerald-500/50',
        bgGradient: 'from-amber-50/90 via-emerald-50/40 to-amber-50/90 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900',
        badgeBg: 'bg-emerald-700 text-white',
        headerText: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI',
        subHeader: 'REPUBLIK INDONESIA',
        titleDoc: 'SERTIFIKAT PENDIDIK',
        sealType: 'kemdikbud',
        themeColor: '#047857',
      };
    }
    if (cert.category === 'Sertifikasi Asesor') {
      return {
        border: 'border-emerald-700/60 dark:border-emerald-600/50',
        bgGradient: 'from-emerald-50/90 via-white to-emerald-50/90 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900',
        badgeBg: 'bg-emerald-800 text-white',
        headerText: 'BADAN AKREDITASI NASIONAL PENDIDIKAN (BAN-PDM)',
        subHeader: 'REPUBLIK INDONESIA',
        titleDoc: cert.title.includes('Asesor') ? 'SERTIFIKAT ASESOR' : 'SERTIFIKAT AKREDITASI',
        sealType: 'banpdm',
        themeColor: '#065f46',
      };
    }
    if (cert.issuer.includes('Microsoft') || cert.title.includes('Microsoft')) {
      return {
        border: 'border-blue-600/60 dark:border-blue-500/50',
        bgGradient: 'from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900',
        badgeBg: 'bg-blue-600 text-white',
        headerText: cert.issuer.includes('Kementerian Agama')
          ? 'KEMENTERIAN AGAMA RI & MICROSOFT INDONESIA'
          : cert.issuer.includes('Alkademi')
          ? 'ALKADEMI & MICROSOFT INDONESIA'
          : 'MICROSOFT ELEVATE SKILLS & AI PATHWAY',
        subHeader: 'MICROSOFT ELEVATE AI TRAINING SESSION',
        titleDoc: cert.title.includes('Badge') ? 'BADGE OF COMPLETION' : 'CERTIFICATE OF COMPLETION',
        sealType: 'tech',
        themeColor: '#2563eb',
      };
    }
    if (cert.issuer.includes('Universitas Negeri Surabaya') || cert.issuer.includes('UNESA')) {
      return {
        border: 'border-teal-600/60 dark:border-teal-500/50',
        bgGradient: 'from-teal-50/80 via-white to-amber-50/50 dark:from-slate-900 dark:via-teal-950/30 dark:to-slate-900',
        badgeBg: 'bg-teal-700 text-white',
        headerText: 'UNIVERSITAS NEGERI SURABAYA (UNESA)',
        subHeader: 'LEMBAGA PENELITIAN DAN PENGABDIAN KEPADA MASYARAKAT (LPPM)',
        titleDoc: 'SERTIFIKAT SARASEHAN LITERASI',
        sealType: 'unesa',
        themeColor: '#0f766e',
      };
    }
    if (cert.issuer.includes('Deepublish')) {
      return {
        border: 'border-amber-600/60 dark:border-amber-500/50',
        bgGradient: 'from-amber-50/80 via-white to-orange-50/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900',
        badgeBg: 'bg-amber-600 text-white',
        headerText: 'PENERBIT DEEPUBLISH & DEEPUBLISH STORE',
        subHeader: 'WEBINAR NASIONAL MANAJEMEN ARSIP & PERPUSTAKAAN',
        titleDoc: 'SERTIFIKAT WEBINAR NASIONAL',
        sealType: 'deepublish',
        themeColor: '#d97706',
      };
    }
    if (cert.category === 'Kecerdasan Buatan & AI' || cert.issuer.includes('Dicoding')) {
      return {
        border: 'border-blue-600/60 dark:border-blue-500/50',
        bgGradient: 'from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900',
        badgeBg: 'bg-blue-600 text-white',
        headerText: 'DICODING INDONESIA & GOOGLE DEVELOPERS',
        subHeader: 'GLOBAL SKILLS & AI PATHWAY CERTIFICATE',
        titleDoc: 'CERTIFICATE OF COMPLETION',
        sealType: 'tech',
        themeColor: '#2563eb',
      };
    }
    if (cert.issuer.includes('Jawa Barat') || cert.issuer.includes('BPSDM')) {
      return {
        border: 'border-amber-600/60 dark:border-amber-500/50',
        bgGradient: 'from-amber-50/80 via-white to-amber-50/80 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900',
        badgeBg: 'bg-amber-700 text-white',
        headerText: 'PEMERINTAH DAERAH PROVINSI JAWA BARAT',
        subHeader: 'BADAN PENGEMBANGAN SUMBER DAYA MANUSIA',
        titleDoc: 'SERTIFIKAT KOMPETENSI',
        sealType: 'jabar',
        themeColor: '#b45309',
      };
    }
    if (cert.category === 'Inklusi & Literasi') {
      return {
        border: 'border-teal-600/60 dark:border-teal-500/50',
        bgGradient: 'from-teal-50/80 via-white to-sky-50/70 dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-900',
        badgeBg: 'bg-teal-700 text-white',
        headerText: 'DIREKTORAT JENDERAL GURU & TENAGA KEPENDIDIKAN',
        subHeader: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI',
        titleDoc: 'SERTIFIKAT BIMTEK INKLUSIF',
        sealType: 'kemdikbud',
        themeColor: '#0f766e',
      };
    }
    return {
      border: 'border-purple-600/60 dark:border-purple-500/50',
      bgGradient: 'from-purple-50/70 via-white to-indigo-50/60 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900',
      badgeBg: 'bg-purple-700 text-white',
      headerText: 'DIKLAT NASIONAL PENDIDIK INDONESIA',
      subHeader: 'PENGEMBANGAN PROFESIONAL BERKELANJUTAN',
      titleDoc: 'SERTIFIKAT PELATIHAN',
      sealType: 'edu',
      themeColor: '#7e22ce',
    };
  };

  const theme = getTheme();

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border-2 ${theme.border} bg-gradient-to-br ${theme.bgGradient} p-4 sm:p-6 shadow-md transition-all select-none`}
      style={{
        aspectRatio: isFull ? '16/11' : '16/10',
      }}
    >
      {/* Ornate Certificate Frame Pattern */}
      <div className="absolute inset-2 sm:inset-3 border border-slate-300/80 dark:border-slate-700/60 rounded-lg pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-dashed border-slate-300/50 dark:border-slate-700/40 rounded-md pointer-events-none" />

      {/* Decorative Corner Flourishes */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600/70 dark:border-amber-400/70 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600/70 dark:border-amber-400/70 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600/70 dark:border-amber-400/70 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600/70 dark:border-amber-400/70 rounded-br-sm pointer-events-none" />

      {/* Background Guilloche / Security Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] dark:opacity-[0.07] pointer-events-none">
        <Award className="w-64 h-64 text-current" />
      </div>

      {/* Certificate Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between text-center">
        {/* Top Header & Emblem */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1.5 text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900/10 dark:bg-white/10 flex items-center justify-center text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-500 dark:text-slate-400 block uppercase">
                  RESMI & TERVERIFIKASI
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                  {cert.year}
                </span>
              </div>
            </div>

            {cert.durationHours && (
              <span className="text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 font-mono">
                {cert.durationHours.includes('JP') || cert.durationHours.includes('Jam') || cert.durationHours.includes('Hours')
                  ? cert.durationHours.split('(')[0].trim()
                  : 'Sertifikasi Resmi'}
              </span>
            )}
          </div>

          <div className="pt-1.5">
            <p className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400 leading-tight">
              {theme.headerText}
            </p>
            <h4 className="text-xs sm:text-sm md:text-base font-black tracking-wider text-slate-900 dark:text-white mt-0.5">
              {theme.titleDoc}
            </h4>
            {cert.credentialId && (
              <p className="text-[8px] sm:text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                No: {cert.credentialId.split('(')[0].trim()}
              </p>
            )}
          </div>
        </div>

        {/* Center Recipient Section */}
        <div className="py-2 space-y-1">
          <p className="text-[8px] sm:text-[10px] italic text-slate-500 dark:text-slate-400">
            Diberikan kepada / Awarded to:
          </p>
          <div className="relative inline-block px-4 py-1">
            <div className="text-sm sm:text-lg md:text-xl font-extrabold tracking-wide text-slate-900 dark:text-white font-serif underline decoration-amber-500 decoration-2 underline-offset-4">
              RULI LESMANA, S.T. Gr.
            </div>
          </div>
          <p className="text-[9px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 max-w-md mx-auto mt-1">
            {cert.title}
          </p>
        </div>

        {/* Footer Meta: Issuer, Signatory, and QR Verification */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex items-end justify-between text-left">
          <div className="space-y-0.5 max-w-[65%]">
            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400 block">
              Penerbit / Penyelenggara:
            </span>
            <p className="text-[8px] sm:text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
              {cert.issuer}
            </p>
            {cert.signatory && (
              <p className="text-[7px] sm:text-[9px] text-slate-500 dark:text-slate-400 italic line-clamp-1">
                {cert.signatory}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[7px] font-mono text-slate-400 block">Digital Verification</span>
              <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> VALID
              </span>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-slate-950 p-1 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-800 dark:text-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
