import {
  BotanicalIngredient,
  FormulationItem,
  HtstStage,
  QuizQuestion,
  ReferenceItem,
  SmartDevicePart,
} from '../types';

export const RESEARCH_AUTHORS = [
  'Arinda Rahmadina',
  'Bagus Eka S.',
  'Chelsea Putri P.',
  'Clara Vanessa K.',
  'Davina Queen E.N',
  'Rangga Raditya',
];

export const ABSTRACT_CONTENT = {
  id: [
    'Tingginya prevalensi masalah kesehatan gigi dan mulut pada anak usia sekolah—khususnya karies gigi akibat bakteri Streptococcus mutans dan radang gusi (gingivitis)—dipicu oleh terbatasnya edukasi kebersihan mulut, kurangnya pengawasan orang tua, serta kekhawatiran terhadap efek samping penggunaan jangka panjang obat kumur berbahan kimia sintetis seperti chlorhexidine maupun alkohol konsentrasi tinggi.',
    'Penelitian ini merumuskan BEHONGCA, obat kumur herbal ramah lingkungan dan 100% bebas alkohol dengan memanfaatkan lima bahan alami dalam basis air destilasi (aquades): ekstrak daun binahong (Anredera cordifolia), ekstrak rumput krokot (Portulaca oleracea L.), daun mangga muda dan buah mangga madu (Mangifera indica L.), daun mint / cornmint (Mentha arvensis), serta serbuk mikro cangkang telur tersterilisasi (CaCO₃).',
    'Proses produksi menerapkan metode pasteurisasi High Temperature Short Time (HTST) pada suhu 72°C–75°C selama 15–30 detik yang diikuti pendinginan cepat (thermal shock) dalam rendaman air es (25°C–30°C) untuk membasmi mikroorganisme patogen vegetatif sekaligus menjaga keutuhan senyawa bioaktif sensitif panas (flavonoid, tanin, vitamin C) dan mencegah penguapan menthol volatil.',
  ],
  en: [
    'The high prevalence of dental and oral health issues among school-aged children—particularly dental caries driven by Streptococcus mutans and gingivitis—is triggered by limited oral hygiene education, insufficient parental supervision, and concerns over long-term side effects of synthetic chemical mouthwashes containing chlorhexidine or high-concentration alcohol.',
    'This study formulates BEHONGCA, an eco-friendly, 100% alcohol-free herbal mouthwash utilizing five natural ingredients in an aqueous base (aquades): binahong leaf extract (Anredera cordifolia), purslane grass extract (Portulaca oleracea L.), young mango leaves and honey mango fruit (Mangifera indica L.), cornmint leaves (Mentha arvensis), and sterilized micro-sieved eggshell powder (CaCO₃).',
    'Processing employs High Temperature Short Time (HTST) pasteurization at 72°C–75°C for 15–30 seconds, followed immediately by rapid ice-bath cooling (thermal shock to 25°C–30°C) to eliminate vegetative pathogenic microorganisms while preserving heat-sensitive bioactive compounds (flavonoids, tannins, vitamin C) and preventing volatile menthol evaporation.',
  ],
  keywords: [
    'BEHONGCA',
    'Herbal Mouthwash',
    'Anredera cordifolia',
    'Portulaca oleracea L.',
    'Mangifera indica L.',
    'Mentha arvensis',
    'CaCO₃ Eggshell',
    'HTST Pasteurization',
    'Streptococcus mutans',
  ],
};

export const SURVEY_COHORTS = [
  {
    ageGroup: '9–12',
    label: { id: 'Siswa SD (9–12 Tahun)', en: 'Elementary (9–12 Years)' },
    stageNote: {
      id: 'Fase gigi bercampur akhir; email gigi permanen baru erupsi masih rentan demineralisasi asam.',
      en: 'Late mixed-dentition phase; newly erupted permanent enamel is highly susceptible to acid demineralization.',
    },
    total: 30,
    cohortPct: 33.33,
    cariesCount: 25,
    cariesPctOfTotal: 27.78,
    noCariesCount: 5,
    noCariesPctOfTotal: 5.55,
    gingivitisCount: 12,
    gingivitisPctOfTotal: 13.33,
    noGingivitisCount: 18,
    noGingivitisPctOfTotal: 20.0,
  },
  {
    ageGroup: '13–15',
    label: { id: 'Siswa SMP (13–15 Tahun)', en: 'Junior High (13–15 Years)' },
    stageNote: {
      id: 'Peralihan ke gigi permanen lengkap dengan paparan jajanan manis sekolah yang meningkat.',
      en: 'Transition to complete permanent dentition alongside increased sugary snack consumption at school.',
    },
    total: 30,
    cohortPct: 33.33,
    cariesCount: 21,
    cariesPctOfTotal: 23.33,
    noCariesCount: 9,
    noCariesPctOfTotal: 10.0,
    gingivitisCount: 21,
    gingivitisPctOfTotal: 23.33,
    noGingivitisCount: 9,
    noGingivitisPctOfTotal: 10.0,
  },
  {
    ageGroup: '16–18',
    label: { id: 'Siswa SMA (16–18 Tahun)', en: 'Senior High (16–18 Years)' },
    stageNote: {
      id: 'Akumulasi plak subgingiva & prevalensi gingivitis tertinggi (30,00% dari seluruh responden).',
      en: 'Subgingival plaque accumulation & highest gingivitis incidence (30.00% of total respondents).',
    },
    total: 30,
    cohortPct: 33.33,
    cariesCount: 19,
    cariesPctOfTotal: 21.11,
    noCariesCount: 11,
    noCariesPctOfTotal: 12.22,
    gingivitisCount: 27,
    gingivitisPctOfTotal: 30.0,
    noGingivitisCount: 3,
    noGingivitisPctOfTotal: 3.33,
  },
];

export const PATHOGEN_NOTES = {
  id: 'Patogen utama penyebab karies adalah Streptococcus mutans yang memfermentasi karbohidrat menjadi asam organik pemicu demineralisasi email (pH < 5,5). Sementara itu, gingivitis dipicu akumulasi biofilm subgingiva oleh bakteri "Red Complex" (Porphyromonas gingivalis, Tannerella forsythia, Treponema denticola) bersama Fusobacterium, Actinomyces, dan Veillonella. Secara nasional, Riskesdas 2018 mencatat prevalensi karies mencapai 88,8% dengan indeks DMF-T rata-rata 7,1.',
  en: 'Dental caries is primarily driven by acidogenic Streptococcus mutans metabolizing dietary carbohydrates into enamel-demineralizing acids (pH < 5.5). Gingivitis arises from subgingival biofilms formed by the "Red Complex" pathogens (Porphyromonas gingivalis, Tannerella forsythia, Treponema denticola) alongside Fusobacterium, Actinomyces, and Veillonella. Nationally, Riskesdas (2018) reported 88.8% caries prevalence with an average DMF-T index of 7.1.',
};

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'binahong',
    emoji: '🌿',
    name: { id: 'Daun Binahong', en: 'Binahong Leaves' },
    scientificName: 'Anredera cordifolia (Ten.) Steenis',
    partUsed: { id: 'Daun segar (ekstrak air 1:2 w/v)', en: 'Fresh leaves (1:2 w/v aqueous extract)' },
    extractionRatio: '50 g / 100 mL aquades',
    activeCompounds: ['Flavonoids', 'Tannins', 'Saponins', 'Alkaloids', 'Steroids'],
    role: {
      id: 'Agen Antibakteri Utama & Anti-Biofilm',
      en: 'Primary Antibacterial & Anti-Biofilm Agent',
    },
    mechanism: {
      id: 'Flavonoid mengganggu permeabilitas dinding sel bakteri Streptococcus mutans, sedangkan tanin menghambat adhesi bakteri dan enzim glucosyltransferase pembentuk plak biofilm.',
      en: 'Flavonoids disrupt Streptococcus mutans cell-wall permeability, while tannins inhibit bacterial adhesion and glucosyltransferase activity required for dental plaque biofilm formation.',
    },
    accentHex: '#0D7A5F',
  },
  {
    id: 'purslane',
    emoji: '🌱',
    name: { id: 'Rumput Krokot', en: 'Purslane Grass' },
    scientificName: 'Portulaca oleracea L.',
    partUsed: { id: 'Herba segar (ekstrak air 1:2 w/v)', en: 'Fresh herb (1:2 w/v aqueous extract)' },
    extractionRatio: '50 g / 100 mL aquades',
    activeCompounds: ['Oleracein Alkaloids', 'Omega-3', 'Ferulic & Caffeic Acid', 'Polysaccharides', 'Vitamins C & E'],
    role: {
      id: 'Anti-Inflamasi & Antioksidan Gingiva',
      en: 'Anti-Inflammatory & Gingival Antioxidant',
    },
    mechanism: {
      id: 'Alkaloid oleracein dan asam lemak omega-3 meredakan peradangan jaringan gusi akibat plak, polisakarida mempercepat regenerasi jaringan, dan vitamin C menunjang sintesis kolagen.',
      en: 'Oleracein alkaloids and plant-derived omega-3 fatty acids reduce plaque-induced gingival inflammation, polysaccharides support mucosal healing, and vitamin C aids periodontal collagen integrity.',
    },
    accentHex: '#15803D',
  },
  {
    id: 'mango',
    emoji: '🥭',
    name: { id: 'Daun Mangga Muda & Mangga Madu', en: 'Young Mango Leaves & Honey Mango Fruit' },
    scientificName: 'Mangifera indica L.',
    partUsed: {
      id: 'Daun muda (1:2 w/v) & daging buah matang (1:1 w/v)',
      en: 'Young leaves (1:2 w/v) & ripe fruit pulp (1:1 w/v)',
    },
    extractionRatio: '50 g leaf / 100 g pulp per 100 mL',
    activeCompounds: ['Mangiferin', 'Polyphenols', 'Tannins', 'Vitamin C', 'Carotenoids'],
    role: {
      id: 'Polifenol Antibakteri & Penguat Palatabilitas',
      en: 'Antibacterial Polyphenols & Natural Palatability',
    },
    mechanism: {
      id: 'Daun mangga muda kaya mangiferin yang menekan pertumbuhan S. mutans, sementara filtrat buah mangga madu memberi antioksidan alami dan cita rasa manis-buah yang disukai anak-anak.',
      en: 'Young mango leaves supply mangiferin polyphenols against S. mutans, while honey mango fruit filtrate adds vitamin C, carotenoids, and a pleasant fruity flavor tailored for school-aged children.',
    },
    accentHex: '#D97706',
  },
  {
    id: 'cornmint',
    emoji: '🍃',
    name: { id: 'Daun Cornmint', en: 'Cornmint Leaves' },
    scientificName: 'Mentha arvensis L.',
    partUsed: { id: 'Daun segar (ekstrak air 1:2 w/v)', en: 'Fresh leaves (1:2 w/v aqueous extract)' },
    extractionRatio: '50 g / 100 mL aquades',
    activeCompounds: ['Natural Menthol', 'Essential Oils', 'Phenolic Compounds'],
    role: {
      id: 'Corrigens Saporis et Odoris & Stimulan Saliva',
      en: 'Corrigens Saporis et Odoris & Salivary Stimulant',
    },
    mechanism: {
      id: 'Menthol alami menutupi aroma getir ekstrak herbal, merangsang aliran saliva untuk membilas sisa makanan dan menyangga pH mulut, serta memberi efek analgesik ringan pada gusi.',
      en: 'Natural menthol masks earthy herbal notes, stimulates protective salivary flow that buffers oral pH and clears food debris, and delivers mild antimicrobial and soothing analgesic relief.',
    },
    accentHex: '#0284C7',
  },
  {
    id: 'eggshell',
    emoji: '🥚',
    name: { id: 'Mikro-Serbuk Cangkang Telur', en: 'Sterilized Eggshell Micro-Powder' },
    scientificName: 'Calcium Carbonate (CaCO₃, 94%–97%)',
    partUsed: {
      id: 'Cangkang telur ayam bebas membran (steril 100°C, 15 menit)',
      en: 'Membrane-free chicken eggshell (sterilized 100°C, 15 min)',
    },
    extractionRatio: '0.5 g / 100 mL suspension',
    activeCompounds: ['CaCO₃ (94–97%)', 'Bioavailable Ca²⁺', 'Trace Mg & P'],
    role: {
      id: 'Penyangga pH Alami, Poles Lembut & Remineralisasi',
      en: 'Natural pH Buffer, Mild Polishing & Remineralization',
    },
    mechanism: {
      id: 'Mendaur ulang limbah rumah tangga menjadi partikel mikro CaCO₃ yang menyangga asam organik botani dari pH ~4,8–5,8 ke rentang aman pH 6,0–6,8 sekaligus membantu pemolesan hidrodinamik tanpa menggores email.',
      en: 'Upcycles household bio-waste into ultra-fine CaCO₃ micro-particles that neutralize excess botanical organic acids (pH ~4.8–5.8 → pH 6.0–6.8) and provide gentle hydrodynamic polishing plus calcium ions for enamel remineralization.',
    },
    accentHex: '#64748B',
  },
];

