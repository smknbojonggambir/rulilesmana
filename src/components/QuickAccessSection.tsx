import React from 'react';
import {
  Palette,
  Code2,
  BookOpenCheck,
  ScanLine,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Users,
  Layers,
  CheckCircle2,
  HelpCircle,
  CalendarDays,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { useRpmSync } from '../context/RpmSyncContext';

interface QuickAccessSectionProps {
  onOpenModule: (moduleId: string) => void;
  onScrollTo: (sectionId: string) => void;
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  onOpenModule,
  onScrollTo,
}) => {
  const { isSyncing } = useRpmSync();

  return (
    <section id="quick-access" className="py-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>PUSAT DIGITAL PEMBELAJARAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Akses Cepat Platform Utama
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Pilar ekosistem pembelajaran digital, Rencana Pembelajaran Mendalam (RPM), agenda kelas, dan portal asesmen terhubung aktif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Terhubung ke server: <strong className="text-slate-800 dark:text-slate-200">smknbojonggambir.web.id</strong>
          </span>
        </div>
      </div>

      {/* 3 Featured Priority Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: LMS DKV */}
        <div
          id="card-lms-dkv"
          className={`bento-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/50 transition-all ${
            isSyncing ? 'widget-sync-pulse-indigo' : ''
          }`}
        >
          <div className="space-y-4 text-left">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800">
                DKV LearnStudio
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                LMS DKV
              </h3>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                Dasar-Dasar Desain Komunikasi Visual
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                Portal pembelajaran kejuruan DKV interaktif: Modul Vektor Grafis, Tipografi, Fotografi Digital, Sketsa & Ilustrasi, dan Dropzone Portofolio Tugas Siswa.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>24 Modul Ajar Illustrator & Photoshop</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>108 Siswa DKV Aktif Terhubung</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <a
              id="btn-open-lms-dkv"
              href="https://dkv-learnstudio.kangruli.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-red-600/25 transition-all"
            >
              <span>Buka LMS DKV →</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Card 2: LMS Informatika */}
        <div
          id="card-lms-informatika"
          className={`bento-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/50 transition-all ${
            isSyncing ? 'widget-sync-pulse-indigo' : ''
          }`}
        >
          <div className="space-y-4 text-left">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Digital LearnStudio
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                LMS Informatika
              </h3>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                Pembelajaran Informatika & TIK
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                Ruang kelas digital berpikir komputasional, algoritma dasar, jaringan komputer & internet, keamanan siber, dan analisis data untuk siswa SMK.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Compiler Python & Web Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>106 Siswa Terdaftar di Rombel</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <a
              id="btn-open-lms-informatika"
              href="https://digital-learnstudio.kangruli.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-indigo-600/25 transition-all"
            >
              <span>Buka LMS Informatika →</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Card 3: Administrasi Guru (RPM Digital - Rencana Pembelajaran Mendalam) */}
        <div
          id="card-admin-guru"
          className={`bento-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all ${
            isSyncing ? 'widget-sync-pulse-amber' : ''
          }`}
        >
          {isSyncing && <div className="sync-shimmer-effect" />}

          <div className="space-y-4 text-left">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                RPM Kang Ruli
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Administrasi Guru
              </h3>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                Rencana Pembelajaran Mendalam (RPM Digital)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                Pusat tata kelola Rencana Pembelajaran Mendalam (RPM), jurnal, presensi, instrumen penilaian, dan rekapitulasi kinerja guru Kurikulum Merdeka.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>32 Modul & 214 Siswa Terintegrasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Kelengkapan Dokumen 92% Siap</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 flex items-center gap-2">
            <button
              id="btn-goto-admin"
              onClick={() => onScrollTo('administrasi')}
              className="flex-1 py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-amber-600/25 transition-all text-center"
            >
              <span>Masuk Administrasi →</span>
            </button>

            <a
              id="btn-open-rpm-external"
              href="https://rpm.kangruli.web.id/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka rpm.kangruli.web.id"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Utility Services Grid: CBT + Agenda + LMS PKBM + LMS Alpha Beta + Komunitas Ngejah + Taman Baca AIUEO + Presensi Siswa GO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* CBT SMKN Bojonggambir */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  CBT Assessment
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  Ujian Online
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Portal ujian online & asesmen berbasis komputer untuk PTS, PAS, asesmen sumatif, dan UKK.
              </p>
            </div>
          </div>

          <a
            id="btn-open-cbt-quick"
            href="https://cbt.smknbojonggambir.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka CBT Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Agenda Kelas Digital */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Agenda Kelas Digital
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  v2.1 Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Jurnal harian pembelajaran, pemantauan ketercapaian materi kelas, dan catatan interaksi guru-siswa.
              </p>
            </div>
          </div>

          <a
            id="btn-open-agenda-kelas-quick"
            href="https://agenda-kelas.kangruli.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka Agenda Kelas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* LMS PKBM Celah Cahaya */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  PKBM Celah Cahaya
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  SIAKAD & LMS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Platform pembelajaran daring kesetaraan (Paket A/B/C), modul ajar interaktif, dan evaluasi hasil belajar.
              </p>
            </div>
          </div>

          <a
            id="btn-open-pkbm-quick"
            href="https://akademik.celahcahaya.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka LMS PKBM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* LMS Alpha Beta */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  LMS Alpha Beta
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  Alpha Beta Edu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Portal pembelajaran digital interaktif, materi keilmuan terbuka, dan evaluasi capaian belajar mandiri.
              </p>
            </div>
          </div>

          <a
            id="btn-open-alphabeta-quick"
            href="https://www.alphabeta.edu.eu.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka LMS Alpha Beta</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Komunitas Ngejah */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Komunitas Ngejah
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Literasi & TBM
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Gerakan literasi akar rumput, rumah baca masyarakat, ruang apresiasi sastra, dan pemberdayaan pemuda.
              </p>
            </div>
          </div>

          <a
            id="btn-open-ngejah-quick"
            href="https://www.komunitasngejah.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka Komunitas Ngejah</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Taman Baca AIUEO */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Taman Baca AIUEO
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  TBM & Literasi
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Ruang baca ramah anak, program literasi usia dini, gerakan gemar membaca, dan aktivitas kreatif komunitas.
              </p>
            </div>
          </div>

          <a
            id="btn-open-tamanbaca-quick"
            href="https://tamanbaca-aiueo.my.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka Taman Baca AIUEO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* PAUD Admin System Lite */}
        <div id="card-paud-admin-lite" className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  PAUD Admin Lite
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Sistem PAUD
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Sistem informasi tata kelola buku induk siswa, presensi harian, administrasi guru, dan tumbuh kembang anak PAUD/TK.
              </p>
            </div>
          </div>

          <a
            id="btn-open-paudadmin-quick"
            href="https://paud-admin-system-lite.kangruli.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka PAUD Admin Lite</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Presensi Siswa GO App */}
        <div className="bento-glass rounded-xl p-4 flex flex-col justify-between gap-4 border border-slate-200 dark:border-slate-800 hover:border-violet-500/50 transition-all">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 mt-0.5">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Presensi Siswa GO
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  QR & GPS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Pemindaian QR Code dan GPS presensi harian siswa rombel X & XI DKV serta Informatika di kelas/lab.
              </p>
            </div>
          </div>

          <a
            id="btn-open-presensi-quick"
            href="https://presensigo.smknbojonggambir.sch.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka Presensi GO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
