import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  RefreshCw,
  Menu,
  X,
  BookOpenCheck,
  Shield,
  Layers,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Search,
  Palette,
  Code2,
  FileSpreadsheet,
  FileText,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Building2,
  Globe,
  Award,
  FolderGit2,
  Camera,
  BookOpen,
  Briefcase,
  SlidersHorizontal,
  Mail,
  UserCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRpmSync } from '../context/RpmSyncContext';
import { useLanguage } from '../context/LanguageContext';
import { TEACHER_DATA } from '../data/portalData';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenModule: (moduleId: string) => void;
  onOpenQuickJournal: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenModule,
  onOpenQuickJournal,
  onOpenSearch,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isSyncing, triggerSync, lastSyncTime } = useRpmSync();
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states
  const [lmsDropdownOpen, setLmsDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [worksDropdownOpen, setWorksDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  const lmsDropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const worksDropdownRef = useRef<HTMLDivElement>(null);
  const mediaDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (lmsDropdownRef.current && !lmsDropdownRef.current.contains(target)) {
        setLmsDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(target)) {
        setAdminDropdownOpen(false);
      }
      if (worksDropdownRef.current && !worksDropdownRef.current.contains(target)) {
        setWorksDropdownOpen(false);
      }
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(target)) {
        setMediaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const closeAllDropdowns = () => {
    setLmsDropdownOpen(false);
    setAdminDropdownOpen(false);
    setWorksDropdownOpen(false);
    setMediaDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    closeAllDropdowns();
    onSelectSection(id);
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 dark:bg-[#090d16]/92 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm'
          : 'bg-white/75 dark:bg-[#090d16]/75 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 sm:gap-4">
          {/* Brand Identity */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-red-500/80 shadow-md group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate max-w-[140px] sm:max-w-none">
                  Ruli Lesmana
                </span>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-semibold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800/60">
                  Gr.
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pendidik DKV & Informatika
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-white/5 text-xs font-medium">
            {/* 1. Beranda */}
            <button
              id="nav-link-hero"
              onClick={() => handleNavClick('hero')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                activeSection === 'hero'
                  ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Beranda
            </button>

            {/* 2. Profil & Tech Stack */}
            <button
              id="nav-link-profil"
              onClick={() => handleNavClick('profil')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                activeSection === 'profil'
                  ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Profil & Stack
            </button>

            {/* 3. Pembelajaran with Dropdown (LMS DKV & LMS Informatika) */}
            <div className="relative" ref={lmsDropdownRef}>
              <button
                id="nav-link-pembelajaran"
                onClick={() => {
                  setLmsDropdownOpen(!lmsDropdownOpen);
                  setAdminDropdownOpen(false);
                  setWorksDropdownOpen(false);
                  setMediaDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                  activeSection === 'pembelajaran'
                    ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>Pembelajaran</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    lmsDropdownOpen ? 'rotate-180 text-red-600 dark:text-white' : 'opacity-70'
                  }`}
                />
              </button>

              {lmsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Platform LMS Resmi
                  </div>

                  <a
                    href="https://dkv-learnstudio.kangruli.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeAllDropdowns()}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 text-xs">
                        <span>LMS DKV</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        DKV LearnStudio Portal
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://digital-learnstudio.kangruli.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeAllDropdowns()}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-xs">
                        <span>LMS Informatika</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        Digital LearnStudio Portal
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://cbt.smknbojonggambir.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeAllDropdowns()}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 text-xs">
                        <span>CBT Bojonggambir</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        Portal Ujian & Asesmen Online
                      </p>
                    </div>
                  </a>

                  <button
                    onClick={() => handleNavClick('pembelajaran')}
                    className="w-full text-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Lihat Hub Jadwal & Modul →
                  </button>
                </div>
              )}
            </div>

            {/* 4. Administrasi Guru with Dropdown */}
            <div className="relative" ref={adminDropdownRef}>
              <button
                id="nav-link-administrasi"
                onClick={() => {
                  setAdminDropdownOpen(!adminDropdownOpen);
                  setLmsDropdownOpen(false);
                  setWorksDropdownOpen(false);
                  setMediaDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                  activeSection === 'administrasi'
                    ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>Administrasi</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    adminDropdownOpen ? 'rotate-180 text-red-600 dark:text-white' : 'opacity-70'
                  }`}
                />
              </button>

              {adminDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Modul Administrasi Guru
                  </div>

                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      onOpenModule('modul-ajar');
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Perangkat Pembelajaran
                      </h4>
                      <p className="text-[10px] text-slate-500">CP, TP, ATP & Modul Ajar</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      onOpenQuickJournal();
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
                        Jurnal Mengajar
                      </h4>
                      <p className="text-[10px] text-slate-500">Pencatatan aktivitas harian</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      onOpenModule('presensi');
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        Presensi Siswa
                      </h4>
                      <p className="text-[10px] text-slate-500">Kehadiran rombel terintegrasi</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      onOpenModule('penilaian');
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        Penilaian & Asesmen
                      </h4>
                      <p className="text-[10px] text-slate-500">Formatif & sumatif rapor</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('administrasi')}
                    className="w-full text-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Buka Semua 11 Modul Administrasi →
                  </button>
                </div>
              )}
            </div>

            {/* 5. Karya & Proyek (Portfolio + Proyek EdTech) */}
            <div className="relative" ref={worksDropdownRef}>
              <button
                id="nav-link-works"
                onClick={() => {
                  setWorksDropdownOpen(!worksDropdownOpen);
                  setLmsDropdownOpen(false);
                  setAdminDropdownOpen(false);
                  setMediaDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                  ['portfolio', 'proyek', 'dokumentasi'].includes(activeSection)
                    ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>Karya & Proyek</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    worksDropdownOpen ? 'rotate-180 text-red-600 dark:text-white' : 'opacity-70'
                  }`}
                />
              </button>

              {worksDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => handleNavClick('portfolio')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                        Portfolio Desain & Siswa
                      </h4>
                      <p className="text-[10px] text-slate-500">Karya DKV, branding & ilustrasi</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('proyek')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Proyek Inovasi EdTech
                      </h4>
                      <p className="text-[10px] text-slate-500">RPM Cloud & software edukasi</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('dokumentasi')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        Dokumentasi Praktik
                      </h4>
                      <p className="text-[10px] text-slate-500">Galeri foto kegiatan ajar SMK</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 6. Publikasi & Sertifikat */}
            <button
              id="nav-link-publikasi"
              onClick={() => handleNavClick('publikasi')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                ['publikasi', 'sertifikat'].includes(activeSection)
                  ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Publikasi & Sertifikat
            </button>

            {/* 7. Media & Portal Kedinasan with Dropdown */}
            <div className="relative" ref={mediaDropdownRef}>
              <button
                id="nav-link-media-dropdown"
                onClick={() => {
                  setMediaDropdownOpen(!mediaDropdownOpen);
                  setLmsDropdownOpen(false);
                  setAdminDropdownOpen(false);
                  setWorksDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                  ['media-digital', 'portal-resmi'].includes(activeSection)
                    ? 'bg-white dark:bg-purple-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Globe className="w-3.5 h-3.5 opacity-80" />
                <span>Media & Portal</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    mediaDropdownOpen ? 'rotate-180 text-purple-600 dark:text-white' : 'opacity-70'
                  }`}
                />
              </button>

              {mediaDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => handleNavClick('media-digital')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        Media & Jejak Digital
                      </h4>
                      <p className="text-[10px] text-slate-500">Google Scholar, Kompasiana, Kumparan, dll.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('portal-resmi')}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 group transition-colors text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Portal Resmi Kedinasan
                      </h4>
                      <p className="text-[10px] text-slate-500">Kemendikdasmen, BKN, SIMPKB, dll.</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 8. Kontak */}
            <button
              id="nav-link-kontak"
              onClick={() => handleNavClick('kontak')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                activeSection === 'kontak'
                  ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Kontak
            </button>
          </nav>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Search Button */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              aria-label="Pencarian Cepat"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-red-500/50 transition-colors text-xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Cari...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* RPM Sync Status Trigger */}
            <button
              id="rpm-sync-navbar-btn"
              onClick={() => triggerSync(true)}
              disabled={isSyncing}
              title={`Sinkronisasi RPM (Terakhir: ${
                lastSyncTime ? lastSyncTime.toLocaleTimeString('id-ID') : 'Aktif'
              })`}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                isSyncing
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-500/50'
              }`}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-amber-500 ${isSyncing ? 'animate-spin' : ''}`}
              />
              <span className="hidden xl:inline">
                {isSyncing ? 'Sinkron RPM...' : 'RPM Sync'}
              </span>
            </button>

            {/* Language Switcher (ID / EN) */}
            <button
              id="language-toggle-btn"
              onClick={toggleLanguage}
              title={
                language === 'id'
                  ? 'Switch to English (Beralih ke Bahasa Inggris)'
                  : 'Beralih ke Bahasa Indonesia (Switch to Indonesian)'
              }
              aria-label="Pilih Bahasa / Language Selector"
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-red-500/50 transition-all cursor-pointer shadow-xs active:scale-95 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[11px] font-bold tracking-wider">
                {language.toUpperCase()}
              </span>
              <span className="hidden xl:inline text-[10px] text-slate-400 font-normal border-l border-slate-300 dark:border-slate-700 pl-1 ml-0.5">
                {language === 'id' ? 'IDN' : 'ENG'}
              </span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              title={
                theme === 'dark'
                  ? 'Beralih ke Mode Terang / Light Mode'
                  : 'Beralih ke Mode Gelap / Dark Mode'
              }
              aria-label="Ganti Tema Tampilan (Light / Dark Mode)"
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
                  <span className="hidden md:inline text-[11px] font-medium text-slate-300">
                    Terang
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-200" />
                  <span className="hidden md:inline text-[11px] font-medium text-slate-600">
                    Gelap
                  </span>
                </>
              )}
            </button>

            {/* Primary Action CTA: Masuk Administrasi */}
            <button
              id="navbar-admin-cta-btn"
              onClick={() => handleNavClick('administrasi')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-red-600/25 transition-all"
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>Administrasi</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Structured Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#090d16]/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto text-left">
          {/* Mobile Search Input Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Cari materi, modul, karya, sertifikat, media...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* 1. Menu Navigasi Utama */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Navigasi Halaman
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {[
                { id: 'hero', label: 'Beranda' },
                { id: 'profil', label: 'Profil & Tech Stack' },
                { id: 'pembelajaran', label: 'Pembelajaran LMS' },
                { id: 'administrasi', label: 'Administrasi Guru' },
                { id: 'portfolio', label: 'Portfolio & Siswa' },
                { id: 'proyek', label: 'Proyek EdTech' },
                { id: 'dokumentasi', label: 'Dokumentasi Foto' },
                { id: 'publikasi', label: 'Publikasi Pedagogi' },
                { id: 'sertifikat', label: 'Sertifikat & Diklat' },
                { id: 'media-digital', label: 'Media & Jejak Digital' },
                { id: 'portal-resmi', label: 'Portal Kedinasan' },
                { id: 'kontak', label: 'Kontak & Kolaborasi' },
              ].map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-semibold border border-red-200 dark:border-red-800/60'
                      : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Akses Cepat Platform Pembelajaran & LMS */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Akses Langsung LMS & RPM
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://dkv-learnstudio.kangruli.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-red-500/10 text-red-700 dark:text-red-300 font-semibold text-xs border border-red-500/30"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="truncate">LMS DKV</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70 shrink-0" />
              </a>

              <a
                href="https://digital-learnstudio.kangruli.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-500/30"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="truncate">LMS Informatika</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70 shrink-0" />
              </a>

              <a
                href="https://rpm.kangruli.web.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-xs border border-amber-500/30"
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span className="truncate">RPM Cloud</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70 shrink-0" />
              </a>

              <a
                href="https://cbt.smknbojonggambir.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold text-xs border border-sky-500/30"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="truncate">CBT Online</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70 shrink-0" />
              </a>
            </div>
          </div>

          {/* 3. Fast Actions & Language/Theme Switcher */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {/* Mobile Language Switcher */}
            <button
              id="mobile-language-toggle-btn"
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-500" />
                <span>Bahasa / Language</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                <span className={language === 'id' ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}>
                  ID
                </span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className={language === 'en' ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}>
                  EN
                </span>
              </div>
            </button>

            {/* Mobile Manual Theme Switcher */}
            <button
              id="mobile-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                )}
                <span>Tema Tampilan</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]">
                <span>{theme === 'dark' ? 'Mode Gelap' : 'Mode Terang'}</span>
                <span className="text-[10px] text-red-500 font-bold ml-0.5">Ubah</span>
              </div>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickJournal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium text-xs shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>+ Catat Jurnal Pembelajaran</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
