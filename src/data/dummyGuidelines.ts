import { GuidelineDetail } from '../types/clinical';

export const DUMMY_GUIDELINES: Record<string, GuidelineDetail> = {
  'sc-01': {
    id: 'guide-01',
    scenarioId: 'sc-01',
    scenarioTitle: 'Henti Jantung / Aritmia Letal Mengancam Nyawa',
    riskLevel: 4,
    criticalLabValue: 'Kalium Serum Kritis: 2.1 mEq/L (Normal: 3.5 - 5.0 mEq/L)',
    doctorInCharge: 'dr. H. Prasetyo, Sp.JP, FIHA',
    verifiedByCommittee: 'Komite Medik & Keperawatan Kritis RS JIH Purwokerto',
    lastUpdated: '12 Oktober 2026',
    
    immediateIndependentActions: [
      {
        step: 1,
        action: 'Cek Respon Pasien & Cek Nadi Karotis Simultan (< 10 Detik)',
        rationale: 'Menentukan apakah pasien berada dalam status henti jantung (cardiac arrest). Jika nadi karotis tidak teraba, kompresi tidak boleh ditunda.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Mulai Kompresi Dada (CPR) Kualitas Tinggi Segera (Kecepatan 100 - 120x/menit)',
        rationale: 'Tindakan penyelamatan jiwa mandiri yang sah bagi perawat tersertifikasi BTCLS/ACLS tanpa menunggu dokter.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Instruksikan Rekan Perawat Mengaktifkan "Code Blue" Bangsal',
        rationale: 'Memanggil Tim Reaksi Cepat / Resusitasi Rumah Sakit ke Kamar 302.',
        isMandatory: true
      },
      {
        step: 4,
        action: 'Ambil & Pasang Alat Defibrilator / AED di Dada Pasien',
        rationale: 'Analisis ritme irama jantung ventrikel fibrilasi (VF) atau pulseless ventrikel takikardia (pVT) untuk kejutan listrik segera.',
        isMandatory: true
      },
      {
        step: 5,
        action: 'Pasang Sungkup Katup Balon (BVM) dengan Oksigen 100% (15 Lpm)',
        rationale: 'Ventilasi 2 kali tiap 30 kompresi dada untuk mencegah hipoksia otak sekunder.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Akses Intravena Ganda (No. 18G)',
        condition: 'Jika jalur IV sebelumnya tersumbat atau macet',
        targetResponse: 'Jalur resusitasi obat darurat siap digunakan tim Code Blue'
      },
      {
        item: 'Persiapan Koreksi Kalium Darurat (KCl Infus)',
        condition: 'Hanya diberikan setelah ritme sirkulasi spontan (ROSC) pulih dan konfirmasi dosis tertulis DPJP',
        targetResponse: 'Cegah pemberian KCl bolus langsung (sangat mematikan)'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'Tim Reaksi Cepat / Code Blue RS JIH Purwokerto',
        timeThreshold: '< 1 Menit dari henti jantung',
        actionIfNoResponse: 'Ulangi pengumuman speaker darurat bangsal'
      },
      {
        stage: 2,
        targetParty: 'Dokter Jaga Bangsal / IGD Duty Officer',
        timeThreshold: '< 3 Menit',
        actionIfNoResponse: 'Hubungi Supervisor Keperawatan Rumah Sakit'
      },
      {
        stage: 3,
        targetParty: 'Dokter Penanggung Jawab Pelayanan (DPJP Kardiologi)',
        timeThreshold: '< 5 Menit (bila sedang operasi, perawat asisten operasi lapor langsung ke operator)',
        actionIfNoResponse: 'Tim Code Blue mengambil alih kepemimpinan klinis sementara'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Kondisi Akut Terkini',
        content: 'Lapor Dokter, saya Ns. Siti dari Bangsal Melati. Pasien Tn. S.W. di Kamar 302 mengalami henti jantung mendadak, nadi karotis tidak teraba, Code Blue telah diaktifkan.',
        instructions: 'Sebutkan identitas pasien, nomor kamar, dan masalah utama dalam kalimat pertama.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Riwayat & Nilai Kritis',
        content: 'Pasien rawat hari pertama post-laparatomi. Hasil laboratorium Kalium kritis baru saja keluar: 2.1 mEq/L. Pasien sebelumnya mengeluh lemas dan berdebar.',
        instructions: 'Sebutkan diagnosa awal dan critical lab flag yang mendasari kondisi perburukan.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Penilaian kami: Pasien mengalami henti sirkulasi sekunder akibat hipokalemia berat memicu aritmia letal. Saat ini siklus CPR kedua sedang berjalan.',
        instructions: 'Sampaikan interpretasi perawat terhadap situasi saat ini secara lugas.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Permintaan Instruksi Dokter',
        content: 'Kami membutuhkan kehadiran dokter resusitator segera di Kamar 302, arahan defibrilasi ritme, dan protokol koreksi elektrolit darurat.',
        instructions: 'Minta tindakan yang jelas dan catat instruksi dokter dengan metode TBaK (Tulis, Baca kembali, Konfirmasi).'
      }
    ],

    monitoringInterval: 'Evaluasi ritme & nadi tiap 2 menit siklus CPR. Setelah ROSC: tanda vital tiap 5 menit.',
    criticalSignsToWatch: [
      'Kembalinya pulsasi nadi karotis spontan (ROSC)',
      'Nilai end-tidal CO2 (bila intubasi terpasang)',
      'Gambaran ritme EKG pasca kejutan defibrilator',
      'Refleks pupil dan pergerakan ekstremitas'
    ]
  },

  'sc-02': {
    id: 'guide-02',
    scenarioId: 'sc-02',
    scenarioTitle: 'Krisis Hiperglikemia Bergejala Akut (KAD / HHS)',
    riskLevel: 3,
    criticalLabValue: 'GDS Kritis: 520 mg/dL + Keton Urine Positif (+++)',
    doctorInCharge: 'dr. Anisa Rahmawati, Sp.PD, K-EMD',
    verifiedByCommittee: 'Komite Medik Penyakit Dalam RS JIH Purwokerto',
    lastUpdated: '05 September 2026',

    immediateIndependentActions: [
      {
        step: 1,
        action: 'Posisikan Pasien Semi-Fowler & Berikan Oksigen Nasal Canul 2-4 Lpm',
        rationale: 'Meringankan beban kerja pernapasan Kussmaul kompensatorik terhadap asidosis metabolik.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Pasang Jalur Infus Intravena Bore Besar (No. 18G atau 20G)',
        rationale: 'Persiapan jalur hidrasi cairan bervolume besar untuk mengatasi defisit cairan rata-rata 3 - 6 liter.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Mulai Rehidrasi Awal Cairan Fisiologis NaCl 0.9% 1.000 mL dalam 1 Jam Pertama',
        rationale: 'Tindakan mandiri terstandarisasi dalam standing order RS JIH Purwokerto untuk memulihkan perfusi ginjal tanpa menunggu instruksi insulin.',
        isMandatory: true
      },
      {
        step: 4,
        action: 'Cek Ulang GDS Bedside (Point-of-Care Testing) & Tanda Vital Tiap 30 Menit',
        rationale: 'Memastikan tren kenaikan atau penurunan gula darah dan stabilitas tekanan darah.',
        isMandatory: true
      },
      {
        step: 5,
        action: 'Tunda Pemberian Insulin Subkutan Mandiri Sebelum Konfirmasi Dokter',
        rationale: 'Pemberian insulin tanpa mengetahui kadar kalium awal dapat memicu hipokalemia fatal mendadak.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Cairan NaCl 0.9% Lanjutan',
        condition: 'Setelah kolf pertama 1.000 mL selesai: lanjutkan 500 mL/jam jika TD sistolik > 90 mmHg',
        targetResponse: 'Rehidrasi bertahap mencegah syok hipovolemik'
      },
      {
        item: 'Pemasangan Kateter Urin Menetap (Foley Catheter)',
        condition: 'Bila pasien mengalami penurunan kesadaran atau oliguria',
        targetResponse: 'Monitoring ketat balance cairan minimal 0.5 mL/kgBB/jam'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'Dokter Penanggung Jawab Pelayanan (DPJP Endokrin/Internis)',
        timeThreshold: '< 10 Menit dari hasil lab keluar',
        actionIfNoResponse: 'Hubungi Dokter Jaga Bangsal Penyakit Dalam'
      },
      {
        stage: 2,
        targetParty: 'Dokter Jaga Bangsal Penyakit Dalam',
        timeThreshold: '< 15 Menit',
        actionIfNoResponse: 'Lapor Supervisor Perawat & Persiapan Ruang Perawatan Intensif (ICU)'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Kondisi Akut Terkini',
        content: 'Lapor Dokter, saya Ns. Tri dari Bangsal Mawar. Pasien Ny. D.H. di Kamar 201 tampak sesak napas dalam (Kussmaul) dan somnolen. GDS terdeteksi 520 mg/dL.',
        instructions: 'Jelaskan tingkat kesadaran dan hasil lab kritis secara presisi.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Riwayat Pasien',
        content: 'Pasien rawat dengan riwayat DM Tipe 2 tidak patuh obat. Keton urine terdeteksi +++, turgor kulit sangat kering, TD 95/60 mmHg, Nadi 112x/menit.',
        instructions: 'Jelaskan tanda-tanda dehidrasi dan komplikasi keton.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Penilaian kami: Pasien dicurigai mengalami Ketoasidosis Diabetik (KAD) dengan dehidrasi berat. Hidrasi NaCl 0.9% 1000 mL kolf pertama sedang berjalan.',
        instructions: 'Sampaikan tindakan awal yang sudah berhasil dilakukan perawat.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Instruksi yang Diharapkan',
        content: 'Mohon instruksi dosis insulin kontinu intravena, pemeriksaan elektrolit dan analisa gas darah cito, serta evaluasi alih rawat ICU.',
        instructions: 'Catat instruksi tertulis dan ulangi pembacaan dosis insulin secara teliti.'
      }
    ],

    monitoringInterval: 'Pantau tanda vital tiap 30 menit. Cek gula darah bedside tiap 1 jam saat titrasi insulin.',
    criticalSignsToWatch: [
      'Penurunan kesadaran menjadi stupor atau koma',
      'Pernapasan Kussmaul memburuk atau napas berbau aseton',
      'Produksi urin < 0.5 mL/kgBB dalam 2 jam berturut-turut',
      'Aritmia sekunder akibat pergeseran kalium darah'
    ]
  },

  'sc-03': {
    id: 'guide-03',
    scenarioId: 'sc-03',
    scenarioTitle: 'Desaturasi Oksigen Akut & Gagal Napas Mendadak',
    riskLevel: 4,
    criticalLabValue: 'Analisis Gas Darah: PaO2 51 mmHg, SpO2 81% (Gagal Napas Akut)',
    doctorInCharge: 'dr. Fajar Nugroho, Sp.P',
    verifiedByCommittee: 'Komite Medik Paru & IGD RS JIH Purwokerto',
    lastUpdated: '18 Agustus 2026',

    immediateIndependentActions: [
      {
        step: 1,
        action: 'Posisikan Pasien Duduk Tegak (High-Fowler 90 Derajat)',
        rationale: 'Memaksimalkan ekspansi diafragma dan menurunkan venous return berlebih ke paru.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Berikan Oksigen Sungkup Non-Rebreathing Mask (NRM) Aliran 12 - 15 Lpm',
        rationale: 'Memberikan fraksi oksigen inspirasi (FiO2) hingga 80-90% untuk mencegah anoksia serebral.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Lakukan Suction Lendir Jalan Napas Segera Bila Terdengar Ronki Basah / Gurgling',
        rationale: 'Membebaskan jalan napas dari retensi sekret yang memperparah hipoksemia.',
        isMandatory: true
      },
      {
        step: 4,
        action: 'Dekatkan Troli Darurat (Emergency Airway Cart) & Bag-Valve-Mask ke Sisi Pasien',
        rationale: 'Kesiapsiagaan penuh jika terjadi henti napas (apneu) atau indikasi intubasi darurat.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Persiapan Alat Intubasi (Laringoskop + ETT No. 7.0 / 7.5)',
        condition: 'Bila SpO2 tetap < 88% dengan NRM 15 Lpm atau pernapasan melambat < 10x/menit',
        targetResponse: 'Alat paten siap pakai saat dokter tiba di ruang resusitasi'
      },
      {
        item: 'Nebulisasi Bronkodilator Darurat (Salbutamol + Ipratropium)',
        condition: 'Bila terdengar mengi (wheezing) ekspirasi difus dan pasien tidak ada kontraindikasi aritmia',
        targetResponse: 'Meredakan spasme bronkus akut'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'Dokter Jaga Ruang Resusitasi IGD',
        timeThreshold: 'Instan (< 2 Menit)',
        actionIfNoResponse: 'Panggil Dokter Anestesi on-call RS JIH Purwokerto'
      },
      {
        stage: 2,
        targetParty: 'Dokter Spesialis Paru (DPJP)',
        timeThreshold: '< 10 Menit',
        actionIfNoResponse: 'Tim airway IGD melakukan stabilisasi lanjutan'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Kondisi Distres Napas',
        content: 'Lapor Dokter, saya Ns. Ahmad dari IGD Bed Resusitasi 01. Pasien Ny. M.K. mengalami desaturasi berat SpO2 81% dengan retraksi interkostal berat.',
        instructions: 'Sampaikan ancaman gagal napas secara langsung.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Riwayat dan Gas Darah',
        content: 'Pasien datang dengan riwayat PPOK. Hasil AGD menunjukkan PaO2 51 mmHg, PaCO2 58 mmHg, dan pH 7.24 (asidosis respiratorik akut).',
        instructions: 'Sampaikan parameter kunci AGD.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Penilaian kami: Pasien mengalami gagal napas tipe 2 akut dan kelelahan otot napas. Oksigen NRM 12 Lpm dan suction sekret sudah kami berikan.',
        instructions: 'Laporkan respon saturasi pasca tindakan mandiri awal.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Tindakan yang Diperlukan',
        content: 'Mohon dokter segera merapat ke Bed Resusitasi untuk evaluasi indikasi intubasi endotrakeal atau ventilasi non-invasif (NIV/BiPAP).',
        instructions: 'Tegaskan kesiapan troli intubasi darurat di sisi tempat tidur.'
      }
    ],

    monitoringInterval: 'Pantau SpO2 dan ritme pernapasan secara kontinu di monitor bedside tiap menit.',
    criticalSignsToWatch: [
      'Pernapasan paradoksal torako-abdominal',
      'Sianosis perifer atau sentral di bibir',
      'Penurunan kesadaran menjadi letargi karena retensi CO2 narcosis',
      'Bradikardia sekunder akibat hipoksia jaringan berkepanjangan'
    ]
  },

  'sc-04': {
    id: 'guide-04',
    scenarioId: 'sc-04',
    scenarioTitle: 'Sepsis Warning: Early Warning Score (NEWS) Meningkat',
    riskLevel: 3,
    criticalLabValue: 'Laktat Darah: 3.8 mmol/L + Leukosit: 24.500 /uL (Tanda Awal Syok Septik)',
    doctorInCharge: 'dr. Hendra Wicaksono, Sp.B, FICS',
    verifiedByCommittee: 'Komite PPI & Medik Bedah RS JIH Purwokerto',
    lastUpdated: '28 Juli 2026',

    immediateIndependentActions: [
      {
        step: 1,
        action: 'Berikan Oksigenasi Tambahan untuk Menjaga Target SpO2 >= 95%',
        rationale: 'Mengurangi beban hipoksia jaringan akibat gangguan mikrosirkulasi sepsis.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Ambil Sampel Kultur Darah 2 Set (Dua Lokasi Berbeda) Sebelum Antibiotik Diberikan',
        rationale: 'Menjamin akurasi identifikasi patogen bakteri sebelum tereliminasi parsial oleh antibiotik.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Guyur Cairan Resusitasi Kristaloid NaCl 0.9% atau Ringer Laktat 30 mL/kgBB',
        rationale: 'Tindakan mandiri terstandarisasi dalam protokol 1 jam pertama sepsis (Hour-1 Sepsis Bundle) saat tensi sistolik < 90 mmHg.',
        isMandatory: true
      },
      {
        step: 4,
        action: 'Pasang Kateter Urin Menetap untuk Menilai Urine Output per Jam',
        rationale: 'Target output urin > 0.5 mL/kgBB/jam sebagai indikator keberhasilan perfusi organ.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Pemberian Antibiotik Spektrum Luas Intravena (Standing Order Bedah)',
        condition: 'Setelah kedua set kultur darah selesai diambil dan telah disetujui DPJP',
        targetResponse: 'Antibiotik masuk dalam < 60 menit sejak sepsis terdeteksi'
      },
      {
        item: 'Pemeriksaan Ulang Laktat Serum dalam 2 - 4 Jam',
        condition: 'Wajib dilakukan untuk melihat penurunan clearance laktat',
        targetResponse: 'Target laktat turun > 20% menunjukkan perbaikan perfusi'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'DPJP Bedah (Operator)',
        timeThreshold: '< 15 Menit',
        actionIfNoResponse: 'Jika sedang operasi: Lapor Asisten Dokter Bedah / Residen Jaga'
      },
      {
        stage: 2,
        targetParty: 'Dokter Jaga Bangsal Bedah',
        timeThreshold: '< 20 Menit',
        actionIfNoResponse: 'Hubungi Tim Reaksi Cepat Sepsis Rumah Sakit'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Peringatan Sepsis Akut',
        content: 'Lapor Dokter, saya Ns. Siti dari Bangsal Melati. Pasien Tn. A.R. di Kamar 303 mengalami demam tinggi 39.1 C dengan tekanan darah turun ke 88/55 mmHg.',
        instructions: 'Sampaikan tren penurunan hemodinamik secara lugas.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Fokus Infeksi dan Lab',
        content: 'Pasien rawat post-op urologi hari kedua. Hasil lab baru: Laktat 3.8 mmol/L dan leukosit 24.500 /uL. Akral teraba dingin dengan capillary refill time 4 detik.',
        instructions: 'Sebutkan hasil lab penanda perfusi buruk.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Penilaian kami: Pasien memenuhi kriteria Sepsis Berat mengarah ke syok septik. Resusitasi cairan kristaloid 1000 mL dan kultur darah sedang dijalankan.',
        instructions: 'Laporkan progres implementasi Hour-1 Sepsis Bundle.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Instruksi Terapi',
        content: 'Mohon konfirmasi pilihan antibiotik empiris intravena, instruksi vasopresor (norepinefrin) bila MAP tetap < 65 mmHg, dan rencana alih rawat HCU/ICU.',
        instructions: 'Konfirmasi target tekanan arteri rata-rata (MAP).'
      }
    ],

    monitoringInterval: 'Pantau tekanan darah dan urin output tiap 15-30 menit selama fase resusitasi cairan.',
    criticalSignsToWatch: [
      'Tekanan Darah Arteri Rata-rata (MAP) < 65 mmHg persisten',
      'Produksi urin < 30 mL dalam 1 jam',
      'Laktat darah tidak turun pada evaluasi ulang',
      'Mottling skin (kulit bercak keunguan) di sekitar lutut'
    ]
  },

  'sc-05': {
    id: 'guide-05',
    scenarioId: 'sc-05',
    scenarioTitle: 'Krisis Hipertensi Tanpa Kerusakan Organ Target Akut',
    riskLevel: 2,
    criticalLabValue: 'Tekanan Darah Urgensi: 190/115 mmHg (Tanpa Defisit Neurologis / Nyeri Dada)',
    doctorInCharge: 'dr. H. Prasetyo, Sp.JP, FIHA',
    verifiedByCommittee: 'Komite Medik Rawat Jalan RS JIH Purwokerto',
    lastUpdated: '15 September 2026',

    immediateIndependentActions: [
      {
        step: 1,
        action: 'Bimbing Pasien Berbaring atau Duduk Tenang di Ruang Observasi Poli Selama 15 - 30 Menit',
        rationale: 'Menyingkirkan faktor kecemasan (white coat effect) dan aktivitas fisik sebelum pengukuran ulang.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Ulangi Pengukuran Tekanan Darah di Kedua Lengan Menggunakan Manset yang Sesuai Ukuran',
        rationale: 'Memastikan akurasi nilai dan mendeteksi adanya disekuilibrium tekanan darah.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Skrining Cepat Tanda Kerusakan Organ Target (Red Flags)',
        rationale: 'Tanyakan: Adakah nyeri dada menembus punggung? Pandangan kabur mendadak? Kelemahan separuh anggota gerak? Sesak napas?',
        isMandatory: true
      },
      {
        step: 4,
        action: 'Jangan Berikan Obat Antihipertensi Sublingual / Injeksi Cepat Tanpa Instruksi Tertulis',
        rationale: 'Penurunan tekanan darah terlalu drastis dapat menyebabkan hipoperfusi serebral atau infark lakunar.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Perekaman EKG 12 Sadapan Dasar',
        condition: 'Bila pasien mengeluhkan rasa tidak nyaman di dada atau riwayat penyakit jantung koroner',
        targetResponse: 'Rekaman EKG siap dibaca dokter pemeriksa poli'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'Dokter Penanggung Jawab Poli Jantung / Penyakit Dalam',
        timeThreshold: '< 15 Menit',
        actionIfNoResponse: 'Laporkan pada Dokter Koordinator Rawat Jalan'
      },
      {
        stage: 2,
        targetParty: 'Transfer ke IGD RS JIH Purwokerto',
        timeThreshold: 'Segera bila muncul red flags (nyeri dada / defisit neurologis)',
        actionIfNoResponse: 'Kirim via kursi roda dengan pendampingan perawat'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Urgensi Hipertensi Poli',
        content: 'Lapor Dokter, saya Ns. Tri dari Poli Jantung. Pasien Tn. B.S. datang kontrol dengan tekanan darah 190/115 mmHg.',
        instructions: 'Sampaikan nilai tensi dan keluhan utama pasien.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Riwayat Konsumsi Obat',
        content: 'Pasien mengaku lupa minum obat Amlodipine sejak 4 hari lalu. Tidak ada keluhan nyeri dada, sesak napas, atau kelemahan motorik.',
        instructions: 'Sampaikan kepatuhan konsumsi obat antihipertensi.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Penilaian kami: Pasien mengalami Hipertensi Urgensi tanpa komplikasi akut organ target. Pasien sudah diistirahatkan 20 menit, tensi ulang 185/110 mmHg.',
        instructions: 'Sampaikan hasil tensi ulang di ruang tenang.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Tindakan Dokter',
        content: 'Mohon arahan dokter untuk penyesuaian regimen obat antihipertensi oral hari ini dan jadwal observasi lanjutan sebelum pasien pulang.',
        instructions: 'Konfirmasi resep dan edukasi kepatuhan minum obat.'
      }
    ],

    monitoringInterval: 'Ukur tensi tiap 15 menit selama istirahat. Sebelum pulang, pastikan TD < 160/100 mmHg.',
    criticalSignsToWatch: [
      'Munculnya nyeri kepala hebat berdenyut (cefalalgia akut)',
      'Nyeri dada atau rasa tertekan di substernal',
      'Mual dan muntah proyektil (tanda peningkatan TIK)',
      'Penurunan visus penglihatan secara mendadak'
    ]
  },

  'sc-06': {
    id: 'guide-06',
    scenarioId: 'sc-06',
    scenarioTitle: 'Pemantauan Glukosa Stabil & Tanda Vital Terkendali',
    riskLevel: 1,
    criticalLabValue: 'GDS Terkendali: 134 mg/dL (Rentang Sasaran Bangsal: 110 - 180 mg/dL)',
    doctorInCharge: 'dr. Anisa Rahmawati, Sp.PD, K-EMD',
    verifiedByCommittee: 'Komite Medik & Standar Asuhan Keperawatan RS JIH Purwokerto',
    lastUpdated: '10 September 2026',

    immediateIndependentActions: [
      {
        step: 1,
        action: 'Lanjutkan Pemantauan Rutin Tanda Vital Tiap 8 Jam (Satu Kali per Shift Jaga)',
        rationale: 'Memastikan kestabilan hemodinamik dan respirasi tetap terjaga sepanjang masa perawatan.',
        isMandatory: true
      },
      {
        step: 2,
        action: 'Pemeriksaan Profil Glukosa Darah Pre-prandial & Post-prandial Terjadwal',
        rationale: 'Mencegah fluktuasi hipoglikemia tanpa gejala sebelum jadwal makan utama.',
        isMandatory: true
      },
      {
        step: 3,
        action: 'Berikan Edukasi Pola Makan Rendah Gula Sederhana & Pentingnya Hidrasi Cukup',
        rationale: 'Mempersiapkan kemandirian pasien menjelang perencanaan pulang (discharge planning).',
        isMandatory: false
      },
      {
        step: 4,
        action: 'Dokumentasikan Hasil Pemantauan Lengkap pada Formulir Catatan Perkembangan Pasien Terintegrasi (CPPT)',
        rationale: 'Tertib administrasi rekam medis dan kesinambungan asuhan antar pergantian shift.',
        isMandatory: true
      }
    ],

    standingOrders: [
      {
        item: 'Pemberian Terapi Oral / Insulin Basal Pemeliharaan Sesuai Rekam Medis',
        condition: 'Bila pasien menghabiskan porsi makan minimal 75%',
        targetResponse: 'Kadar glukosa pasca makan tetap terkendali dalam rentang aman'
      }
    ],

    escalationProtocol: [
      {
        stage: 1,
        targetParty: 'DPJP Saat Visite Harian Terjadwal',
        timeThreshold: 'Sesuai jadwal visite dokter bangsal',
        actionIfNoResponse: 'Laporkan saat overan shift dinas'
      }
    ],

    sbar: [
      {
        code: 'S',
        title: 'Situation (Situasi)',
        label: 'Laporan Perkembangan Stabil',
        content: 'Lapor Dokter, pasien Ny. E.T. di Kamar 202 kondisi stabil. Tanda vital dalam batas normal dan nafsu makan baik.',
        instructions: 'Sampaikan kondisi pemulihan pasien.'
      },
      {
        code: 'B',
        title: 'Background (Latar Belakang)',
        label: 'Perawatan Hari Ketiga',
        content: 'Pasien rawat hari ketiga dengan riwayat febris dan kontrol DM. Hasil lab kontrol stabil, GDS 134 mg/dL.',
        instructions: 'Sampaikan kepatuhan terapi dan hasil lab terkontrol.'
      },
      {
        code: 'A',
        title: 'Assessment (Penilaian Klinis)',
        label: 'Analisis Perawat',
        content: 'Kondisi klinis pasien menunjukkan kemajuan optimal, tidak ada keluhan penyerta, hemodinamik stabil.',
        instructions: 'Nyatakan kesiapan pasien untuk evaluasi rawat jalan.'
      },
      {
        code: 'R',
        title: 'Recommendation (Rekomendasi)',
        label: 'Rencana Pemulangan',
        content: 'Mohon evaluasi dokter saat visite apakah pasien sudah dapat direncanakan KRS (Keluar Rumah Sakit) esok hari.',
        instructions: 'Konfirmasi resep pulang dan resume medis.'
      }
    ],

    monitoringInterval: 'Observasi tanda vital tiap 8 jam per shift. Pantau asupan diet harian.',
    criticalSignsToWatch: [
      'Penurunan GDS < 70 mg/dL (tanda hipoglikemia)',
      'Keringat dingin, gemetar, atau rasa lapar berlebih mendadak',
      'Kenaikan suhu tubuh > 37.8 C kembali',
      'Keluhan nyeri baru di area tubuh lainnya'
    ]
  }
};
