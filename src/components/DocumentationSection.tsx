import React, { useState } from 'react';
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  ZoomIn,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ACTIVITY_DOCS } from '../data/portalData';
import { ActivityDoc } from '../types';
import { LazyImage } from './LazyImage';

interface DocumentationSectionProps {
  onSelectActivity: (doc: ActivityDoc) => void;
}

export const DocumentationSection: React.FC<DocumentationSectionProps> = ({
  onSelectActivity,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = ['Semua', 'Praktik', 'Workshop', 'Pembelajaran', 'Proyek', 'Pelatihan'];

  const filteredDocs = ACTIVITY_DOCS.filter((doc) => {
    if (selectedCat === 'Semua') return true;
    return doc.category === selectedCat;
  });

  return (
    <section id="dokumentasi" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>GALERI DOKUMENTASI KEGIATAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dokumentasi Praktik & Kegiatan Belajar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Sorotan visual aktivitas pembelajaran kelas, praktikum studio foto DKV, laboratorium komputer, workshop guru, dan gelar karya projek siswa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            id={`doc-card-${doc.id}`}
            onClick={() => onSelectActivity(doc)}
            className="bento-card rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all text-left flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
              <LazyImage
                src={doc.imageUrl}
                alt={doc.title}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                rootMargin="250px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
                  {doc.category}
                </span>
                {doc.participantCount && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black/60 text-slate-200 backdrop-blur-md flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {doc.participantCount}
                  </span>
                )}
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Description */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {doc.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1 truncate max-w-[65%]">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <span className="truncate">{doc.location}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
