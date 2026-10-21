export type RiskLevel = 1 | 2 | 3 | 4;

export interface RiskLevelInfo {
  level: RiskLevel;
  label: string;
  badgeText: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconName: 'ShieldCheck' | 'AlertCircle' | 'AlertTriangle' | 'BellRing';
  actionAuthority: string;
}

export interface Scenario {
  id: string;
  code: string;
  title: string;
  category: 'Kardiologi' | 'Respirasi' | 'Metabolik & Lab' | 'Sepsis & Infeksi' | 'Neurologi';
  department: 'Rawat Inap' | 'Poli Rawat Jalan' | 'IGD' | 'ICU/ICCU';
  riskLevel: RiskLevel;
  criticalLabTrigger: string;
  labThresholdExample: string;
  summary: string;
  doctorInCharge: string;
  approvalDate: string;
  documentRef: string;
  standingOrderSummary: string;
  immediateActionRequired: boolean;
}

export interface WardRoom {
  id: string;
  roomNumber: string;
  wardName: string;
  patientInitials: string;
  ageGender: string;
  currentDiagnosis: string;
  scenarioId: string;
  riskLevel: RiskLevel;
  criticalFlag: string;
  urgentActionNeeded: string;
  doctorStatus: 'Sedang Tindakan Operasi' | 'Visite Ruang Lain' | 'Tersedia di Tempat' | 'Sedang Melayani Poli';
  independentActionAllowed: string;
  timeElapsedMinutes: number;
}

export interface SbarStep {
  title: string;
  code: 'S' | 'B' | 'A' | 'R';
  label: string;
  content: string;
  instructions: string;
}

export interface GuidelineDetail {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  riskLevel: RiskLevel;
  criticalLabValue: string;
  doctorInCharge: string;
  verifiedByCommittee: string;
  lastUpdated: string;
  
  // Rekomendasi tindakan mandiri saat dokter belum tiba
  immediateIndependentActions: {
    step: number;
    action: string;
    rationale: string;
    isMandatory: boolean;
  }[];

  // Tindakan delegatif bersyarat (standing orders dokter)
  standingOrders: {
    item: string;
    condition: string;
    targetResponse: string;
  }[];

  // Alur eskalasi jika dokter berhalangan / respons tertunda
  escalationProtocol: {
    stage: number;
    targetParty: string;
    timeThreshold: string;
    actionIfNoResponse: string;
  }[];

  // Format komunikasi SBAR
  sbar: SbarStep[];

  // Interval monitoring lanjutan
  monitoringInterval: string;
  criticalSignsToWatch: string[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  nurseName: string;
  role: string;
  ward: string;
  actionType: 'Membaca Panduan' | 'Simulasi Checklist SBAR' | 'Pencarian Skenario' | 'Akses Detail Risiko';
  scenarioTitle: string;
  riskLevel: RiskLevel;
}

export interface ClinicalModelMeta {
  id: string;
  name: string;
  version: string;
  category: string;
  baselineAlgorithm: string;
  lastTrained: string;
  accuracy: number;
  sensitivity: number;
  specificity: number;
  status: 'Prototype / Ilustrasi' | 'Dalam Evaluasi Internal' | 'Arsip';
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  nip: string;
  role: string;
  ward: string;
  shift: 'Shift Pagi (07.00 - 14.00)' | 'Shift Sore (14.00 - 21.00)' | 'Shift Malam (21.00 - 07.00)';
}
