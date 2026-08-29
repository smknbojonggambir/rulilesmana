import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
  Timer,
} from 'lucide-react';
import { PUBLICATION_ARTICLES } from '../data/portalData';
import { PublicationArticle } from '../types';

interface PublicationsSectionProps {
  onSelectArticle: (article: PublicationArticle) => void;
}

const getReadingTimeLabel = (readTime?: string, content?: string): string => {
  if (readTime) {
    if (readTime.toLowerCase().includes('read')) return readTime;
    const match = readTime.match(/\d+/);
    if (match) return `${match[0]} min read`;
  }
  if (content) {
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} min read`;
  }
  return '5 min read';
};

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  onSelectArticle,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Semua');

  const topics = ['Semua', 'AI Education', 'Informatika', 'DKV', 'Kurikulum Merdeka'];

  const filteredArticles = PUBLICATION_ARTICLES.filter((art) => {
    if (selectedTopic === 'Semua') return true;
    return art.tags.includes(selectedTopic);
  });

  return (
    <section id="publikasi" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PUBLIKASI & ARTIKEL PENDIDIK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Publikasi & Catatan Pembelajaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Refleksi pedagogis, panduan praktikum desain komunikasi visual, pemikiran komputasional, serta integrasi teknologi dalam pendidikan kejuruan.
          </p>
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTopic === t
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => {
          const estimatedReadTime = getReadingTimeLabel(art.readTime, art.content);
          return (
            <div
              key={art.id}
              id={`article-card-${art.id}`}
              onClick={() => onSelectArticle(art)}
              className="bento-card rounded-2xl p-6 flex flex-col justify-between space-y-4 text-left group cursor-pointer hover:scale-[1.01] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {art.date}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40 text-[11px] font-semibold whitespace-nowrap shadow-2xs"
                      title={`Estimasi Waktu Baca: ${estimatedReadTime}`}
                    >
                      <Clock className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                      <span>{estimatedReadTime}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  Baca Lengkap <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
