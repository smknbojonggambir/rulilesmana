import React, { useState } from 'react';
import {
  X,
  Download,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Printer,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  HelpCircle,
  User,
  Users,
  ShieldCheck,
  Calendar,
  Eye,
} from 'lucide-react';
import {
  TEACHER_DATA,
  TEACHING_DOCUMENTS,
  TEACHING_JOURNALS,
  SAMPLE_STUDENTS,
  QUESTION_BANK,
  MATERIALS_LIST,
} from '../data/portalData';

interface ModuleModalProps {
  moduleId: string | null;
  onClose: () => void;
  onOpenQuickJournal: () => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({
  moduleId,
  onClose,
  onOpenQuickJournal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [searchDocTerm, setSearchDocTerm] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!moduleId) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const renderContent = () => {
    switch (moduleId) {
      case 'profil':
        return (
          <div className="space-y-6 text-slate-200">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center gap-6">
              <img
                src={TEACHER_DATA.avatarUrl}
                alt={TEACHER_DATA.name}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Guru Profesional Terverifikasi
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Status: Aktif Mengajar
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">{TEACHER_DATA.name}</h3>
                <p className="text-sm text-indigo-300 font-medium">{TEACHER_DATA.degree}</p>
                <p className="text-xs text-slate-400">
                  {TEACHER_DATA.school} &bull; {TEACHER_DATA.institutionBranch}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Informasi Pendidik
                </span>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">NIP:</span>
                  <span className="font-mono text-white">{TEACHER_DATA.nip}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Sertifikasi:</span>
                  <span className="text-emerald-400 font-semibold">{TEACHER_DATA.certification}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Email Instansi:</span>
                  <span className="text-indigo-400">{TEACHER_DATA.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Masa Pengabdian:</span>
                  <span className="text-white">{TEACHER_DATA.experienceYears} Tahun</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Mata Pelajaran yang Diampu
                </span>
                <div className="space-y-1.5 pt-1">
                  {TEACHER_DATA.subjects.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-800/60 text-slate-200 border border-slate-700/50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'perangkat':
        const filteredDocs = TEACHING_DOCUMENTS.filter(
          (d) =>
            (activeFilter === 'Semua' || d.type === activeFilter || d.subject === activeFilter) &&
            d.title.toLowerCase().includes(searchDocTerm.toLowerCase())
        );

        return (
          <div className="space-y-4">
            {/* RPM Kang Ruli Integration Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-950/20">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                      Sistem Utama Terintegrasi
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">rpm.kangruli.web.id</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    Ruang Perangkat Mengajar (RPM Digital)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Akses penuh penyusunan Modul Ajar, ATP, CP, dan rubrik Kurikulum Merdeka di server RPM Kang Ruli.
                  </p>
                </div>
              </div>

              <a
                href="https://rpm.kangruli.web.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-md shadow-amber-600/30 transition whitespace-nowrap self-stretch sm:self-auto justify-center"
              >
                <span>Buka Portal RPM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['Semua', 'Modul Ajar', 'ATP', 'CP', 'Bahan Tayang', 'DKV', 'Informatika'].map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        activeFilter === f
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {f}
                    </button>
                  )
                )}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDocTerm}
                  onChange={(e) => setSearchDocTerm(e.target.value)}
                  placeholder="Cari modul / silabus..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {doc.code}
                        </span>
                        <span className="text-[10px] text-slate-400">{doc.classGrade}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-1">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {doc.fileSize} &bull; Diperbarui {doc.updatedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href="https://rpm.kangruli.web.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka di Portal RPM Kang Ruli"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>RPM</span>
                    </a>
                    <button
                      onClick={() => triggerToast(`Mengunduh file ${doc.title}... (PDF Ready)`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold border border-slate-700 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Unduh</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'administrasi':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Jurnal Harian Mengajar Guru</h4>
                <p className="text-xs text-slate-400">Rekapitulasi materi dan kehadiran siswa harian</p>
              </div>
              <button
                onClick={onOpenQuickJournal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Jurnal Baru</span>
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {TEACHING_JOURNALS.map((j) => (
                <div
                  key={j.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{j.className}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-indigo-300 font-medium">{j.subject}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{j.date}</span>
                  </div>

                  <div>
                    <p className="text-slate-300 font-semibold">{j.competency}</p>
                    <p className="text-slate-400 mt-1 leading-relaxed">{j.activities}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                    <span>
                      Hadir: <strong className="text-emerald-400">{j.attendancePresent}</strong> | Absen:{' '}
                      <strong className="text-rose-400">{j.attendanceAbsent}</strong>
                    </span>
                    <span className="italic text-slate-500">{j.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'penilaian':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Daftar Nilai & Hasil Evaluasi Belajar</h4>
                <p className="text-xs text-slate-400">Rekapitulasi nilai tugas praktik & ujian DKV</p>
              </div>
              <button
                onClick={() => triggerToast('Ekspor Rekap Nilai Format e-Rapor berhasil diunduh!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ekspor Excel</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">Kelas</th>
                    <th className="p-3 text-center">Tugas</th>
                    <th className="p-3 text-center">UTS</th>
                    <th className="p-3 text-center">UAS</th>
                    <th className="p-3 text-center">Kehadiran</th>
                    <th className="p-3 text-center">Predikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 bg-slate-900/40">
                  {SAMPLE_STUDENTS.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">
                        <div>{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">NISN: {s.nisn}</div>
                      </td>
                      <td className="p-3 text-indigo-300">{s.className}</td>
                      <td className="p-3 text-center font-mono">{s.assignmentAvg}</td>
                      <td className="p-3 text-center font-mono">{s.midExamScore}</td>
                      <td className="p-3 text-center font-mono">{s.finalExamScore}</td>
                      <td className="p-3 text-center font-mono text-emerald-400">{s.attendanceRate}%</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'siswa':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Database Siswa DKV & Informatika</h4>
              <span className="text-xs text-indigo-300 font-mono">Total 214 Siswa Terdaftar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {SAMPLE_STUDENTS.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-white text-sm">{s.name}</h5>
                      <p className="text-indigo-300 text-[11px]">{s.className} &bull; NISN {s.nisn}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold">
                      {s.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Keahlian Unggulan:</span>
                    <span className="text-white font-medium">{s.specialSkill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bank-materi':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Repositori Bahan Ajar & Tutorial</h4>
              <span className="text-xs text-indigo-300 font-mono">38 Modul Aktif</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {MATERIALS_LIST.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {mat.mediaType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{mat.size}</span>
                    </div>
                    <h5 className="font-bold text-white text-xs sm:text-sm leading-snug">
                      {mat.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">{mat.format}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">★ {mat.rating} &bull; {mat.downloads} diunduh</span>
                    <button
                      onClick={() => triggerToast(`Mengunduh materi ${mat.title}...`)}
                      className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Unduh</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bank-soal':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Bank Soal & Instrumen Asesmen</h4>
              <span className="text-xs text-indigo-300 font-mono">19 Paket Siap Uji</span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {QUESTION_BANK.map((qb) => (
                <div
                  key={qb.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                        {qb.difficulty}
                      </span>
                      <span className="text-[10px] text-indigo-300">{qb.type}</span>
                    </div>
                    <h5 className="font-bold text-white text-sm mt-1">{qb.topic}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {qb.questionCount} Butir Soal &bull; Disusun oleh {qb.author}
                    </p>
                  </div>

                  <button
                    onClick={() => triggerToast(`Pratinjau naskah soal ${qb.topic} siap!`)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-semibold transition"
                  >
                    Buka Soal
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'laporan':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Generator Laporan & Cetak Dokumen</h4>
              <span className="text-xs text-indigo-300 font-mono">Format Siap Print</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Laporan Rekapitulasi Nilai Semester Genap 2025/2026', type: 'PDF A4' },
                { title: 'Jurnal Mengajar & Agenda Guru Bulanan', type: 'PDF F4' },
                { title: 'Daftar Presensi Harian Kelas DKV 1 & 2', type: 'Excel / PDF' },
                { title: 'Instrumen Penilaian Kinerja Guru & Supervisi', type: 'PDF Standar Kemdikbud' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                      {doc.type}
                    </span>
                    <h5 className="text-sm font-bold text-white mt-2 leading-snug">{doc.title}</h5>
                  </div>
                  <button
                    onClick={() => triggerToast(`Menyiapkan cetak PDF: ${doc.title}...`)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Dokumen Sekarang</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'supervisi':
        return (
          <div className="space-y-4 text-xs text-slate-200">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 to-slate-900 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  Hasil Supervisi Akademik Terakhir
                </span>
                <h4 className="text-xl font-extrabold text-white mt-1">Nilai Evaluasi: 96.5 / 100</h4>
                <p className="text-xs text-slate-300 mt-1">Predikat: Amat Baik (A) &bull; Pengawas KCD XII</p>
              </div>
              <Award className="w-12 h-12 text-amber-400" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-bold text-white">Catatan & Umpan Balik Asesor / Kepala Sekolah:</span>
              <p className="text-slate-400 leading-relaxed italic">
                &ldquo;Pelaksanaan pembelajaran berbasis proyek (Project-Based Learning) pada konsentrasi keahlian DKV sangat inovatif. Pemanfaatan LMS dan platform presensi terpadu mempermudah monitoring perkembangan kompetensi siswa secara komprehensif.&rdquo;
              </p>
            </div>
          </div>
        );

      case 'pengaturan':
        return (
          <div className="space-y-4 text-xs text-slate-200">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400">
                  Status Integrasi Ekosistem Digital Kang Ruli
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                  4 Sistem Aktif
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    name: 'RPM Kang Ruli (Ruang Perangkat Mengajar)',
                    url: 'https://rpm.kangruli.web.id/',
                    status: 'Tersambung Live',
                    desc: 'Manajemen Modul Ajar, ATP, CP & Rubrik Asesmen',
                    color: 'text-amber-400',
                  },
                  {
                    name: 'LMS DKV LearnStudio',
                    url: 'https://dkv-learnstudio.kangruli.web.id',
                    status: 'Tersambung Live',
                    desc: 'Platform Belajar Daring Kejuruan DKV',
                    color: 'text-indigo-400',
                  },
                  {
                    name: 'LMS Digital LearnStudio (Informatika)',
                    url: 'https://digital-learnstudio.kangruli.web.id/',
                    status: 'Tersambung Live',
                    desc: 'Platform Belajar Informatika & Lab Komputer',
                    color: 'text-emerald-400',
                  },
                  {
                    name: 'Presensi GO (Absensi Online)',
                    url: 'https://presensigo.smknbojonggambir.sch.id/',
                    status: 'Tersambung Live',
                    desc: 'Monitoring Presensi QR Code Siswa',
                    color: 'text-violet-400',
                  },
                ].map((sys, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{sys.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {sys.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sys.desc}</p>
                    </div>
                    <a
                      href={sys.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-[11px] inline-flex items-center gap-1 transition flex-shrink-0"
                    >
                      <span>Buka</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'arsip':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Arsip Dokumen Akademik & Perangkat</h4>
                <p className="text-xs text-slate-400">Penyimpanan riwayat berkas dan sinkronisasi berkala</p>
              </div>
              <a
                href="https://rpm.kangruli.web.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow"
              >
                <span>Arsip di RPM</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {[
                { title: 'SK Beban Mengajar Guru Semester Genap 2025/2026', size: '2.1 MB', date: 'Jan 2026' },
                { title: 'Arsip Perangkat Mengajar DKV TA 2024/2025 Lengkap', size: '48.2 MB', date: 'Jul 2025' },
                { title: 'Sertifikat Pendidik Profesional Gr. Kemendikbud', size: '1.4 MB', date: 'Nov 2024' },
                { title: 'Piagam Penghargaan Pembimbing LKS DKV Tingkat Kota', size: '3.8 MB', date: 'Okt 2025' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] text-indigo-400 font-mono">{item.date}</span>
                    <h5 className="text-xs font-bold text-white mt-1 leading-snug">{item.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{item.size} &bull; Cloud Storage Synced</p>
                  </div>
                  <button
                    onClick={() => triggerToast(`Mengunduh arsip: ${item.title}...`)}
                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold transition flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Unduh Arsip</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6 text-center text-slate-400 space-y-3">
            <Layers className="w-10 h-10 mx-auto text-indigo-400 animate-bounce" />
            <h4 className="text-base font-bold text-white">Modul Terintegrasi Aktif</h4>
            <p className="text-xs">
              Seluruh data modul terhubung secara real-time dengan basis data akademik SMK Negeri Bojonggambir.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="module-modal-container"
        className="w-full max-w-3xl bg-[#0B1120] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-white capitalize">
              Modul {moduleId.replace('-', ' ')}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-1">{renderContent()}</div>

        {/* Modal Toast */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xl border border-indigo-400/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
