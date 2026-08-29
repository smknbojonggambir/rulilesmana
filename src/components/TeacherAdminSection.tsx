import React, { useState } from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  ExternalLink,
  Shield,
  FileSpreadsheet,
  FileText,
  Calendar,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  Archive,
  Award,
  Search,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ADMIN_CHECKLIST } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface TeacherAdminSectionProps {
  onOpenModule: (moduleId: string) => void;
  onOpenQuickJournal: () => void;
}

export const TeacherAdminSection: React.FC<TeacherAdminSectionProps> = ({
  onOpenModule,
  onOpenQuickJournal,
}) => {
  const { isSyncing, triggerSync } = useRpmSync();
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [searchAdmin, setSearchAdmin] = useState<string>('');

  const categories = [
    'Semua',
    'Perangkat Pembelajaran',
    'Evaluasi & Nilai',
    'Jurnal & Presensi',
    'Laporan & Tata Kelola',
  ];

  const filteredItems = ADMIN_CHECKLIST.filter((item) => {
    const matchCat = filterCategory === 'Semua' || item.category === filterCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      item.description.toLowerCase().includes(searchAdmin.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-indigo-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-red-500" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-5 h-5 text-emerald-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-violet-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-cyan-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-500" />;
      default:
        return <Archive className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Lengkap') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Lengkap
        </span>
      );
    }
    if (status === 'Proses') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Proses
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Belum Tersedia
      </span>
    );
  };

  return (
    <section id="administrasi" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>PORTAL ADMINISTRASI PENDIDIK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Administrasi Guru & Kurikulum Merdeka
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Pusat tata kelola perangkat pembelajaran terstruktur, jurnal harian, instrumen evaluasi, dan rekapitulasi kinerja terhubung dengan RPM Cloud.
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenQuickJournal}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Catat Jurnal</span>
          </button>

          <a
            href="https://rpm.kangruli.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Masuk RPM Cloud</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Flagship Progress Bar Banner (Kelengkapan Administrasi: 92%) */}
      <div
        className={`bento-card rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all text-left ${
          isSyncing ? 'widget-sync-pulse-amber' : ''
        }`}
      >
        {isSyncing && <div className="sync-shimmer-effect" />}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Audit Kelengkapan Berkas Mengajar TA 2025/2026
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Kelengkapan Administrasi: <span className="text-red-600 dark:text-red-400">92%</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Status Sinkron:
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              🟢 Terverifikasi RPM Cloud
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 transition-all duration-1000 ease-out shadow-sm"
              style={{ width: '92%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>CP & ATP (100%)</span>
            <span>Modul Ajar (95%)</span>
            <span>Jurnal & Absensi (100%)</span>
            <span>Asesmen (92%)</span>
            <span>Remedial (75%)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari modul administrasi..."
            value={searchAdmin}
            onChange={(e) => setSearchAdmin(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* 11+ Admin Checklist Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`admin-item-${item.id}`}
            onClick={() => onOpenModule(item.id)}
            className="bento-card rounded-2xl p-5 flex flex-col justify-between space-y-4 text-left cursor-pointer group hover:scale-[1.01] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(item.icon)}
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <span>{item.documentCount} Dokumen</span>
                <span>•</span>
                <span>{item.lastUpdated}</span>
              </div>

              <span className="text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                Buka <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Student Privacy Policy Banner */}
      <div className="bento-glass rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-start sm:items-center gap-3 text-left">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Kebijakan Privasi & Keamanan Data Siswa
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Portal ini hanya menampilkan informasi kurikulum dan rekapitulasi umum untuk konsumsi publik. Seluruh data pribadi siswa (NISN, nomor kontak orang tua, dan rincian nilai rahasia) terlindungi dengan autentikasi berjenjang di server RPM Cloud SMKN Bojonggambir.
          </p>
        </div>
      </div>
    </section>
  );
};
