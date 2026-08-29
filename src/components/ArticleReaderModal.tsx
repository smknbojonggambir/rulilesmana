import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, User, Tag, Share2, Check, Printer, FileText } from 'lucide-react';
import { PublicationArticle } from '../types';
import { Breadcrumb } from './Breadcrumb';

interface ArticleReaderModalProps {
  article: PublicationArticle | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bento-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative space-y-6 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Publikasi & Artikel', sectionId: 'publikasi', onClick: onClose },
            { label: article.title, active: true },
          ]}
          onNavigateHome={onClose}
        />

        {/* Metadata Header */}
        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <User className="w-4 h-4 text-slate-400" />
            <span>Oleh: <strong>{article.author}</strong></span>
          </div>
        </div>

        {/* Lead Summary */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-rose-500 text-xs sm:text-sm italic text-slate-700 dark:text-slate-200">
          "{article.summary}"
        </div>

        {/* Article Full Content */}
        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          {article.content ? (
            <p className="whitespace-pre-line">{article.content}</p>
          ) : (
            <p>
              Pendidikan kejuruan era 2026 menuntut keterhubungan yang erat antara teori pedagogis dan implementasi teknologi nyata. Melalui integrasi alat berbasis cloud dan metode berbasis proyek, siswa tidak hanya menghafal prosedur namun juga menginternalisasi pola pikir kritis serta daya kreasi tinggi.
            </p>
          )}
        </div>

        {/* Tags footer & Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-xs flex items-center gap-1.5 font-semibold"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors text-xs flex items-center gap-1.5 font-semibold shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Tautan Disalin!' : 'Bagikan Artikel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
