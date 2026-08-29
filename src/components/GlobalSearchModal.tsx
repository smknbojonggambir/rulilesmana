import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Palette,
  Camera,
  Award,
  BookOpenCheck,
  Zap,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Building2,
  Globe,
} from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  PUBLICATION_ARTICLES,
  ADMIN_CHECKLIST,
  ACTIVITY_DOCS,
  CERTIFICATES_LIST,
  LEARNING_PROJECTS,
  LMS_LINKS,
  OFFICIAL_PORTALS,
  MEDIA_FOOTPRINTS,
} from '../data/portalData';
import {
  PortfolioItem,
  ActivityDoc,
  PublicationArticle,
  CertificateItem,
  OfficialPortal,
  MediaFootprint,
} from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPortfolio: (item: PortfolioItem) => void;
  onSelectArticle: (article: PublicationArticle) => void;
  onSelectActivity: (activity: ActivityDoc) => void;
  onSelectAdminModule: (moduleId: string) => void;
  onSelectCertificate: (cert: CertificateItem) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPortfolio,
  onSelectArticle,
  onSelectActivity,
  onSelectAdminModule,
  onSelectCertificate,
  onScrollToSection,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setActiveCategory('Semua');
    }
  }, [isOpen]);

  // Keyboard shortcut listener for escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchCategories = [
    'Semua',
    'Media & Jejak Digital',
    'Portal Kedinasan',
    'Administrasi Guru',
    'Portofolio & Karya',
    'Publikasi & Artikel',
    'Dokumentasi Praktik',
    'Sertifikasi & Lisensi',
    'Proyek EdTech & LMS',
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const list: Array<{
      id: string;
      title: string;
      category: string;
      type: 'media' | 'portal' | 'admin' | 'portfolio' | 'article' | 'activity' | 'cert' | 'project' | 'lms';
      description: string;
      icon: any;
      payload?: any;
    }> = [];

    // 0. Media & Jejak Digital
    if (activeCategory === 'Semua' || activeCategory === 'Media & Jejak Digital') {
      MEDIA_FOOTPRINTS.forEach((item) => {
        if (
          item.name.toLowerCase().includes(q) ||
          item.platform.toLowerCase().includes(q) ||
          item.handleOrChannel.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.highlight.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          list.push({
            id: `media-${item.id}`,
            title: `${item.name} (${item.platform})`,
            category: `Media & Jejak Digital (${item.category})`,
            type: 'media',
            description: item.description,
            icon: Globe,
            payload: item,
          });
        }
      });
    }

    // 0. Official Portals
    if (activeCategory === 'Semua' || activeCategory === 'Portal Kedinasan') {
      OFFICIAL_PORTALS.forEach((item) => {
        if (
          item.name.toLowerCase().includes(q) ||
          item.shortName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.institution.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q) ||
          item.features?.some((f) => f.toLowerCase().includes(q))
        ) {
          list.push({
            id: `portal-${item.id}`,
            title: item.name,
            category: `Portal Resmi (${item.badge})`,
            type: 'portal',
            description: `${item.institution} • ${item.url}`,
            icon: Building2,
            payload: item,
          });
        }
      });
    }

    // 1. Admin modules
    if (activeCategory === 'Semua' || activeCategory === 'Administrasi Guru') {
      ADMIN_CHECKLIST.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        ) {
          list.push({
            id: `admin-${item.id}`,
            title: item.title,
            category: 'Administrasi Guru',
            type: 'admin',
            description: item.description,
            icon: BookOpenCheck,
            payload: item.id,
          });
        }
      });
    }

    // 2. Portfolio items
    if (activeCategory === 'Semua' || activeCategory === 'Portofolio & Karya') {
      PORTFOLIO_ITEMS.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.toolsUsed.some((t) => t.toLowerCase().includes(q))
        ) {
          list.push({
            id: `portfolio-${item.id}`,
            title: item.title,
            category: `Portofolio (${item.category})`,
            type: 'portfolio',
            description: item.description,
            icon: Palette,
            payload: item,
          });
        }
      });
    }

    // 3. Articles
    if (activeCategory === 'Semua' || activeCategory === 'Publikasi & Artikel') {
      PUBLICATION_ARTICLES.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          list.push({
            id: `article-${item.id}`,
            title: item.title,
            category: 'Publikasi & Artikel',
            type: 'article',
            description: item.summary,
            icon: BookOpen,
            payload: item,
          });
        }
      });
    }

    // 4. Certificates
    if (activeCategory === 'Semua' || activeCategory === 'Sertifikasi & Lisensi') {
      CERTIFICATES_LIST.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.issuer.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.skills.some((s) => s.toLowerCase().includes(q))
        ) {
          list.push({
            id: `cert-${item.id}`,
            title: item.title,
            category: `Sertifikat (${item.issuer})`,
            type: 'cert',
            description: item.description,
            icon: Award,
            payload: item,
          });
        }
      });
    }

    // 5. Documentation
    if (activeCategory === 'Semua' || activeCategory === 'Dokumentasi Praktik') {
      ACTIVITY_DOCS.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.caption.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        ) {
          list.push({
            id: `activity-${item.id}`,
            title: item.title,
            category: 'Dokumentasi Praktik',
            type: 'activity',
            description: item.caption,
            icon: Camera,
            payload: item,
          });
        }
      });
    }

    // 6. Learning Projects & LMS
    if (activeCategory === 'Semua' || activeCategory === 'Proyek EdTech & LMS') {
      LEARNING_PROJECTS.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.techStack.some((t) => t.toLowerCase().includes(q))
        ) {
          list.push({
            id: `proj-${item.id}`,
            title: item.title,
            category: 'Proyek Pembelajaran',
            type: 'project',
            description: item.description,
            icon: Zap,
            payload: item,
          });
        }
      });

      LMS_LINKS.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        ) {
          list.push({
            id: `lms-${item.id}`,
            title: item.title,
            category: `Portal LMS (${item.badge})`,
            type: 'lms',
            description: item.description,
            icon: BookOpen,
            payload: item,
          });
        }
      });
    }

    return list;
  }, [query, activeCategory]);

  const handleSelectResult = (result: any) => {
    onClose();
    if (result.type === 'media') {
      window.open(result.payload.url, '_blank', 'noopener,noreferrer');
    } else if (result.type === 'portal') {
      window.open(result.payload.url, '_blank', 'noopener,noreferrer');
    } else if (result.type === 'admin') {
      onSelectAdminModule(result.payload);
    } else if (result.type === 'portfolio') {
      onSelectPortfolio(result.payload);
    } else if (result.type === 'article') {
      onSelectArticle(result.payload);
    } else if (result.type === 'activity') {
      onSelectActivity(result.payload);
    } else if (result.type === 'cert') {
      onSelectCertificate(result.payload);
    } else if (result.type === 'project') {
      onScrollToSection('proyek');
    } else if (result.type === 'lms') {
      onScrollToSection('pembelajaran');
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bento-card rounded-2xl w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-left">
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari modul ajar, sertifikat, artikel, karya DKV, jurnal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
            >
              Hapus
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Tutup Pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {searchCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Pencarian Terpadu Portal Pendidik
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Ketik kata kunci untuk mencari administrasi kurikulum, sertifikasi, karya siswa, LMS DKV, Python, atau artikel pedagogi.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Modul Ajar', 'DKV', 'Python', 'Jurnal', 'Sertifikat Pendidik', 'Asesor', 'Figma', 'Presensi'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 px-1">
                Ditemukan {results.length} hasil untuk "{query}":
              </p>
              {results.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-700/50 flex items-start gap-3 cursor-pointer group transition-all"
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:text-red-600 dark:group-hover:text-red-400 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Konten yang Anda cari belum ditemukan.
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Coba gunakan kata kunci umum lainnya seperti "DKV", "Modul", "Jurnal", "Informatika", atau "Sertifikat".
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Gunakan kata kunci spesifik untuk hasil akurat</span>
          <span className="font-mono text-[10px]">Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};
