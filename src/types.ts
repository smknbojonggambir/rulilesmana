export interface TeacherProfile {
  name: string;
  degree: string;
  nip: string;
  certification: string;
  subjects: string[];
  school: string;
  institutionBranch: string;
  province: string;
  avatarUrl: string;
  schoolLogoUrl: string;
  status: 'Online' | 'Sedang Mengajar' | 'Istirahat' | 'Supervisi';
  quote: string;
  email: string;
  phone?: string;
  experienceYears: number;
  bio?: string;
  education?: Array<{ degree: string; institution: string; year: string; field: string }>;
  expertise?: string[];
  competencies?: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendPositive?: boolean;
  iconName: string;
  accentColor: string;
}

export interface LMSLink {
  id: string;
  title: string;
  subject: string;
  description: string;
  url: string;
  icon: string;
  badge: string;
  accentTheme: 'indigo' | 'emerald' | 'violet' | 'amber' | 'red' | 'sky' | 'rose';
  modulesCount: number;
  activeStudents: number;
  features: string[];
}

export interface StudentWork {
  id: string;
  title: string;
  category: 'Branding & Logo' | 'Ilustrasi Vektor' | 'Fotografi' | 'UI/UX Design' | '3D Artwork';
  studentName: string;
  studentClass: string;
  year: string;
  imageUrl: string;
  description: string;
  toolsUsed: string[];
  likes: number;
  views: number;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Desain Grafis' | 'Website' | 'Aplikasi' | 'Media Pembelajaran' | 'Proyek DKV' | 'Proyek Informatika' | 'Karya Siswa';
  type: 'Guru' | 'Siswa' | 'Kolaborasi';
  creator: string;
  year: string;
  imageUrl: string;
  description: string;
  fullContent?: string;
  toolsUsed: string[];
  link?: string;
  featured?: boolean;
  metrics?: { label: string; value: string };
}

export interface LearningProject {
  id: string;
  title: string;
  category: 'LMS' | 'Website Pendidikan' | 'Aplikasi Presensi' | 'Media Pembelajaran' | 'Bank Soal' | 'Digital Assessment' | 'Project-Based Learning';
  description: string;
  highlight: string;
  techStack: string[];
  status: 'Aktif / Operasional' | 'Pengembangan' | 'Versi 2.4 Live';
  url?: string;
  iconName: string;
  metrics: string;
  features: string[];
}

export interface ActivityDoc {
  id: string;
  title: string;
  category: 'Pembelajaran' | 'Praktik' | 'Proyek' | 'Pelatihan' | 'Workshop' | 'Kegiatan Sekolah';
  date: string;
  location: string;
  imageUrl: string;
  caption: string;
  participantCount?: string;
}

export interface PublicationArticle {
  id: string;
  title: string;
  category: 'Artikel' | 'Tutorial' | 'Materi' | 'Refleksi' | 'Dokumentasi' | 'Informasi Pembelajaran';
  date: string;
  readTime: string;
  summary: string;
  content: string;
  author: string;
  tags: string[];
  imageUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  issueDate?: string;
  validUntil?: string;
  category: 'Sertifikat Pendidik' | 'Sertifikasi Asesor' | 'Kecerdasan Buatan & AI' | 'Pengembangan Kompetensi & Diklat' | 'Kompetensi Kejuruan & IT' | 'Inklusi & Literasi' | 'Pelatihan' | 'Workshop' | 'Seminar';
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  durationHours?: string;
  imageUrl?: string;
  badgeImage?: string;
  description: string;
  curriculumModules?: string[];
  signatory?: string;
  skills: string[];
  badgeColor?: string;
}

export interface AdminChecklistItem {
  id: string;
  title: string;
  category: 'Perangkat Pembelajaran' | 'Evaluasi & Nilai' | 'Jurnal & Presensi' | 'Laporan & Tata Kelola';
  status: 'Lengkap' | 'Proses' | 'Belum Tersedia';
  progress: number; // 0 - 100
  documentCount: number;
  lastUpdated: string;
  description: string;
  icon: string;
  privateOnly?: boolean;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  className: string;
  subject: string;
  room: string;
  topic: string;
  isToday: boolean;
  isActiveNow?: boolean;
  status: 'Selesai' | 'Berlangsung' | 'Akan Datang';
}

