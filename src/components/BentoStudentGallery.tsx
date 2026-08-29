import React, { useState } from 'react';
import {
  Palette,
  Heart,
  Eye,
  Filter,
  Sparkles,
  Maximize2,
  Brush,
  Layers,
} from 'lucide-react';
import { STUDENT_WORKS } from '../data/portalData';
import { StudentWork } from '../types';

interface BentoStudentGalleryProps {
  onSelectWork: (work: StudentWork) => void;
}

export const BentoStudentGallery: React.FC<BentoStudentGalleryProps> = ({
  onSelectWork,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [works, setWorks] = useState<StudentWork[]>(STUDENT_WORKS);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const categories = [
    'Semua',
    'Branding & Logo',
    'Ilustrasi Vektor',
    'Fotografi',
    'UI/UX Design',
    '3D Artwork',
  ];

  const filteredWorks =
    selectedCategory === 'Semua'
      ? works
      : works.filter((w) => w.category === selectedCategory);

  const handleLike = (e: React.MouseEvent, workId: string) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      const isAlreadyLiked = next.has(workId);
      if (isAlreadyLiked) {
        next.delete(workId);
      } else {
        next.add(workId);
      }
      return next;
    });

    setWorks((prev) =>
      prev.map((w) => {
        if (w.id === workId) {
          const isLiked = likedIds.has(workId);
          return {
            ...w,
            likes: isLiked ? w.likes - 1 : w.likes + 1,
          };
        }
        return w;
      })
    );
  };

  return (
    <div
      id="galeri-siswa"
      className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl p-6 sm:p-8 bento-card border border-indigo-500/20 space-y-6 relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Brush className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Galeri Portofolio & Karya Kreatif Siswa DKV
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Eksplorasi karya desain grafis, ilustrasi, UI/UX, dan fotografi siswa SMKN Bojonggambir
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWorks.map((work) => {
          const isLiked = likedIds.has(work.id);

          return (
            <div
              key={work.id}
              onClick={() => onSelectWork(work)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-indigo-950/30"
            >
              {/* Image container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Badges overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {work.category}
                  </span>
                  <button
                    onClick={(e) => handleLike(e, work.id)}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                      isLiked
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/40'
                        : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Quick view button hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-xl bg-indigo-600/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Lihat Detail Karya</span>
                  </span>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {work.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {work.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">{work.studentName}</p>
                    <p className="text-[10px] text-indigo-400">{work.studentClass}</p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className={`w-3 h-3 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
                      {work.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {work.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
