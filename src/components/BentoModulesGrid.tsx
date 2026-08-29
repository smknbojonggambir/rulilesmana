import React from 'react';
import {
  FolderOpen,
  FileText,
  ClipboardCheck,
  BarChart3,
  Users,
  BookOpen,
  HelpCircle,
  Printer,
  Archive,
  Award,
  Settings,
  ArrowRight,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { ACADEMIC_MODULES } from '../data/portalData';
import { ModuleItem } from '../types';
import { useRpmSync } from '../context/RpmSyncContext';

interface BentoModulesGridProps {
  onOpenModule: (moduleId: string) => void;
  searchTerm?: string;
}

export const BentoModulesGrid: React.FC<BentoModulesGridProps> = ({
  onOpenModule,
  searchTerm = '',
}) => {
  const { isSyncing } = useRpmSync();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderOpen':
        return FolderOpen;
      case 'FileText':
        return FileText;
      case 'ClipboardCheck':
        return ClipboardCheck;
      case 'BarChart3':
        return BarChart3;
      case 'Users':
        return Users;
      case 'BookOpen':
        return BookOpen;
      case 'HelpCircle':
        return HelpCircle;
      case 'Printer':
        return Printer;
      case 'Archive':
        return Archive;
      case 'Award':
        return Award;
      case 'Settings':
        return Settings;
      default:
        return FileText;
    }
  };

  const filteredModules = ACADEMIC_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-400" />
            <span>Manajemen Administrasi & Akademik Guru</span>
            {isSyncing && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
                <RefreshCw className="w-2.5 h-2.5 animate-spin text-amber-400" />
                <span>RPM Sync Active</span>
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400">
            Akses langsung modul perangkat ajar, penilaian, bank soal, dan tata kelola
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {filteredModules.length} Modul Terpasang
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredModules.map((mod) => {
          const Icon = getIcon(mod.icon);
          const isRpmLinked = ['perangkat', 'administrasi', 'penilaian', 'bank-materi', 'bank-soal'].includes(
            mod.id
          );

          return (
            <div
              key={mod.id}
              id={`academic-module-card-${mod.id}`}
              onClick={() => onOpenModule(mod.id)}
              className={`bento-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${
                isSyncing && isRpmLinked
                  ? 'widget-sync-pulse-indigo border-indigo-500/50'
                  : ''
              }`}
            >
              {/* Shimmer effect during RPM sync */}
              {isSyncing && isRpmLinked && <div className="sync-shimmer-effect"></div>}

              {/* Subtle hover gradient indicator */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/15 transition-all"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner transition-colors duration-300 ${
                      isSyncing && isRpmLinked
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1">
                    {isSyncing && isRpmLinked ? (
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono animate-pulse flex items-center gap-1">
                        <RefreshCw className="w-2 h-2 animate-spin text-amber-400" />
                        <span>Sync</span>
                      </span>
                    ) : mod.badge ? (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        {mod.badge}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.shortDesc}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] text-slate-400 font-mono">
                  {mod.detailsCountLabel}
                </span>

                <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold inline-flex items-center gap-1">
                  <span>Buka</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

