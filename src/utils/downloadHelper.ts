import { TEACHER_DATA } from '../data/portalData';

/**
 * Downloads a text/html file directly in the browser
 */
export const triggerFileDownload = (content: string, filename: string, mimeType: string = 'text/html') => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Generates and downloads a clean, professional Curriculum Vitae (CV) of Ruli Lesmana, S.T. Gr.
 */
export const downloadCV = () => {
  const cvHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Curriculum Vitae - ${TEACHER_DATA.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .cv-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .header-text h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .header-text h2 {
      font-size: 15px;
      font-weight: 600;
      color: #dc2626;
      margin-top: 4px;
    }
    .header-text p {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
    .contact-info {
      text-align: right;
      font-size: 12px;
      color: #475569;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1.5px solid #dc2626;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .item { margin-bottom: 14px; }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 13px;
      color: #1e293b;
    }
    .item-sub { font-size: 12px; color: #64748b; }
    .item-desc { font-size: 12px; color: #475569; margin-top: 4px; }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .skill-tag {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }
    .footer-note {
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      margin-top: 36px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }
    @media print {
      body { background: white; padding: 0; }
      .cv-container { box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="header">
      <div class="header-text">
        <h1>${TEACHER_DATA.name}</h1>
        <h2>${TEACHER_DATA.degree}</h2>
        <p>NIP. ${TEACHER_DATA.nip} • Pendidik Profesional Gr. Informatika</p>
        <p>${TEACHER_DATA.school} • ${TEACHER_DATA.institutionBranch}</p>
      </div>
      <div class="contact-info">
        <p><strong>Email:</strong> ${TEACHER_DATA.email}</p>
        <p><strong>Telepon:</strong> ${TEACHER_DATA.phone}</p>
        <p><strong>Website:</strong> https://kangruli.web.id</p>
        <p><strong>LMS:</strong> dkv-learnstudio.kangruli.web.id</p>
      </div>
    </div>

    <div class="section-title">Ringkasan Profil Pendidik</div>
    <p class="item-desc">${TEACHER_DATA.bio}</p>

    <div class="section-title">Pendidikan Formal</div>
    ${TEACHER_DATA.education
      .map(
        (edu) => `
      <div class="item">
        <div class="item-header">
          <span>${edu.degree} - ${edu.field}</span>
          <span>${edu.year}</span>
        </div>
        <div class="item-sub">${edu.institution}</div>
      </div>
    `
      )
      .join('')}

    <div class="section-title">Keahlian & Fokus Kompetensi Kejuruan</div>
    <div class="skills-grid">
      ${TEACHER_DATA.expertise
        .map((skill) => `<span class="skill-tag">${skill}</span>`)
        .join('')}
    </div>

    <div class="section-title">Sertifikasi & Lisensi Resmi</div>
    <div class="item">
      <div class="item-header">
        <span>Pendidik Tersertifikasi Gemini (Google for Education)</span>
        <span>2026 - 2029</span>
      </div>
      <div class="item-sub">Google for Education • Kompetensi Penggunaan AI Google di Lingkungan Pendidikan</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Sertifikat Pendidik Profesional (Gr. Informatika)</span>
        <span>2024</span>
      </div>
      <div class="item-sub">Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI • UPI Bandung</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Sertifikat Asesor Akreditasi Sekolah/Madrasah</span>
        <span>2024 - 2029</span>
      </div>
      <div class="item-sub">Badan Akreditasi Nasional Pendidikan Anak Usia Dini, Dasar, dan Menengah (BAN-PDM)</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Microsoft Elevate AI: AI Teaching Power & 21st Century Learning Design</span>
        <span>2026</span>
      </div>
      <div class="item-sub">Kementerian Agama RI & Microsoft Indonesia (16 Hours Learning)</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Microsoft Elevate AI: AI & Coding for Educators & Government</span>
        <span>2026</span>
      </div>
      <div class="item-sub">Alkademi (member of RADYALABS) & Microsoft Indonesia</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Badge of Completion: Explore AI Basics & Microsoft Elevate Educator Explorer</span>
        <span>2026</span>
      </div>
      <div class="item-sub">Microsoft, Biji-biji Initiative & Mereka (AI for MY Future)</div>
    </div>

    <div class="section-title">Media Publikasi & Jejak Digital</div>
    <div class="item">
      <div class="item-header">
        <span>Google Scholar (Profil Riset & Sitasi Ilmiah)</span>
      </div>
      <div class="item-desc">https://scholar.google.com/citations?user=vA6J6aEAAAAJ&hl=en — Indeksasi karya ilmiah, sitasi artikel akademis, dan riset pembelajaran vokasi TIK.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Kompasiana (Media Opini & Warga)</span>
      </div>
      <div class="item-desc">https://www.kompasiana.com/rulilesmana7929/about — Kanal opini, refleksi praktisi pendidikan kejuruan, dan literasi transformasi kurikulum merdeka.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Kumparan (Celah Cahaya)</span>
      </div>
      <div class="item-desc">https://kumparan.com/celah-cahaya — Publikasi narasi edukatif, humaniora, dan wawasan literasi digital.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Lensa Keadilan & Media Siber</span>
      </div>
      <div class="item-desc">https://lensakeadilan.id/ — Publikasi warta masyarakat, jurnalisme siber, dan advokasi literasi publik.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>LinkedIn Professional & Intellifluence Creator</span>
      </div>
      <div class="item-desc">LinkedIn: https://id.linkedin.com/in/ruli-lesmana-769b2461 | Intellifluence: https://intellifluence.com/influencer/ruli-lesmana-289374</div>
    </div>

    <div class="section-title">Karya & Inovasi Platform Pembelajaran Digital</div>
    <div class="item">
      <div class="item-header">
        <span>DKV LearnStudio — https://dkv-learnstudio.kangruli.web.id</span>
      </div>
      <div class="item-desc">LMS Desain Komunikasi Visual mandiri mencakup 24 modul praktikum vektor, tipografi, fotografi digital, dan dropzone portofolio siswa.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Digital LearnStudio — https://digital-learnstudio.kangruli.web.id</span>
      </div>
      <div class="item-desc">LMS Informatika & TIK berbasis web terintegrasi Python compiler daring dan modul jaringan komputer.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Rencana Pembelajaran Mendalam (RPM Cloud) — https://rpm.kangruli.web.id</span>
      </div>
      <div class="item-desc">Sistem manajemen administrasi Rencana Pembelajaran Mendalam (RPM) Kurikulum Merdeka terhubung cloud real-time.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Agenda Kelas Digital — https://agenda-kelas.kangruli.web.id</span>
      </div>
      <div class="item-desc">Sistem jurnal dan agenda harian pembelajaran kelas dan pemantauan target kurikulum terstruktur.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>CBT Assessment Portal — https://cbt.smknbojonggambir.web.id</span>
      </div>
      <div class="item-desc">Sistem ujian daring berbasis komputer (Computer-Based Test) terpusat untuk Asesmen Sumatif & Formatif SMKN Bojonggambir.</div>
    </div>

    <div class="footer-note">
      Dokumen Curriculum Vitae ini diterbitkan secara resmi melalui Portal Pendidik https://kangruli.web.id pada ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.
    </div>
  </div>
</body>
</html>`;

  triggerFileDownload(cvHtml, `CV_${TEACHER_DATA.name.replace(/\s+/g, '_')}_2026.html`, 'text/html');
};

/**
 * Generates and downloads an administrative teaching device document (CP, TP, ATP, Modul Ajar, Jurnal, etc.)
 */
export const downloadTeachingDocument = (docTitle: string, category: string, className: string = 'Fase E / X DKV & Informatika') => {
  const content = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${docTitle} - ${TEACHER_DATA.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; max-width: 850px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 3px double #0f172a; padding-bottom: 16px; margin-bottom: 24px; }
    .school { font-size: 16px; font-weight: 800; text-transform: uppercase; }
    .subschool { font-size: 13px; color: #475569; }
    .title { font-size: 20px; font-weight: 800; margin-top: 16px; text-transform: uppercase; color: #dc2626; }
    .meta-table { width: 100%; margin: 20px 0; border-collapse: collapse; font-size: 13px; }
    .meta-table td { padding: 6px 12px; border: 1px solid #cbd5e1; }
    .meta-table td:first-child { font-weight: 700; width: 30%; background: #f8fafc; }
    .section { margin-top: 24px; }
    .section h3 { font-size: 14px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px; }
    .section p, .section li { font-size: 13px; color: #334155; }
    .sign { margin-top: 48px; display: flex; justify-content: space-between; font-size: 13px; }
    .sign-box { text-align: center; width: 220px; }
    .sign-name { margin-top: 60px; font-weight: 700; border-bottom: 1px solid #0f172a; padding-bottom: 2px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="school">${TEACHER_DATA.school}</div>
    <div class="subschool">${TEACHER_DATA.institutionBranch} • ${TEACHER_DATA.province}</div>
    <div class="title">${docTitle}</div>
    <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Tahun Ajaran 2025/2026 • Kurikulum Merdeka SMK</p>
  </div>

  <table class="meta-table">
    <tr>
      <td>Nama Guru Pengampu</td>
      <td><strong>${TEACHER_DATA.name}</strong> (${TEACHER_DATA.degree})</td>
    </tr>
    <tr>
      <td>NIP / NUPTK</td>
      <td>${TEACHER_DATA.nip}</td>
    </tr>
    <tr>
      <td>Program Keahlian</td>
      <td>Desain Komunikasi Visual (DKV) & Informatika</td>
    </tr>
    <tr>
      <td>Fase / Rombel Target</td>
      <td>${className}</td>
    </tr>
    <tr>
      <td>Status Verifikasi</td>
      <td>🟢 Terverifikasi & Disahkan Manajemen Kurikulum Sekolah (RPM Cloud)</td>
    </tr>
    <tr>
      <td>Tanggal Dokumen</td>
      <td>${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
    </tr>
  </table>

  <div class="section">
    <h3>I. Capaian Pembelajaran & Indikator Keberhasilan</h3>
    <p>Peserta didik mampu menerapkan prinsip dasar estetika visual, pemikiran komputasional (computational thinking), dan pengoperasian perangkat lunak digital secara tepat, etis, dan bertanggung jawab sesuai standar kompetensi industri kerja.</p>
  </div>

  <div class="section">
    <h3>II. Rincian Alur Tujuan Pembelajaran (ATP)</h3>
    <ul>
      <li>Memahami konsep fundamental materi dan studi kasus nyata dalam dunia industri kreatif/TIK.</li>
      <li>Mempraktikkan pembuatan karya proyek mandiri dan kolaboratif via LMS DKV & LMS Informatika.</li>
      <li>Mendokumentasikan hasil belajar dalam portofolio digital dan repositori belajar sekolah.</li>
      <li>Mengevaluasi hasil capaian belajar melalui asesmen formatif dan sumatif berkala.</li>
    </ul>
  </div>

  <div class="section">
    <h3>III. Bahan Ajar & Tautan LMS Terkait</h3>
    <p>Akses materi lengkap, jobsheet praktikum, dan video tutorial dapat diakses langsung oleh siswa melalui portal belajar daring:</p>
    <ul>
      <li><strong>LMS DKV:</strong> https://dkv-learnstudio.kangruli.web.id</li>
      <li><strong>LMS Informatika:</strong> https://digital-learnstudio.kangruli.web.id</li>
      <li><strong>RPM Cloud Server:</strong> https://rpm.kangruli.web.id</li>
    </ul>
  </div>

  <div class="sign">
    <div class="sign-box">
      <p>Mengetahui,<br>Kepala SMKN 1 Bojonggambir</p>
      <div class="sign-name">Drs. H. Mamat Rohimat, M.Pd.</div>
      <p style="font-size: 11px; color: #64748b;">NIP. 196805121994031005</p>
    </div>
    <div class="sign-box">
      <p>Tasikmalaya, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>Guru Mata Pelajaran,</p>
      <div class="sign-name">${TEACHER_DATA.name}</div>
      <p style="font-size: 11px; color: #64748b;">NIP. ${TEACHER_DATA.nip}</p>
    </div>
  </div>
</body>
</html>`;

  const cleanFilename = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}_SMK_2026.html`;
  triggerFileDownload(content, cleanFilename, 'text/html');
};

/**
 * Downloads a digital copy of a certificate
 */
export const downloadCertificateDocument = (certTitle: string, certIssuer: string, certYear: string, certCategory: string) => {
  const content = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Salinan Sertifikat - ${certTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0f172a; text-align: center; }
    .cert-border { border: 8px double #dc2626; padding: 48px; border-radius: 12px; background: #fff; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .title { font-size: 24px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: #64748b; margin-bottom: 24px; }
    .recipient { font-size: 22px; font-weight: 700; color: #dc2626; margin: 20px 0 8px; border-bottom: 2px solid #cbd5e1; display: inline-block; padding-bottom: 4px; }
    .desc { font-size: 14px; color: #334155; max-width: 600px; margin: 0 auto 30px; line-height: 1.6; }
    .details { font-size: 13px; color: #475569; margin-top: 24px; background: #f8fafc; padding: 16px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="cert-border">
    <div class="title">SALINAN SERTIFIKAT KOMPETENSI</div>
    <div class="subtitle">PORTAL PENDIDIK RESMI — KANGRULI.WEB.ID</div>
    <p>Diberikan secara sah kepada:</p>
    <div class="recipient">${TEACHER_DATA.name} (${TEACHER_DATA.degree})</div>
    <p style="font-size: 12px; color: #64748b;">NIP. ${TEACHER_DATA.nip}</p>
    
    <div class="desc">
      Atas pencapaian dan kompetensi resmi dalam program:
      <br>
      <strong style="font-size: 16px; color: #0f172a;">${certTitle}</strong>
    </div>

    <div class="details">
      <p><strong>Lembaga Penerbit:</strong> ${certIssuer}</p>
      <p><strong>Tahun Terbit:</strong> ${certYear} • <strong>Bidang:</strong> ${certCategory}</p>
      <p><strong>Status Verifikasi:</strong> 🟢 Terdaftar & Terverifikasi pada Dokumen Portofolio Pendidik 2026</p>
    </div>
  </div>
</body>
</html>`;

  triggerFileDownload(content, `Sertifikat_${certTitle.replace(/[^a-zA-Z0-9]/g, '_')}.html`, 'text/html');
};
