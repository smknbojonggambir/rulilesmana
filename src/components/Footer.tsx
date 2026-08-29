import React from 'react';
import {
  Sparkles,
  BookOpenCheck,
  Palette,
  Code2,
  ExternalLink,
  Shield,
  Heart,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';
import { useRpmSync } from '../context/RpmSyncContext';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const { isSyncing, lastSyncTime } = useRpmSync();

  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md pt-12 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {TEACHER_DATA.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {TEACHER_DATA.degree} • Pendidik DKV & Informatika
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Website pribadi dan portal ekosistem pembelajaran digital terpadu untuk kejuruan Desain Komunikasi Visual dan Informatika.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                RPM Cloud Sync: {lastSyncTime ? lastSyncTime.toLocaleTimeString('id-ID') : 'Aktif'}
              </span>
            </div>
          </div>

          {/* Col 3: Ekosistem LMS & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Ekosistem Belajar
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://dkv-learnstudio.kangruli.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <span>LMS DKV LearnStudio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://digital-learnstudio.kangruli.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                >
                  <span>LMS Digital LearnStudio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://rpm.kangruli.web.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <span>RPM Guru Cloud</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://agenda-kelas.kangruli.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>Agenda Kelas Digital</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://cbt.smknbojonggambir.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors"
                >
                  <span>CBT SMKN Bojonggambir</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://presensigo.smknbojonggambir.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-1 transition-colors"
                >
                  <span>Presensi Siswa GO</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Media & Jejak Digital */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Media & Jejak Digital
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://scholar.google.com/citations?user=vA6J6aEAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Google Scholar</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kompasiana.com/rulilesmana7929/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <span>Kompasiana</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://kumparan.com/celah-cahaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                >
                  <span>Kumparan (Celah Cahaya)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://lensakeadilan.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <span>Lensa Keadilan</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://id.linkedin.com/in/ruli-lesmana-769b2461"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://intellifluence.com/influencer/ruli-lesmana-289374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <span>Intellifluence</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Portal Kedinasan & Navigasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Portal Kedinasan
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://www.kemendikdasmen.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <span>Kemendikdasmen RI</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://smk.kemendikdasmen.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Direktorat SMK</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://apps.ban-pdm.id/sispena3/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>SISPENA BAN-PDM</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://paspor-gtk.simpkb.id/casgpo/login?service=https%3A%2F%2Fppg-backend.simpkb.id%2Fauth%2Flogin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <span>SIMPKB / Paspor GTK</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://myasn.bkn.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1 transition-colors"
                >
                  <span>MyASN BKN RI</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('portal-resmi')}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Lihat 9 Portal Kedinasan →</span>
                </button>
              </li>
            </ul>
          </div>


          {/* Col 5: Institusi & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Institusi Pendidikan
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>{TEACHER_DATA.school}</strong>
              <br />
              {TEACHER_DATA.institutionBranch}
              <br />
              Provinsi Jawa Barat, Indonesia
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-500">
              NIP. {TEACHER_DATA.nip}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Ruli Lesmana, S.T. Gr. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 dark:hover:text-slate-200">
              Kurikulum Merdeka SMK
            </span>
            <span>•</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-200">
              kangruli.web.id
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
