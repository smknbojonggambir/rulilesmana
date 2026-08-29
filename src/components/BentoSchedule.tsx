import React from 'react';
import { Clock, Calendar, MapPin, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { TODAY_SCHEDULE } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface BentoScheduleProps {
  onOpenModule: (moduleId: string) => void;
}

export const BentoSchedule: React.FC<BentoScheduleProps> = ({ onOpenModule }) => {
  const { isSyncing } = useRpmSync();

  return (
    <div
      id="bento-schedule-tile"
      className={`col-span-1 md:col-span-2 lg:col-span-1 rounded-3xl p-6 bento-card border flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
        isSyncing
          ? 'widget-sync-pulse-indigo border-indigo-500/60 shadow-indigo-950/60'
          : 'border-indigo-500/20'
      }`}
    >
      {/* Shimmer effect during RPM sync */}
      {isSyncing && <div className="sync-shimmer-effect"></div>}

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold text-white tracking-tight">Jadwal Mengajar Hari Ini</h4>
          </div>
          {isSyncing ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              <RefreshCw className="w-2.5 h-2.5 animate-spin text-amber-400" />
              <span>RPM Sync</span>
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
              Senin
            </span>
          )}
        </div>

        <div className="space-y-3">
          {TODAY_SCHEDULE.map((item) => {
            const isLive = item.isActiveNow;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isLive
                    ? 'bg-gradient-to-r from-indigo-950/70 to-slate-900 border-indigo-500/50 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-semibold text-indigo-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {item.time}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Berlangsung'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                        : item.status === 'Selesai'
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-indigo-500/10 text-indigo-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white truncate">{item.subject}</h5>
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {item.className}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.topic}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.room}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between relative z-10">
        <button
          onClick={() => onOpenModule('administrasi')}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 transition"
        >
          <span>Buka Agenda Lengkap</span>
          <span>&rarr;</span>
        </button>
        <span className="text-[11px] text-slate-400 font-mono">3 Sesi Kelas</span>
      </div>
    </div>
  );
};

