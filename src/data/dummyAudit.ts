import { AuditLogItem, ClinicalModelMeta } from '../types/clinical';

export const DUMMY_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-001',
    timestamp: '21/10/2026, 17:15:22',
    nurseName: 'Uji Prihatiningsih',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Tulip (Kelas VIP)',
    actionType: 'Simulasi Checklist SBAR',
    scenarioTitle: 'Desaturasi Berat & Asidosis Respiratorik (PO2 42 mm Hg)',
    riskLevel: 4
  },
  {
    id: 'aud-002',
    timestamp: '21/10/2026, 16:58:10',
    nurseName: 'Vita Anggis, S.Kep., Ners',
    role: 'Perawat Intensif ICU',
    ward: 'Intensive Care Unit (ICU)',
    actionType: 'Simulasi Checklist SBAR',
    scenarioTitle: 'Gagal Napas Tipe 2 & Asidosis Ekstrim (PCO2 > 130 mm Hg)',
    riskLevel: 4
  },
  {
    id: 'aud-003',
    timestamp: '21/10/2026, 16:35:45',
    nurseName: 'Diah Kartika, AMK',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Tulip (Kelas VIP)',
    actionType: 'Membaca Panduan',
    scenarioTitle: 'Krisis Hiperglikemia Ekstrim KAD / HHS (GDS 831 mg/dL)',
    riskLevel: 3
  },
  {
    id: 'aud-004',
    timestamp: '21/10/2026, 15:40:12',
    nurseName: 'Shinta Pramudya, S.Kep., Ns',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Orchid (Kelas VIP)',
    actionType: 'Akses Detail Risiko',
    scenarioTitle: 'Koreksi Hiponatremia Berat & Proteksi Kejang (Na 118.3 mmol/L)',
    riskLevel: 4
  },
  {
    id: 'aud-005',
    timestamp: '21/10/2026, 14:22:05',
    nurseName: 'Tri Harningsih, S.Kep., Ns',
    role: 'Perawat Pelaksana Bangsal',
    ward: 'Bangsal Olive (Junior Suite)',
    actionType: 'Membaca Panduan',
    scenarioTitle: 'Waspada Perdarahan Spontan Trombositopenia Kritis (Trombosit 10.000 /µL)',
    riskLevel: 3
  },
  {
    id: 'aud-006',
    timestamp: '21/10/2026, 13:10:30',
    nurseName: 'Kiki Septiana Hermawan, S.Kep., Ns',
    role: 'Perawat Bangsal Pediatrik',
    ward: 'Bangsal Lily (Kelas VIP Anak)',
    actionType: 'Simulasi Checklist SBAR',
    scenarioTitle: 'Rehidrasi & Terapi Hiponatremia Pediatrik Akut (Na 121.9 mmol/L)',
    riskLevel: 2
  },
  {
    id: 'aud-007',
    timestamp: '21/10/2026, 11:45:18',
    nurseName: 'Syarah Nur Hayah, S.Kep., Ns',
    role: 'Perawat Intensif ICU',
    ward: 'Intensive Care Unit (ICU)',
    actionType: 'Akses Detail Risiko',
    scenarioTitle: 'Infark Miokard Akut Elevasi Biomarker (HS Troponin I > 2.2 ng/mL)',
    riskLevel: 4
  },
  {
    id: 'aud-008',
    timestamp: '21/10/2026, 10:15:00',
    nurseName: 'Rinjani Widya Saraswati, Amd.Kep',
    role: 'Perawat Triase IGD',
    ward: 'Instalasi Gawat Darurat (IGD)',
    actionType: 'Pencarian Skenario',
    scenarioTitle: 'Resusitasi Jantung-Paru & Defibrilasi Aritmia Ventrikel Letal',
    riskLevel: 4
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
