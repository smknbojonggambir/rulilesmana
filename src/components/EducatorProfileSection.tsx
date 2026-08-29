import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Sparkles,
  Palette,
  Code2,
  Layers,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Lightbulb,
  ShieldCheck,
  Compass,
  Download,
  ExternalLink,
  Mail,
  FileCheck,
} from 'lucide-react';
import { TEACHER_DATA, QUICK_STATS } from '../data/portalData';
import { downloadCV } from '../utils/downloadHelper';
import { InteractiveTechStack } from './InteractiveTechStack';

export const EducatorProfileSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCV = () => {
    downloadCV();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="profil" className="py-10 space-y-8">
      {/* Section Heading */}
      <div className="text-left space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>PROFIL PENDIDIK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tentang Pendidik & Visi Pedagogi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Membangun jembatan sinergis antara keahlian desain komunikasi visual, logika informatika, dan inovasi pendidikan kejuruan era digital.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Biography & Background */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Bio Card */}
          <div className="bento-card rounded-2xl p-6 sm:p-7 space-y-5 text-left">
            <div className="flex items-start gap-4">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-500/80 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 tracking-wide uppercase">
                  Pendidik Kejuruan
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {TEACHER_DATA.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {TEACHER_DATA.degree}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  NIP. {TEACHER_DATA.nip}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
              <p>{TEACHER_DATA.bio}</p>
              <p>
                Aktif mengembangkan ekosistem belajar digital mandiri seperti <strong>RPM (Rencana Pembelajaran Mendalam)</strong>, <strong>DKV LearnStudio</strong>, dan <strong>Digital LearnStudio</strong> guna memastikan setiap siswa memperoleh pengalaman belajar berbasis proyek (Project-Based Learning) yang terstruktur dan relevan dengan kebutuhan industri.
              </p>
            </div>

            {/* School affiliation details */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 flex items-center gap-3">
              <img
                src={TEACHER_DATA.schoolLogoUrl}
                alt={TEACHER_DATA.school}
                className="w-10 h-10 rounded object-contain bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {TEACHER_DATA.school}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {TEACHER_DATA.institutionBranch} — {TEACHER_DATA.province}
                </p>
              </div>
            </div>

            {/* Download CV CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn-download-cv"
                onClick={handleDownloadCV}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-red-600/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Curriculum Vitae (CV)</span>
              </button>

              <a
                href="#kontak"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold text-xs text-center transition-colors"
              >
                Hubungi Pendidik
              </a>
            </div>

            {downloadSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                <span>Curriculum Vitae berhasil diunduh ke perangkat Anda.</span>
              </div>
            )}
          </div>

          {/* Education Credentials Card */}
          <div className="bento-card rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-red-500" />
              <span>Riwayat Pendidikan & Sertifikasi</span>
            </div>

            <div className="space-y-3">
              {TEACHER_DATA.education?.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{edu.institution}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4 Priority Statistics + Competencies */}
        <div className="lg:col-span-6 space-y-6">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {QUICK_STATS.map((stat) => {
              const getIcon = (name: string) => {
                switch (name) {
                  case 'Palette':
                    return <Palette className="w-5 h-5 text-red-500" />;
                  case 'Code2':
                    return <Code2 className="w-5 h-5 text-indigo-500" />;
                  case 'Layers':
                    return <Layers className="w-5 h-5 text-emerald-500" />;
                  default:
                    return <Sparkles className="w-5 h-5 text-amber-500" />;
                }
              };

              const getAccentBadge = (color: string) => {
                switch (color) {
                  case 'red':
                    return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
                  case 'indigo':
                    return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300';
                  case 'emerald':
                    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
                  default:
                    return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
                }
              };

              return (
                <div
                  key={stat.id}
                  id={`stat-card-${stat.id}`}
                  className="bento-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-3 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {getIcon(stat.iconName)}
                    </div>
                    {stat.trend && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getAccentBadge(
                          stat.accentColor
                        )}`}
                      >
                        {stat.trend}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {stat.label}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                      {stat.value}
                    </p>
                    {stat.subValue && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {stat.subValue}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bidang Keahlian & Kompetensi Pendidik */}
          <div className="bento-card rounded-2xl p-6 space-y-5 text-left">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <span>Bidang Keahlian & Fokus Materi</span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {TEACHER_DATA.expertise?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Kompetensi Guru Profesional</span>
              </h3>
              <ul className="space-y-2 mt-3 text-xs text-slate-600 dark:text-slate-300">
                {TEACHER_DATA.competencies?.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Filosofi Mengajar 2026 */}
          <div className="bento-glass rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Compass className="w-4 h-4" />
              <span>PRINSIP PEDAGOGI 2026</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              "Pendidikan kejuruan masa kini menuntut keseimbangan antara penguasaan fundamental estetika yang kuat dan keluwesan mengadopsi teknologi komputasi serta kecerdasan buatan secara etis."
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tech Stack Visualization with Framer Motion */}
      <InteractiveTechStack />
    </section>
  );
};
