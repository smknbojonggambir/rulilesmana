import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  GraduationCap,
  PenTool,
  BookOpen,
  Newspaper,
  Linkedin,
  Sparkles,
  Search,
  Copy,
  Check,
  Share2,
  BookmarkCheck,
  TrendingUp,
  Award,
} from 'lucide-react';
import { MEDIA_FOOTPRINTS } from '../data/portalData';
import { MediaFootprint } from '../types';

export const MediaFootprintSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Publikasi Ilmiah & Riset',
    'Jurnalisme & Media Opini',
    'Jaringan Profesional',
    'Kemitraan & Influencer',
  ];

  const handleCopy = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getPlatformIcon = (iconName: string, color: string) => {
    const iconClass = 'w-5 h-5 sm:w-6 sm:h-6';
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'PenTool':
        return <PenTool className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'Newspaper':
        return <Newspaper className={iconClass} />;
      case 'Linkedin':
        return <Linkedin className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      default:
        return <Globe className={iconClass} />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20',
          cardHover: 'hover:border-blue-500/40',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
          iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
          button: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20',
          cardHover: 'hover:border-cyan-500/40',
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
          iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20',
          cardHover: 'hover:border-indigo-500/40',
        };
      case 'rose':
        return {
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          button: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20',
          cardHover: 'hover:border-rose-500/40',
        };
      case 'amber':
        return {
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
          cardHover: 'hover:border-amber-500/40',
        };
      case 'emerald':
      default:
        return {
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
          cardHover: 'hover:border-emerald-500/40',
        };
    }
  };

  const filteredFootprints = MEDIA_FOOTPRINTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.platform.toLowerCase().includes(q) ||
      item.handleOrChannel.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      item.highlight.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="media-digital" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>PORTFOLIO MEDIA & DIGITAL FOOTPRINT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Media & Jejak Digital
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Rekam jejak publikasi ilmiah, artikel opini media massa, kanal edukasi siber, jejaring karier profesional, dan kolaborasi kreator digital.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>
            <strong className="text-slate-900 dark:text-white">{MEDIA_FOOTPRINTS.length}</strong> Profil & Kanal Terverifikasi
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-media-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="input-search-media-footprint"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari platform, artikel, opini..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid of Media Footprints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFootprints.map((item) => {
          const colors = getColorClasses(item.accentColor);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={`media-card-${item.id}`}
              className={`bento-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 text-left border border-slate-200/80 dark:border-slate-800 ${colors.cardHover} transition-all group`}
            >
              <div className="space-y-4">
                {/* Top Row: Icon + Badge + Action */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.iconBg} border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                    >
                      {getPlatformIcon(item.iconName, item.accentColor)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        {item.platform}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Copy Link Button */}
                  <button
                    id={`btn-copy-${item.id}`}
                    onClick={(e) => handleCopy(e, item.url, item.id)}
                    title="Salin tautan profil"
                    className={`p-2 rounded-lg text-xs transition-colors shrink-0 ${
                      isCopied
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Badge Category & Handle */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-md border ${colors.badge}`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.handleOrChannel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlight Point */}
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <span>{item.highlight}</span>
                </div>
              </div>

              {/* Bottom: Tags & Open Link Button */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  id={`btn-open-media-${item.id}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${colors.button}`}
                >
                  <span>Buka {item.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFootprints.length === 0 && (
        <div className="p-10 rounded-2xl bento-glass text-center space-y-3 border border-dashed border-slate-300 dark:border-slate-700">
          <Globe className="w-10 h-10 text-slate-400 mx-auto opacity-60" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Tidak ada profil media yang sesuai pencarian
          </h4>
          <p className="text-xs text-slate-500">
            Coba ubah kata kunci pencarian atau pilih kategori "Semua".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </section>
  );
};
