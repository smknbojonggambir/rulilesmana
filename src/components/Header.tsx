import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Globe,
  PlusCircle,
  Clock,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Database,
  ExternalLink,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenQuickJournal: () => void;
  onOpenModule: (moduleId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchTerm,
  onSearchChange,
  onOpenQuickJournal,
  onOpenModule,
}) => {
  const { isSyncing, lastSyncTime, syncStep, syncProgress, triggerSync } = useRpmSync();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSyncInfo, setShowSyncInfo] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
      setCurrentDate(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Sinkronisasi RPM Selesai',
      desc: '16 Modul Ajar dan Rubrik Asesmen dari rpm.kangruli.web.id telah diperbarui.',
      time: 'Baru saja',
      type: 'sync',
    },
    {
      id: 2,
      title: 'Tugas Portofolio Diterima',
      desc: 'Fajar Nugraha (XI DKV 1) mengunggah File Brand Guide Logo.',
      time: '10 menit lalu',
      type: 'submission',
    },
    {
      id: 3,
      title: 'Presensi Selesai Direkap',
      desc: 'Absensi X Informatika 2 tercatat 35/36 hadir.',
      time: '45 menit lalu',
      type: 'attendance',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-all relative">
      {/* Visual Live Sync Stream Progress Bar */}
      {isSyncing && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900 overflow-hidden z-50">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            style={{ width: `${syncProgress}%` }}
          ></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Dashboard Portal Pembelajaran</span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Aktif
                </span>
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {currentDate || 'Tahun Ajaran 2025/2026'} &bull; SMK Negeri Bojonggambir
            </p>
          </div>
        </div>

        {/* Center / Search Filter */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="global-portal-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari modul, materi, perangkat, siswa..."
              className="w-full bg-[#111827]/90 border border-slate-800/90 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live RPM System Sync Pill Button */}
          <div className="relative">
            <button
              id="rpm-sync-trigger-btn"
              onClick={() => triggerSync(true)}
              onMouseEnter={() => setShowSyncInfo(true)}
              onMouseLeave={() => setShowSyncInfo(false)}
              disabled={isSyncing}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all group ${
                isSyncing
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/40 animate-pulse'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-amber-500/40 text-slate-200'
              }`}
              title="Sinkronkan Data dengan rpm.kangruli.web.id"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-700 ${
                  isSyncing ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
              />
              <span className="hidden sm:inline">
                {isSyncing ? 'Syncing RPM...' : 'RPM Sync'}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                }`}
              ></span>
            </button>

            {/* Sync Info Tooltip/Popover on Hover */}
            {showSyncInfo && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#0E1626] border border-amber-500/30 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 pointer-events-none text-left">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-white">rpm.kangruli.web.id</span>
                  </div>
                  <span className="text-[10px] text-amber-300 font-mono">Live Sync</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {syncStep}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Terakhir sync:</span>
                  <span className="text-slate-200 font-mono">
                    {lastSyncTime ? lastSyncTime.toLocaleTimeString('id-ID') : 'Baru saja'} WIB
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Live Clock Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-indigo-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{currentTime || '08:00 WIB'}</span>
          </div>

          {/* Quick Journal Button */}
          <button
            id="quick-journal-top-btn"
            onClick={onOpenQuickJournal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition group"
          >
            <PlusCircle className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">+ Jurnal Harian</span>
          </button>

          {/* Notification dropdown */}
          <div className="relative">
            <button
              id="notification-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white relative transition"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div
                id="notifications-popover"
                className="absolute right-0 mt-2 w-80 bg-[#0E1626] border border-slate-800 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Notifikasi Terkini
                  </span>
                  <span className="text-[10px] text-indigo-400 font-semibold cursor-pointer hover:underline">
                    Tandai Semua
                  </span>
                </div>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/30 transition text-left"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                        <span>{n.title}</span>
                        <span className="text-[9px] text-slate-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Official School Site Button */}
          <a
            href="https://smknbojonggambir.sch.id"
            target="_blank"
            rel="noopener noreferrer"
            id="school-website-link"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-200 text-xs font-medium transition"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Web SMKN</span>
          </a>
        </div>
      </div>
    </header>
  );
};

