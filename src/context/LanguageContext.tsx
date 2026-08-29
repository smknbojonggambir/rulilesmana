import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    profile: string;
    teachingTools: string;
    admin: string;
    publications: string;
    portfolio: string;
    studentGallery: string;
    documentation: string;
    media: string;
    contact: string;
    searchPlaceholder: string;
    rpmSync: string;
    rpmSyncing: string;
    lightMode: string;
    darkMode: string;
  };
  common: {
    viewDetails: string;
    close: string;
    readTime: string;
    all: string;
    share: string;
    download: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      profile: 'Profil & Bio',
      teachingTools: 'Perangkat Ajar',
      admin: 'Administrasi',
      publications: 'Karya Tulis & Publikasi',
      portfolio: 'Portofolio',
      studentGallery: 'Galeri Siswa',
      documentation: 'Dokumentasi',
      media: 'Media & Portal',
      contact: 'Kontak',
      searchPlaceholder: 'Cari...',
      rpmSync: 'RPM Sync',
      rpmSyncing: 'Sinkron RPM...',
      lightMode: 'Terang',
      darkMode: 'Gelap',
    },
    common: {
      viewDetails: 'Lihat Detail',
      close: 'Tutup',
      readTime: 'Waktu Baca',
      all: 'Semua',
      share: 'Bagikan',
      download: 'Unduh',
    },
  },
  en: {
    nav: {
      home: 'Home',
      profile: 'Profile & Bio',
      teachingTools: 'Teaching Tools',
      admin: 'Administration',
      publications: 'Publications & Articles',
      portfolio: 'Portfolio',
      studentGallery: 'Student Gallery',
      documentation: 'Documentation',
      media: 'Media & Portals',
      contact: 'Contact',
      searchPlaceholder: 'Search...',
      rpmSync: 'RPM Sync',
      rpmSyncing: 'Syncing RPM...',
      lightMode: 'Light',
      darkMode: 'Dark',
    },
    common: {
      viewDetails: 'View Details',
      close: 'Close',
      readTime: 'Read Time',
      all: 'All',
      share: 'Share',
      download: 'Download',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('ruli_educator_lang');
      if (savedLang === 'id' || savedLang === 'en') {
        return savedLang;
      }
    } catch {
      // Ignore
    }
    return 'id';
  });

  useEffect(() => {
    try {
      localStorage.setItem('ruli_educator_lang', language);
    } catch {
      // Ignore
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