export const FORMULATION_TABLE: FormulationItem[] = [
  {
    ingredient: { id: 'Ekstrak daun binahong', en: 'Binahong leaf extract' },
    scientific: 'Anredera cordifolia',
    role: { id: 'Antibakteri utama & anti-biofilm', en: 'Primary antibacterial & anti-biofilm agent' },
    f1: '10 mL',
    f2: '15 mL',
    f3: '20 mL',
  },
  {
    ingredient: { id: 'Ekstrak rumput krokot', en: 'Purslane grass extract' },
    scientific: 'Portulaca oleracea L.',
    role: { id: 'Anti-inflamasi & antioksidan gingiva', en: 'Anti-inflammatory & gingival antioxidant' },
    f1: '10 mL',
    f2: '15 mL',
    f3: '20 mL',
  },
  {
    ingredient: { id: 'Ekstrak daun mangga muda', en: 'Young mango leaf extract' },
    scientific: 'Mangifera indica L.',
    role: { id: 'Polifenol antibakteri & astringen', en: 'Antibacterial polyphenol & astringent' },
    f1: '10 mL',
    f2: '15 mL',
    f3: '20 mL',
  },
  {
    ingredient: { id: 'Filtrat buah mangga madu', en: 'Honey mango fruit filtrate' },
    scientific: 'Mangifera indica L.',
    role: { id: 'Antioksidan alami & penambah rasa', en: 'Natural antioxidant & palatability enhancer' },
    f1: '15 mL',
    f2: '15 mL',
    f3: '15 mL',
  },
  {
    ingredient: { id: 'Ekstrak daun cornmint', en: 'Cornmint leaf extract' },
    scientific: 'Mentha arvensis',
    role: { id: 'Perasa alami (corrigens) & penyejuk', en: 'Natural flavoring (corrigens) & cooling' },
    f1: '10 mL',
    f2: '10 mL',
    f3: '10 mL',
  },
  {
    ingredient: { id: 'Mikro-serbuk cangkang telur steril', en: 'Sterilized eggshell micro-powder' },
    scientific: 'CaCO₃ (94%–97%)',
    role: { id: 'Poles lembut, penyangga pH & sumber kalsium', en: 'Mild surface polishing & calcium source' },
    f1: '0.5 g',
    f2: '0.5 g',
    f3: '0.5 g',
  },
  {
    ingredient: { id: 'Air destilasi (aquades)', en: 'Distilled water (aquades)' },
    scientific: 'H₂O',
    role: { id: 'Basis pelarut air bebas alkohol', en: 'Aqueous solvent base (100% alcohol-free)' },
    f1: 'ad 100 mL',
    f2: 'ad 100 mL',
    f3: 'ad 100 mL',
  },
];

export const ORGANOLEPTIC_TABLE = [
  {
    parameter: { id: 'Bentuk Sediaan / Penampilan', en: 'Dosage Form / Appearance' },
    result: {
      id: 'Suspensi herbal berair dengan partikel mikro halus (terdispersi merata saat dikocok perlahan)',
      en: 'Aqueous herbal suspension with fine dispersed micro-particles (redisperses evenly upon gentle shaking)',
    },
    standard: { id: 'Obat kumur cair homogen', en: 'Homogeneous liquid mouthwash' },
  },
  {
    parameter: { id: 'Warna', en: 'Color' },
    result: { id: 'Hijau-kecokelatan alami', en: 'Natural greenish-brown' },
    standard: { id: 'Khas ekstrak klorofil & polifenol', en: 'Characteristic of chlorophyll & polyphenol extracts' },
  },
  {
    parameter: { id: 'Aroma', en: 'Aroma' },
    result: {
      id: 'Aroma herbal segar dengan dominasi cornmint dan mangga manis',
      en: 'Refreshing herbal aroma dominated by cornmint and sweet mango',
    },
    standard: { id: 'Aroma kumur nyaman & tidak menyengat', en: 'Pleasant, non-pungent oral rinse aroma' },
  },
  {
    parameter: { id: 'Rasa / Sensasi Mulut', en: 'Taste / Oral Sensation' },
    result: {
      id: 'Manis-buah ringan dengan sensasi mint menyejukkan',
      en: 'Mildly sweet-fruity with a cooling mint sensation',
    },
    standard: { id: 'Diterima anak-anak & tidak mengiritasi', en: 'Palatable and non-irritating for daily rinsing' },
  },
  {
    parameter: { id: 'Nilai pH', en: 'pH Value' },
    result: {
      id: 'pH 6,0–6,8 (sedikit asam menuju netral terpenyangga CaCO₃)',
      en: 'pH 6.0–6.8 (slightly acidic to near-neutral buffered range)',
    },
    standard: {
      id: 'Rentang fisiologis aman rongga mulut (pH 5,5–7,5)',
      en: 'Safe oral physiological range (pH 5.5–7.5) preventing demineralization',
    },
  },
  {
    parameter: { id: 'Stabilitas Fisik', en: 'Physical Stability' },
    result: {
      id: 'Stabil selama pengamatan; tanpa bau tengik, penggumpalan, maupun endapan keras (caking)',
      en: 'Physically stable during observation; no foul odor, curdling, or irreversible caking',
    },
    standard: { id: 'Bebas ketengikan & kerusakan fase cepat', en: 'No rapid rancidity or phase spoilage' },
  },
];

export const HTST_STAGES: HtstStage[] = [
  {
    step: 1,
    id: 'washing',
    title: {
      id: 'Pencucian Bahan & Sterilisasi Cangkang Telur',
      en: 'Raw Material Washing & Eggshell Sterilization',
    },
    tempLabel: '100°C (Cangkang)',
    durationLabel: '15 min',
    tempValue: 28,
    description: {
      id: 'Daun binahong, krokot, mangga muda, buah mangga madu, dan cornmint dicuci bersih. Cangkang telur dikupas membran dalamnya, disterilisasi pada 100°C selama 15 menit untuk mengeliminasi Salmonella, dikeringkan, dihaluskan, lalu diayak halus.',
      en: 'Fresh binahong, purslane, young mango leaves, honey mango fruit, and cornmint are washed thoroughly. Chicken eggshells have their inner membrane peeled, are sterilized at 100°C for 15 minutes to eliminate Salmonella, dried, milled, and fine-sieved.',
    },
    scientificNote: {
      id: 'Menghasilkan mikropartikel CaCO₃ seragam yang aman dan bebas kontaminan mikroba.',
      en: 'Produces uniform, pathogen-free CaCO₃ micro-particles.',
    },
  },
  {
    step: 2,
    id: 'extraction',
    title: {
      id: 'Ekstraksi Air (Aquades) & Filtrasi Halus',
      en: 'Aqueous Extraction & Fine Mesh Filtration',
    },
    tempLabel: '26°C',
    durationLabel: '10 min',
    tempValue: 26,
    description: {
      id: 'Bahan nabati dicincang dan diblender terpisah dengan aquades (rasio 1:2 w/v untuk daun, 1:1 w/v untuk daging buah mangga), lalu disaring memakai saringan halus agar bebas serat kasar.',
      en: 'Clean botanicals are chopped and blended separately with distilled water (1:2 w/v for leaves; 1:1 w/v for mango pulp), then filtered through a fine mesh sieve to remove coarse plant fibers.',
    },
    scientificNote: {
      id: 'Ekstraksi murni berbasis aquades mengekstrak glikosida flavonoid, tanin, dan asam fenolat tanpa alkohol.',
      en: 'Pure aqueous extraction recovers water-soluble flavonoid glycosides, tannins, and phenolic acids with 0% ethanol.',
    },
  },
  {
    step: 3,
    id: 'homogenization',
    title: {
      id: 'Homogenisasi Formula F1–F3 dengan CaCO₃',
      en: 'Formulation Homogenization (F1–F3) with CaCO₃',
    },
    tempLabel: '27°C',
    durationLabel: '3 min',
    tempValue: 27,
    description: {
      id: 'Seluruh filtrat herbal dicampur bersama 0,5 g mikro-serbuk cangkang telur steril sesuai takaran F1, F2, atau F3 hingga suspensi terdispersi merata.',
      en: 'Filtered herbal extracts and 0.5 g sterilized eggshell micro-powder are combined according to Formula F1–F3 ratios and stirred thoroughly until evenly dispersed.',
    },
    scientificNote: {
      id: 'Reaksi penyangga CaCO₃ mulai menetralkan asam sitrat/malat mangga dan krokot menuju pH 6,0–6,8.',
      en: 'CaCO₃ buffering begins neutralizing organic acids from mango and purslane toward pH 6.0–6.8.',
    },
  },
  {
    step: 4,
    id: 'htst',
    title: {
      id: 'Pasteurisasi HTST Double-Boiler (Bain-Marie)',
      en: 'HTST Pasteurization in Double-Boiler (Bain-Marie)',
    },
    tempLabel: '72°C – 75°C',
    durationLabel: '15–30 sec',
    tempValue: 74,
    description: {
      id: 'Campuran dipanaskan tidak langsung memakai panci ganda (bain-marie) sambil diaduk perlahan hingga mencapai 72°C–75°C dan dipertahankan tepat 15–30 detik di bawah pantauan termometer terkalibrasi.',
      en: 'The homogenized blend is heated indirectly in a double-boiler pot with gentle stirring to 72°C–75°C and held strictly for 15–30 seconds under calibrated thermometer monitoring.',
    },
    scientificNote: {
      id: 'Membasmi patogen vegetatif sekaligus mencegah degradasi termal flavonoid, vitamin C, dan penguapan menthol yang terjadi pada perebusan 100°C.',
      en: 'Eliminates vegetative pathogens while preventing thermal degradation of flavonoids, vitamin C, and volatile menthol seen in 100°C boiling.',
    },
  },
  {
    step: 5,
    id: 'thermal_shock',
    title: {
      id: 'Pendinginan Kejut (Ice-Bath Thermal Shock)',
      en: 'Rapid Cooling Process (Ice-Bath Thermal Shock)',
    },
    tempLabel: '74°C → 25°C',
    durationLabel: '< 2 min',
    tempValue: 25,
    description: {
      id: 'Begitu fase tahan 15–30 detik selesai, wadah segera dicelupkan ke dalam wadah berisi es dan air (ice bath) agar suhu turun drastis ke suhu ruang (25°C–30°C).',
      en: 'Immediately after the 15–30 second HTST holding phase, the inner vessel is plunged into an ice-water bath to drop solution temperature rapidly to 25°C–30°C.',
    },
    scientificNote: {
      id: 'Menghentikan paparan panas residu serta menghambat perkecambahan spora bakteri termofilik yang tersisa.',
      en: 'Halts residual heat exposure and inhibits germination of surviving thermophilic bacterial spores.',
    },
  },
  {
    step: 6,
    id: 'bottling',
    title: {
      id: 'Pengemasan Steril & Pelabelan "Kocok Dahulu"',
      en: 'Aseptic Bottling & "Shake Well Before Use" Labeling',
    },
    tempLabel: '25°C',
    durationLabel: 'Sealed',
    tempValue: 25,
    description: {
      id: 'Obat kumur herbal yang telah dingin dituangkan ke botol food-grade pra-sterilisasi yang tertutup rapat dengan label batch dan instruksi "Kocok sebelum digunakan".',
      en: 'Cooled BEHONGCA herbal mouthwash is poured into pre-sterilized, tightly sealed food-grade bottles labeled with batch info and "Shake well before use".',
    },
    scientificNote: {
      id: 'Pengocokan ringan langsung meredispersi partikel CaCO₃ secara homogen untuk pemolesan lembut saat berkumur.',
      en: 'Gentle shaking immediately restores uniform CaCO₃ micro-particle dispersion for gentle hydrodynamic polishing.',
    },
  },
];

