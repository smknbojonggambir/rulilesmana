import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Filter,
  Eye,
  Award,
  User,
} from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portalData';
import { PortfolioItem } from '../types';
import { LazyImage } from './LazyImage';

interface PortfolioSectionProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectPortfolio }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  const filterOptions = [
    'Semua',
    'Desain Grafis',
    'Website',
    'Aplikasi',
    'Media Pembelajaran',
    'Proyek DKV',
    'Karya Siswa',
  ];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedFilter === 'Semua') return true;
    if (selectedFilter === 'Karya Siswa') return item.type === 'Siswa';
    return item.category === selectedFilter;
  });

  return (
    <section id="portfolio" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold">
            <Palette className="w-3.5 h-3.5" />
            <span>KARYA & PORTOFOLIO KREATIF</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Portofolio Guru & Karya Siswa Binaan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Kompilasi perancangan identitas visual, aplikasi pembelajaran, media interaktif, dan karya desain komunikasi visual berstandar industri.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === tab
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`portfolio-card-${item.id}`}
            onClick={() => onSelectPortfolio(item)}
            className="bento-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:scale-[1.01] transition-all text-left"
          >
            {/* Thumbnail Header with Badges */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                rootMargin="250px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Creator & Type Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md backdrop-blur-md ${
                    item.type === 'Guru'
                      ? 'bg-red-600/90 text-white'
                      : item.type === 'Siswa'
                      ? 'bg-amber-500/90 text-white'
                      : 'bg-indigo-600/90 text-white'
                  }`}
                >
                  {item.type === 'Guru'
                    ? 'Karya Guru'
                    : item.type === 'Siswa'
                    ? 'Karya Siswa'
                    : 'Kolaborasi PjBL'}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-slate-200 backdrop-blur-md">
                  {item.year}
                </span>
              </div>

              {item.metrics && (
                <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 text-slate-900 dark:bg-slate-900/90 dark:text-white backdrop-blur-md z-10">
                  {item.metrics.value}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Creator & Tools footer */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{item.creator}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
