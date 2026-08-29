import React from 'react';
import {
  Palette,
  Code2,
  BookOpenCheck,
  ScanLine,
  HelpCircle,
  CalendarDays,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  RefreshCw,
  GraduationCap,
} from 'lucide-react';
import { LMS_LINKS, TODAY_SCHEDULE } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface LmsHubSectionProps {
  onOpenModule: (moduleId: string) => void;
  onOpenQuickJournal: () => void;
}

export const LmsHubSection: React.FC<LmsHubSectionProps> = ({
  onOpenModule,
  onOpenQuickJournal,
}) => {
  const { isSyncing, syncProgress } = useRpmSync();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-6 h-6 text-red-500" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-500" />;
      case 'ScanLine':
        return <ScanLine className="w-6 h-6 text-emerald-500" />;
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6 text-sky-500" />;
      case 'CalendarDays':
      case 'Calendar':
        return <CalendarDays className="w-6 h-6 text-emerald-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-teal-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-rose-500" />;
      default:
        return <BookOpenCheck className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="pembelajaran" className="py-10 space-y-8 text-left">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>LEARNING MANAGEMENT SYSTEM & HUB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ekosistem Ruang Belajar Digital
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Akses langsung ke seluruh platform kelas online, repositori modul ajar Kurikulum Merdeka, dan portal pemantauan aktivitas siswa secara real-time.
          </p>
        </div>

        {isSyncing && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-medium animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Sinkronisasi Data RPM ({syncProgress}%)</span>
          </div>
        )}
      </div>

      {/* Grid: 4 LMS Portal Cards + Live Schedule Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: 4 Connected LMS Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {LMS_LINKS.map((lms) => (
            <div
              key={lms.id}
              id={`lms-hub-${lms.id}`}
              className={`bento-card rounded-2xl p-6 flex flex-col justify-between space-y-4 group relative overflow-hidden transition-all hover:scale-[1.01] ${
                lms.id === 'rpm-kangruli' && isSyncing
                  ? 'widget-sync-pulse-amber'
                  : isSyncing
                  ? 'widget-sync-pulse-indigo'
                  : ''
              }`}
            >
              {isSyncing && <div className="sync-shimmer-effect" />}

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    {getIcon(lms.icon)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    {lms.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {lms.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {lms.subject}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {lms.description}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                  {lms.features.map((st, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2">
                <a
                  href={lms.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Akses {lms.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 cols: Live Schedule & Quick Teacher Journal Action */}
        <div className="lg:col-span-4 space-y-5">
          {/* Jadwal Hari Ini */}
          <div className="bento-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Jadwal Mengajar Hari Ini
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Senin
              </span>
            </div>

            <div className="space-y-3">
              {TODAY_SCHEDULE.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    item.isActiveNow
                      ? 'bg-red-50/80 dark:bg-red-950/40 border-red-300 dark:border-red-800 shadow-sm'
                      : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    {item.isActiveNow && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse">
                        ● Berlangsung
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.subject}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span>{item.className}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenQuickJournal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Input Jurnal Mengajar Hari Ini</span>
            </button>
          </div>

          {/* Cloud Info Banner */}
          <div className="bento-glass rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-amber-500" />
              <span>Sinkronisasi RPM Guru Otomatis</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Seluruh presensi, penilaian harian, dan jurnal tatap muka otomatis disinkronkan ke basis data cloud <strong>rpm.kangruli.web.id</strong> setiap 60 detik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