export const SMART_DEVICE_PARTS: SmartDevicePart[] = [
  {
    id: 1,
    key: 'lid',
    indonesianName: 'Tutup Panci',
    englishName: 'Pot Lid',
    functionDesc: {
      id: 'Meminimalkan penguapan minyak atsiri volatil (menthol cornmint) dan mencegah kontaminasi udara selama pemanasan.',
      en: 'Minimizes evaporation of volatile essential oils (cornmint menthol) and prevents airborne contamination during heating.',
    },
    coords: { x: 50, y: 18 },
  },
  {
    id: 2,
    key: 'handles',
    indonesianName: 'Kupingan Panci',
    englishName: 'Pot Handles',
    functionDesc: {
      id: 'Pegangan samping berisolasi panas untuk memindahkan wadah dengan cepat dan aman ke bak es saat tahap thermal shock.',
      en: 'Heat-insulated side handles allowing safe, rapid transfer of the vessel into the ice-water bath for thermal shock cooling.',
    },
    coords: { x: 18, y: 36 },
  },
  {
    id: 3,
    key: 'outer_pot',
    indonesianName: 'Panci Luar',
    englishName: 'Outer Pot (Bain-Marie)',
    functionDesc: {
      id: 'Ruang penangas air luar (jaket bain-marie) yang menghantarkan panas secara tidak langsung dan merata agar suspensi herbal tidak gosong.',
      en: 'Outer water-bath chamber transferring heat indirectly and evenly, preventing direct scorching of the herbal suspension.',
    },
    coords: { x: 76, y: 46 },
  },
  {
    id: 4,
    key: 'inner_pot',
    indonesianName: 'Panci Dalam',
    englishName: 'Inner Pot',
    functionDesc: {
      id: 'Wadah food-grade bagian dalam tempat menampung filtrat herbal BEHONGCA yang sudah dihomogenkan dengan mikropartikel CaCO₃.',
      en: 'Food-grade inner chamber holding homogenized BEHONGCA herbal filtrates and sterilized eggshell micro-powder (CaCO₃).',
    },
    coords: { x: 50, y: 48 },
  },
  {
    id: 5,
    key: 'heating_plate',
    indonesianName: 'Lempeng Pemanas',
    englishName: 'Heating Plate',
    functionDesc: {
      id: 'Elemen pemanas elektrik di bagian dasar yang menyuplai energi termal cepat untuk mencapai ambang pasteurisasi 72°C–75°C.',
      en: 'Bottom electric heating element supplying rapid thermal energy to reach the 72°C–75°C pasteurization threshold.',
    },
    coords: { x: 50, y: 74 },
  },
  {
    id: 6,
    key: 'thermostat',
    indonesianName: 'Termostat Digital',
    englishName: 'Digital Thermostat',
    functionDesc: {
      id: 'Unit pengontrol suhu dan sensor otomatis yang menjaga daya pemanasan tetap presisi di rentang 72°C–75°C selama 15–30 detik.',
      en: 'Automated temperature controller and sensor regulating heating power strictly within 72°C–75°C.',
    },
    coords: { x: 64, y: 84 },
  },
  {
    id: 7,
    key: 'power_button',
    indonesianName: 'Tombol ON/OFF',
    englishName: 'ON/OFF Power Button',
    functionDesc: {
      id: 'Sakelar daya utama untuk pengendalian operasional yang aman dan mudah digunakan saat produksi batch.',
      en: 'Main power switch for safe, straightforward operational control during batch processing.',
    },
    coords: { x: 76, y: 84 },
  },
];

