import React from 'react';
import { Users, Clock, CheckCircle2, BookOpen, TrendingUp, RefreshCw } from 'lucide-react';
import { QUICK_STATS } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface BentoStatsProps {
  onOpenModule: (moduleId: string) => void;
}

export const BentoStats: React.FC<BentoStatsProps> = ({ onOpenModule }) => {
  const { isSyncing } = useRpmSync();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'Clock':
        return Clock;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'BookOpen':
        return BookOpen;
      default:
        return Users;
    }
  };

  const getModuleTarget = (statId: string) => {
    switch (statId) {
      case 'students':
        return 'siswa';
      case 'hours':
        return 'administrasi';
      case 'attendance':
        return 'presensi';
      case 'modules':
        return 'perangkat';
      default:
        return 'dashboard';
    }
  };

  return (
    <>
      {QUICK_STATS.map((stat, idx) => {
        const Icon = getIcon(stat.iconName);
        const isModuleCard = stat.id === 'modules';

        return (
          <div
            key={stat.id}
            id={`bento-stat-card-${stat.id}`}
            onClick={() => onOpenModule(getModuleTarget(stat.id))}
            className={`bento-card rounded-3xl p-5 relative overflow-hidden cursor-pointer hover:-translate-y-1 transition-all group ${
              isSyncing
                ? isModuleCard
                  ? 'widget-sync-pulse-amber ring-1 ring-amber-500/50'
                  : 'widget-sync-pulse-indigo ring-1 ring-indigo-500/30'
                : ''
            }`}
          >
            {/* Shimmer sweep effect during RPM sync */}
            {isSyncing && <div className="sync-shimmer-effect"></div>}

            <div className="flex items-start justify-between mb-3 relative z-10">
              <div
                className={`p-2.5 rounded-2xl transition-colors duration-300 shadow-inner ${
                  isSyncing && isModuleCard
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex items-center gap-1.5">
                {isSyncing ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin text-amber-400" />
                    <span>RPM</span>
                  </span>
                ) : (
                  stat.trend && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </h4>
                {stat.subValue && (
                  <span className="text-[11px] text-slate-400 font-medium truncate">
                    {stat.subValue}
                  </span>
                )}
              </div>
            </div>

            {/* Micro visual progress accent */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden relative z-10">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isSyncing ? 'animate-pulse' : ''
                } ${
                  idx === 0
                    ? 'bg-indigo-500 w-[85%]'
                    : idx === 1
                    ? 'bg-violet-500 w-[78%]'
                    : idx === 2
                    ? 'bg-emerald-400 w-[98%]'
                    : 'bg-amber-400 w-[90%]'
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

