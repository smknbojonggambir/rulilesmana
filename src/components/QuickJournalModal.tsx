import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, BookOpen, Users, FileText } from 'lucide-react';

interface QuickJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: any) => void;
}

export const QuickJournalModal: React.FC<QuickJournalModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    className: 'XI DKV 1',
    subject: 'Dasar-Dasar Desain Komunikasi Visual',
    meetingNumber: 8,
    competency: '',
    activities: '',
    present: 36,
    absent: 0,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSave(formData);
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="quick-journal-modal-box"
        className="w-full max-w-xl bg-[#0C1222] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">Input Jurnal Mengajar Harian</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Jurnal Mengajar Tersimpan!</h4>
            <p className="text-xs text-slate-400">
              Catatan pembelajaran berhasil disinkronkan ke administrasi guru.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Kelas / Rombel</label>
                <select
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="XI DKV 1">XI DKV 1</option>
                  <option value="XI DKV 2">XI DKV 2</option>
                  <option value="X DKV 1">X DKV 1</option>
                  <option value="X DKV 2">X DKV 2</option>
                  <option value="X Informatika 1">X Informatika 1</option>
                  <option value="X Informatika 2">X Informatika 2</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Mata Pelajaran</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Materi / Capaian Pembelajaran
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Praktik Pembuatan Maskot Karakter Berbasis Vektor"
                value={formData.competency}
                onChange={(e) => setFormData({ ...formData, competency: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Ringkasan Aktivitas Pembelajaran
              </label>
              <textarea
                rows={3}
                required
                placeholder="Uraikan kegiatan pembuka, inti demonstrasi praktikum, dan penutup kelas..."
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Jumlah Siswa Hadir</label>
                <input
                  type="number"
                  value={formData.present}
                  onChange={(e) =>
                    setFormData({ ...formData, present: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Siswa Tidak Hadir</label>
                <input
                  type="number"
                  value={formData.absent}
                  onChange={(e) =>
                    setFormData({ ...formData, absent: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Catatan Khusus Guru</label>
              <input
                type="text"
                placeholder="Contoh: Seluruh siswa antusias, tugas diselesaikan tepat waktu."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-3 flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-lg shadow-indigo-600/30"
              >
                Simpan Jurnal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
