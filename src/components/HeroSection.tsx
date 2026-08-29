import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpenCheck,
  Palette,
  Code2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Layers,
  MapPin,
  Clock,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';
import { LazyImage } from './LazyImage';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
  onOpenQuickJournal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo, onOpenQuickJournal }) => {
  const { isSyncing } = useRpmSync();

  return (
    <section id="hero" className="relative pt-4 pb-10 sm:py-12 overflow-hidden">
      {/* Decorative gradient blur backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-red-500/10 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Identity Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/60 text-xs font-semibold text-red-700 dark:text-red-300 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span>WEBSITE PRIBADI PENDIDIK PROFESIONAL 2026</span>
          </div>

          {/* Main Headline & Subheadline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Mendidik.{' '}
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-600 bg-clip-text text-transparent">
                Berkarya.
              </span>{' '}
              Berinovasi.
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 dark:text-slate-200">
              Ruli Lesmana, S.T. Gr.
              <span className="block text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400 mt-1">
                Pendidik Dasar-Dasar Desain Komunikasi Visual & Informatika
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Memadukan estetika desain visual, pemikiran komputasional, dan pedagogi berbasis teknologi untuk membimbing generasi muda yang kreatif, adaptif, mandiri, serta siap bersaing di panggung industri global.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-cta-profile"
              onClick={() => onScrollTo('profil')}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Jelajahi Profil</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-lms"
              onClick={() => onScrollTo('pembelajaran')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-sm border border-slate-800 dark:border-slate-700 flex items-center gap-2 transition-all"
            >
              <Palette className="w-4 h-4 text-red-400" />
              <span>Akses LMS</span>
            </button>

            <button
              id="hero-cta-admin"
              onClick={() => onScrollTo('administrasi')}
              className="px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold text-sm border border-amber-300 dark:border-amber-700/60 flex items-center gap-2 transition-all"
            >
              <BookOpenCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Administrasi Guru</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sertifikasi Pendidik Kemendikbud</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Kurikulum Merdeka Terintegrasi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>RPM Cloud Management</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Profile Bento Card */}
        <div className="lg:col-span-5">
          <div
            id="hero-profile-card"
            className={`bento-card rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all ${
              isSyncing ? 'widget-sync-pulse-amber' : ''
            }`}
          >
            {/* Sync Shimmer Overlay */}
            {isSyncing && <div className="sync-shimmer-effect" />}

            {/* School & Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2.5">
                <img
                  src={TEACHER_DATA.schoolLogoUrl}
                  alt={TEACHER_DATA.school}
                  className="w-7 h-7 rounded object-contain bg-white p-0.5 border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {TEACHER_DATA.school}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {TEACHER_DATA.institutionBranch}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-300/60 dark:border-emerald-700/60">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Online & Aktif</span>
              </div>
            </div>

            {/* Portrait & Core Meta */}
            <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
              <div className="relative group shrink-0">
                <LazyImage
                  src={TEACHER_DATA.avatarUrl}
                  alt={TEACHER_DATA.name}
                  wrapperClassName="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-red-500/80 shadow-lg"
                  className="w-full h-full object-cover"
                />
                <span className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-red-600 text-white shadow-md z-10">
                  <Award className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {TEACHER_DATA.name}
                </h3>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                  {TEACHER_DATA.degree}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  NIP. {TEACHER_DATA.nip}
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    8+ Th Pengalaman
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    214 Siswa Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <blockquote className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 text-xs italic text-slate-600 dark:text-slate-300 mb-5">
              "{TEACHER_DATA.quote}"
            </blockquote>

            {/* Direct Link to Official RPM */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <a
                href="https://rpm.kangruli.web.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <span>rpm.kangruli.web.id</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenQuickJournal}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>+ Catat Jurnal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
