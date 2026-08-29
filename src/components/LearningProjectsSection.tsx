import React from 'react';
import {
  Sparkles,
  BookOpenCheck,
  Palette,
  Code2,
  ScanLine,
  HelpCircle,
  Award,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { LEARNING_PROJECTS } from '../data/portalData';

export const LearningProjectsSection: React.FC = () => {
  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-6 h-6 text-amber-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-red-500" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-500" />;
      case 'ScanLine':
        return <ScanLine className="w-6 h-6 text-emerald-500" />;
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6 text-cyan-500" />;
      default:
        return <Award className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <section id="proyek" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="text-left space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>INOVASI TEKNOLOGI PENDIDIKAN</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Proyek Pembelajaran & Solusi EdTech
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Pengembangan platform web dan perangkat lunak mandiri guna mengoptimalkan proses belajar mengajar kejuruan secara efisien dan interaktif.
        </p>
      </div>

      {/* Grid of 6 EdTech Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEARNING_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            className="bento-card rounded-2xl p-6 flex flex-col justify-between space-y-5 text-left group hover:scale-[1.01] transition-all"
          >
            <div className="space-y-4">
              {/* Header Icon + Status */}
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                  {getProjectIcon(proj.iconName)}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {proj.status}
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mt-0.5">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Highlight callout */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 font-medium">
                ⚡ <strong>Keunggulan:</strong> {proj.highlight}
              </div>

              {/* Features checklist */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {proj.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Tech Stack & CTA */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {proj.url ? (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Buka Aplikasi Web</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="text-center py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {proj.metrics}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
