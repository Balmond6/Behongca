import { Language } from '../types';

export const UI_COPY: Record<
  Language,
  {
    nav: {
      research: string;
      formulation: string;
      htstSmart: string;
      archive: string;
      references: string;
      quickSearch: string;
    };
    controls: {
      languageLabel: string;
      themeLight: string;
      themeDark: string;
      textNormal: string;
      textLarge: string;
      tocTitle: string;
    };
    hero: {
      kicker: string;
      title: string;
      subtitle: string;
      authorsLabel: string;
      ctaExplore: string;
      ctaArchive: string;
      metrics: {
        respondentsLabel: string;
        cariesLabel: string;
        phLabel: string;
        htstLabel: string;
      };
    };
    sections: {
      abstractTitle: string;
      abstractHeading: string;
      surveyTitle: string;
      surveyHeading: string;
      surveyLead: string;
      ingredientsTitle: string;
      ingredientsHeading: string;
      ingredientsLead: string;
      formulationTitle: string;
      formulationHeading: string;
      formulationLead: string;
      htstTitle: string;
      htstHeading: string;
      htstLead: string;
      smartTitle: string;
      smartHeading: string;
      smartLead: string;
      archiveTitle: string;
      archiveHeading: string;
      archiveLead: string;
      conclusionsTitle: string;
      conclusionsHeading: string;
      referencesTitle: string;
      referencesHeading: string;
    };
    search: {
      placeholder: string;
      emptyPrompt: string;
      noResults: string;
      groupPaper: string;
      groupDocs: string;
      hintNavigate: string;
      close: string;
    };
    archive: {
      uploadTitle: string;
      dropHint: string;
      fileSelected: string;
      titleLabel: string;
      categoryLabel: string;
      authorLabel: string;
      langLabel: string;
      descLabel: string;
      submitBtn: string;
      uploadingBtn: string;
      filterAll: string;
      searchDocsPlaceholder: string;
      previewTitle: string;
      downloadBtn: string;
      deleteBtn: string;
      primaryProtected: string;
      noDocs: string;
    };
  }
