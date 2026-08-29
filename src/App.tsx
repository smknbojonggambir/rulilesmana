import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RpmSyncProvider } from './context/RpmSyncContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickAccessSection } from './components/QuickAccessSection';
import { EducatorProfileSection } from './components/EducatorProfileSection';
import { LmsHubSection } from './components/LmsHubSection';
import { TeacherAdminSection } from './components/TeacherAdminSection';
import { PortfolioSection } from './components/PortfolioSection';
import { LearningProjectsSection } from './components/LearningProjectsSection';
import { DocumentationSection } from './components/DocumentationSection';
import { PublicationsSection } from './components/PublicationsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { MediaFootprintSection } from './components/MediaFootprintSection';
import { OfficialPortalsSection } from './components/OfficialPortalsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { LazySection } from './components/LazySection';
import { SectionDivider } from './components/SectionDivider';

// Modals
import { AdminModuleModal } from './components/AdminModuleModal';
import { StudentWorkModal } from './components/StudentWorkModal';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { ActivityImageModal } from './components/ActivityImageModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { QuickJournalModal } from './components/QuickJournalModal';
import { CertificateModal } from './components/CertificateModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Types & Data
import { PortfolioItem, ActivityDoc, PublicationArticle, StudentWork, CertificateItem } from './types';
import { TEACHING_JOURNALS } from './data/portalData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeModuleModal, setActiveModuleModal] = useState<string | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDoc | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<PublicationArticle | null>(null);
  const [selectedStudentWork, setSelectedStudentWork] = useState<StudentWork | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isQuickJournalOpen, setIsQuickJournalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll spy to dynamically track active section
  useEffect(() => {
    const sections = [
      'hero',
      'profil',
      'pembelajaran',
      'administrasi',
      'portfolio',
      'proyek',
      'dokumentasi',
      'publikasi',
      'sertifikat',
      'media-digital',
      'portal-resmi',
      'kontak',
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenModule = (moduleId: string) => {
    setActiveModuleModal(moduleId);
  };

  const handleSaveJournal = (entry: any) => {
    TEACHING_JOURNALS.unshift({
      id: `jrn-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      className: entry.className,
      subject: entry.subject,
      meetingNumber: entry.meetingNumber,
      competency: entry.competency,
      activities: entry.activities,
      attendancePresent: entry.present,
      attendanceAbsent: entry.absent,
      notes: entry.notes || 'Dicatat via Jurnal Cepat Portal 2026',
    });
  };

  return (
    <ThemeProvider>
      <RpmSyncProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif] bg-grid-pattern selection:bg-red-600 selection:text-white relative">
          {/* Top Sticky Modern Navigation Bar */}
          <Navbar
            activeSection={activeSection}
            onSelectSection={handleScrollToSection}
            onOpenModule={handleOpenModule}
            onOpenQuickJournal={() => setIsQuickJournalOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Comprehensive Educator Portal Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 sm:space-y-16">
            {/* 1. Hero Presentation Section */}
            <HeroSection
              onScrollTo={handleScrollToSection}
              onOpenQuickJournal={() => setIsQuickJournalOpen(true)}
            />

            {/* 2. Quick Access Flagship LMS & RPM Cards */}
            <QuickAccessSection
              onOpenModule={handleOpenModule}
              onScrollTo={handleScrollToSection}
            />

            <SectionDivider
              variant="rose"
              icon="sparkles"
              label="Profil & Rekap Capaian"
            />

            {/* 3. Educator Profile & 4 Priority Stats */}
            <LazySection minHeight="250px">
              <EducatorProfileSection />
            </LazySection>

            <SectionDivider
              variant="indigo"
              icon="graduation"
              label="Ekosistem Pembelajaran DKV"
            />

            {/* 4. Digital Learning Hub & Active Schedule */}
            <LazySection minHeight="300px">
              <LmsHubSection
                onOpenModule={handleOpenModule}
                onOpenQuickJournal={() => setIsQuickJournalOpen(true)}
              />
            </LazySection>

            <SectionDivider
              variant="emerald"
              icon="layers"
              label="Administrasi & Jurnal RPM"
            />

            {/* 5. Teacher Administration Portal (Kelengkapan 92%) */}
            <LazySection minHeight="300px">
              <TeacherAdminSection
                onOpenModule={handleOpenModule}
                onOpenQuickJournal={() => setIsQuickJournalOpen(true)}
              />
            </LazySection>

            <SectionDivider
              variant="amber"
              icon="palette"
              label="Karya & Portofolio Siswa"
            />

            {/* 6. Creative Portfolio & Student Works */}
            <LazySection minHeight="400px">
              <PortfolioSection
                onSelectPortfolio={(item) => setSelectedPortfolio(item)}
              />
            </LazySection>

            <SectionDivider
              variant="cyan"
              icon="code"
              label="Proyek & Inovasi EdTech"
            />

            {/* 7. Learning Projects & EdTech Inovasi */}
            <LazySection minHeight="350px">
              <LearningProjectsSection />
            </LazySection>

            <SectionDivider
              variant="rose"
              icon="camera"
              label="Dokumentasi & Galeri Praktik"
            />

            {/* 8. Activity Photo Documentation */}
            <LazySection minHeight="400px">
              <DocumentationSection
                onSelectActivity={(doc) => setSelectedActivity(doc)}
              />
            </LazySection>

            <SectionDivider
              variant="indigo"
              icon="bookmark"
              label="Publikasi & Refleksi Mengajar"
            />

            {/* 9. Pedagogical Publications & Articles */}
            <LazySection minHeight="300px">
              <PublicationsSection
                onSelectArticle={(art) => setSelectedArticle(art)}
              />
            </LazySection>

            <SectionDivider
              variant="amber"
              icon="award"
              label="Sertifikasi & Pengembangan Diri"
            />

            {/* 10. Certificates & Professional Development */}
            <LazySection minHeight="250px">
              <CertificatesSection />
            </LazySection>

            <SectionDivider
              variant="cyan"
              icon="globe"
              label="Jejak Media & Publikasi Digital"
            />

            {/* 11. Media & Digital Footprint */}
            <LazySection minHeight="300px">
              <MediaFootprintSection />
            </LazySection>

            <SectionDivider
              variant="rose"
              icon="layers"
              label="Portal Resmi Pendidikan & GTK"
            />

            {/* 12. Official Portals & Government Systems */}
            <LazySection minHeight="300px">
              <OfficialPortalsSection />
            </LazySection>

            <SectionDivider
              variant="indigo"
              icon="mail"
              label="Kontak & Kolaborasi Resmi"
            />

            {/* 13. Official Contact & Collaboration */}
            <LazySection minHeight="250px">
              <ContactSection />
            </LazySection>
          </main>

          {/* Floating Back to Top Button (appears past hero section) */}
          <BackToTopButton heroElementId="hero" />

          {/* Global Footer */}
          <Footer onScrollTo={handleScrollToSection} />

          {/* =========================================================
              INTERACTIVE DETAIL MODALS & INSPECTORS
             ========================================================= */}

          {/* Global Search Modal (Ctrl+K) */}
          <GlobalSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectPortfolio={(item) => setSelectedPortfolio(item)}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onSelectActivity={(act) => setSelectedActivity(act)}
            onSelectAdminModule={(modId) => setActiveModuleModal(modId)}
            onSelectCertificate={(cert) => setSelectedCertificate(cert)}
            onScrollToSection={handleScrollToSection}
          />

          {/* Admin Checklist / Module Inspector Modal */}
          <AdminModuleModal
            moduleId={activeModuleModal}
            onClose={() => setActiveModuleModal(null)}
            onOpenQuickJournal={() => {
              setActiveModuleModal(null);
              setIsQuickJournalOpen(true);
            }}
          />

          {/* Portfolio Item Detail Modal */}
          <PortfolioDetailModal
            item={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />

          {/* Activity Photo Lightbox Modal */}
          <ActivityImageModal
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />

          {/* Pedagogical Article Reader Modal */}
          <ArticleReaderModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />

          {/* Certificate Detail Modal from Search */}
          <CertificateModal
            cert={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />

          {/* Legacy Student Work Modal */}
          <StudentWorkModal
            work={selectedStudentWork}
            onClose={() => setSelectedStudentWork(null)}
          />

          {/* Quick Teaching Journal Input Modal */}
          <QuickJournalModal
            isOpen={isQuickJournalOpen}
            onClose={() => setIsQuickJournalOpen(false)}
            onSave={handleSaveJournal}
          />
        </div>
        </LanguageProvider>
      </RpmSyncProvider>
    </ThemeProvider>
  );
}
