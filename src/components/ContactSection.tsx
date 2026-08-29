import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/portalData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Konsultasi Pembelajaran',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        category: 'Konsultasi Pembelajaran',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <section id="kontak" className="py-10 space-y-8">
      {/* Section Header */}
      <div className="text-left space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>HUBUNGI PENDIDIK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Mari Terhubung & Berkolaborasi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Terbuka untuk diskusi pengembangan kurikulum vokasi, konsultasi pembelajaran DKV & Informatika, pelatihan guru, serta program kemitraan industri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Contact Channels */}
        <div className="lg:col-span-5 space-y-5 text-left">
          <div className="bento-card rounded-2xl p-6 sm:p-7 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Saluran Komunikasi Resmi
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 dark:bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Email Institusi
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white select-all">
                    {TEACHER_DATA.email}
                  </p>
                  <p className="text-[10px] text-slate-400">Respons dalam 1x24 jam kerja</p>
                </div>
              </div>

              {/* Lokasi Institusi */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Lokasi Mengajar
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {TEACHER_DATA.school}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Jl. Bojonggambir, Kabupaten Tasikmalaya, Jawa Barat
                  </p>
                </div>
              </div>

              {/* Portal Web */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Portal RPM & LMS
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    kangruli.web.id
                  </p>
                  <p className="text-[10px] text-slate-400">Ekosistem Belajar Terpadu</p>
                </div>
              </div>
            </div>

            {/* Public Working Hours */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                Jam Pelayanan Akademik:
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Senin – Jumat: 07.30 – 16.00 WIB
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Konsultasi daring siswa via LMS DKV & Informatika tetap aktif 24 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bento-card rounded-2xl p-6 sm:p-8 text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Kirim Pesan / Permohonan Konsultasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Silakan isi formulir di bawah ini. Pesan Anda akan langsung diteruskan ke email resmi pendidik.
            </p>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                  Terima kasih. Kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali melalui alamat email yang Anda cantumkan.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Prasetyo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Kategori Pesan
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Konsultasi Pembelajaran">Konsultasi Pembelajaran</option>
                      <option value="Kolaborasi Kurikulum">Kolaborasi Kurikulum Vokasi</option>
                      <option value="Undangan Workshop/Narasumber">Undangan Workshop / Pemateri</option>
                      <option value="Kemitraan Industri">Kemitraan Industri & Magang</option>
                      <option value="Lainnya">Pertanyaan Umum Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subjek Pesan
                    </label>
                    <input
                      type="text"
                      placeholder="Subjek ringkas"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Isi Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pesan atau keperluan Anda secara jelas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