> = {
  id: {
    nav: {
      research: '📊 Riset & Survei',
      formulation: '🧪 Formulasi',
      htstSmart: '🌡️ HTST & Aplikasi',
      archive: '📁 Arsip Dokumen',
      references: '📚 Referensi',
      quickSearch: 'Cari Cepat',
    },
    controls: {
      languageLabel: 'Bahasa',
      themeLight: 'Mode Terang',
      themeDark: 'Mode Gelap Nyaman',
      textNormal: 'Teks Standar',
      textLarge: 'Teks Besar',
      tocTitle: 'Navigasi Bab',
    },
    hero: {
      kicker: 'SMP Negeri 1 Surakarta · Applied Life Sciences · I2ASPO 2026',
      title: 'BEHONGCA: Inovasi Obat Kumur Herbal Berbasis Metode HTST',
      subtitle:
        'Pemanfaatan sinergis daun binahong (Anredera cordifolia), rumput krokot (Portulaca oleracea L.), daun & buah mangga madu (Mangifera indica L.), daun mint (Mentha arvensis), dan mikropartikel cangkang telur (CaCO₃) sebagai obat kumur 100% bebas alkohol yang aman bagi anak hingga dewasa.',
      authorsLabel: 'Tim Peneliti',
      ctaExplore: 'Jelajahi Riset Interaktif',
      ctaArchive: 'Buka Arsip & PDF Makalah',
      metrics: {
        respondentsLabel: 'Responden Survei Surakarta',
        cariesLabel: 'Prevalensi Karies Gigi',
        phLabel: 'Rentang pH Terpenyangga',
        htstLabel: 'Pasteurisasi HTST + Thermal Shock',
      },
    },
    sections: {
      abstractTitle: '01. Abstrak & Latar Belakang',
      abstractHeading: '🦷 Mengatasi Karies dan Gingivitis Tanpa Alkohol Sintetis',
      surveyTitle: '02. Data Epidemiologi Sekolah (n = 90)',
      surveyHeading: '📊 Potret Kesehatan Gigi Pelajar Usia 9–18 Tahun di Surakarta',
      surveyLead:
        'Survei observasional di jenjang SD, SMP, dan SMA menunjukkan tingginya kerentanan karies pada fase gigi bercampur maupun remaja akibat konsumsi gula dan minimnya kebiasaan berkumur.',
      ingredientsTitle: '03. Sinergi Lima Bahan Alami',
      ingredientsHeading: '🌿 Fitokimia Antibakteri & Mineral CaCO₃ Daur Ulang',
      ingredientsLead:
        'Setiap bahan diekstraksi murni menggunakan pelarut air destilasi (aquades) tanpa etanol agar nyaman di mukosa mulut dan ramah lingkungan.',
      formulationTitle: '04. Desain Formulasi & Karakteristik Organoleptik',
      formulationHeading: '🧪 Perbandingan Formula F1, F2, F3 & Uji Fisik Tabel 4–5',
      formulationLead:
        'Pilih variasi formula untuk melihat komposisi per 100 mL larutan serta bagaimana kalsium karbonat cangkang telur menyangga asam organik ke zona aman enamel.',
      htstTitle: '05. Simulasi Pasteurisasi HTST & Thermal Shock',
      htstHeading: '🌡️ Menjaga Flavonoid, Vitamin C, dan Menthol Tetap Utuh',
      htstLead:
        'Pemanasan singkat pada 72°C–75°C selama 15–30 detik diikuti pendinginan kejut (ice bath) melumpuhkan patogen vegetatif tanpa merusak senyawa bioaktif termolabil.',
      smartTitle: '06. Unduhan Aplikasi & Game BEHONGCA SMART',
      smartHeading: '📱 Aplikasi Deteksi & Game Edukasi Dental Guardian',
      smartLead:
        'Unduh langsung aplikasi BEHONGCA SMART DETECTION dan game Super BEHONGCA Bros dari portal web ini, atau uji pemahaman Anda lewat kuis interaktif.',
      archiveTitle: '07. Arsip Dokumen Riset & Pratinjau PDF',
      archiveHeading: '📁 Arsip Dokumen Riset',
      archiveLead:
        'Baca langsung naskah resmi BEHONGCA beserta dokumen pendukung yang telah dikurasi dan diindeks dari server untuk penelusuran cepat.',
      conclusionsTitle: '08. Kesimpulan & Rencana Validasi Laboratorium',
      conclusionsHeading: '🔬 Temuan Utama & Langkah Uji In Vitro Terjadwal',
      referencesTitle: '09. Daftar Pustaka',
      referencesHeading: '📚 24 Rujukan Ilmiah Terverifikasi',
    },
    search: {
      placeholder: 'Cari bab, senyawa (flavonoid, CaCO₃), data survei, referensi, atau isi PDF...',
      emptyPrompt: 'Ketik kata kunci untuk mencari seluruh isi makalah dan dokumen arsip.',
      noResults: 'Tidak ada hasil yang cocok. Coba kata kunci seperti "binahong", "HTST", atau "72°C".',
      groupPaper: 'Bagian Makalah & Data Riset',
      groupDocs: 'Arsip Dokumen Riset',
      hintNavigate: 'Tekan Enter atau klik hasil untuk langsung menuju bagian terkait',
      close: 'Tutup',
    },
    archive: {
      uploadTitle: 'Unggah Dokumen Riset Baru',
      dropHint: 'Seret file PDF / TXT / MD / CSV ke sini, atau klik untuk memilih',
      fileSelected: 'Berkas terpilih',
      titleLabel: 'Judul Dokumen',
      categoryLabel: 'Kategori',
      authorLabel: 'Penulis / Sumber',
      langLabel: 'Bahasa Dokumen',
      descLabel: 'Ringkasan / Catatan Lampiran',
      submitBtn: 'Simpan & Indeks Dokumen',
      uploadingBtn: 'Mengunggah & Mengindeks...',
      filterAll: 'Semua Kategori',
      searchDocsPlaceholder: 'Saring arsip dokumen...',
      previewTitle: 'Pratinjau Dokumen Langsung',
      downloadBtn: 'Unduh Berkas',
      deleteBtn: 'Hapus',
      primaryProtected: 'Naskah Utama Terlindungi',
      noDocs: 'Belum ada dokumen yang sesuai filter.',
    },
  },
  en: {
    nav: {
      research: '📊 Research',
      formulation: '🧪 Formulation',
      htstSmart: '🌡️ HTST & Apps',
      archive: '📁 PDF Archive',
      references: '📚 References',
      quickSearch: 'Quick Search',
    },
    controls: {
      languageLabel: 'Language',
      themeLight: 'Light Mode',
      themeDark: 'Comfortable Dark',
      textNormal: 'Standard Text',
      textLarge: 'Large Text',
      tocTitle: 'Chapter Index',
    },
    hero: {
      kicker: 'SMP Negeri 1 Surakarta · Applied Life Sciences · I2ASPO 2026',
      title: 'BEHONGCA: HTST Herbal Mouthwash Innovation for Dental Health',
      subtitle:
        'Synergistic utilization of binahong leaves (Anredera cordifolia), purslane grass (Portulaca oleracea L.), young mango leaves & honey mango fruit (Mangifera indica L.), cornmint (Mentha arvensis), and sterilized eggshell micro-powder (CaCO₃) in a 100% alcohol-free oral rinse.',
      authorsLabel: 'Research Team',
      ctaExplore: 'Explore Interactive Study',
      ctaArchive: 'Open Archive & Full PDF',
      metrics: {
        respondentsLabel: 'Surakarta Survey Respondents',
        cariesLabel: 'Dental Caries Prevalence',
        phLabel: 'Buffered Oral-Safe pH',
        htstLabel: 'HTST + Thermal Shock',
      },
    },
    sections: {
      abstractTitle: '01. Abstract & Background',
      abstractHeading: '🦷 Preventing Dental Caries & Gingivitis Without Synthetic Alcohol',
      surveyTitle: '02. School Epidemiological Survey (n = 90)',
      surveyHeading: '📊 Oral Health Profile of Surakarta Students Aged 9–18',
      surveyLead:
        'Preliminary observational data across elementary, junior high, and senior high schools show elevated caries and gingivitis rates driven by sugary diets and inconsistent rinsing.',
      ingredientsTitle: '03. Synergy of Five Natural Ingredients',
      ingredientsHeading: '🌿 Antibacterial Phytochemicals & Upcycled CaCO₃ Buffer',
      ingredientsLead:
        'Every botanical extract is prepared via pure aqueous extraction (aquades) without ethanol, ensuring mucosal safety and zero chemical discharge.',
      formulationTitle: '04. Formulation Design & Organoleptic Evaluation',
      formulationHeading: '🧪 Formula F1, F2, F3 Matrix & Physical Tests (Tables 4–5)',
      formulationLead:
        'Compare the 100 mL formulation ratios and inspect how micro-sieved eggshell calcium carbonate buffers organic acids into the enamel-safe pH 6.0–6.8 window.',
      htstTitle: '05. HTST Pasteurization & Thermal Shock Simulator',
      htstHeading: '🌡️ Preserving Heat-Sensitive Flavonoids, Vitamin C, and Volatile Menthol',
      htstLead:
        'Short-time heating at 72°C–75°C for 15–30 seconds followed by rapid ice-bath thermal shock eliminates vegetative pathogens while protecting thermolabile bioactives.',
      smartTitle: '06. BEHONGCA SMART Apps & Downloads',
      smartHeading: '📱 Preventive Detector App & Dental Guardian Game Downloads',
      smartLead:
        'Download the BEHONGCA SMART DETECTION App and Super BEHONGCA Bros: Dental Guardian directly from this web portal, then play the interactive trivia challenge.',
      archiveTitle: '07. Research Document Archive & PDF Preview',
      archiveHeading: '📁 Research Document Archive',
      archiveLead:
        'Read the official I2ASPO 2026 manuscript and curated supporting lab documents directly in the browser with instant full-text search.',
      conclusionsTitle: '08. Conclusions & Scheduled Laboratory Validation',
      conclusionsHeading: '🔬 Core Findings & Upcoming In Vitro Competition Milestones',
      referencesTitle: '09. References',
      referencesHeading: '📚 24 Peer-Reviewed Scientific Citations',
    },
    search: {
      placeholder: 'Search chapters, compounds (flavonoids, CaCO₃), survey data, citations, or PDF text...',
      emptyPrompt: 'Type a keyword to search across the entire research paper and archived documents.',
      noResults: 'No matching entries found. Try keywords like "binahong", "HTST", or "72°C".',
      groupPaper: 'Paper Sections & Research Data',
      groupDocs: 'Research Document Archive',
      hintNavigate: 'Press Enter or click any result to jump to the section or open preview',
      close: 'Close',
    },
    archive: {
      uploadTitle: 'Upload New Research Document',
      dropHint: 'Drag and drop a PDF / TXT / MD / CSV file here, or click to browse',
      fileSelected: 'Selected file',
      titleLabel: 'Document Title',
      categoryLabel: 'Category',
      authorLabel: 'Author / Source',
      langLabel: 'Document Language',
      descLabel: 'Abstract / Notes',
      submitBtn: 'Save & Index Document',
      uploadingBtn: 'Uploading & Indexing...',
      filterAll: 'All Categories',
      searchDocsPlaceholder: 'Filter archived documents...',
      previewTitle: 'Live Document Preview',
      downloadBtn: 'Download File',
      deleteBtn: 'Delete',
      primaryProtected: 'Primary Manuscript Protected',
      noDocs: 'No documents match the current filter.',
    },
  },
};
