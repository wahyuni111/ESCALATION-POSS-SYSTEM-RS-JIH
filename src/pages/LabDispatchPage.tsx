import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Send,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  Building2,
  FileSpreadsheet,
  Trash2,
  AlertCircle,
  Clock,
  Search
} from 'lucide-react';
import { useClinical } from '../context/ClinicalContext';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { RiskLevel, WardRoom } from '../types/clinical';
import { PageId } from '../components/layout/Sidebar';
import { DUMMY_WARD_ROOMS } from '../data/dummyWards';

interface LabDispatchPageProps {
  onNavigate: (page: PageId) => void;
  onSelectScenario: (scenarioId: string) => void;
}

interface QuickPreset {
  roomId?: string;
  name: string;
  rm: string;
  eps: string;
  noLab: string;
  layanan: string;
  flagKritis: string;
  pemeriksaan: string;
  hasil: string;
  satuan: string;
  referenceRange: string;
  riskLevel: RiskLevel;
  jamTemu: string;
  jamDilapor: string;
  namaPerawat: string;
  dokter: string;
  clinicalNote: string;
  urgentActionNeeded: string;
  independentActionAllowed: string;
}

const PRESETS: QuickPreset[] = [
  {
    roomId: 'room-tulip-302',
    name: 'PO2 42 mm Hg (AGD VIP - Hipoksemia Berat)',
    rm: '14437',
    eps: '21',
    noLab: 'I-LAB-202502000623',
    layanan: 'ANALISA GAS DARAH Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'PO2',
    hasil: '42',
    satuan: 'mm Hg',
    referenceRange: '80 - 100 mm Hg',
    riskLevel: 4,
    jamTemu: '12:05',
    jamDilapor: '12/03/2025 12:14:22',
    namaPerawat: 'Ns. Siti Rahayu, S.Kep',
    dokter: 'dr. Ghea, Sp.PD',
    clinicalNote: 'Hipoksemia berat terverifikasi duplo pada sampel darah arteri. Berisiko gagal napas akut.',
    urgentActionNeeded: 'Desaturasi Berat: Berikan Oksigenasi Sungkup NRM 15 Lpm & Posisi Duduk Tegak',
    independentActionAllowed: 'Diizinkan Mandiri: Berikan Oksigen NRM 12-15 Lpm, Posisikan Semi-Fowler Tegak, Siapkan Suction Lendir'
  },
  {
    roomId: 'room-tulip-306',
    name: 'Glukosa Sewaktu 831.36 mg/dL (GDS VIP - Krisis KAD)',
    rm: '1204',
    eps: '109',
    noLab: 'I-LAB-202504000360',
    layanan: 'GLUKOSA SEWAKTU Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Glukosa Sewaktu',
    hasil: '831.36',
    satuan: 'mg/dL',
    referenceRange: '70 - 140 mg/dL',
    riskLevel: 3,
    jamTemu: '07:11',
    jamDilapor: '19/04/2025 07:15:30',
    namaPerawat: 'Ns. Siti Rahayu, S.Kep',
    dokter: 'dr. Pugud, Sp.PD',
    clinicalNote: 'Hiperglikemia ekstrim > 800 mg/dL. Kecurigaan komplikasi Ketoasidosis Diabetik / HHS.',
    urgentActionNeeded: 'Krisis Hiperglikemia: Evaluasi Turgor Kulit, Mulai Hidrasi IV Kristaloid',
    independentActionAllowed: 'Diizinkan Mandiri: Pasang IV Bore Besar, Guyur Cairan NaCl 0.9% 1000 mL dalam 1 Jam Sesuai Standing Order'
  },
  {
    roomId: 'room-tulip-302',
    name: 'Natrium 118.3 mmol/L (Elektrolit VIP - Hiponatremia Kritis)',
    rm: '14437',
    eps: '21',
    noLab: 'I-LAB-202503000222',
    layanan: 'NATRIUM - KALIUM - KLORIDA Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Natrium',
    hasil: '118.3',
    satuan: 'mmol/L',
    referenceRange: '135 - 147 mmol/L',
    riskLevel: 4,
    jamTemu: '12:08',
    jamDilapor: '12/03/2025 12:14:22',
    namaPerawat: 'Ns. Siti Rahayu, S.Kep',
    dokter: 'dr. Ghea, Sp.PD',
    clinicalNote: 'Hiponatremia berat di bawah 120 mmol/L. Waspada kejang dan herniasi serebral.',
    urgentActionNeeded: 'Hiponatremia Akut Kritis: Pasang Bed-Rail Kejang & Restriksi Cairan Bebas Segera',
    independentActionAllowed: 'Diizinkan Mandiri: Pasang Pengaman Tempat Tidur Anti-Kejang, Nilai Kesadaran GCS, Siapkan Akses Salin Normal'
  },
  {
    roomId: 'room-icu-01',
    name: 'PCO2 > 130.0 mm Hg (AGD ICU - Asidosis Ekstrim)',
    rm: '16240',
    eps: '3',
    noLab: 'I-LAB-202504000157',
    layanan: 'ANALISA GAS DARAH Kelas ICU',
    flagKritis: '**',
    pemeriksaan: 'PCO2',
    hasil: '> 130.0',
    satuan: 'mm Hg',
    referenceRange: '35.0 - 45.0 mm Hg',
    riskLevel: 4,
    jamTemu: '04:48',
    jamDilapor: '10/04/2025 04:55:10',
    namaPerawat: 'Ns. Ahmad Fauzi, A.Md.Kep',
    dokter: 'dr. Cempaka, Sp.P',
    clinicalNote: 'Hiperkapnia masif disertai pH ekstrim < 6.500. Kondisi henti napas iminen.',
    urgentActionNeeded: 'Asidosis Respiratorik Kritis: Ventilasi Tekanan Positif / Panggil Tim Code Blue',
    independentActionAllowed: 'Diizinkan Mandiri: Bagging Ventilasi BVM 100% O2 Kualitas Tinggi, Panggil Tim Code Blue ICU Segera'
  },
  {
    roomId: 'room-olive-102',
    name: 'Trombosit 16 x 10^3/µL (Darah Rutin - Trombositopenia)',
    rm: '20638',
    eps: '2',
    noLab: 'I-LAB-202501000440',
    layanan: 'DARAH RUTIN Kelas 3',
    flagKritis: '**',
    pemeriksaan: 'Trombosit',
    hasil: '16',
    satuan: '10^3/µL',
    referenceRange: '150 - 450 10^3/µL',
    riskLevel: 3,
    jamTemu: '23:02',
    jamDilapor: '27/01/2025 23:09:09',
    namaPerawat: 'Ns. Siti Rahayu, S.Kep',
    dokter: 'dr. Nadia, Sp.PD',
    clinicalNote: 'Trombositopenia kritis di bawah 20 ribu. Ancaman perdarahan spontan mukosa dan GIT.',
    urgentActionNeeded: 'Waspada Perdarahan Spontan: Tirah Baring Mutlak & Hindari Injeksi IM',
    independentActionAllowed: 'Diizinkan Mandiri: Tirah Baring Total, Edukasi Pasien Hindari Mengejan/Sikat Gigi Keras, Siapkan Sampel Crossmatch TC'
  },
  {
    roomId: 'room-icu-01',
    name: 'HS Troponin I 2.258 ng/mL (Troponin ICU - Infark Miokard)',
    rm: '2553',
    eps: '12',
    noLab: 'I-LAB-202510000516',
    layanan: 'HS TROPONIN I Kelas ICU',
    flagKritis: '**',
    pemeriksaan: 'HS Troponin I',
    hasil: '2.258',
    satuan: 'ng/mL',
    referenceRange: '< 0.04 ng/mL',
    riskLevel: 4,
    jamTemu: '07:18',
    jamDilapor: '31/10/2025 07:21:50',
    namaPerawat: 'Ns. Ahmad Fauzi, A.Md.Kep',
    dokter: 'dr. Ghea, Sp.PD',
    clinicalNote: 'Peningkatan biomarker nekrosis miokard > 50x nilai rujukan normal.',
    urgentActionNeeded: 'Ancaman Infark Miokard: Rekam EKG 12 Lead Segera & Berikan Tirah Baring Total',
    independentActionAllowed: 'Diizinkan Mandiri: Perekaman EKG 12 Lead dalam 10 Menit, Oksigen Kanul 3-4 Lpm jika SpO2 < 90%, Posisikan Nyaman'
  },
  {
    roomId: 'room-tulip-302',
    name: 'Bilirubin Total 33.38 mg/dL (Kimia VIP - Ikterik Akut)',
    rm: '14437',
    eps: '28',
    noLab: 'I-LAB-202504000131',
    layanan: 'BILIRUBIN TOTAL Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Bilirubin Total',
    hasil: '33.38',
    satuan: 'mg/dL',
    referenceRange: '0.2 - 1.2 mg/dL',
    riskLevel: 3,
    jamTemu: '08:05',
    jamDilapor: '09/04/2025 08:13:00',
    namaPerawat: 'Ns. Siti Rahayu, S.Kep',
    dokter: 'dr. Ghea, Sp.PD',
    clinicalNote: 'Hiperbilirubinemia berat dengan sklera ikterik pekat. Dugaan kolestasis obstruktif akut.',
    urgentActionNeeded: 'Krisis Ikterik: Evaluasi Tanda Ensefalopati Hepatikum & Pantau Output Urin',
    independentActionAllowed: 'Diizinkan Mandiri: Tirah Baring, Catat Balans Cairan Ketat, Hindari Sedatif Berat Sesuai Protokol Ruang Rawat'
  },
  {
    roomId: 'room-tulip-302',
    name: 'Evaluasi Pasca-Koreksi Normal (Kalium 4.2 mEq/L)',
    rm: '14437',
    eps: '21',
    noLab: 'I-LAB-202503000999',
    layanan: 'NATRIUM - KALIUM - KLORIDA Kelas VIP',
    flagKritis: 'Normal',
    pemeriksaan: 'Kalium',
    hasil: '4.2',
    satuan: 'mmol/L',
    referenceRange: '3.5 - 5.0 mmol/L',
    riskLevel: 1,
    jamTemu: '14:20',
    jamDilapor: 'Hari ini, 14:25 WIB',
    namaPerawat: 'Ns. Tri Wahyuni, S.Kep',
    dokter: 'dr. Ghea, Sp.PD',
    clinicalNote: 'Elektrolit kembali dalam batas normal pasca-koreksi kalium drip.',
    urgentActionNeeded: 'Monitoring Rutin Terjadwal Tiap 8 Jam per Shift',
    independentActionAllowed: 'Diizinkan Mandiri: Observasi Keperawatan Standar, Edukasi Asupan Hidrasi Oral, Pencatatan Rekam Medis'
  }
];

