import React from 'react';
import { X, Heart, Eye, Download, Share2, Sparkles, User, Tag, Calendar, Palette } from 'lucide-react';
import { StudentWork } from '../types';
import { LazyImage } from './LazyImage';

interface StudentWorkModalProps {
  work: StudentWork | null;
  onClose: () => void;
}

export const StudentWorkModal: React.FC<StudentWorkModalProps> = ({ work, onClose }) => {
  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="student-work-modal-card"
        className="w-full max-w-4xl bg-[#0A0F1D] border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
      >
        {/* Left Side: Artwork Visual */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[480px]">
          <LazyImage
            src={work.imageUrl}
            alt={work.title}
            wrapperClassName="w-full h-full max-h-[60vh] lg:max-h-full flex items-center justify-center"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
              {work.category}
            </span>
          </div>
        </div>

        {/* Right Side: Artwork Info & Creator Bio */}
        <div className="w-full lg:w-96 p-6 flex flex-col justify-between overflow-y-auto bg-[#0C1222] border-t lg:border-t-0 lg:border-l border-slate-800">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                  Portofolio Siswa DKV SMKN Bojonggambir
                </span>
                <h3 className="text-lg font-bold text-white leading-snug mt-1">{work.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Creator Profile */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                {work.studentName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{work.studentName}</p>
                <p className="text-[11px] text-indigo-300">{work.studentClass} &bull; TA {work.year}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-300">Deskripsi Proyek:</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{work.description}</p>
            </div>

            {/* Software / Tools Used */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-300">Perangkat Lunak / Alat:</h4>
              <div className="flex flex-wrap gap-1.5">
                {work.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                {work.likes} Apresiasi
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {work.views} Dilihat
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 mt-4 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => alert(`Apresiasi untuk ${work.studentName} berhasil dikirim!`)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Beri Apresiasi</span>
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
