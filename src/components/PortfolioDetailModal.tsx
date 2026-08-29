import React from 'react';
import { X, ExternalLink, User, Calendar, Tag, CheckCircle2, ArrowUpRight, Share2 } from 'lucide-react';
import { PortfolioItem } from '../types';
import { LazyImage } from './LazyImage';
import { Breadcrumb } from './Breadcrumb';

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.link || window.location.href);
      alert('Tautan proyek karya berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bento-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 relative space-y-5 text-left">
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
            { label: 'Portfolio & Karya', sectionId: 'portfolio', onClick: onClose },
            { label: item.title, active: true },
          ]}
          onNavigateHome={onClose}
        />

        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-950">
          <LazyImage
            src={item.imageUrl}
            alt={item.title}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-red-600 text-white shadow-md">
              {item.category}
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-slate-200 backdrop-blur-md">
              {item.year}
            </span>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors text-xs flex items-center gap-1.5 font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-slate-400" />
              Kreator: <strong className="text-slate-800 dark:text-slate-200">{item.creator}</strong> ({item.type})
            </span>
            {item.metrics && (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item.metrics.label}: <strong className="text-slate-800 dark:text-slate-200">{item.metrics.value}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Deskripsi Proyek & Metodologi PjBL
          </h4>
          <p>{item.description}</p>
        </div>

        {/* Tools & Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Software & Perangkat Industri Digunakan
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Kunjungi / Buka Tautan Proyek</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => alert(`Detail teknis portofolio "${item.title}" tersimpan dalam arsip karya DKV 2026.`)}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs sm:text-sm text-center"
            >
              Arsip Karya Terverifikasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
