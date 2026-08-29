import React from 'react';
import {
  Palette,
  Code2,
  ScanLine,
  BookOpenCheck,
  HelpCircle,
  CalendarDays,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Flame,
  RefreshCw,
  GraduationCap,
} from 'lucide-react';
import { LMS_LINKS } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface BentoLMSProps {
  onOpenModule: (moduleId: string) => void;
}

export const BentoLMS: React.FC<BentoLMSProps> = ({ onOpenModule }) => {
  const { isSyncing, syncProgress } = useRpmSync();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return Palette;
      case 'Code2':
        return Code2;
      case 'ScanLine':
        return ScanLine;
      case 'HelpCircle':
        return HelpCircle;
      case 'CalendarDays':
      case 'Calendar':
        return CalendarDays;
      case 'GraduationCap':
        return GraduationCap;
      case 'Layers':
        return Layers;
      case 'BookOpenCheck':
        return BookOpenCheck;
      default:
        return BookOpenCheck;
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Akses Cepat Learning Management System & Rencana Pembelajaran Mendalam (LMS / RPM)</span>
            {isSyncing && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                <span>Menyinkronkan RPM ({syncProgress}%)</span>
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400">
            Ekosistem platform digital pembelajaran, agenda kelas, & manajemen Rencana Pembelajaran Mendalam (RPM) terintegrasi aktif
          </p>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium self-start sm:self-auto">
          {LMS_LINKS.length} Sistem Terhubung
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {LMS_LINKS.map((lms) => {
          const Icon = getIcon(lms.icon);
          const isIndigo = lms.accentTheme === 'indigo';
          const isEmerald = lms.accentTheme === 'emerald';
          const isAmber = lms.accentTheme === 'amber';
          const isSky = lms.accentTheme === 'sky';
          const isRose = lms.accentTheme === 'rose' || lms.accentTheme === 'red';
          const isRpm = lms.id === 'rpm-kangruli';

          return (
            <div
              key={lms.id}
              id={`lms-card-${lms.id}`}
              className={`rounded-3xl p-5 relative overflow-hidden bento-card border transition-all duration-300 flex flex-col justify-between group ${
                isRpm && isSyncing
                  ? 'widget-sync-pulse-amber ring-2 ring-amber-500/60 shadow-amber-950/80 scale-[1.01]'
                  : isSyncing
                  ? 'widget-sync-pulse-indigo'
                  : ''
              } ${
                isAmber
                  ? 'border-amber-500/30 hover:border-amber-500/80 shadow-amber-950/40'
                  : isIndigo
                  ? 'border-indigo-500/30 hover:border-indigo-500/80 shadow-indigo-950/40'
                  : isEmerald
                  ? 'border-emerald-500/30 hover:border-emerald-500/80 shadow-emerald-950/40'
                  : isSky
                  ? 'border-sky-500/30 hover:border-sky-500/80 shadow-sky-950/40'
                  : isRose
                  ? 'border-rose-500/30 hover:border-rose-500/80 shadow-rose-950/40'
                  : 'border-violet-500/30 hover:border-violet-500/80 shadow-violet-950/40'
              }`}
            >
              {/* Shimmer sweep animation during RPM fetch */}
              {isSyncing && <div className="sync-shimmer-effect"></div>}

              {/* Background ambient light */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none ${
                  isSyncing ? 'opacity-50' : 'opacity-20 group-hover:opacity-40'
                } ${
                  isAmber
                    ? 'bg-amber-500'
                    : isIndigo
                    ? 'bg-indigo-500'
                    : isEmerald
                    ? 'bg-emerald-500'
                    : isSky
                    ? 'bg-sky-500'
                    : isRose
                    ? 'bg-rose-500'
                    : 'bg-violet-500'
                }`}
              ></div>

              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3.5 relative z-10">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                      isAmber
                        ? 'bg-gradient-to-tr from-amber-600 to-orange-500 shadow-amber-600/30'
                        : isIndigo
                        ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-indigo-600/30'
                        : isEmerald
                        ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-600/30'
                        : isSky
                        ? 'bg-gradient-to-tr from-sky-600 to-blue-500 shadow-sky-600/30'
                        : isRose
                        ? 'bg-gradient-to-tr from-rose-600 to-pink-500 shadow-rose-600/30'
                        : 'bg-gradient-to-tr from-violet-600 to-purple-500 shadow-violet-600/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isRpm && isSyncing ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 font-mono animate-pulse">
                        <RefreshCw className="w-2.5 h-2.5 animate-spin text-amber-400" />
                        <span>Syncing</span>
                      </span>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono ${
                            isAmber
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : isIndigo
                              ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                              : isEmerald
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : isSky
                              ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                              : 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                          }`}
                        >
                          {lms.badge}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
                    {lms.subject}
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors line-clamp-1">
                    {lms.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {lms.description}
                  </p>
                </div>

                {/* Micro Features list */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-1.5 relative z-10">
                  {lms.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isAmber
                            ? 'text-amber-400'
                            : isIndigo
                            ? 'text-indigo-400'
                            : isEmerald
                            ? 'text-emerald-400'
                            : isSky
                            ? 'text-sky-400'
                            : 'text-violet-400'
                        }`}
                      />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 flex items-center gap-2 relative z-10">
                <a
                  href={lms.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`open-lms-btn-${lms.id}`}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl text-white shadow-lg transition-all group-hover:shadow-indigo-500/20 ${
                    isAmber
                      ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25'
                      : isIndigo
                      ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
                      : isEmerald
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                      : isSky
                      ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/25'
                      : 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/25'
                  }`}
                >
                  <span className="truncate">Buka {lms.badge}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                </a>

                <button
                  onClick={() =>
                    onOpenModule(
                      lms.id === 'rpm-kangruli'
                        ? 'perangkat'
                        : lms.id === 'presensi-go'
                        ? 'presensi'
                        : 'bank-materi'
                    )
                  }
                  title="Detail Modul"
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

