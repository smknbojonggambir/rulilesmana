import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Code2,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  Image,
  Layout,
  BookOpen,
  Video,
  Film,
  Camera,
  Server,
  Terminal,
  Database,
  GitBranch,
  Cpu,
  Globe,
  BookOpenCheck,
  Award,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  X,
  ExternalLink,
} from 'lucide-react';
import { TECH_STACK_DATA } from '../data/portalData';
import { TechStackItem } from '../types';

export const InteractiveTechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dkv' | 'informatika' | 'edtech'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<TechStackItem | null>(null);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return TECH_STACK_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.useCases.some((uc) => uc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Overall Stats
  const stats = useMemo(() => {
    const total = TECH_STACK_DATA.length;
    const avg = Math.round(
      TECH_STACK_DATA.reduce((acc, curr) => acc + curr.proficiency, 0) / total
    );
    const dkvCount = TECH_STACK_DATA.filter((i) => i.category === 'dkv').length;
    const infoCount = TECH_STACK_DATA.filter((i) => i.category === 'informatika').length;
    const edtechCount = TECH_STACK_DATA.filter((i) => i.category === 'edtech').length;

    return { total, avg, dkvCount, infoCount, edtechCount };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Image':
        return <Image className="w-4 h-4" />;
      case 'Layout':
        return <Layout className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Film':
        return <Film className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Server':
        return <Server className="w-4 h-4" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-4 h-4" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'dkv':
        return {
          bg: 'bg-red-50 dark:bg-red-950/40',
          border: 'border-red-200 dark:border-red-800/60',
          text: 'text-red-600 dark:text-red-400',
          barGradient: 'from-red-500 to-rose-600',
          badgeBg: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
        };
      case 'informatika':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-950/40',
          border: 'border-indigo-200 dark:border-indigo-800/60',
          text: 'text-indigo-600 dark:text-indigo-400',
          barGradient: 'from-indigo-500 to-blue-600',
          badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
        };
      case 'edtech':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-200 dark:border-amber-800/60',
          text: 'text-amber-600 dark:text-amber-400',
          barGradient: 'from-amber-500 to-emerald-500',
          badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/40',
          border: 'border-slate-200 dark:border-slate-700',
          text: 'text-slate-600 dark:text-slate-300',
          barGradient: 'from-red-500 to-indigo-600',
          badgeBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
        };
    }
  };

  return (
    <div className="bento-card rounded-2xl p-6 sm:p-7 space-y-6 text-left relative overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECH STACK & SOFTWARE MASTERY</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Visualisasi Penguasaan Perangkat Lunak & Logika Daring</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tingkat kemahiran teruji dalam ekosistem Desain Komunikasi Visual, Informatika Modern, serta Platform EdTech Mandiri.
          </p>
        </div>

        {/* Live Metrics Pill Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-medium block leading-none">Rata-rata</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{stats.avg}% Mahir</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <Award className="w-4 h-4 text-amber-500" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-medium block leading-none">Total Perangkat</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{stats.total} Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 overflow-x-auto text-xs font-medium scrollbar-none">
          <button
            id="btn-tech-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-red-600 text-slate-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Semua</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
              {stats.total}
            </span>
          </button>

          <button
            id="btn-tech-dkv"
            onClick={() => setSelectedCategory('dkv')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'dkv'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>DKV Suite</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-slate-700/60">
              {stats.dkvCount}
            </span>
          </button>

          <button
            id="btn-tech-info"
            onClick={() => setSelectedCategory('informatika')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'informatika'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Informatika & Web</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-slate-700/60">
              {stats.infoCount}
            </span>
          </button>

          <button
            id="btn-tech-edtech"
            onClick={() => setSelectedCategory('edtech')}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'edtech'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EdTech & AI</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-slate-700/60">
              {stats.edtechCount}
            </span>
          </button>
        </div>

        {/* Search bar inside tech stack */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari software / skill..."
            className="w-full pl-8 pr-8 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Interactive Tech Items with Animated Progress Bars */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const theme = getCategoryTheme(item.category);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                onClick={() => setSelectedItem(item)}
                className="group relative p-4 rounded-xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/40 transition-all duration-200 hover:shadow-md cursor-pointer text-left space-y-3"
              >
                {/* Header row: Icon, Name, Category Badge & Percentage */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg ${theme.badgeBg} group-hover:scale-105 transition-transform shrink-0`}
                    >
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.featured && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.experienceYears} • {item.proficiencyLabel}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
                      {item.proficiency}%
                    </span>
                  </div>
                </div>

                {/* Animated Framer Motion Progress Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.barGradient}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + index * 0.04, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Brief description & Quick Use Cases */}
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.useCases.slice(0, 3).map((uc, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 font-medium"
                    >
                      {uc}
                    </span>
                  ))}
                  {item.useCases.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-200/50 dark:bg-slate-800 text-slate-500 font-semibold">
                      +{item.useCases.length - 3}
                    </span>
                  )}
                </div>

                {/* Hover detail hint */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                  <span className="text-[10px]">Klik untuk eksplorasi silabus & use case</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="py-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Tidak ditemukan perangkat atau keahlian untuk "{searchQuery}"
          </h4>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
          >
            Reset filter dan pencarian
          </button>
        </div>
      )}

      {/* Detail Modal / Drawer for Selected Tech Stack */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-3">
                <div
                  className={`p-3 rounded-xl ${
                    getCategoryTheme(selectedItem.category).badgeBg
                  }`}
                >
                  {getIcon(selectedItem.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedItem.experienceYears} • Status: {selectedItem.proficiencyLabel}
                  </p>
                </div>
              </div>

              {/* Animated Detailed Progress Bar */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span>Tingkat Kemahiran Praktik & Mengajar</span>
                  <span className="font-mono text-red-600 dark:text-red-400 font-bold">
                    {selectedItem.proficiency}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${
                      getCategoryTheme(selectedItem.category).barGradient
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedItem.proficiency}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Deskripsi & Relevansi Pembelajaran
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* All Use Cases */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Implementasi & Kasus Penggunaan di Kurikulum:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItem.useCases.map((uc, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