export interface ModuleItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  category: 'Perangkat' | 'Administrasi' | 'Penilaian' | 'Sumber Belajar' | 'Tata Kelola';
  itemCount: number;
  badge?: string;
  accentColor: string;
  detailsCountLabel: string;
  lastUpdated: string;
}

export interface TeachingDocument {
  id: string;
  title: string;
  code: string;
  type: 'Modul Ajar' | 'ATP' | 'CP' | 'Silabus' | 'Bahan Tayang' | 'SK';
  subject: 'DKV' | 'Informatika' | 'Umum';
  classGrade: 'X DKV' | 'XI DKV' | 'XII DKV' | 'X Informatika';
  semester: 'Ganjil' | 'Genap' | 'Semua';
  fileSize: string;
  updatedAt: string;
  downloadUrl?: string;
}

export interface TeachingJournal {
  id: string;
  date: string;
  className: string;
  subject: string;
  meetingNumber: number;
  competency: string;
  activities: string;
  attendancePresent: number;
  attendanceAbsent: number;
  notes: string;
}

export interface StudentRecord {
  id: string;
  nisn: string;
  name: string;
  className: string;
  gender: 'L' | 'P';
  attendanceRate: number;
  assignmentAvg: number;
  midExamScore: number;
  finalExamScore: number;
  status: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
  specialSkill: string;
}

export interface QuestionBankItem {
  id: string;
  subject: 'DKV' | 'Informatika';
  topic: string;
  type: 'Pilihan Ganda' | 'Praktik Portofolio' | 'Studi Kasus' | 'Esai';
  questionCount: number;
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
  author: string;
  lastEdited: string;
}

export interface MaterialItem {
  id: string;
  title: string;
  subject: 'DKV' | 'Informatika';
  mediaType: 'E-Book PDF' | 'Video Tutorial' | 'Figma File' | 'Source Code' | 'Slide Canva';
  format: string;
  size: string;
  downloads: number;
  rating: number;
  tag: string;
}

export interface RpmSyncState {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  syncStep: string;
  syncProgress: number;
  syncCount: number;
  syncSource: string;
  recentSyncedItems: string[];
}

export interface RpmSyncContextType extends RpmSyncState {
  triggerSync: (manual?: boolean) => Promise<void>;
  autoSyncEnabled: boolean;
  setAutoSyncEnabled: (enabled: boolean) => void;
}

export interface OfficialPortal {
  id: string;
  name: string;
  shortName: string;
  category: 'Kemendikdasmen & SMK' | 'Akreditasi BAN-PDM' | 'GTK & Kepegawaian ASN' | 'Pemerintah & Komdigi';
  url: string;
  description: string;
  institution: string;
  badge: string;
  badgeColor: 'red' | 'blue' | 'emerald' | 'amber' | 'purple' | 'teal' | 'indigo' | 'sky' | 'rose';
  iconName: string;
  features?: string[];
  isDirectLogin?: boolean;
  portalType?: 'Educational' | 'Internal' | 'Community' | 'Government';
  visitsCount?: number;
  status?: 'online' | 'maintenance' | 'operational';
  statusNote?: string;
  uptime?: string;
}

export interface MediaFootprint {
  id: string;
  name: string;
  platform: string;
  category: 'Publikasi Ilmiah & Riset' | 'Jurnalisme & Media Opini' | 'Jaringan Profesional' | 'Kemitraan & Influencer';
  url: string;
  handleOrChannel: string;
  description: string;
  highlight: string;
  badge: string;
  accentColor: 'blue' | 'emerald' | 'amber' | 'cyan' | 'indigo' | 'violet' | 'rose';
  iconName: string;
  tags: string[];
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'dkv' | 'informatika' | 'edtech';
  categoryLabel: string;
  proficiency: number; // 0 - 100
  proficiencyLabel: 'Master / Expert' | 'Advanced / Mahir' | 'Proficient / Terampil';
  experienceYears: string;
  description: string;
  useCases: string[];
  color: string;
  iconName: string;
  featured?: boolean;
}




