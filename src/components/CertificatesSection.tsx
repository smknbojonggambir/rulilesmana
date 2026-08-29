import React, { useState, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Search,
  Filter,
  Eye,
  BookOpen,
  Calendar,
  Clock,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { CERTIFICATES_LIST } from '../data/portalData';
import { CertificateItem } from '../types';
import { CertificateVisualCard } from './CertificateVisualCard';
import { CertificateModal } from './CertificateModal';

type CategoryFilter = 'Semua' | 'Sertifikat Pendidik & Asesor' | 'Kecerdasan Buatan & AI' | 'Pengembangan Kompetensi & Diklat' | 'Kompetensi Kejuruan & IT' | 'Inklusi & Literasi';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const categories: CategoryFilter[] = [
    'Semua',
    'Sertifikat Pendidik & Asesor',
    'Kecerdasan Buatan & AI',
    'Kompetensi Kejuruan & IT',
    'Pengembangan Kompetensi & Diklat',
    'Inklusi & Literasi',
  ];

  const filteredCertificates = useMemo(() => {
    return CERTIFICATES_LIST.filter((cert) => {
      // Category match
      let matchCategory = true;
      if (selectedCategory === 'Sertifikat Pendidik & Asesor') {
        matchCategory = cert.category === 'Sertifikat Pendidik' || cert.category === 'Sertifikasi Asesor';
      } else if (selectedCategory === 'Kecerdasan Buatan & AI') {
        matchCategory = cert.category === 'Kecerdasan Buatan & AI';
      } else if (selectedCategory === 'Kompetensi Kejuruan & IT') {
        matchCategory = cert.category === 'Kompetensi Kejuruan & IT';
      } else if (selectedCategory === 'Pengembangan Kompetensi & Diklat') {
        matchCategory = cert.category === 'Pengembangan Kompetensi & Diklat' || cert.category === 'Pelatihan' || cert.category === 'Workshop' || cert.category === 'Seminar';
      } else if (selectedCategory === 'Inklusi & Literasi') {
        matchCategory = cert.category === 'Inklusi & Literasi';
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === '' ||
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(query)) ||
        cert.skills.some((s) => s.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="sertifikat" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>PENGEMBANGAN PROFESIONAL BERKELANJUTAN & KOMPETENSI RESMI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sertifikasi & Pelatihan Pendidik
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Arsip resmi sertifikat kompetensi keahlian, legalitas profesi guru (Gr.), asesor BAN-PDM, pelatihan AI Microsoft & Dicoding, serta diklat peningkatan mutu pembelajaran terverifikasi.
          </p>
        </div>

        {/* Quick Highlights Counters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Sertifikat</span>
            <span className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
              {CERTIFICATES_LIST.length} Dokumen
            </span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Status Profesi</span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Gr. Informatika
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sertifikat berdasarkan judul, penerbit, nomor SK, atau materi..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certificate Cards with Visual Mockup Images */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="bento-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 text-left group hover:scale-[1.01] hover:border-purple-500/40 transition-all cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="space-y-3.5">
                {/* Visual Image / Certificate Preview Mockup */}
                <div className="relative rounded-xl overflow-hidden shadow-inner group-hover:ring-2 group-hover:ring-purple-500/30 transition-all">
                  <CertificateVisualCard cert={cert} variant="thumbnail" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold shadow-md flex items-center gap-1.5 scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Lihat Dokumen & Keterangan</span>
                    </span>
                  </div>
                </div>

                {/* Meta Badge Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                    {cert.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.issueDate || cert.year}</span>
                  </div>
                </div>

                {/* Certificate Title & Issuer */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </p>
                </div>

                {/* Brief Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50/80 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
                  {cert.description}
                </p>

                {/* Credential ID / Registration Info */}
                {cert.credentialId && (
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/60 px-2.5 py-1.5 rounded-md border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <span className="truncate">No: {cert.credentialId.split('(')[0].trim()}</span>
                    {cert.durationHours && (
                      <span className="text-purple-600 dark:text-purple-400 font-bold shrink-0 ml-1">
                        {cert.durationHours.includes('JP') || cert.durationHours.includes('Jam')
                          ? cert.durationHours.split('(')[0].trim()
                          : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Skills and Action Button */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-600 dark:bg-slate-800/90 dark:hover:bg-purple-950/40 dark:hover:text-purple-300 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Keterangan & Rincian Materi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Tidak ditemukan sertifikat yang sesuai dengan kata kunci "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
          >
            Tampilkan Semua Sertifikat
          </button>
        </div>
      )}

      {/* Interactive Detail Modal for Certificates */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

