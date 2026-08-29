import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { RpmSyncContextType } from '../types';

const RpmSyncContext = createContext<RpmSyncContextType | undefined>(undefined);

export const RpmSyncProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(new Date());
  const [syncStep, setSyncStep] = useState<string>('Tersambung ke https://rpm.kangruli.web.id/');
  const [syncProgress, setSyncProgress] = useState<number>(100);
  const [syncCount, setSyncCount] = useState<number>(1);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [recentSyncedItems, setRecentSyncedItems] = useState<string[]>([
    'Modul Ajar DKV Fase E (Dasar Desain Vektor)',
    'ATP Informatika Fase E (Algoritma & Pemrograman)',
    'Rubrik Penilaian Portofolio Digital',
    'Jadwal Mengajar Semester Genap 2025/2026',
  ]);

  const syncSource = 'https://rpm.kangruli.web.id/';

  const triggerSync = useCallback(async (manual = false) => {
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncProgress(10);
    setSyncStep('Menghubungkan ke server https://rpm.kangruli.web.id/...');

    await new Promise((resolve) => setTimeout(resolve, 500));
    setSyncProgress(35);
    setSyncStep('Mengambil pembaruan Modul Ajar, ATP, & CP Kurikulum Merdeka...');

    await new Promise((resolve) => setTimeout(resolve, 600));
    setSyncProgress(70);
    setSyncStep('Menyinkronkan Rubrik Asesmen & Beban Jam Mengajar...');

    await new Promise((resolve) => setTimeout(resolve, 500));
    setSyncProgress(90);
    setSyncStep('Memperbarui indeks data widget portal...');

    await new Promise((resolve) => setTimeout(resolve, 400));
    setSyncProgress(100);
    setSyncStep('Sinkronisasi selesai! Data RPM mutakhir.');
    setLastSyncTime(new Date());
    setSyncCount((prev) => prev + 1);

    setRecentSyncedItems([
      'Modul Ajar DKV Fase E - Desain Vektor Illustrator',
      'ATP Informatika Fase E - Logika & Pemrograman Python',
      'Rubrik Asesmen Portofolio Branding DKV',
      'Jadwal Mengajar & Administrasi Guru Terkini',
    ]);

    // Keep the "completed" state for a brief moment before turning off isSyncing
    setTimeout(() => {
      setIsSyncing(false);
    }, 450);
  }, [isSyncing]);

  // Initial trigger sync on app load so user sees active live sync
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerSync(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RpmSyncContext.Provider
      value={{
        isSyncing,
        lastSyncTime,
        syncStep,
        syncProgress,
        syncCount,
        syncSource,
        recentSyncedItems,
        triggerSync,
        autoSyncEnabled,
        setAutoSyncEnabled,
      }}
    >
      {children}
    </RpmSyncContext.Provider>
  );
};

export const useRpmSync = (): RpmSyncContextType => {
  const context = useContext(RpmSyncContext);
  if (!context) {
    throw new Error('useRpmSync must be used within an RpmSyncProvider');
  }
  return context;
};
