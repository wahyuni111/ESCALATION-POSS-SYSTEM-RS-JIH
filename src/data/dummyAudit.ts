import { AuditLogItem, ClinicalModelMeta } from '../types/clinical';

export const DUMMY_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-001',
    timestamp: '21/10/2026, 17:15:22',
    nurseName: 'Ns. Siti Rahayu, S.Kep',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Melati (Bedah)',
    actionType: 'Membaca Panduan',
    scenarioTitle: 'Henti Jantung / Aritmia Letal Mengancam Nyawa',
    riskLevel: 4
  },
  {
    id: 'aud-002',
    timestamp: '21/10/2026, 17:08:44',
    nurseName: 'Ns. Siti Rahayu, S.Kep',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Melati (Bedah)',
    actionType: 'Simulasi Checklist SBAR',
    scenarioTitle: 'Henti Jantung / Aritmia Letal Mengancam Nyawa',
    riskLevel: 4
  },
  {
    id: 'aud-003',
    timestamp: '21/10/2026, 16:42:10',
    nurseName: 'Ns. Ahmad Fauzi, A.Md.Kep',
    role: 'Perawat Triase IGD',
    ward: 'Instalasi Gawat Darurat',
    actionType: 'Akses Detail Risiko',
    scenarioTitle: 'Desaturasi Oksigen Akut & Gagal Napas Mendadak',
    riskLevel: 4
  },
  {
    id: 'aud-004',
    timestamp: '21/10/2026, 16:15:03',
    nurseName: 'Ns. Tri Wahyuni, S.Kep',
    role: 'Perawat Poli Rawat Jalan',
    ward: 'Poli Spesialis Jantung',
    actionType: 'Membaca Panduan',
    scenarioTitle: 'Krisis Hipertensi Tanpa Kerusakan Organ Target Akut',
    riskLevel: 2
  },
  {
    id: 'aud-005',
    timestamp: '21/10/2026, 15:50:18',
    nurseName: 'Ns. Bambang Santoso, S.Kep',
    role: 'Supervisor Keperawatan',
    ward: 'Komite Keperawatan',
    actionType: 'Pencarian Skenario',
    scenarioTitle: 'Sepsis Warning: Early Warning Score (NEWS) Meningkat',
    riskLevel: 3
  },
  {
    id: 'aud-006',
    timestamp: '21/10/2026, 14:30:55',
    nurseName: 'Ns. Siti Rahayu, S.Kep',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Melati (Bedah)',
    actionType: 'Membaca Panduan',
    scenarioTitle: 'Krisis Hiperglikemia Bergejala Akut (KAD / HHS)',
    riskLevel: 3
  }
];

export const DUMMY_CLINICAL_MODELS: ClinicalModelMeta[] = [
  {
    id: 'mod-01',
    name: 'Model Klasifikasi Triase & Early Warning Bangsal',
    version: 'v1.2-eval (RandomForest Baseline - Ilustrasi)',
    category: 'Kardiologi & Sepsis',
    baselineAlgorithm: 'Random Forest Classifier (100 Trees, Max Depth 8)',
    lastTrained: '02 Oktober 2026',
    accuracy: 91.4,
    sensitivity: 93.2,
    specificity: 89.6,
    status: 'Prototype / Ilustrasi',
    notes: 'Model eksperimental untuk klasifikasi tingkat risiko perburukan berdasarkan 6 tanda vital gabungan dan 3 nilai lab penanda kritis.'
  },
  {
    id: 'mod-02',
    name: 'Model Deteksi Sepsis & Hipoperfusi Dini',
    version: 'v0.9-draft (Gradient Boosting - Ilustrasi)',
    category: 'Sepsis & Infeksi',
    baselineAlgorithm: 'LightGBM Multi-class Classifier',
    lastTrained: '18 September 2026',
    accuracy: 88.7,
    sensitivity: 94.0,
    specificity: 86.1,
    status: 'Dalam Evaluasi Internal',
    notes: 'Dilatih pada dataset sintetik simulasi ICU/Ward untuk mengenali sepsis bundle hour-1 compliance.'
  },
  {
    id: 'mod-03',
    name: 'Model Skrining Urgensi Hipertensi Rawat Jalan',
    version: 'v1.0-arsip (Logistic Regression Baseline)',
    category: 'Rawat Jalan',
    baselineAlgorithm: 'Regularized Logistic Regression (L2)',
    lastTrained: '15 Juli 2026',
    accuracy: 85.0,
    sensitivity: 87.5,
    specificity: 83.2,
    status: 'Arsip',
    notes: 'Model versi awal untuk penyaringan awal triase tensi poli, kini digantikan v1.2-eval.'
  }
];