// 4 Akun perawat yang resmi terdaftar di sistem login (DEMO_USERS)
const REGISTERED_NURSE_ACCOUNTS = DEMO_USERS.filter((u) => u.roleType !== 'laboran');

const DOCTOR_OPTIONS = [
  'dr. Ghea, Sp.PD',
  'dr. Nadia, Sp.PD',
  'dr. Pugud, Sp.PD',
  'dr. Cempaka, Sp.P',
  'dr. Agus, Sp.A (K)',
  'dr. Yudha, Sp.A',
  'dr. H. Prasetyo, Sp.JP, FIHA',
  'dr. Anisa Rahmawati, Sp.PD, K-EMD',
  'dr. Hendra Wicaksono, Sp.B, FICS'
];

export const LabDispatchPage: React.FC<LabDispatchPageProps> = ({ onNavigate }) => {
  const {
    rooms,
    labRecords,
    dispatchLabResult,
    deleteLabRecord,
    resetPatientRoomStatus,
    lastNotification,
    clearNotification,
    resetAllData
  } = useClinical();
  const { currentUser } = useAuth();

  // Nama analis laboran pelapor otomatis terkunci sesuai akun laboran yang sedang login
  const activeLaboranName =
    currentUser?.roleType === 'laboran' && currentUser?.name
      ? currentUser.name
      : 'Analis Hendra Kurniawan, A.Md.AK';

  // Selalu sediakan master kamar RS JIH agar pilihan kamar tidak pernah kosong
  const masterRooms = DUMMY_WARD_ROOMS;
  const roomMap = new Map<string, WardRoom>();
  masterRooms.forEach((r) => roomMap.set(r.id, r));
  rooms.forEach((r) => roomMap.set(r.id, r));
  const selectableRooms = Array.from(roomMap.values());

  // Selected room
  const [selectedRoomId, setSelectedRoomId] = useState<string>(() => {
    return rooms[0]?.id || selectableRooms[0]?.id || 'room-tulip-302';
  });
  const selectedRoom = selectableRooms.find((r) => r.id === selectedRoomId) || selectableRooms[0];

  // Form Fields based on RS JIH LAB009
  const [rm, setRm] = useState<string>(selectedRoom?.rmNumber || '14437');
  const [eps, setEps] = useState<string>(selectedRoom?.episodeNumber || '21');
  const [noLab, setNoLab] = useState<string>(selectedRoom?.noLab || 'I-LAB-202502000623');
  const [layanan, setLayanan] = useState<string>(selectedRoom?.layananPanel || 'ANALISA GAS DARAH Kelas VIP');
  const [flagKritis, setFlagKritis] = useState<string>('**');
  const [pemeriksaan, setPemeriksaan] = useState<string>('PO2');
  const [hasil, setHasil] = useState<string>('42');
  const [satuan, setSatuan] = useState<string>('mm Hg');
  const [referenceRange, setReferenceRange] = useState<string>('80 - 100 mm Hg');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(4);

  // Timestamps & Communicators
  const [jamTemu, setJamTemu] = useState<string>('12:05');
  const [jamDilapor, setJamDilapor] = useState<string>('12/03/2025 12:14:22');
  const [namaPerawat, setNamaPerawat] = useState<string>(
    REGISTERED_NURSE_ACCOUNTS[0]?.name || 'Ns. Siti Rahayu, S.Kep'
  );
  const [dokter, setDokter] = useState<string>(selectedRoom?.doctorInCharge || 'dr. Ghea, Sp.PD');

  // Clinical Guidance (CDS)
  const [clinicalNote, setClinicalNote] = useState<string>(
    'Hipoksemia berat terverifikasi duplo pada sampel darah arteri. Berisiko gagal napas akut.'
  );
  const [urgentActionNeeded, setUrgentActionNeeded] = useState<string>(
    'Desaturasi Berat: Berikan Oksigenasi Sungkup NRM 15 Lpm & Posisi Duduk Tegak'
  );
  const [independentActionAllowed, setIndependentActionAllowed] = useState<string>(
    'Diizinkan Mandiri: Berikan Oksigen NRM 12-15 Lpm, Posisikan Semi-Fowler Tegak, Siapkan Suction Lendir'
  );

  const [searchFilter, setSearchFilter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update field defaults when selected room changes
  useEffect(() => {
    if (selectedRoom) {
      if (selectedRoom.rmNumber) setRm(selectedRoom.rmNumber);
      if (selectedRoom.episodeNumber) setEps(selectedRoom.episodeNumber);
      if (selectedRoom.noLab) setNoLab(selectedRoom.noLab);
      if (selectedRoom.layananPanel) setLayanan(selectedRoom.layananPanel);
      if (selectedRoom.nurseReceiver) setNamaPerawat(selectedRoom.nurseReceiver);
      if (selectedRoom.doctorInCharge) setDokter(selectedRoom.doctorInCharge);
    }
  }, [selectedRoomId]);

  const applyPreset = (preset: QuickPreset) => {
    if (preset.roomId) {
      setSelectedRoomId(preset.roomId);
    }
    setRm(preset.rm);
    setEps(preset.eps);
    setNoLab(preset.noLab);
    setLayanan(preset.layanan);
    setFlagKritis(preset.flagKritis);
    setPemeriksaan(preset.pemeriksaan);
    setHasil(preset.hasil);
    setSatuan(preset.satuan);
    setReferenceRange(preset.referenceRange);
    setRiskLevel(preset.riskLevel);
    setJamTemu(preset.jamTemu);
    setJamDilapor(preset.jamDilapor);
    setNamaPerawat(preset.namaPerawat);
    setDokter(preset.dokter);
    setClinicalNote(preset.clinicalNote);
    setUrgentActionNeeded(preset.urgentActionNeeded);
    setIndependentActionAllowed(preset.independentActionAllowed);
  };

  const handleSetCurrentTime = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    setJamTemu(`${pad(now.getHours())}:${pad(Math.max(0, now.getMinutes() - 4))}`);
    setJamDilapor(`${dateStr} ${timeStr}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    dispatchLabResult({
      patientRoomId: selectedRoomId,
      rm,
      eps,
      noLab,
      layanan,
      flagKritis,
      pemeriksaan,
      hasil,
      satuan,
      jamTemu,
      jamDilapor,
      dilaporOleh: activeLaboranName,
      namaPerawat,
      dokter,
      referenceRange,
      isCritical: riskLevel >= 3 || flagKritis === '**',
      riskLevel,
      clinicalNote,
      urgentActionNeeded,
      independentActionAllowed
    });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 350);
  };

  const filteredRecords = labRecords.filter((record) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      record.rm.toLowerCase().includes(q) ||
      record.patientName.toLowerCase().includes(q) ||
      record.pemeriksaan.toLowerCase().includes(q) ||
      record.wardName.toLowerCase().includes(q) ||
      record.noLab.toLowerCase().includes(q) ||
      record.layanan.toLowerCase().includes(q) ||
      record.dokter.toLowerCase().includes(q) ||
      record.namaPerawat.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Banner Penjelasan Alur Sistem Laboratorium RS JIH */}
      <div className="bg-gradient-to-r from-jih-navy to-jih-navy-light text-white rounded-xl p-5 shadow-xs border border-jih-navy-muted/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
              <FlaskConical className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              <span>Instalasi Laboratorium Sentral RS JIH Purwokerto (LIS Gateway)</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Entri Nilai Kritis & Diseminasi Real-Time ke Bangsal Perawat
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-2xl">
              Format terstandarisasi sesuai dokumen pelaporan <strong>LAB009 - LAPORAN NILAI KRITIS</strong> RS JIH Purwokerto. Nilai kritis yang Anda input langsung mengaktifkan panduan eskalasi CDS dan instruksi mandiri di layar perawat bangsal.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Lihat Tampilan Perawat</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifikasi Feedback Pengiriman Berhasil */}
      {lastNotification && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-emerald-950">Notifikasi Nilai Kritis Terkirim!</p>
              <p className="text-xs text-emerald-800 mt-0.5">{lastNotification}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline px-2 py-1"
            >
              Buka Board Perawat
            </button>
            <button
              onClick={clearNotification}
              className="text-emerald-600 hover:text-emerald-900 text-xs px-2 py-1 rounded"
              title="Tutup pesan"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Grid: Form Input (2 Kolom) + Presets Riil JIH (1 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulir Entri Nilai Kritis (Format LAB009) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-jih-blue border border-blue-200">
                <FlaskConical className="w-4 h-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-jih-navy">
                  Formulir Pelaporan Nilai Kritis Laboratorium (LIS)
                </h3>
                <span className="text-[11px] text-slate-500">
                  Standar Pelaporan RS JIH Purwokerto (Form LAB009)
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
              Petugas: {currentUser?.name?.split(',')[0] || 'Laboran'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Bagian 1: Identitas Pasien, Rekam Medis & Bangsal */}
            <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/90 space-y-3">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-jih-blue" aria-hidden="true" />
                1. Identitas Pasien & Kamar Rawat:
              </span>

              <div>
                <label htmlFor="patient-select" className="block text-[11px] font-medium text-slate-600 mb-1">
                  Pilih Pasien & Kamar Rawat Inap / ICU:
                </label>
                <select
                  id="patient-select"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800 outline-none text-xs hover:border-slate-300 focus:border-jih-blue transition-colors"
                >
                  {selectableRooms.map((room) => {
                    const isActive = rooms.some((r) => r.id === room.id);
                    return (
                      <option key={room.id} value={room.id}>
                        {room.roomNumber} - {room.patientInitials} ({room.ageGender}) • {room.wardName} (RM: {room.rmNumber || '-'}{isActive ? ' • Aktif di Dasbor' : ''})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div>
                  <label htmlFor="rm-number" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    No. RM:
                  </label>
                  <input
                    id="rm-number"
                    type="text"
                    value={rm}
                    onChange={(e) => setRm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="14437"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="eps-number" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Episode (EPS):
                  </label>
                  <input
                    id="eps-number"
                    type="text"
                    value={eps}
                    onChange={(e) => setEps(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="21"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="no-lab" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    No. Laboratorium (LIS):
                  </label>
                  <input
                    id="no-lab"
                    type="text"
                    value={noLab}
                    onChange={(e) => setNoLab(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono font-semibold text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="I-LAB-202502000623"
                    required
                  />
                </div>
              </div>

              {selectedRoom && (
                <div className="mt-1 p-2 rounded-lg bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="truncate">
                    <span>Diagnosis: <strong className="text-slate-800">{selectedRoom.currentDiagnosis}</strong></span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span>Status Lab: <strong className={selectedRoom.riskLevel >= 3 ? 'text-rose-700 font-bold' : 'text-slate-700'}>{selectedRoom.criticalFlag}</strong></span>
                  </div>
                  {selectedRoom.riskLevel >= 2 && (
                    <button
                      type="button"
                      onClick={() => resetPatientRoomStatus(selectedRoom.id)}
                      className="text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded px-2 py-0.5 text-[11px] font-semibold flex items-center gap-1 shrink-0 self-start sm:self-auto transition-colors"
                      title="Kembalikan status kamar ini ke normal di dasbor perawat"
                    >
                      <RotateCcw className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                      <span>Normalkan Pasien (L1)</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Bagian 2: Parameter Pemeriksaan, Hasil & Flagging Kritis */}
            <div className="space-y-3 pt-1">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                2. Data Pemeriksaan & Flag Kritis (Standar RS JIH):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="layanan-panel" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Layanan / Panel Pemeriksaan:
                  </label>
                  <input
                    id="layanan-panel"
                    type="text"
                    value={layanan}
                    onChange={(e) => setLayanan(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="Contoh: ANALISA GAS DARAH Kelas VIP, NATRIUM - KALIUM - KLORIDA"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="flag-kritis" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Flag Kritis LIS:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="flag-kritis"
                      type="text"
                      value={flagKritis}
                      onChange={(e) => setFlagKritis(e.target.value)}
                      className="w-full bg-rose-50 border border-rose-300 rounded-lg p-2 text-xs font-mono font-bold text-rose-700 text-center outline-none focus:border-rose-500"
                      placeholder="**"
                      required
                    />
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                      (** = Kritis)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="pemeriksaan" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Parameter Pemeriksaan:
                  </label>
                  <input
                    id="pemeriksaan"
                    type="text"
                    value={pemeriksaan}
                    onChange={(e) => setPemeriksaan(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="Contoh: PO2, Natrium, Glukosa Sewaktu, Trombosit"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="hasil-uji" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Nilai Hasil:
                  </label>
                  <input
                    id="hasil-uji"
                    type="text"
                    value={hasil}
                    onChange={(e) => setHasil(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-rose-700 outline-none focus:border-jih-blue"
                    placeholder="42 / 831.36"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="satuan-uji" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Satuan:
                  </label>
                  <input
                    id="satuan-uji"
                    type="text"
                    value={satuan}
                    onChange={(e) => setSatuan(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700 outline-none focus:border-jih-blue text-center"
                    placeholder="mm Hg / mg/dL"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reference-range" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Rentang Rujukan Normal:
                  </label>
                  <input
                    id="reference-range"
                    type="text"
                    value={referenceRange}
                    onChange={(e) => setReferenceRange(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 outline-none focus:border-jih-blue"
                    placeholder="80 - 100 mm Hg"
                  />
                </div>

                <div>
                  <label htmlFor="risk-level-select" className="block text-[11px] font-medium text-slate-600 mb-1">
                    Klasifikasi Risiko CDS Ruang Jaga:
                  </label>
                  <select
                    id="risk-level-select"
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(Number(e.target.value) as RiskLevel)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-800 outline-none focus:border-jih-blue"
                  >
                    <option value={4}>Level 4: Kritis (Panic Value - Butuh Tindakan Instan)</option>
                    <option value={3}>Level 3: Risiko Tinggi (Peringatan Dini / Siaga)</option>
                    <option value={2}>Level 2: Risiko Sedang (Peningkatan Observasi)</option>
                    <option value={1}>Level 1: Normal Pasca-Evaluasi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 3: Waktu, Pelapor (Laboran) & Penerima (Perawat & Dokter DPJP) */}
            <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-jih-blue" aria-hidden="true" />
                  3. Waktu Temu, Pelaporan & Dokter DPJP:
                </span>
                <button
                  type="button"
                  onClick={handleSetCurrentTime}
                  className="text-[10px] text-jih-blue hover:text-blue-800 font-semibold underline flex items-center gap-1"
                >
                  Gunakan Waktu Sekarang
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="jam-temu" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Jam Temu Hasil (Alat LIS):
                  </label>
                  <input
                    id="jam-temu"
                    type="text"
                    value={jamTemu}
                    onChange={(e) => setJamTemu(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="12:05"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jam-dilapor" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Jam Dilapor ke Perawat:
                  </label>
                  <input
                    id="jam-dilapor"
                    type="text"
                    value={jamDilapor}
                    onChange={(e) => setJamDilapor(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-mono text-slate-900 outline-none focus:border-jih-blue"
                    placeholder="12/03/2025 12:14:22"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Dilapor Oleh (Laboran Login):
                  </label>
                  <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded p-1.5 text-xs text-slate-900 font-semibold shadow-2xs">
                    <span className="truncate">{activeLaboranName}</span>
                    <span className="text-[9px] font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded shrink-0 ml-1">
                      Akun Aktif
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="nama-perawat" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Terima Oleh (4 Perawat Akun):
                  </label>
                  <select
                    id="nama-perawat"
                    value={namaPerawat}
                    onChange={(e) => setNamaPerawat(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-900 outline-none focus:border-jih-blue font-semibold transition-colors"
                    required
                  >
                    {REGISTERED_NURSE_ACCOUNTS.map((nurse) => (
                      <option key={nurse.id} value={nurse.name}>
                        {nurse.name} • {nurse.ward.split('(')[0].trim()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="dokter-dpjp" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Dokter DPJP Pasien:
                  </label>
                  <select
                    id="dokter-dpjp"
                    value={dokter}
                    onChange={(e) => setDokter(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-900 outline-none focus:border-jih-blue font-semibold transition-colors"
                    required
                  >
                    {DOCTOR_OPTIONS.map((doc) => (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 4: Catatan Validasi & Instruksi Mandiri CDS untuk Perawat */}
            <div className="space-y-3 pt-1">
              <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                4. Validasi Teknis & Instruksi Mandiri CDS Perawat:
              </span>

              <div>
                <label htmlFor="clinical-note" className="block text-[11px] font-medium text-slate-600 mb-1">
                  Catatan Teknis Validasi Sampel (Laboratorium):
                </label>
                <input
                  id="clinical-note"
                  type="text"
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 outline-none focus:border-jih-blue"
                  placeholder="Catatan duplo atau keabsahan sampel darah..."
                />
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-200/80 space-y-2.5">
                <span className="font-bold text-slate-800 block uppercase tracking-wider text-[10px] flex items-center gap-1 text-jih-navy">
                  <AlertCircle className="w-3.5 h-3.5 text-jih-blue" aria-hidden="true" />
                  Instruksi yang Otomatis Muncul di Layar Ruang Jaga Perawat:
                </span>
                <div>
                  <label htmlFor="urgent-action" className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                    Tindakan Segera Keperawatan:
                  </label>
                  <input
                    id="urgent-action"
                    type="text"
                    value={urgentActionNeeded}
                    onChange={(e) => setUrgentActionNeeded(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-800 outline-none focus:border-jih-blue"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="independent-action" className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                    Kewenangan Mandiri Perawat (Saat DPJP Berhalangan):
                  </label>
                  <input
                    id="independent-action"
                    type="text"
                    value={independentActionAllowed}
                    onChange={(e) => setIndependentActionAllowed(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-800 outline-none focus:border-jih-blue"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tombol Kirim */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <p className="text-[11px] text-slate-500">
                Nilai kritis langsung disinkronkan ke layar perawat bangsal terkait.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-jih-blue hover:bg-jih-blue-hover text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 shrink-0 disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isSubmitting ? 'Mengirim...' : 'Verifikasi & Kirim ke Bangsal'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Preset Cepat Berbasis Data Riil RS JIH */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <div>
                <span className="font-bold text-xs text-slate-800 uppercase tracking-wider block">
                  Kasus Riil Nilai Kritis RS JIH
                </span>
                <span className="text-[10px] text-slate-500">
                  Data Laporan Nilai Kritis LAB009
                </span>
              </div>
              <span className="text-[10px] text-jih-blue font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Klik untuk isi
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
              Pilih kasus uji nyata dari rekam medis RS JIH Purwokerto untuk simulasi cepat pengiriman ke bangsal:
            </p>

            <div className="space-y-2">
              {PRESETS.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-300 transition-all text-xs"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-semibold text-slate-900 text-[11px] truncate">
                      {preset.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        preset.riskLevel === 4
                          ? 'bg-rose-100 text-rose-800'
                          : preset.riskLevel === 3
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      L{preset.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono text-slate-600">RM: {preset.rm} • {preset.noLab}</span>
                    <span className="font-bold text-rose-700">Flag {preset.flagKritis}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {preset.pemeriksaan}: <strong className="text-slate-800">{preset.hasil} {preset.satuan}</strong> (DPJP: {preset.dokter})
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Reset data simulasi:</span>
              <button
                type="button"
                onClick={resetAllData}
                className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
                title="Kembalikan semua ruangan dan log ke data awal LIS"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset Data LIS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Riwayat Diseminasi Nilai Kritis Laboratorium (Format LAB009) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-blue-50 text-jih-blue border border-blue-200">
              <FileSpreadsheet className="w-4 h-4 text-jih-blue" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-jih-navy">
                Laporan Nilai Kritis Laboratorium (Format LAB009 RS JIH Purwokerto)
              </h3>
              <p className="text-[11px] text-slate-500">
                Log resmi pelaporan nilai kritis dari analis laboratorium ke perawat bangsal dan dokter DPJP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Cari RM, no lab, bangsal..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-jih-blue w-48 sm:w-60"
              />
            </div>
            <span className="text-xs text-slate-500 font-semibold shrink-0">
              {filteredRecords.length} Data
            </span>
          </div>
        </div>

        <div className="overflow-x-auto pt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/80">
                <th className="py-2.5 px-2.5">No</th>
                <th className="py-2.5 px-2.5">RM / EPS</th>
                <th className="py-2.5 px-2.5">Bangsal & Pasien</th>
                <th className="py-2.5 px-2.5">No. Lab</th>
                <th className="py-2.5 px-2.5">Layanan</th>
                <th className="py-2.5 px-2.5 text-center">Flag</th>
                <th className="py-2.5 px-2.5">Pemeriksaan</th>
                <th className="py-2.5 px-2.5">Hasil & Satuan</th>
                <th className="py-2.5 px-2.5">Jam Dilapor</th>
                <th className="py-2.5 px-2.5">Dilapor Oleh</th>
                <th className="py-2.5 px-2.5">Nama Perawat</th>
                <th className="py-2.5 px-2.5">Dokter DPJP</th>
                <th className="py-2.5 px-2.5 text-right">Aksi Kelola</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRecords.map((record, idx) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-2.5 text-[11px] font-mono text-slate-400">
                    {record.no || idx + 1}
                  </td>
                  <td className="py-2.5 px-2.5 whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-900 block">{record.rm}</span>
                    <span className="text-[10px] text-slate-500 font-mono">EPS: {record.eps}</span>
                  </td>
                  <td className="py-2.5 px-2.5 whitespace-nowrap">
                    <span className="font-semibold text-slate-900 block">{record.roomNumber}</span>
                    <span className="text-[11px] text-slate-500">{record.patientName}</span>
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] font-mono text-slate-600 whitespace-nowrap">
                    {record.noLab}
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] text-slate-600 max-w-[150px] truncate" title={record.layanan}>
                    {record.layanan}
                  </td>
                  <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                      {record.flagKritis}
                    </span>
                  </td>
                  <td className="py-2.5 px-2.5 font-semibold text-slate-900 whitespace-nowrap">
                    {record.pemeriksaan}
                  </td>
                  <td className="py-2.5 px-2.5 font-bold text-rose-700 whitespace-nowrap">
                    {record.hasil} {record.satuan}
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] text-slate-500 whitespace-nowrap font-mono">
                    {record.jamDilapor}
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] text-slate-600 whitespace-nowrap">
                    {record.dilaporOleh}
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] font-medium text-slate-800 whitespace-nowrap">
                    {record.namaPerawat}
                  </td>
                  <td className="py-2.5 px-2.5 text-[11px] text-slate-700 whitespace-nowrap">
                    {record.dokter}
                  </td>
                  <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => deleteLabRecord(record.id, true)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-1 rounded transition-colors"
                      title="Hapus riwayat lab ini dan hilangkan kartu kamar pasien terkait dari dasbor bangsal"
                    >
                      <Trash2 className="w-3 h-3 text-rose-600" aria-hidden="true" />
                      <span>Hapus dari Dasbor & LIS</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
