import React from 'react';
import {
  LayoutDashboard,
  User,
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
  X,
  Palette,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenModule: (moduleId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  onOpenModule,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Home' },
    { id: 'profil', label: 'Profil Guru', icon: User },
    { id: 'perangkat', label: 'Perangkat Ajar', icon: FolderOpen, isModule: true, count: 16 },
    { id: 'administrasi', label: 'Administrasi', icon: FileText, isModule: true, count: 24 },
    { id: 'presensi', label: 'Presensi GO', icon: ClipboardCheck, isModule: true, highlight: true },
    { id: 'penilaian', label: 'Penilaian', icon: BarChart3, isModule: true },
    { id: 'siswa', label: 'Data Siswa', icon: Users, isModule: true, count: 214 },
    { id: 'galeri-siswa', label: 'Galeri Siswa', icon: Palette, badge: 'Karya' },
    { id: 'bank-materi', label: 'Bank Materi', icon: BookOpen, isModule: true, count: 38 },
    { id: 'bank-soal', label: 'Bank Soal', icon: HelpCircle, isModule: true },
    { id: 'laporan', label: 'Cetak Laporan', icon: Printer, isModule: true },
    { id: 'arsip', label: 'Arsip Dokumen', icon: Archive, isModule: true },
    { id: 'supervisi', label: 'Supervisi', icon: Award, isModule: true, badge: 'Akreditasi A' },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings, isModule: true },
  ];

  const handleNavClick = (item: typeof menuItems[0]) => {
    if (item.isModule) {
      onOpenModule(item.id);
    } else {
      onSelectSection(item.id);
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="main-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1120]/95 border-r border-slate-800/80 backdrop-blur-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-sm text-white tracking-tight">Portal DKV & TIK</h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">SMKN Bojonggambir</p>
            </div>
          </div>
          <button
            id="close-sidebar-btn"
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs font-medium scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Menu Navigasi Utama
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/10 text-white border border-indigo-500/30 shadow-sm shadow-indigo-500/10 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800/70 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.count && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.isModule && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-4 pb-2 px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Tautan Cepat Eksternal
          </div>

          <a
            href="https://rpm.kangruli.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 transition group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-semibold">RPM Kang Ruli</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition" />
          </a>

          <a
            href="https://dkv-learnstudio.kangruli.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-indigo-400 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/40 transition group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="font-semibold">LMS DKV Studio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition" />
          </a>

          <a
            href="https://digital-learnstudio.kangruli.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 transition group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">LMS Informatika</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition" />
          </a>
        </div>

        {/* Footer Profile */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#070B14]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse"></span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{TEACHER_DATA.name}</p>
              <p className="text-[10px] text-indigo-400 truncate">Guru DKV & TIK</p>
            </div>
          </div>
          <button
            onClick={() => onOpenModule('profil')}
            title="Lihat Profil Lengkap"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
