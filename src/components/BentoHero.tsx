import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  GraduationCap,
  ArrowUpRight,
  ExternalLink,
  BookOpenCheck,
  Layers,
  Heart,
  RefreshCw,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface BentoHeroProps {
  onOpenModule: (moduleId: string) => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onOpenModule }) => {
  const { isSyncing, syncStep, syncProgress } = useRpmSync();

  return (
    <div
      id="bento-hero-section"
      className={`col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl p-6 sm:p-8 relative overflow-hidden bento-card border transition-all duration-500 group ${
        isSyncing
          ? 'widget-sync-pulse-indigo border-indigo-500/70 shadow-indigo-950/70'
          : 'border-indigo-500/25'
      }`}
    >
      {/* Shimmer sweep effect during RPM sync */}
      {isSyncing && <div className="sync-shimmer-effect"></div>}

      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 translate-y-12 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left column: Bio & Identity */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Portal Terpadu Pendidik & Kejuruan
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Aktif Mengajar TA 2025/2026
            </span>

            {isSyncing && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/40 animate-pulse shadow-sm shadow-amber-900/40">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                <span>RPM Live Sync ({syncProgress}%)</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
            <div className="relative flex-shrink-0">
              <div className="relative group">
                <img
                  src={TEACHER_DATA.avatarUrl}
                  alt={TEACHER_DATA.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-2xl shadow-indigo-600/30 transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1.5 -right-1.5 bg-indigo-600 text-white p-1.5 rounded-xl ring-2 ring-[#090D16] shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {TEACHER_DATA.name}
                </h3>
              </div>
              <p className="text-sm font-semibold text-indigo-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Guru Mata Pelajaran Dasar-Dasar DKV & Informatika</span>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>SMK Negeri Bojonggambir &bull; KCD Wilayah XII Jawa Barat</span>
              </p>
            </div>
          </div>

          {/* Teacher Philosophy Quote */}
          <div className="p-3.5 rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 backdrop-blur-sm">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &ldquo;{TEACHER_DATA.quote}&rdquo;
            </p>
          </div>

          {/* Quick interactive shortcuts */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="https://rpm.kangruli.web.id/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg transition-all group ${
                isSyncing
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-600/40 ring-2 ring-amber-400/80 animate-pulse'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-600/25'
              }`}
            >
              <BookOpenCheck className="w-4 h-4 text-amber-200" />
              <span>RPM Digital Kang Ruli</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => onOpenModule('perangkat')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all group"
            >
              <Layers className="w-4 h-4 text-indigo-200" />
              <span>Perangkat Ajar (16 Modul)</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onOpenModule('profil')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-200 text-xs font-medium transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Biodata & Sertifikasi</span>
            </button>
          </div>
        </div>

        {/* Right column: School Logo & Interactive Specs Box */}
        <div className="w-full lg:w-72 flex flex-col sm:flex-row lg:flex-col gap-3.5 flex-shrink-0">
          {/* School Badge Card */}
          <div className="flex-1 p-4 rounded-2xl bg-[#0E1626]/80 border border-indigo-500/20 backdrop-blur-md flex items-center gap-4">
            <img
              src={TEACHER_DATA.schoolLogoUrl}
              alt="Logo SMKN Bojonggambir"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/30 shadow-md flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                Lembaga Resmi
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">SMKN Bojonggambir</h4>
              <p className="text-[11px] text-slate-400">Tasikmalaya, Jawa Barat</p>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="flex-1 grid grid-cols-2 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-[10px] text-slate-400">Pengalaman</p>
              <p className="text-base font-extrabold text-white">{TEACHER_DATA.experienceYears}+ Tahun</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-[10px] text-slate-400">Sertifikasi</p>
              <p className="text-base font-extrabold text-emerald-400">Pendidik Gr.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

