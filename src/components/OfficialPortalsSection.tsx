import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  Building2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Award,
  KeyRound,
  UserCheck,
  Landmark,
  Radio,
  ExternalLink,
  Search,
  Check,
  Copy,
  Globe2,
  ArrowUpRight,
  Shield,
  Layers,
  BookOpen,
  BookOpenCheck,
  Eye,
  Flame,
  Activity,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  Share2,
  Info,
  Sparkle,
  ArrowUpDown,
  Filter,
  Users2,
  FolderLock,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { OFFICIAL_PORTALS } from '../data/portalData';
import { OfficialPortal } from '../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.2,
    },
  },
};

const LOCAL_STORAGE_VISITS_KEY = 'portal_community_visits_v1';

type PortalTypeFilter = 'Semua' | 'Internal' | 'Educational' | 'Community' | 'Government';

interface TooltipProps {
  portal: OfficialPortal;
  visits: number;
}

const PortalTooltip: React.FC<TooltipProps> = ({ portal, visits }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.95 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      role="tooltip"
      id={`tooltip-${portal.id}`}
      className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 sm:w-80 p-3.5 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 text-white shadow-2xl border border-slate-700/80 backdrop-blur-md text-left pointer-events-none"
    >
      <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-blue-400 font-semibold block">
            {portal.portalType || 'Layanan Resmi'} • {portal.category}
          </span>
          <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
            {portal.name}
          </h4>
        </div>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium shrink-0">
          {portal.uptime || '99.9% Uptime'}
        </span>
      </div>

      <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
        {portal.description}
      </p>

      {portal.features && portal.features.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-slate-800/80">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Fitur Utama:
          </p>
          <ul className="text-[10px] text-slate-300 space-y-0.5">
            {portal.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tooltip Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900/95 dark:border-t-slate-950/95"></div>
    </motion.div>
  );
};

export const OfficialPortalsSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<PortalTypeFilter>('Semua');
  const [selectedThematicCategory, setSelectedThematicCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoSortByVisits, setAutoSortByVisits] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'visits' | 'name'>('default');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [hoveredTooltipId, setHoveredTooltipId] = useState<string | null>(null);
  const [userVisitsDelta, setUserVisitsDelta] = useState<Record<string, number>>({});

  // Initialize and load local user visit increments
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_VISITS_KEY);
      if (saved) {
        setUserVisitsDelta(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePortalClick = (portalId: string) => {
    setUserVisitsDelta((prev) => {
      const updated = {
        ...prev,
        [portalId]: (prev[portalId] || 0) + 1,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_VISITS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    setClickedId(portalId);
    setTimeout(() => {
      setClickedId(null);
    }, 1200);
  };

  const getPortalVisits = (portal: OfficialPortal): number => {
    const base = portal.visitsCount ?? 1200;
    const added = userVisitsDelta[portal.id] || 0;
    return base + added;
  };

  const formatVisits = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toLocaleString('id-ID');
  };

  const typeFilters: { key: PortalTypeFilter; label: string; icon: React.ReactNode; count: number }[] = useMemo(() => {
    return [
      {
        key: 'Semua',
        label: 'Semua Portal',
        icon: <Layers className="w-3.5 h-3.5" />,
        count: OFFICIAL_PORTALS.length,
      },
      {
        key: 'Educational',
        label: 'Educational',
        icon: <GraduationCap className="w-3.5 h-3.5" />,
        count: OFFICIAL_PORTALS.filter((p) => p.portalType === 'Educational').length,
      },
      {
        key: 'Internal',
        label: 'Internal & Tata Kelola',
        icon: <FolderLock className="w-3.5 h-3.5" />,
        count: OFFICIAL_PORTALS.filter((p) => p.portalType === 'Internal').length,
      },
      {
        key: 'Community',
        label: 'Community & Literasi',
        icon: <Users2 className="w-3.5 h-3.5" />,
        count: OFFICIAL_PORTALS.filter((p) => p.portalType === 'Community').length,
      },
      {
        key: 'Government',
        label: 'Pemerintah',
        icon: <Building2 className="w-3.5 h-3.5" />,
        count: OFFICIAL_PORTALS.filter((p) => p.portalType === 'Government').length,
      },
    ];
  }, []);

  const thematicCategories = [
    'Semua',
    'Kemendikdasmen & SMK',
    'Akreditasi BAN-PDM',
    'GTK & Kepegawaian ASN',
    'Pemerintah & Komdigi',
  ];

  const totalCommunityVisits = useMemo(() => {
    return OFFICIAL_PORTALS.reduce((acc, p) => acc + getPortalVisits(p), 0);
  }, [userVisitsDelta]);

  const filteredPortals = useMemo(() => {
    const filtered = OFFICIAL_PORTALS.filter((portal) => {
      const matchType =
        selectedType === 'Semua' || portal.portalType === selectedType;
      const matchThematic =
        selectedThematicCategory === 'Semua' || portal.category === selectedThematicCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        portal.name.toLowerCase().includes(q) ||
        portal.shortName.toLowerCase().includes(q) ||
        portal.description.toLowerCase().includes(q) ||
        portal.institution.toLowerCase().includes(q) ||
        portal.url.toLowerCase().includes(q) ||
        portal.badge.toLowerCase().includes(q) ||
        (portal.portalType && portal.portalType.toLowerCase().includes(q)) ||
        portal.features?.some((f) => f.toLowerCase().includes(q));

      return matchType && matchThematic && matchQuery;
    });

    // Auto-sort by most visited takes highest precedence when enabled
    if (autoSortByVisits || sortBy === 'visits') {
      return [...filtered].sort((a, b) => getPortalVisits(b) - getPortalVisits(a));
    } else if (sortBy === 'name') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedType, selectedThematicCategory, searchQuery, sortBy, autoSortByVisits, userVisitsDelta]);

  const handleCopyUrl = (portal: OfficialPortal, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portal.url);
    setCopiedId(portal.id);
    handlePortalClick(portal.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSharePortal = async (portal: OfficialPortal, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePortalClick(portal.id);

    const shareData = {
      title: `${portal.name} - Portal Resmi Kedinasan & Pendidikan`,
      text: `${portal.name} (${portal.institution}): ${portal.description}`,
      url: portal.url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setSharedId(portal.id);
        setTimeout(() => setSharedId(null), 2500);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback if Web Share API is not supported or aborted
    try {
      await navigator.clipboard.writeText(`${portal.name}\n${portal.url}`);
      setSharedId(portal.id);
      setTimeout(() => setSharedId(null), 2500);
    } catch {
      // ignore
    }
  };

  const getPortalIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'KeyRound':
        return <KeyRound className="w-6 h-6" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6" />;
      case 'Radio':
        return <Radio className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      default:
        return <Globe2 className="w-6 h-6" />;
    }
  };

  const getBadgeStyle = (badgeColor: string) => {
    switch (badgeColor) {
      case 'red':
        return 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30';
      case 'blue':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'purple':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'teal':
        return 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30';
      case 'sky':
        return 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30';
      case 'rose':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30';
      case 'indigo':
      default:
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';
    }
  };

  const getAccentColor = (badgeColor: string) => {
    switch (badgeColor) {
      case 'red':
        return 'hover:border-red-500/60 focus-within:border-red-500/60 group-hover:text-red-600 dark:group-hover:text-red-400';
      case 'blue':
        return 'hover:border-blue-500/60 focus-within:border-blue-500/60 group-hover:text-blue-600 dark:group-hover:text-blue-400';
      case 'emerald':
        return 'hover:border-emerald-500/60 focus-within:border-emerald-500/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400';
      case 'amber':
        return 'hover:border-amber-500/60 focus-within:border-amber-500/60 group-hover:text-amber-600 dark:group-hover:text-amber-400';
      case 'purple':
        return 'hover:border-purple-500/60 focus-within:border-purple-500/60 group-hover:text-purple-600 dark:group-hover:text-purple-400';
      case 'teal':
        return 'hover:border-teal-500/60 focus-within:border-teal-500/60 group-hover:text-teal-600 dark:group-hover:text-teal-400';
      case 'sky':
        return 'hover:border-sky-500/60 focus-within:border-sky-500/60 group-hover:text-sky-600 dark:group-hover:text-sky-400';
      case 'rose':
        return 'hover:border-rose-500/60 focus-within:border-rose-500/60 group-hover:text-rose-600 dark:group-hover:text-rose-400';
      case 'indigo':
      default:
        return 'hover:border-indigo-500/60 focus-within:border-indigo-500/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400';
    }
  };

  const getCardGlowShadow = (badgeColor: string) => {
    switch (badgeColor) {
      case 'red':
      case 'rose':
        return '0 20px 30px -10px rgba(225, 29, 72, 0.18), 0 0 25px -2px rgba(244, 63, 94, 0.28)';
      case 'blue':
      case 'sky':
        return '0 20px 30px -10px rgba(14, 165, 233, 0.18), 0 0 25px -2px rgba(56, 189, 248, 0.28)';
      case 'emerald':
      case 'teal':
        return '0 20px 30px -10px rgba(16, 185, 129, 0.18), 0 0 25px -2px rgba(52, 211, 153, 0.28)';
      case 'amber':
        return '0 20px 30px -10px rgba(245, 158, 11, 0.18), 0 0 25px -2px rgba(251, 191, 36, 0.28)';
      case 'purple':
        return '0 20px 30px -10px rgba(168, 85, 247, 0.18), 0 0 25px -2px rgba(192, 132, 252, 0.28)';
      case 'indigo':
      default:
        return '0 20px 30px -10px rgba(99, 102, 241, 0.18), 0 0 25px -2px rgba(129, 140, 248, 0.28)';
    }
  };

  const getButtonBg = (badgeColor: string) => {
    switch (badgeColor) {
      case 'red':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20';
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20';
      case 'teal':
        return 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20';
      case 'sky':
        return 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20';
      case 'rose':
        return 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20';
      case 'indigo':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20';
    }
  };

  return (
    <section id="portal-resmi" className="py-8 space-y-8 scroll-mt-24 text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>PORTAL KEDINASAN & LEMBAGA RESMI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Portal Layanan Pendidikan & Kedinasan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Akses langsung ke portal resmi Kemendikdasmen, Direktorat SMK, Rumah Pendidikan, sistem akreditasi SISPENA BAN-PDM, layanan Paspor GTK SIMPKB / PPG, MyASN BKN, Pemerintah Provinsi Jawa Barat, dan Kementerian Komdigi RI.
          </p>
        </div>

        {/* Global Live Status & Visits Metric */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">100% Online & Terkoneksi</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-semibold">{formatVisits(totalCommunityVisits)} Akses Komunitas</span>
          </div>
        </div>
      </div>

      {/* Prominent Search, Filters & Auto-Sort Bar */}
      <div className="bento-glass rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        {/* Search Bar + Controls */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-official-portals"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama portal, sistem akreditasi, instansi, kata kunci, atau URL resmi..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs rounded-full cursor-pointer"
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Toggles: Auto-Sort by Most Visited & Custom Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Auto-sort by Most Visited Toggle Button */}
            <button
              id="btn-auto-sort-most-visited"
              onClick={() => {
                const nextState = !autoSortByVisits;
                setAutoSortByVisits(nextState);
                if (nextState) {
                  setSortBy('visits');
                } else {
                  setSortBy('default');
                }
              }}
              title="Urutkan kartu secara otomatis berdasarkan portal yang paling banyak dikunjungi"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                autoSortByVisits
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-md shadow-amber-500/25 ring-2 ring-amber-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500'
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  autoSortByVisits ? 'fill-white text-white animate-pulse' : 'text-amber-500'
                }`}
              />
              <span>Auto-sort Populer</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  autoSortByVisits ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {autoSortByVisits ? 'AKTIF' : 'OFF'}
              </span>
            </button>

            {/* Standard Sort Selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline font-medium text-slate-500">Urutan:</span>
              <select
                id="select-portal-sort"
                value={sortBy}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setSortBy(val);
                  if (val === 'visits') {
                    setAutoSortByVisits(true);
                  } else {
                    setAutoSortByVisits(false);
                  }
                }}
                className="bg-transparent border-none text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
              >
                <option value="default">Rekomendasi</option>
                <option value="visits">🔥 Paling Banyak Dikunjungi</option>
                <option value="name">Nama (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Category Filter Tabs ('Internal', 'Educational', 'Community', 'Government') */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              <span>Filter Kategori Portal:</span>
            </div>

            {/* Reset All Filters Button */}
            {(selectedType !== 'Semua' || selectedThematicCategory !== 'Semua' || searchQuery || autoSortByVisits) && (
              <button
                onClick={() => {
                  setSelectedType('Semua');
                  setSelectedThematicCategory('Semua');
                  setSearchQuery('');
                  setAutoSortByVisits(false);
                  setSortBy('default');
                }}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {typeFilters.map((tab) => {
              const isActive = selectedType === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`btn-filter-type-${tab.key.toLowerCase()}`}
                  onClick={() => setSelectedType(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Sub-Category Pills & Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline mr-1">
              Topik:
            </span>
            {thematicCategories.map((cat) => {
              const count =
                cat === 'Semua'
                  ? OFFICIAL_PORTALS.length
                  : OFFICIAL_PORTALS.filter((p) => p.category === cat).length;
              const isActive = selectedThematicCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedThematicCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-semibold shadow-sm'
                      : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="opacity-60 text-[10px] font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Indicator */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 font-medium">
            Menampilkan <span className="font-bold text-slate-900 dark:text-white">{filteredPortals.length}</span> dari {OFFICIAL_PORTALS.length} portal
          </div>
        </div>
      </div>

      {/* Portal Cards Grid with Framer Motion AnimatePresence & layout smooth reordering */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredPortals.map((portal) => {
            const isCopied = copiedId === portal.id;
            const isShared = sharedId === portal.id;
            const isJustClicked = clickedId === portal.id;
            const isTooltipVisible = hoveredTooltipId === portal.id;
            const urlDomain = new URL(portal.url).hostname;
            const visits = getPortalVisits(portal);
            const isPopular = visits >= 5000;
            const isOnline = portal.status !== 'maintenance';

            return (
              <motion.div
                key={portal.id}
                layout
                id={`card-${portal.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  boxShadow: getCardGlowShadow(portal.badgeColor),
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.99 }}
                className={`bento-card group rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-visible transition-all duration-300 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400/80 dark:hover:border-blue-500/80 ${getAccentColor(
                  portal.badgeColor
                )}`}
              >
                {/* Lightweight Tooltip Display on Card Hover / Info Button Trigger */}
                <AnimatePresence>
                  {isTooltipVisible && (
                    <PortalTooltip portal={portal} visits={visits} />
                  )}
                </AnimatePresence>

                {/* Subtle dynamic background ambient glow on card hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

                {/* Card Top */}
                <div className="space-y-4 relative z-10">
                  {/* Header Row: Icon + Badge + Actions (Tooltip Info, Share, Copy, Status) */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${getBadgeStyle(
                          portal.badgeColor
                        )}`}
                      >
                        {getPortalIcon(portal.iconName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border tracking-wider uppercase ${getBadgeStyle(
                              portal.badgeColor
                            )}`}
                          >
                            {portal.badge}
                          </span>

                          {/* Popular Badge */}
                          {isPopular && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40">
                              <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                              <span>Populer</span>
                            </span>
                          )}

                          {/* Category Badge Pill */}
                          {portal.portalType && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                              {portal.portalType}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[150px] sm:max-w-[180px]">
                          {portal.institution}
                        </p>
                      </div>
                    </div>

                    {/* Actions Toolbar: Tooltip Info, Share, Copy, and Visual Status Dot */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Tooltip trigger button */}
                      <button
                        type="button"
                        id={`btn-tooltip-${portal.id}`}
                        onMouseEnter={() => setHoveredTooltipId(portal.id)}
                        onMouseLeave={() => setHoveredTooltipId(null)}
                        onFocus={() => setHoveredTooltipId(portal.id)}
                        onBlur={() => setHoveredTooltipId(null)}
                        aria-describedby={`tooltip-${portal.id}`}
                        title="Lihat info ringkas layanan (Tooltip)"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      {/* Share Button (Web Share API) */}
                      <button
                        type="button"
                        id={`btn-share-${portal.id}`}
                        onClick={(e) => handleSharePortal(portal, e)}
                        title="Bagikan tautan portal resmi"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
                      >
                        {isShared ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                        {isShared && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] rounded font-semibold whitespace-nowrap shadow-md">
                            Dibagikan!
                          </span>
                        )}
                      </button>

                      {/* Copy URL Button */}
                      <button
                        type="button"
                        id={`btn-copy-${portal.id}`}
                        onClick={(e) => handleCopyUrl(portal, e)}
                        title="Salin URL Portal"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Visual Status Indicator: Pulsing Beacon */}
                      <div
                        title={isOnline ? `Status: Online (${portal.uptime || '99.9% Uptime'})` : 'Status: Pemeliharaan Sistem'}
                        className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/90 text-[10px] font-medium border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <span className="relative flex h-2 w-2">
                          {isOnline ? (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </>
                          ) : (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </>
                          )}
                        </span>
                        <span className={isOnline ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-amber-700 dark:text-amber-400 font-semibold'}>
                          {isOnline ? 'Online' : 'Maint.'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Portal Title & Description with hover trigger for context */}
                  <div
                    onMouseEnter={() => setHoveredTooltipId(portal.id)}
                    onMouseLeave={() => setHoveredTooltipId(null)}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {portal.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {portal.description}
                    </p>
                  </div>

                  {/* Features / Highlights Pills */}
                  {portal.features && portal.features.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {portal.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Domain, Gamified Visits Counter & Action Button */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3 relative z-10">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Globe2 className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{urlDomain}</span>
                    </span>

                    {/* Mock Visits Counter with Gamified Badge */}
                    <div
                      title="Jumlah interaksi & akses oleh komunitas guru, siswa, dan praktisi"
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        isJustClicked
                          ? 'bg-blue-500 text-white scale-105 shadow-md shadow-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
                      }`}
                    >
                      <Eye className={`w-3 h-3 ${isJustClicked ? 'text-white' : 'text-blue-500'}`} />
                      <span>{formatVisits(visits)} akses</span>
                    </div>
                  </div>

                  <a
                    id={`btn-open-portal-${portal.id}`}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePortalClick(portal.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${getButtonBg(
                      portal.badgeColor
                    )}`}
                  >
                    <span>
                      {portal.isDirectLogin ? 'Akses Portal / Login' : 'Kunjungi Portal Resmi'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State when search returns no match */}
      {filteredPortals.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Tidak ada portal kedinasan yang cocok dengan kriteria filter atau pencarian "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('Semua');
              setSelectedThematicCategory('Semua');
              setAutoSortByVisits(false);
              setSortBy('default');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            Reset Semua Filter & Tampilkan Seluruh Portal
          </button>
        </div>
      )}
    </section>
  );
};