export const DENTAL_GUARDIAN_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    emoji: '⚖️',
    biome: 'Enamel Prairie',
    question: {
      id: 'Pada batas pH berapa email gigi mulai mengalami demineralisasi oleh asam bakteri Streptococcus mutans?',
      en: 'Below which oral pH threshold does tooth enamel begin to undergo acid demineralization by Streptococcus mutans?',
    },
    options: [
      { id: 'pH 7,5', en: 'pH 7.5' },
      { id: 'pH 5,5', en: 'pH 5.5' },
      { id: 'pH 6,8', en: 'pH 6.8' },
      { id: 'pH 8,2', en: 'pH 8.2' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'Email gigi mulai rapuh di bawah pH 5,5. CaCO₃ cangkang telur menyangga BEHONGCA pada rentang aman pH 6,0–6,8!',
      en: 'Tooth enamel demineralizes below pH 5.5. Eggshell CaCO₃ buffers BEHONGCA safely at pH 6.0–6.8!',
    },
  },
  {
    id: 'q2',
    emoji: '🌿',
    biome: 'Biofilm Jungle',
    question: {
      id: 'Senyawa aktif pada daun binahong (Anredera cordifolia) yang merusak membran sel bakteri S. mutans adalah...',
      en: 'Which active phytochemicals in binahong leaves (Anredera cordifolia) disrupt S. mutans cell walls and inhibit plaque biofilms?',
    },
    options: [
      { id: 'Sukrosa & Glukosa', en: 'Sucrose & Glucose' },
      { id: 'Flavonoid, Saponin & Tanin', en: 'Flavonoids, Saponins & Tannins' },
      { id: 'Asam Laktat Pekat', en: 'Concentrated Lactic Acid' },
      { id: 'Etanol Sintetis', en: 'Synthetic Ethanol' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'Flavonoid merusak permeabilitas dinding sel bakteri, sementara tanin menghambat adhesi dan enzim glucosyltransferase.',
      en: 'Flavonoids disrupt bacterial cell-wall permeability while tannins block bacterial adhesion and glucosyltransferase.',
    },
  },
  {
    id: 'q3',
    emoji: '🌡️',
    biome: 'Thermal Shock Chamber',
    question: {
      id: 'Mengapa BEHONGCA memakai metode HTST (72°C–75°C, 15–30 detik) + ice bath dibanding perebusan 100°C?',
      en: 'Why does BEHONGCA use HTST pasteurization (72°C–75°C, 15–30 s) + ice-bath shock instead of boiling at 100°C?',
    },
    options: [
      { id: 'Agar warna menjadi merah cerah', en: 'To turn the liquid bright red' },
      { id: 'Melindungi flavonoid, vitamin C & menthol volatil', en: 'To preserve thermolabile flavonoids, vitamin C & volatile menthol' },
      { id: 'Menambah kadar alkohol alami', en: 'To increase natural alcohol levels' },
      { id: 'Melarutkan cangkang telur jadi gel', en: 'To turn eggshell powder into gel' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'Paparan panas singkat menjaga vitamin C, flavonoid, dan aroma menthol tetap utuh sekaligus melumpuhkan patogen vegetatif.',
      en: 'Short thermal exposure protects vitamin C, flavonoids, and volatile menthol while eliminating vegetative pathogens.',
    },
  },
  {
    id: 'q4',
    emoji: '🌱',
    biome: 'Gingival Valley',
    question: {
      id: 'Bahan alami manakah yang kaya alkaloid oleracein dan omega-3 nabati untuk meredakan radang gusi (gingivitis)?',
      en: 'Which BEHONGCA botanical supplies oleracein alkaloids and plant omega-3 fatty acids to soothe gingival inflammation?',
    },
    options: [
      { id: 'Rumput Krokot (Portulaca oleracea L.)', en: 'Purslane Grass (Portulaca oleracea L.)' },
      { id: 'Cangkang Telur (CaCO₃)', en: 'Eggshell Powder (CaCO₃)' },
      { id: 'Aquades Steril', en: 'Sterile Distilled Water' },
      { id: 'Klorheksidin Sintetis', en: 'Synthetic Chlorhexidine' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Rumput krokot (Portulaca oleracea L.) mengandung alkaloid oleracein, omega-3, polisakarida, serta vitamin C & E untuk gusi sehat.',
      en: 'Purslane grass (Portulaca oleracea L.) delivers oleracein alkaloids, omega-3, polysaccharides, and vitamins C & E.',
    },
  },
  {
    id: 'q5',
    emoji: '🥚',
    biome: 'Mineral Ridge',
    question: {
      id: 'Berapa persen kandungan kalsium karbonat (CaCO₃) alami pada cangkang telur ayam yang didaur ulang dalam BEHONGCA?',
      en: 'Approximately what percentage of natural calcium carbonate (CaCO₃) is found in upcycled chicken eggshells?',
    },
    options: [
      { id: '20% – 30%', en: '20% – 30%' },
      { id: '50% – 60%', en: '50% – 60%' },
      { id: '94% – 97%', en: '94% – 97%' },
      { id: '100% Silika', en: '100% Silica' },
    ],
    correctIndex: 2,
    explanation: {
      id: 'Cangkang telur mengandung 94%–97% CaCO₃ yang aman memoles plak secara lembut dan mendukung remineralisasi email.',
      en: 'Eggshells consist of 94%–97% CaCO₃, gently polishing plaque while supplying bioavailable calcium ions.',
    },
  },
  {
    id: 'q6',
    emoji: '🥭',
    biome: 'Orchard Oasis',
    question: {
      id: 'Selain daun mangga muda sebagai antibakteri, apa peran daging buah mangga madu (Mangifera indica L.) dalam BEHONGCA?',
      en: 'Besides young mango leaves for antibacterial action, what role does ripe honey mango fruit play in BEHONGCA?',
    },
    options: [
      { id: 'Sumber antioksidan & rasa buah ramah anak', en: 'Natural antioxidants & child-friendly fruity taste' },
      { id: 'Pengganti alkohol 40%', en: '40% alcohol substitute' },
      { id: 'Pewarna sintetis biru', en: 'Synthetic blue dye' },
      { id: 'Pengental kimia keras', en: 'Harsh chemical thickener' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Buah mangga madu menyumbang vitamin C, karotenoid, dan rasa manis-buah alami agar anak usia 9–18 tahun nyaman berkumur.',
      en: 'Honey mango fruit adds vitamin C, carotenoids, and a pleasant fruity flavor tailored for school-aged users.',
    },
  },
  {
    id: 'q7',
    emoji: '🍃',
    biome: 'Breeze Peak',
    question: {
      id: 'Bagaimana daun cornmint (Mentha arvensis) membantu melindungi email gigi setelah berkumur?',
      en: 'How does cornmint (Mentha arvensis) help protect tooth enamel beyond giving a fresh cooling flavor?',
    },
    options: [
      { id: 'Mengeringkan rongga mulut', en: 'Drying out the oral cavity' },
      { id: 'Merangsang aliran saliva untuk membilas & menyangga pH', en: 'Stimulating salivary flow to rinse debris & buffer oral pH' },
      { id: 'Menurunkan pH ke angka 3,0', en: 'Lowering pH down to 3.0' },
      { id: 'Mengikis lapisan email', en: 'Etching the enamel layer' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'Menthol alami merangsang sekresi air liur (saliva) yang secara alami membilas sisa makanan dan menetralkan asam mulut.',
      en: 'Natural menthol stimulates protective saliva flow that clears food debris and buffers oral acids.',
    },
  },
  {
    id: 'q8',
    emoji: '📊',
    biome: 'Surakarta Lab',
    question: {
      id: 'Dari survei terhadap 90 pelajar di Surakarta, berapa persentase responden yang mengalami karies gigi?',
      en: 'In the Surakarta preliminary survey (n = 90 students), what percentage of respondents experienced dental caries?',
    },
    options: [
      { id: '33,33%', en: '33.33%' },
      { id: '50,00%', en: '50.00%' },
      { id: '72,22%', en: '72.22%' },
      { id: '95,50%', en: '95.50%' },
    ],
    correctIndex: 2,
    explanation: {
      id: 'Sebanyak 65 dari 90 pelajar (72,22%) mengalami karies gigi dan 66,66% menunjukkan gejala gingivitis.',
      en: '65 out of 90 surveyed students (72.22%) exhibited dental caries and 66.66% showed signs of gingivitis.',
    },
  },
  {
    id: 'q9',
    emoji: '🦠',
    biome: 'Caries Citadel',
    question: {
      id: 'Kelompok bakteri "Red Complex" penyebab utama radang gusi (gingivitis) terdiri atas tiga spesies berikut, KECUALI...',
      en: 'The periodontal "Red Complex" causing gingivitis consists of three bacteria below, EXCEPT...',
    },
    options: [
      { id: 'Porphyromonas gingivalis', en: 'Porphyromonas gingivalis' },
      { id: 'Tannerella forsythia', en: 'Tannerella forsythia' },
      { id: 'Treponema denticola', en: 'Treponema denticola' },
      { id: 'Lactobacillus bulgaricus', en: 'Lactobacillus bulgaricus' },
    ],
    correctIndex: 3,
    explanation: {
      id: 'Red Complex terdiri dari Porphyromonas gingivalis, Tannerella forsythia, dan Treponema denticola—bukan Lactobacillus bulgaricus.',
      en: 'The Red Complex comprises Porphyromonas gingivalis, Tannerella forsythia, and Treponema denticola.',
    },
  },
  {
    id: 'q10',
    emoji: '🧴',
    biome: 'Daily Habit',
    question: {
      id: 'Mengapa pada kemasan BEHONGCA tertera petunjuk "Kocok sebelum digunakan" (Shake well before use)?',
      en: 'Why must BEHONGCA bottles display the instruction "Shake well before use"?',
    },
    options: [
      { id: 'Untuk mendispersikan kembali mikropartikel CaCO₃ secara merata', en: 'To evenly redisperse CaCO₃ micro-particles throughout the suspension' },
      { id: 'Untuk mengaktifkan busa deterjen SLS', en: 'To activate synthetic SLS detergent foam' },
      { id: 'Untuk mencampurkan alkohol dengan minyak', en: 'To mix ethanol with oil' },
      { id: 'Agar suhu larutan naik menjadi 75°C', en: 'To heat the rinse up to 75°C' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Karena merupakan suspensi berair tanpa pengemulsi sintetis keras, pengocokan ringan langsung menyebarkan partikel CaCO₃ secara homogen.',
      en: 'Because BEHONGCA is a clean aqueous suspension without harsh stabilizers, gentle shaking immediately restores uniform CaCO₃ dispersion.',
    },
  },
  {
    id: 'q11',
    emoji: '🏫',
    biome: 'Surakarta Lab',
    question: {
      id: 'Berdasarkan survei n = 90 di Surakarta, kelompok usia manakah yang mencatat jumlah kasus karies paling tinggi?',
      en: 'In the n = 90 Surakarta survey, which student age group recorded the highest number of dental caries cases?',
    },
    options: [
      { id: 'Siswa SD (9–12 tahun, 25/30 siswa)', en: 'Elementary (9–12 years, 25/30 students)' },
      { id: 'Siswa SMP (13–15 tahun, 21/30 siswa)', en: 'Junior High (13–15 years, 21/30 students)' },
      { id: 'Siswa SMA (16–18 tahun, 19/30 siswa)', en: 'Senior High (16–18 years, 19/30 students)' },
      { id: 'Ketiga jenjang sama persis (15/30 siswa)', en: 'All three levels were identical (15/30)' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Siswa SD usia 9–12 tahun mencatat 25/30 kasus karies karena berada pada fase gigi bercampur akhir dengan email baru erupsi.',
      en: 'Ages 9–12 had 25/30 caries cases due to late mixed dentition where newly erupted enamel is still maturing.',
    },
  },
  {
    id: 'q12',
    emoji: '🩺',
    biome: 'Gingival Valley',
    question: {
      id: 'Pada kelompok usia manakah gejala radang gusi (gingivitis) paling tinggi ditemukan dalam survei BEHONGCA?',
      en: 'Which student age group showed the highest gingivitis prevalence in the BEHONGCA Surakarta survey?',
    },
    options: [
      { id: 'Siswa SD (9–12 tahun, 12/30)', en: 'Elementary (9–12 years, 12/30)' },
      { id: 'Siswa SMP (13–15 tahun, 21/30)', en: 'Junior High (13–15 years, 21/30)' },
      { id: 'Siswa SMA (16–18 tahun, 27/30)', en: 'Senior High (16–18 years, 27/30)' },
      { id: 'Tidak ada kasus gingivitis sama sekali', en: 'Zero gingivitis cases found' },
    ],
    correctIndex: 2,
    explanation: {
      id: 'Siswa SMA (16–18 tahun) mencatat 27/30 kasus gingivitis (30,00% dari total seluruh responden) akibat akumulasi plak subgingiva.',
      en: 'Senior high students (16–18 years) showed 27/30 gingivitis cases (30.00% of total surveyed students) due to subgingival plaque.',
    },
  },
  {
    id: 'q13',
    emoji: '📈',
    biome: 'Surakarta Lab',
    question: {
      id: 'Menurut data nasional Riskesdas 2018, berapa persentase prevalensi karies gigi di Indonesia?',
      en: 'According to Indonesian national Riskesdas 2018 data cited in the paper, what is the national dental caries prevalence?',
    },
    options: [
      { id: '42,5% (DMF-T 2,0)', en: '42.5% (DMF-T 2.0)' },
      { id: '66,6% (DMF-T 4,2)', en: '66.6% (DMF-T 4.2)' },
      { id: '88,8% (DMF-T 7,1)', en: '88.8% (DMF-T 7.1)' },
      { id: '99,9% (DMF-T 12,0)', en: '99.9% (DMF-T 12.0)' },
    ],
    correctIndex: 2,
    explanation: {
      id: 'Riskesdas 2018 mencatat prevalensi karies nasional mencapai 88,8% dengan rata-rata indeks DMF-T sebesar 7,1.',
      en: 'Riskesdas (2018) reported 88.8% national caries prevalence with an average DMF-T index of 7.1.',
    },
  },
  {
    id: 'q14',
    emoji: '💧',
    biome: 'Aquades Spring',
    question: {
      id: 'Mengapa BEHONGCA memakai 100% air destilasi (aquades) sebagai pelarut utama dan menghindari alkohol tinggi?',
      en: 'Why does BEHONGCA use 100% distilled water (aquades) as its solvent base instead of high-concentration alcohol?',
    },
    options: [
      { id: 'Agar mulut terasa panas menyengat', en: 'To create an intense burning sensation' },
      { id: 'Mencegah iritasi & rasa perih pada mukosa anak 9–18 tahun', en: 'To prevent mucosal stinging and dryness in ages 9–18' },
      { id: 'Agar formula berubah menjadi padat', en: 'To solidify the mouthwash into paste' },
      { id: 'Untuk melarutkan email gigi lebih cepat', en: 'To dissolve enamel faster' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'Pelarut murni aquades (0% alkohol) lembut di mukosa rongga mulut anak dan tetap mampu mengekstrak glikosida flavonoid larut air.',
      en: 'Pure aquades (0% alcohol) prevents mucosal irritation in young users while recovering water-soluble flavonoid glycosides.',
    },
  },
  {
    id: 'q15',
    emoji: '🧪',
    biome: 'Formula Foundry',
    question: {
      id: 'Berapakah total rasio konsentrasi ekstrak herbal berbanding aquades pada Formula 2 (F2) per 100 mL?',
      en: 'What is the botanical extract vs. distilled water ratio in balanced Formula 2 (F2) per 100 mL?',
    },
    options: [
      { id: '55% herbal · 45% aquades', en: '55% botanical · 45% aquades' },
      { id: '70% herbal · 30% aquades', en: '70% botanical · 30% aquades' },
      { id: '85% herbal · 15% aquades', en: '85% botanical · 15% aquades' },
      { id: '100% alkohol · 0% herbal', en: '100% alcohol · 0% botanical' },
    ],
    correctIndex: 1,
    explanation: {
      id: 'F2 berisi 70 mL ekstrak herbal total (15 mL masing-masing ekstrak utama) + 30% aquades + 0,5 g CaCO₃ sebagai kombinasi seimbang.',
      en: 'F2 combines 70% total herbal extracts (15 mL each primary leaf/filtrate) with 30% aquades and 0.5 g CaCO₃.',
    },
  },
  {
    id: 'q16',
    emoji: '🛡️',
    biome: 'Formula Foundry',
    question: {
      id: 'Varian BEHONGCA manakah yang memiliki konsentrasi ekstrak fitokimia tertinggi (85%) untuk daya hambat biofilm maksimal?',
      en: 'Which BEHONGCA variant packs the highest botanical phytochemical concentration (85%) for maximum biofilm inhibition?',
    },
    options: [
      { id: 'Formula 1 (F1)', en: 'Formula 1 (F1)' },
      { id: 'Formula 2 (F2)', en: 'Formula 2 (F2)' },
      { id: 'Formula 3 (F3)', en: 'Formula 3 (F3)' },
      { id: 'Air destilasi murni', en: 'Pure distilled water' },
    ],
    correctIndex: 2,
    explanation: {
      id: 'Formula 3 (F3) memakai 20 mL tiap ekstrak daun utama sehingga total konsentrasi herbal mencapai 85% per 100 mL.',
      en: 'Formula 3 (F3) uses 20 mL of each primary leaf extract for an 85% total botanical concentration per 100 mL.',
    },
  },
  {
    id: 'q17',
    emoji: '🔥',
    biome: 'Mineral Ridge',
    question: {
      id: 'Bagaimana cara sterilisasi cangkang telur ayam sebelum dihaluskan menjadi mikro-serbuk CaCO₃ pada BEHONGCA?',
      en: 'How are chicken eggshells sterilized before milling into BEHONGCA CaCO₃ micro-powder?',
    },
    options: [
      { id: 'Dikupas membrannya lalu direbus 100°C selama 15 menit', en: 'Membrane peeled and boiled at 100°C for 15 minutes' },
      { id: 'Direndam etanol 96% tanpa dicuci', en: 'Soaked in 96% ethanol unwashed' },
      { id: 'Dibekukan pada -20°C lalu langsung diminum', en: 'Frozen at -20°C and used directly' },
      { id: 'Dipanaskan di suhu 35°C selama 5 detik', en: 'Warmed at 35°C for 5 seconds' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Cangkang bebas membran direbus pada 100°C selama 15 menit untuk mengeliminasi Salmonella sebelum dikeringkan dan diayak halus.',
      en: 'Membrane-free shells are boiled at 100°C for 15 minutes to eliminate Salmonella before drying and fine sieving.',
    },
  },
  {
    id: 'q18',
    emoji: '⚙️',
    biome: 'SMART Workshop',
    question: {
      id: 'Apa fungsi jaket penangas air luar (Panci Luar / Bain-Marie) pada prototipe alat BEHONGCA SMART?',
      en: 'What is the role of the Outer Pot (Bain-Marie water-bath jacket) in the BEHONGCA SMART double-boiler device?',
    },
    options: [
      { id: 'Menghantarkan panas tidak langsung agar suspensi herbal tidak gosong', en: 'Transfers indirect heat evenly so herbal extracts never scorch' },
      { id: 'Menyaring serat daun secara otomatis', en: 'Filters coarse leaf fibers automatically' },
      { id: 'Menambahkan gas karbonasi ke botol', en: 'Adds carbonation gas to bottles' },
      { id: 'Mendinginkan es batu hingga -10°C', en: 'Freezes ice cubes down to -10°C' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Desain double-boiler (bain-marie) mencegah kontak langsung lempeng pemanas ke cairan herbal sehingga panas merata di 72°C–75°C.',
      en: 'The double-boiler water bath distributes gentle indirect heat, preventing scorching while holding 72°C–75°C.',
    },
  },
  {
    id: 'q19',
    emoji: '🎩',
    biome: 'SMART Workshop',
    question: {
      id: 'Bagian alat BEHONGCA SMART manakah yang berfungsi menahan penguapan menthol volatil cornmint selama pemanasan?',
      en: 'Which BEHONGCA SMART component prevents volatile cornmint menthol from escaping during pasteurization?',
    },
    options: [
      { id: 'Tutup Panci (Pot Lid)', en: 'Pot Lid (Tutup Panci)' },
      { id: 'Lempeng Pemanas', en: 'Heating Plate' },
      { id: 'Tombol ON/OFF', en: 'Power Switch' },
      { id: 'Kabel Daya', en: 'Power Cord' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Tutup Panci menjaga minyak atsiri volatil (menthol) tetap terperangkap di ruang uap dan mencegah kontaminasi udara.',
      en: 'The Pot Lid traps volatile essential oils (menthol) inside the chamber while blocking airborne contaminants.',
    },
  },
  {
    id: 'q20',
    emoji: '🧊',
    biome: 'Thermal Shock Chamber',
    question: {
      id: 'Mengapa wadah panci dalam segera dicelupkan ke air es (thermal shock ke 25°C–30°C) tepat setelah HTST 15–30 detik?',
      en: 'Why is the inner pot plunged immediately into an ice bath (thermal shock to 25°C–30°C) after the 15–30s HTST hold?',
    },
    options: [
      { id: 'Menghentikan paparan panas residu & menghambat spora termofilik', en: 'Halts residual heat damage & inhibits thermophilic spore germination' },
      { id: 'Mengubah cairan obat kumur menjadi es batu', en: 'Freezes the mouthwash into solid ice' },
      { id: 'Menurunkan pH agar lebih asam dari 4,0', en: 'Drops the pH below 4.0' },
      { id: 'Menghilangkan seluruh rasa mangga', en: 'Removes all mango flavor' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Pendinginan cepat < 2 menit memutus paparan panas lanjutan terhadap senyawa bioaktif dan menekan pertumbuhan spora bakteri tersisa.',
      en: 'Rapid cooling (< 2 min) stops residual heat degradation of bioactives and suppresses surviving bacterial spores.',
    },
  },
  {
    id: 'q21',
    emoji: '🥭',
    biome: 'Orchard Oasis',
    question: {
      id: 'Senyawa polifenol utama pada daun mangga muda (Mangifera indica L.) yang bersifat antibakteri terhadap S. mutans adalah...',
      en: 'What key antibacterial polyphenol found in young mango leaves (Mangifera indica L.) helps suppress S. mutans?',
    },
    options: [
      { id: 'Mangiferin', en: 'Mangiferin' },
      { id: 'Kafein', en: 'Caffeine' },
      { id: 'Aspartam', en: 'Aspartame' },
      { id: 'Natrium Hipoklorit', en: 'Sodium Hypochlorite' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Daun mangga muda kaya mangiferin serta tanin dan polifenol yang efektif menghambat pertumbuhan bakteri kariogenik.',
      en: 'Young mango leaves are rich in mangiferin, tannins, and polyphenols that suppress cariogenic bacteria.',
    },
  },
  {
    id: 'q22',
    emoji: '🧫',
    biome: 'Microbiology Wing',
    question: {
      id: 'Dalam protokol uji antibakteri terjadwal di Surakarta (CLSI 2022), standar kekeruhan suspensi S. mutans yang dipakai adalah...',
      en: 'In the scheduled Surakarta CLSI 2022 disc diffusion assay, what turbidity standard is used for the S. mutans inoculum?',
    },
    options: [
      { id: '0.5 McFarland (1.5 × 10⁸ CFU/mL)', en: '0.5 McFarland (1.5 × 10⁸ CFU/mL)' },
      { id: '5.0 McFarland', en: '5.0 McFarland' },
      { id: '0.01 McFarland', en: '0.01 McFarland' },
      { id: '10.0 McFarland', en: '10.0 McFarland' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Standar CLSI 2022 menggunakan suspensi 0.5 McFarland yang diinkubasi pada suhu 37°C selama 24 jam sebelum pengukuran zona hambat.',
      en: 'CLSI 2022 protocols standardize bacterial density at 0.5 McFarland with 24-hour incubation at 37°C.',
    },
  },
  {
    id: 'q23',
    emoji: '🔬',
    biome: 'Microbiology Wing',
    question: {
      id: 'Media apakah yang dijadwalkan untuk menguji keamanan abrasivitas & efek pemolesan partikel mikro CaCO₃ BEHONGCA?',
      en: 'Which test medium is scheduled for validating BEHONGCA CaCO₃ micro-particle polishing and abrasiveness safety?',
    },
    options: [
      { id: 'Media lempeng akrilik (Acrylic Surface Assay)', en: 'Acrylic surface polishing medium' },
      { id: 'Baja karbon industri', en: 'Industrial carbon steel' },
      { id: 'Kertas saring kopi', en: 'Coffee filter paper' },
      { id: 'Batu apung vulkanik', en: 'Volcanic pumice stone' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Simulasi pemolesan memakai media akrilik mengevaluasi apakah partikel halus CaCO₃ membersihkan noda secara lembut tanpa menggores.',
      en: 'Acrylic surface testing evaluates gentle hydrodynamic stain polishing without scratching enamel-like surfaces.',
    },
  },
  {
    id: 'q24',
    emoji: '🧬',
    biome: 'Biofilm Jungle',
    question: {
      id: 'Enzim bakteri S. mutans manakah yang dihambat oleh tanin daun binahong agar plak lengket sulit terbentuk di gigi?',
      en: 'Which S. mutans biofilm-building enzyme is inhibited by binahong tannins to prevent sticky plaque adhesion?',
    },
    options: [
      { id: 'Glucosyltransferase (GTF)', en: 'Glucosyltransferase (GTF)' },
      { id: 'Amilase ludah', en: 'Salivary amylase' },
      { id: 'Katalase hati', en: 'Hepatic catalase' },
      { id: 'Lipase pankreas', en: 'Pancreatic lipase' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Tanin menghambat enzim glucosyltransferase sehingga bakteri kesulitan membentuk matriks glukan lengket untuk menempel di email.',
      en: 'Tannins inhibit glucosyltransferase, blocking S. mutans from synthesizing sticky glucan polymers on tooth surfaces.',
    },
  },
  {
    id: 'q25',
    emoji: '🫧',
    biome: 'Daily Habit',
    question: {
      id: 'Berapa lama durasi berkumur yang dianjurkan dengan obat kumur herbal BEHONGCA agar menjangkau sela geraham belakang?',
      en: 'How long should a user swish alcohol-free BEHONGCA herbal rinse so bioactives reach back molars effectively?',
    },
    options: [
      { id: '30 detik penuh (tanpa ditelan)', en: '30 full seconds (without swallowing)' },
      { id: '2 detik saja lalu langsung ditelan', en: '2 seconds and swallow immediately' },
      { id: '15 menit terus-menerus', en: '15 continuous minutes' },
      { id: '1 detik sebelum makan', en: '1 second before meals' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Berkumur selama 30 detik memberi waktu kontak optimal bagi flavonoid dan menthol untuk menyebar ke sela gigi tanpa rasa perih.',
      en: 'A 30-second swish gives flavonoids and menthol time to reach interdental spaces gently without stinging.',
    },
  },
  {
    id: 'q26',
    emoji: '⏳',
    biome: 'Enamel Prairie',
    question: {
      id: 'Setelah minum jus jeruk atau makanan asam, mengapa sebaiknya menunggu sekitar 30 menit sebelum menyikat gigi?',
      en: 'After drinking citrus juice or eating sour foods, why should you wait about 30 minutes before brushing your teeth?',
    },
    options: [
      { id: 'Menyikat saat email melunak oleh asam dapat mempercepat abrasi mekanis', en: 'Brushing acid-softened enamel immediately accelerates mechanical wear' },
      { id: 'Agar bakteri sempat membentuk karang gigi', en: 'To let bacteria harden into calculus' },
      { id: 'Karena bulu sikat tidak basah dalam 30 menit', en: 'Because toothbrush bristles stay dry for 30 minutes' },
      { id: 'Supaya warna gigi menjadi kuning', en: 'To stain the enamel yellow' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Asam langsung melunakkan permukaan email sementara waktu; bilas air putih dahulu dan beri waktu saliva menetralkan pH selama 30 menit.',
      en: 'Dietary acids temporarily soften enamel; rinsing with water and waiting 30 minutes lets saliva re-harden the surface.',
    },
  },
  {
    id: 'q27',
    emoji: '🍯',
    biome: 'Enamel Prairie',
    question: {
      id: 'Menurut kurva Stephan, berapa lama pH plak gigi turun berada di zona kritis (< 5,5) setelah satu kali paparan gula?',
      en: 'According to the Stephan curve, roughly how long does plaque pH stay below critical pH 5.5 after a single sugar intake?',
    },
    options: [
      { id: 'Sekitar 20–40 menit', en: 'Around 20–40 minutes' },
      { id: 'Hanya 2 detik', en: 'Only 2 seconds' },
      { id: 'Selama 48 jam', en: 'For 48 hours' },
      { id: 'pH langsung naik menjadi 9,0', en: 'pH jumps straight to 9.0' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Satu kali ngemil manis menurunkan pH plak selama 20–40 menit, itulah sebabnya frekuensi ngemil manis lebih berbahaya dibanding porsinya.',
      en: 'Each sugary snack drops plaque pH for 20–40 minutes, making snack frequency riskier than single post-meal treats.',
    },
  },
  {
    id: 'q28',
    emoji: '🗓️',
    biome: 'Daily Habit',
    question: {
      id: 'Kapan waktu maksimal sikat gigi harus diganti agar pembersihan garis gusi dan pencegahan plak tetap efektif?',
      en: 'What is the maximum recommended interval for replacing your toothbrush to keep gingival plaque removal effective?',
    },
    options: [
      { id: 'Setiap 3 bulan atau segera bila bulu mekar', en: 'Every 3 months or sooner if bristles fray' },
      { id: 'Setiap 2 tahun sekali', en: 'Once every 2 years' },
      { id: 'Hanya jika gagangnya patah', en: 'Only if the handle snaps' },
      { id: 'Setiap 5 tahun sekali', en: 'Once every 5 years' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Bulu sikat yang mekar gagal menyapu biofilm di batas gusi sehingga disarankan ganti sikat minimal tiap 3 bulan sekali.',
      en: 'Splayed bristles cannot sweep the gumline cleanly, so dentists recommend replacing toothbrushes at least every 3 months.',
    },
  },
  {
    id: 'q29',
    emoji: '🌙',
    biome: 'Daily Habit',
    question: {
      id: 'Mengapa menyikat gigi malam tepat sebelum tidur sangat krusial bagi kesehatan email gigi?',
      en: 'Why is brushing your teeth right before bedtime especially critical for protecting tooth enamel?',
    },
    options: [
      { id: 'Produksi air liur turun drastis saat tidur sehingga asam gula mudah merusak email', en: 'Salivary flow drops sharply during sleep, leaving lingering sugars unbuffered' },
      { id: 'Karena bakteri S. mutans tidur di siang hari', en: 'Because S. mutans sleeps during daytime' },
      { id: 'Untuk membuat rasa lapar hilang', en: 'To suppress appetite overnight' },
      { id: 'Agar suhu tubuh naik ke 72°C', en: 'To raise body temperature to 72°C' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Saat tidur aliran air liur melambat, padahal air liur berperan penting menyangga asam dan membilas sisa karbohidrat.',
      en: 'Reduced nocturnal saliva leaves teeth without natural bicarbonate buffering against overnight bacterial acid production.',
    },
  },
  {
    id: 'q30',
    emoji: '📱',
    biome: 'SMART Ecosystem',
    question: {
      id: 'Rasio ekstraksi akuades untuk bahan daun segar (binahong, krokot, mangga muda, cornmint) berbanding daging buah mangga madu pada BEHONGCA adalah...',
      en: 'What aqueous extraction ratios (w/v) are used for fresh leaves vs. honey mango fruit pulp in BEHONGCA?',
    },
    options: [
      { id: '1:2 (w/v) untuk daun segar · 1:1 (w/v) untuk daging buah mangga', en: '1:2 (w/v) for fresh leaves · 1:1 (w/v) for mango pulp' },
      { id: '1:100 untuk daun · 1:50 untuk buah', en: '1:100 for leaves · 1:50 for fruit' },
      { id: 'Tanpa air sama sekali (ekstrak kering)', en: 'Zero water (dry extract only)' },
      { id: '10:1 alkohol murni untuk semua bahan', en: '10:1 pure ethanol for every ingredient' },
    ],
    correctIndex: 0,
    explanation: {
      id: 'Daun segar diekstraksi pada rasio 50 g / 100 mL aquades (1:2 w/v), sedangkan daging buah mangga madu pada 1:1 w/v agar kaya rasa & vitamin C.',
      en: 'Fresh leaves are extracted at 1:2 w/v (50 g / 100 mL aquades) while ripe honey mango pulp uses 1:1 w/v for rich flavor and vitamin C.',
    },
  },
];

export const REFERENCES_LIST: ReferenceItem[] = [
  {
    id: 'ref-1',
    year: 2011,
    topic: { id: 'Saponin & Fitokimia Binahong', en: 'Binahong Saponins & Phytochemistry' },
    citation:
      'Astuti, S. M., Sakinah, M. A. M., Rahmat, B. M., & Muhammad, A. (2011). Determination of saponin compound from Anredera cordifolia (Ten.) Steenis plant (Binahong) to potential treatment for several diseases. Journal of Agricultural Science, 3(4), 224–232.',
  },
  {
    id: 'ref-2',
    year: 2022,
    topic: { id: 'Standar Uji Difusi Cakram CLSI', en: 'CLSI Disc Diffusion Susceptibility Standards' },
    citation:
      'Clinical and Laboratory Standards Institute. (2022). Performance standards for antimicrobial susceptibility testing (32nd ed., CLSI standard M100). Clinical and Laboratory Standards Institute.',
  },
  {
    id: 'ref-3',
    year: 2017,
    topic: { id: 'Teknologi Pasteurisasi HTST', en: 'HTST Pasteurization Food Processing' },
    citation:
      'Fellows, P. J. (2017). Food processing technology: Principles and practice (4th ed.). Woodhead Publishing.',
  },
  {
    id: 'ref-4',
    year: 2013,
    topic: { id: 'Kalsium Karbonat Cangkang Telur', en: 'Eggshell Bio-Waste Calcium Carbonate' },
    citation:
      'Hassan, T. A., Rangari, V. K., & Jeelani, S. (2013). Processing, characterization and antibacterial properties of calcium carbonate nanoparticles derived from bio-waste eggshells. Journal of Materials Chemistry B, 1(32), 3980–3989.',
  },
  {
    id: 'ref-5',
    year: 1992,
    topic: { id: 'Patogenesis Karies Gigi', en: 'Essentials of Dental Caries' },
    citation: 'Kidd, E. A. M. (1992). Essentials of dental caries: The disease and its management. Oxford University Press.',
  },
  {
    id: 'ref-6',
    year: 2025,
    topic: { id: 'Farmakologi Portulaca oleracea L.', en: 'Portulaca oleracea L. Bioactive Review' },
    citation:
      'Kureshi, S., Patel, R., & Shah, A. (2025). Pharmacological potential and bioactive compounds of Portulaca oleracea L.: A comprehensive review. Journal of Ethnopharmacology, 318, 117021.',
  },
  {
    id: 'ref-7',
    year: 2025,
    topic: { id: 'Alkaloid Oleracein Anti-Inflamasi', en: 'Oleracein Alkaloids in Oral Lesions' },
    citation:
      'Mahmoud, H. A., & Abdul Kader, S. (2025). Anti-inflammatory activity of oleracein alkaloids isolated from purslane (Portulaca oleracea) in oral mucosal lesions. International Journal of Herbal Medicine, 13(1), 45–52.',
  },
  {
    id: 'ref-8',
    year: 2016,
    topic: { id: 'Mikrobiologi Rongga Mulut', en: 'Oral Microbiology & Plaque Biofilms' },
    citation: 'Marsh, P. D., & Martin, M. V. (2016). Oral microbiology (6th ed.). Elsevier Health Sciences.',
  },
  {
    id: 'ref-9',
    year: 2006,
    topic: { id: 'Bioaktivitas Mentha & Menthol', en: 'Mint Bioactivity & Oral Soothing' },
    citation:
      'McKay, D. L., & Blumberg, J. B. (2006). A review of the bioactivity and potential health benefits of peppermint tea (Mentha piperita L.). Phytotherapy Research, 20(8), 619–633.',
  },
  {
    id: 'ref-10',
    year: 2018,
    topic: { id: 'Riskesdas Nasional Karies 2018', en: 'Indonesian National Riskesdas 2018' },
    citation:
      'Ministry of Health of the Republic of Indonesia. (2018). National report on basic health research (Riskesdas) 2018. Health Research and Development Agency of the Ministry of Health of the Republic of Indonesia.',
  },
  {
    id: 'ref-11',
    year: 2020,
    topic: { id: 'Farmakope Herbal Indonesia', en: 'Indonesian Herbal Pharmacopoeia' },
    citation:
      'Ministry of Health of the Republic of Indonesia. (2020). Indonesian herbal pharmacopoeia (2nd ed.). Ministry of Health of the Republic of Indonesia.',
  },
  {
    id: 'ref-12',
    year: 2015,
    topic: { id: 'Sumber CaCO₃ Alami Kedokteran Gigi', en: 'Eggshells as Natural CaCO₃ in Dentistry' },
    citation:
      'Neunzehn, J., Szuwart, T., & Wiesmann, H. P. (2015). Eggshells as natural calcium carbonate source in dentistry and bone tissue engineering. International Journal of Oral Science, 7(2), 73–81.',
  },
  {
    id: 'ref-13',
    year: 2005,
    topic: { id: 'Perkembangan Gigi Anak 9–12 Tahun', en: 'Mixed-Dentition Enamel Vulnerability' },
    citation: 'Potter, P. A., & Perry, A. G. (2005). Fundamentals of nursing: Concepts, process, and practice (4th ed., Vol. 2). EGC.',
  },
  {
    id: 'ref-14',
    year: 2012,
    topic: { id: 'Antimikroba Mentha arvensis L.', en: 'Mentha arvensis L. Oral Hygiene Extracts' },
    citation:
      'Pramila, D. M., Xavier, R., Marimuthu, K., Kathiresan, S., Khoo, M. L., Senthilkumar, P. K., & Sreeramanan, S. (2012). Phytochemical analysis and antimicrobial potential of Mentha arvensis L. extracts in oral hygiene products. Journal of Medicinal Plants Research, 6(2), 331–335.',
  },
  {
    id: 'ref-15',
    year: 2017,
    topic: { id: 'Efektivitas Daun Mangga vs S. mutans', en: 'Mangifera indica L. vs Streptococcus mutans' },
    citation:
      'Rajan, S. S., & Ganesan, S. (2017). Antibacterial efficacy of Mangifera indica L. leaf extract against oral pathogen Streptococcus mutans. Asian Journal of Pharmaceutical and Clinical Research, 10(3), 142–146.',
  },
  {
    id: 'ref-16',
    year: 2016,
    topic: { id: 'Peran Orang Tua dalam Kebersihan Mulut', en: 'Parental Role in Elementary Oral Hygiene' },
    citation:
      'Ridwan, R. (2016). The role of parents in maintaining dental and oral health in elementary school children. Indonesian Journal of Health Services, 8(2), 112–120.',
  },
  {
    id: 'ref-17',
    year: 2009,
    topic: { id: 'Uji Antibakteri Ekstrak Binahong', en: 'In Vitro Binahong vs S. mutans' },
    citation:
      'Rochani, N. (2009). Antibacterial activity test of ethanol extract of binahong leaf (Anredera cordifolia (Ten.) Steenis) against Streptococcus mutans in vitro [Undergraduate thesis, University of Muhammadiyah Surakarta].',
  },
  {
    id: 'ref-18',
    year: 1998,
    topic: { id: 'Kompleks Bakteri Red Complex', en: 'Subgingival Red Complex Biofilms' },
    citation:
      'Socransky, S. S., Haffajee, A. D., Cugini, M. A., Smith, C., & Kent, R. L. (1998). Microbial complexes in subgingival plaque. Journal of Clinical Periodontology, 25(2), 134–144.',
  },
  {
    id: 'ref-19',
    year: 2023,
    topic: { id: 'Omega-3 Nabati & Kesehatan Periodontal', en: 'Plant Omega-3 in Periodontal Health' },
    citation:
      'Srivastava, N., Verma, K., & Sharma, P. (2023). Antioxidant and anti-inflammatory roles of plant-derived omega-3 fatty acids and vitamins in periodontal health. Journal of Periodontal Research, 58(4), 689–698.',
  },
  {
    id: 'ref-20',
    year: 2011,
    topic: { id: 'Ekologi Asam Proses Karies', en: 'Ecological Perspectives of Dental Caries' },
    citation:
      'Takahashi, N., & Nyvad, B. (2011). The role of bacteria in the caries process: Ecological perspectives. Journal of Dental Research, 90(3), 294–303.',
  },
  {
    id: 'ref-21',
    year: 2010,
    topic: { id: 'Fitokimia Antimikroba Mangifera indica', en: 'Antimicrobial Phytochemicals of Mango Leaves' },
    citation:
      'Vaghasiya, Y., & Chanda, S. (2010). Antimicrobial and phytochemical activities of Mangifera indica L. leaf extracts against pathogenic microorganisms. Pharmaceutical Biology, 48(7), 819–825.',
  },
  {
    id: 'ref-22',
    year: 2018,
    topic: { id: 'Abrasivitas Limbah Alami vs Silika', en: 'Natural Waste Abrasiveness vs Synthetic Silica' },
    citation:
      'Voronets, E. A., & Sampaio, F. C. (2018). Comparative abrasive assessment of natural waste materials versus synthetic silica in oral care formulations. Journal of Applied Oral Science, 26, e20170451.',
  },
  {
    id: 'ref-23',
    year: 2023,
    topic: { id: 'Polisakarida & Fenolik Krokot', en: 'Portulaca oleracea Phenolics & Polysaccharides' },
    citation:
      'Wang, Y., Zhang, L., & Liu, X. (2023). Phenolic compounds and polysaccharides from Portulaca oleracea L. and their protective effects against oral pathogens and inflammation. Phytomedicine, 112, 154690.',
  },
  {
    id: 'ref-24',
    year: 2018,
    topic: { id: 'Inhibisi S. mutans oleh Binahong', en: 'Binahong Growth Inhibition of S. mutans' },
    citation:
      'Yuniarti, L., & Lukitasari, M. (2018). Effectiveness of binahong leaf extract (Anredera cordifolia) on the growth inhibition of Streptococcus mutans. Unisula Journal of Dentistry, 4(1), 15–22.',
  },
];

export const CONCLUSIONS_DATA = {
  id: [
    {
      title: '1. Kelayakan Formulasi & Fisik',
      body: 'Obat kumur herbal BEHONGCA berhasil diformulasikan dengan metode pasteurisasi HTST (72°C–75°C, 15–30 detik) dan thermal shock, menghasilkan suspensi 100% bebas alkohol berwarna hijau-kecokelatan alami, aroma mint-mangga menyegarkan, serta pH aman 6,0–6,8.',
    },
    {
      title: '2. Relevansi Epidemiologis & Potensi Bioaktif',
      body: 'Survei sekolah di Surakarta (n = 90) membuktikan tingginya prevalensi karies gigi (72,22%) dan gingivitis (66,66%) pada pelajar usia 9–18 tahun, menegaskan urgensi obat kumur alami yang lembut dan kaya flavonoid, tanin, menthol, serta fitokimia anti-inflamasi.',
    },
    {
      title: '3. Inovasi Lingkungan & Validasi Terjadwal',
      body: 'Daur ulang limbah cangkang telur menjadi agen pemoles lembut sekaligus penyangga pH yang dipadukan dengan ekosistem BEHONGCA SMART siap diuji lanjut melalui uji difusi cakram in vitro terhadap Streptococcus mutans (CLSI 2022) dan uji abrasivitas media akrilik untuk presentasi final I2ASPO.',
    },
  ],
  en: [
    {
      title: '1. Formulation & Physical Feasibility',
      body: 'The BEHONGCA herbal mouthwash is successfully formulated via HTST pasteurization (72°C–75°C, 15–30 seconds) and thermal shock, yielding a physically stable, 100% alcohol-free suspension with natural greenish-brown color, refreshing mint-mango flavor, and buffered pH 6.0–6.8.',
    },
    {
      title: '2. Epidemiological Relevance & Bioactive Potential',
      body: 'School survey data in Surakarta (n = 90) confirm elevated prevalence of dental caries (72.22%) and gingivitis (66.66%) among students aged 9–18, validating the urgent need for a gentle mouthwash rich in antibacterial flavonoids, tannins, menthol, and anti-inflammatory phytochemicals.',
    },
    {
      title: '3. Environmental Innovation & Scheduled Validation',
      body: 'Upcycling household eggshell waste into a mild polishing and pH-buffering agent alongside the BEHONGCA SMART system establishes a sustainable oral-care innovation, with quantitative in vitro S. mutans disc diffusion (CLSI 2022) and acrylic abrasiveness datasets scheduled for the final I2ASPO poster and oral defense.',
    },
  ],
};

export const LAB_STAT_METRICS = [
  {
    id: 'stat-caco3',
    category: 'physical_ph' as const,
    emoji: '🥚',
    numericValue: 97,
    decimals: 0,
    prefix: '94–',
    suffix: '%',
    rangeNote: 'CaCO₃',
    title: {
      id: 'Kemurnian CaCO₃ Cangkang Telur',
      en: 'Eggshell CaCO₃ Purity',
    },
    detail: {
      id: 'Komposisi mineral kalsium karbonat alami penyangga pH & pemoles lembut.',
      en: 'Natural calcium carbonate content buffering organic acids & gently polishing enamel.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-ph-opt',
    category: 'physical_ph' as const,
    emoji: '⚖️',
    numericValue: 6.4,
    decimals: 1,
    prefix: 'pH ',
    suffix: '',
    rangeNote: '6.0–6.8',
    title: {
      id: 'Titik Tengah Zona Aman BEHONGCA',
      en: 'BEHONGCA Optimal pH Midpoint',
    },
    detail: {
      id: 'Berada tepat di dalam rentang fisiologis rongga mulut (5,5–7,5) agar bebas erosi.',
      en: 'Buffered squarely inside the oral physiological window (5.5–7.5) to prevent erosion.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-alcohol',
    category: 'physical_ph' as const,
    emoji: '💧',
    numericValue: 0,
    decimals: 0,
    prefix: '',
    suffix: '%',
    rangeNote: 'Aquades 100%',
    title: {
      id: 'Kadar Alkohol & Bahan Sintetis',
      en: 'Synthetic Alcohol Content',
    },
    detail: {
      id: 'Pelarut murni air destilasi tanpa etanol sehingga tidak perih di mukosa anak.',
      en: 'Pure distilled-water base with zero ethanol so young oral mucosa never stings.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-htst-temp',
    category: 'htst' as const,
    emoji: '🌡️',
    numericValue: 75,
    decimals: 0,
    prefix: '72–',
    suffix: '°C',
    rangeNote: 'Double-Boiler',
    title: {
      id: 'Suhu Pasteurisasi HTST',
      en: 'HTST Pasteurization Target',
    },
    detail: {
      id: 'Menonaktifkan patogen vegetatif tanpa merusak flavonoid, vitamin C, dan menthol.',
      en: 'Eliminates vegetative pathogens while protecting heat-sensitive flavonoids & menthol.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-htst-sec',
    category: 'htst' as const,
    emoji: '⏱️',
    numericValue: 30,
    decimals: 0,
    prefix: '15–',
    suffix: 's',
    rangeNote: 'Thermal Shock 25°C',
    title: {
      id: 'Durasi Tahan Panas HTST',
      en: 'HTST Holding Time',
    },
    detail: {
      id: 'Pemanasan singkat diikuti pendinginan kejut air es (25°C–30°C) dalam < 2 menit.',
      en: 'Brief heat hold followed immediately by rapid ice-bath thermal shock (25°C–30°C).',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-eggshell-steril',
    category: 'htst' as const,
    emoji: '🔥',
    numericValue: 100,
    decimals: 0,
    prefix: '',
    suffix: '°C',
    rangeNote: '15 min',
    title: {
      id: 'Sterilisasi Cangkang Telur',
      en: 'Eggshell Sterilization Temp',
    },
    detail: {
      id: 'Perebusan khusus 15 menit pada cangkang bebas membran untuk eliminasi Salmonella.',
      en: 'Dedicated 15-minute boil on membrane-free shells to eliminate Salmonella.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-f1',
    category: 'formulas' as const,
    emoji: '🧪',
    numericValue: 55,
    decimals: 0,
    prefix: '',
    suffix: '%',
    rangeNote: 'F1 · 10 mL/ekstrak',
    title: {
      id: 'Konsentrasi Herbal Formula F1',
      en: 'Formula F1 Botanical Ratio',
    },
    detail: {
      id: 'Varian ringan (55 mL ekstrak total + 45 mL aquades + 0,5 g CaCO₃) beraroma lembut.',
      en: 'Mild variant (55 mL total extracts + 45 mL aquades + 0.5 g CaCO₃) for gentle taste.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-f2',
    category: 'formulas' as const,
    emoji: '🌿',
    numericValue: 70,
    decimals: 0,
    prefix: '',
    suffix: '%',
    rangeNote: 'F2 · 15 mL/ekstrak',
    title: {
      id: 'Konsentrasi Herbal Formula F2',
      en: 'Formula F2 Botanical Ratio',
    },
    detail: {
      id: 'Formula seimbang (70 mL ekstrak total + 30 mL aquades) optimal untuk pelajar.',
      en: 'Balanced formulation (70 mL extracts + 30 mL aquades) ideal for daily student use.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-f3',
    category: 'formulas' as const,
    emoji: '🛡️',
    numericValue: 85,
    decimals: 0,
    prefix: '',
    suffix: '%',
    rangeNote: 'F3 · 20 mL/ekstrak',
    title: {
      id: 'Konsentrasi Herbal Formula F3',
      en: 'Formula F3 Botanical Ratio',
    },
    detail: {
      id: 'Konsentrasi fitokimia tertinggi (85 mL ekstrak total) untuk daya hambat biofilm maksimal.',
      en: 'Highest phytochemical density (85 mL extracts) targeting maximum biofilm inhibition.',
    },
    statusType: 'measured' as const,
  },
  {
    id: 'stat-clsi-mcfarland',
    category: 'clsi' as const,
    emoji: '🔬',
    numericValue: 0.5,
    decimals: 1,
    prefix: '',
    suffix: ' McF',
    rangeNote: '1.5 × 10⁸ CFU/mL',
    title: {
      id: 'Standar Suspensi S. mutans',
      en: 'S. mutans Inoculum Standard',
    },
    detail: {
      id: 'Acuan kekeruhan CLSI 2022 pada uji difusi cakram terjadwal di Surakarta.',
      en: 'CLSI 2022 turbidity benchmark for scheduled disc diffusion assay in Surakarta.',
    },
    statusType: 'protocol' as const,
  },
  {
    id: 'stat-clsi-inc',
    category: 'clsi' as const,
    emoji: '🧫',
    numericValue: 37,
    decimals: 0,
    prefix: '',
    suffix: '°C',
    rangeNote: '24 jam / 24h',
    title: {
      id: 'Suhu Inkubasi Uji Cakram',
      en: 'Disc Diffusion Incubation',
    },
    detail: {
      id: 'Inkubasi kultur selama 24 jam sebelum pengukuran zona bening hambatan bakteri.',
      en: '24-hour culture incubation prior to measuring bacterial inhibition zone diameters.',
    },
    statusType: 'protocol' as const,
  },
  {
    id: 'stat-survey-n',
    category: 'clsi' as const,
    emoji: '🏫',
    numericValue: 90,
    decimals: 0,
    prefix: 'n = ',
    suffix: '',
    rangeNote: '72.22% Caries',
    title: {
      id: 'Sampel Survei Epidemiologi',
      en: 'School Survey Sample Size',
    },
    detail: {
      id: 'Responden pelajar SD–SMP–SMA Surakarta (30 per jenjang) sebagai landasan riset.',
      en: 'Surakarta elementary, junior, and senior high students (30 per level) surveyed.',
    },
    statusType: 'measured' as const,
  },
];

export const FORMULA_COMPARISON_BARS = [
  {
    formula: 'F1',
    botanicalPct: 55,
    primaryLeafMl: 10,
    aquadesPct: 45,
    tag: { id: 'Rasa Paling Ringan', en: 'Mildest Flavor' },
  },
  {
    formula: 'F2',
    botanicalPct: 70,
    primaryLeafMl: 15,
    aquadesPct: 30,
    tag: { id: 'Seimbang Optimal', en: 'Balanced Optimal' },
  },
  {
    formula: 'F3',
    botanicalPct: 85,
    primaryLeafMl: 20,
    aquadesPct: 15,
    tag: { id: 'Bioaktif Maksimal', en: 'Max Bioactives' },
  },
];

export const DENTAL_HEALTH_TIPS = [
  {
    id: 'tip-2x2',
    topic: 'brushing' as const,
    emoji: '🪥',
    title: {
      id: 'Aturan 2×2 Menit Menyikat Gigi',
      en: 'The 2×2 Minute Brushing Rule',
    },
    summary: {
      id: 'Sikat gigi pagi setelah sarapan dan malam tepat sebelum tidur selama 2 menit penuh dengan gerakan memutar lembut.',
      en: 'Brush every morning after breakfast and at night before sleep for a full 2 minutes using gentle circular strokes.',
    },
    scienceNote: {
      id: 'Malam hari produksi air liur menurun drastis sehingga sisa gula sangat mudah difermentasi S. mutans menjadi asam perusak email.',
      en: 'Salivary flow drops significantly during sleep, giving S. mutans an easy chance to ferment lingering sugars into enamel-eroding acids.',
    },
  },
  {
    id: 'tip-rinse-30',
    topic: 'brushing' as const,
    emoji: '🫧',
    title: {
      id: 'Kumur Herbal 30 Detik Bebas Alkohol',
      en: '30-Second Alcohol-Free Herbal Rinse',
    },
    summary: {
      id: 'Kocok botol perlahan agar partikel CaCO₃ merata, lalu berkumur 30 detik menjangkau sela gigi belakang tanpa ditelan.',
      en: 'Shake gently to disperse CaCO₃ micro-particles, then swish thoroughly for 30 seconds across back molars without swallowing.',
    },
    scienceNote: {
      id: 'Obat kumur bebas alkohol menjaga kelembapan mukosa mulut sekaligus menyalurkan flavonoid binahong dan menthol ke area yang sulit dijangkau sikat.',
      en: 'Alcohol-free rinses protect oral mucosal moisture while delivering binahong flavonoids and menthol to hard-to-reach interdental zones.',
    },
  },
  {
    id: 'tip-wait-30',
    topic: 'sugar_ph' as const,
    emoji: '⏳',
    title: {
      id: 'Tunggu 30 Menit Setelah Makanan Asam',
      en: 'Wait 30 Minutes After Acidic Foods',
    },
    summary: {
      id: 'Setelah minum jus jeruk, soda, atau makan buah asam, bilas dengan air putih terlebih dahulu dan tunda menyikat gigi selama 30 menit.',
      en: 'After citrus juice, soda, or sour snacks, rinse with plain water first and wait 30 minutes before brushing.',
    },
    scienceNote: {
      id: 'Asam langsung melunakkan permukaan email sementara waktu (pH < 5,5); menyikat terlalu cepat justru mempercepat abrasi mekanis lapisan email.',
      en: 'Acids temporarily soften enamel surfaces below pH 5.5; immediate brushing can accelerate mechanical enamel wear before saliva re-hardens it.',
    },
  },
  {
    id: 'tip-sugar-gap',
    topic: 'sugar_ph' as const,
    emoji: '🍯',
    title: {
      id: 'Batasi Frekuensi Ngemil Manis',
      en: 'Space Out Sugary Snacks',
    },
    summary: {
      id: 'Lebih baik menikmati camilan manis sekaligus setelah makan utama daripada menyantap permen sedikit demi sedikit sepanjang hari.',
      en: 'Enjoy sweet treats right after a main meal rather than sipping sugary drinks or snacking continuously throughout the day.',
    },
    scienceNote: {
      id: 'Setiap paparan gula memicu penurunan pH plak di bawah 5,5 selama ±20–40 menit (kurva Stephan), sehingga ngemil terus-menerus membuat gigi terus berada dalam zona demineralisasi.',
      en: 'Each sugar exposure drops plaque pH below 5.5 for 20–40 minutes (Stephan curve), meaning frequent snacking keeps enamel trapped in demineralization.',
    },
  },
  {
    id: 'tip-saliva-mint',
    topic: 'natural_care' as const,
    emoji: '🍃',
    title: {
      id: 'Manfaatkan Air Putih & Stimulasi Saliva',
      en: 'Hydrate & Support Natural Saliva Buffer',
    },
    summary: {
      id: 'Perbanyak minum air putih serta pilih bahan penyegar alami seperti daun mint untuk menjaga mulut tidak kering.',
      en: 'Drink plain water frequently throughout the day and favor natural breath-freshening herbs like cornmint to prevent dry mouth.',
    },
    scienceNote: {
      id: 'Air liur adalah penyangga bikarbonat alami tubuh yang mengembalikan pH mulut ke rentang fisiologis 6,5–7,5 serta membilas sisa makanan.',
      en: 'Saliva is the body’s natural bicarbonate buffer, restoring oral pH back toward 6.5–7.5 while clearing fermentable food debris.',
    },
  },
  {
    id: 'tip-calcium-remin',
    topic: 'natural_care' as const,
    emoji: '🥚',
    title: {
      id: 'Dukung Remineralisasi dengan Kalsium & Sayur',
      en: 'Boost Remineralization with Calcium & Greens',
    },
    summary: {
      id: 'Konsumsi makanan kaya kalsium dan sayuran hijau segar guna membantu jaringan gusi serta mineralisasi gigi tetap kuat.',
      en: 'Include calcium-rich foods and crisp leafy vegetables to strengthen periodontal tissue and support natural enamel remineralization.',
    },
    scienceNote: {
      id: 'Ion kalsium (Ca²⁺) dan antioksidan nabati (vitamin C dari mangga & krokot) memperkuat jaringan ikat gusi sekaligus membantu pemulihan kristal email.',
      en: 'Bioavailable calcium ions (Ca²⁺) and plant antioxidants like vitamin C from mango and purslane reinforce gingival collagen and enamel stability.',
    },
  },
  {
    id: 'tip-kids-mixed',
    topic: 'youth' as const,
    emoji: '🎒',
    title: {
      id: 'Perlindungan Ekstra Gigi Bercampur (Usia 9–12)',
      en: 'Protect Newly Erupted Teeth (Ages 9–12)',
    },
    summary: {
      id: 'Gigi geraham permanen yang baru tumbuh memiliki ceruk dalam yang rentan karies—pastikan tersikat hingga bagian paling belakang.',
      en: 'Newly erupted permanent molars have deep grooves prone to caries—guide brushing carefully all the way to the back molars.',
    },
    scienceNote: {
      id: 'Survei BEHONGCA pada pelajar SD (9–12 tahun) mencatat kerentanan karies tertinggi (25/30 siswa) karena email gigi baru masih dalam fase pematangan pasca-erupsi.',
      en: 'BEHONGCA’s Surakarta survey found the highest caries rate in ages 9–12 (25/30 students) because newly erupted enamel is still undergoing post-eruptive maturation.',
    },
  },
  {
    id: 'tip-brush-replace',
    topic: 'youth' as const,
    emoji: '🗓️',
    title: {
      id: 'Ganti Sikat Gigi Setiap 3 Bulan & Cek Rutin',
      en: 'Replace Toothbrush Every 3 Months & Check Up',
    },
    summary: {
      id: 'Segera ganti sikat gigi berbulu mekar (maksimal tiap 3 bulan) dan periksakan gigi ke dokter gigi setiap 6 bulan sekali.',
      en: 'Swap frayed toothbrushes at least every 3 months and schedule a preventive dental check-up every 6 months.',
    },
    scienceNote: {
      id: 'Bulu sikat yang mekar gagal membersihkan garis gusi secara efektif, memicu akumulasi biofilm bakteri Red Complex penyebab gingivitis.',
      en: 'Splayed bristles fail to sweep the gingival margin, allowing Red Complex bacteria biofilms to trigger early gingivitis.',
    },
  },
];

export const DAILY_ORAL_CHECKLIST = [
  {
    id: 'chk-morning-brush',
    emoji: '☀️',
    label: { id: 'Sikat gigi pagi setelah sarapan (2 menit)', en: 'Morning brush after breakfast (2 min)' },
    detail: { id: 'Gunakan bulu sikat lembut agar gusi nyaman', en: 'Use soft bristles to protect gums' },
  },
  {
    id: 'chk-water-after-snack',
    emoji: '💧',
    label: { id: 'Bilas air putih setelah makan manis atau asam', en: 'Rinse with plain water after sweet/acidic snacks' },
    detail: { id: 'Bantu menaikkan pH kembali di atas 5,5', en: 'Helps lift oral pH back above 5.5' },
  },
  {
    id: 'chk-herbal-rinse',
    emoji: '🌿',
    label: { id: 'Berkumur larutan bebas alkohol selama 30 detik', en: 'Swish alcohol-free herbal rinse for 30s' },
    detail: { id: 'Menjangkau sela geraham belakang tanpa perih', en: 'Reaches back molars gently without sting' },
  },
  {
    id: 'chk-night-brush',
    emoji: '🌙',
    label: { id: 'Sikat gigi malam tepat sebelum tidur', en: 'Bedtime tooth brushing before sleep' },
    detail: { id: 'Wajib bebas sisa gula sebelum air liur melambat', en: 'Essential before nocturnal saliva flow drops' },
  },
  {
    id: 'chk-brush-check',
    emoji: '🪥',
    label: { id: 'Bulu sikat masih rapi & bersih (< 3 bulan)', en: 'Toothbrush bristles still straight (< 3 months)' },
    detail: { id: 'Ganti rutin agar plak subgingiva bersih tuntas', en: 'Replace regularly to clear gingival margin plaque' },
  },
];

