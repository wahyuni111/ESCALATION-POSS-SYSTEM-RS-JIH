import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { WardRoom, RiskLevel } from '../types/clinical';
import { DUMMY_WARD_ROOMS } from '../data/dummyWards';

export interface LabTestRecord {
  id: string;
  no?: number;
  rm: string; // Nomor Rekam Medis (e.g. 14437, 16240, 1204)
  eps: string; // Episode (e.g. 21, 109, 7, 3, 30)
  patientRoomId: string;
  patientName: string;
  roomNumber: string;
  wardName: string; // UNIT / BANGSAL: Tulip, Orchid, Olive, Lily, ICU, Kamar Bayi
  noLab: string; // NO LAB: I-LAB-2025...
  tglOrder?: string;
  layanan: string; // LAYANAN: ANALISA GAS DARAH Kelas VIP, dll.
  flagKritis: string; // FLAG KRITIS: **
  pemeriksaan: string; // PEMERIKSAAN: PO2, Glukosa Sewaktu, Natrium, dll.
  hasil: string; // HASIL: 42, 831.36, 118.3, dll.
  satuan: string; // SATUAN: mm Hg, mg/dL, mmol/L, dll.
  jamTemu: string; // JAM TEMU
  jamDilapor: string; // JAM DILAPOR
  dilaporOleh: string; // DILAPOR OLEH (Petugas Laboran)
  terimaOleh?: string; // TERIMA OLEH (Kode Perawat)
  namaPerawat: string; // NAMA PERAWAT
  dokter: string; // DOKTER DPJP
  referenceRange: string;
  isCritical: boolean;
  riskLevel: RiskLevel;
  clinicalNote: string;
  urgentActionNeeded: string;
  independentActionAllowed: string;
  status: 'Terkirim ke Bangsal' | 'Diterima Perawat';
}

export const INITIAL_LAB_RECORDS: LabTestRecord[] = [
  {
    id: 'lab-2025-0623',
    no: 1,
    rm: '14437',
    eps: '21',
    patientRoomId: 'room-tulip-302',
    patientName: 'Tn. S.W. (58 th / L)',
    roomNumber: 'Kamar Tulip 302',
    wardName: 'Bangsal Tulip (Kelas VIP)',
    noLab: 'I-LAB-202502000623',
    tglOrder: '28/02/2025 00:32',
    layanan: 'ANALISA GAS DARAH Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'PO2',
    hasil: '42',
    satuan: 'mm Hg',
    jamTemu: '12:05',
    jamDilapor: '12/03/2025 12:14:22',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'uji.p',
    namaPerawat: 'Uji Prihatiningsih',
    dokter: 'dr. Ghea, Sp.PD',
    referenceRange: '80 - 100 mm Hg',
    isCritical: true,
    riskLevel: 4,
    clinicalNote: 'Hipoksemia berat terverifikasi duplo pada sampel darah arteri. Pasien berisiko gagal napas akut.',
    urgentActionNeeded: 'Desaturasi Berat: Berikan Oksigenasi Sungkup NRM 15 Lpm & Posisi Duduk Tegak',
    independentActionAllowed: 'Diizinkan Mandiri: Berikan Oksigen NRM 12-15 Lpm, Posisikan Semi-Fowler Tegak, Siapkan Suction Lendir',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0157',
    no: 2,
    rm: '16240',
    eps: '3',
    patientRoomId: 'room-icu-01',
    patientName: 'Tn. D.P. (67 th / L)',
    roomNumber: 'Bed ICU 01',
    wardName: 'Intensive Care Unit (ICU)',
    noLab: 'I-LAB-202504000157',
    tglOrder: '10/04/2025 04:30',
    layanan: 'ANALISA GAS DARAH Kelas ICU',
    flagKritis: '**',
    pemeriksaan: 'PCO2',
    hasil: '> 130.0',
    satuan: 'mm Hg',
    jamTemu: '04:48',
    jamDilapor: '10/04/2025 04:55:10',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'vita.a',
    namaPerawat: 'Vita Anggis, S.Kep., Ners',
    dokter: 'dr. Cempaka, Sp.P',
    referenceRange: '35.0 - 45.0 mm Hg',
    isCritical: true,
    riskLevel: 4,
    clinicalNote: 'Hiperkapnia ekstrim dan pH < 6.500. Kondisi asidosis respiratorik dekompensasi berat.',
    urgentActionNeeded: 'Asidosis Respiratorik Kritis: Ventilasi Tekanan Positif / Panggil Tim Code Blue',
    independentActionAllowed: 'Diizinkan Mandiri: Bagging Ventilasi BVM 100% O2 Kualitas Tinggi, Panggil Tim Code Blue ICU Segera',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0360',
    no: 3,
    rm: '1204',
    eps: '109',
    patientRoomId: 'room-tulip-306',
    patientName: 'Tn. H.B. (62 th / L)',
    roomNumber: 'Kamar Tulip 306',
    wardName: 'Bangsal Tulip (Kelas VIP)',
    noLab: 'I-LAB-202504000360',
    tglOrder: '19/04/2025 07:06',
    layanan: 'GLUKOSA SEWAKTU Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Glukosa Sewaktu',
    hasil: '831.36',
    satuan: 'mg/dL',
    jamTemu: '07:11',
    jamDilapor: '19/04/2025 07:15:30',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'diah.k',
    namaPerawat: 'Diah Kartika, AMK',
    dokter: 'dr. Pugud, Sp.PD',
    referenceRange: '70 - 140 mg/dL',
    isCritical: true,
    riskLevel: 3,
    clinicalNote: 'Hiperglikemia ekstrim > 800 mg/dL. Curiga kuat komplikasi Krisis Ketoasidosis / HHS.',
    urgentActionNeeded: 'Krisis Hiperglikemia: Evaluasi Turgor Kulit, Mulai Hidrasi IV Kristaloid',
    independentActionAllowed: 'Diizinkan Mandiri: Pasang IV Bore Besar, Guyur Cairan NaCl 0.9% 1000 mL dalam 1 Jam Sesuai Standing Order',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0640',
    no: 4,
    rm: '14125',
    eps: '7',
    patientRoomId: 'room-orchid-201',
    patientName: 'Ny. M.K. (64 th / P)',
    roomNumber: 'Kamar Orchid 201',
    wardName: 'Bangsal Orchid (Kelas VIP)',
    noLab: 'I-LAB-202508000640',
    tglOrder: '29/08/2025 21:51',
    layanan: 'NATRIUM - KALIUM - KLORIDA Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Natrium',
    hasil: '124.1',
    satuan: 'mmol/L',
    jamTemu: '22:00',
    jamDilapor: '29/08/2025 22:05:14',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'shinta.p',
    namaPerawat: 'Shinta Pramudya, S.Kep., Ns',
    dokter: 'dr. Ghea, Sp.PD',
    referenceRange: '135 - 147 mmol/L',
    isCritical: true,
    riskLevel: 3,
    clinicalNote: 'Hiponatremia berat berisiko memicu edema serebral dan penurunan kesadaran progresif.',
    urgentActionNeeded: 'Koreksi Elektrolit: Restriksi Cairan Bebas & Cek Tanda Kejang / Penurunan Kesadaran',
    independentActionAllowed: 'Diizinkan Mandiri: Pasang Bed-Rail Proteksi Kejang, Pantau Kesadaran GCS Tiap 30 Menit, Siapkan Koreksi Salin Normal',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0440',
    no: 5,
    rm: '20638',
    eps: '2',
    patientRoomId: 'room-olive-102',
    patientName: 'Ny. T.H. (38 th / P)',
    roomNumber: 'Kamar Olive 102',
    wardName: 'Bangsal Olive (Junior Suite)',
    noLab: 'I-LAB-202501000440',
    tglOrder: '27/01/2025 22:45',
    layanan: 'DARAH RUTIN Kelas 3',
    flagKritis: '**',
    pemeriksaan: 'Trombosit',
    hasil: '16',
    satuan: '10^3/µL',
    jamTemu: '23:02',
    jamDilapor: '27/01/2025 23:09:09',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'tri.h',
    namaPerawat: 'Tri Harningsih, S.Kep., Ns',
    dokter: 'dr. Nadia, Sp.PD',
    referenceRange: '150 - 450 10^3/µL',
    isCritical: true,
    riskLevel: 3,
    clinicalNote: 'Trombositopenia kritis di bawah 20 ribu. Ancaman perdarahan spontan mukosa dan internal.',
    urgentActionNeeded: 'Waspada Perdarahan Spontan: Tirah Baring Mutlak & Hindari Injeksi IM',
    independentActionAllowed: 'Diizinkan Mandiri: Tirah Baring Total, Edukasi Pasien Hindari Mengejan/Sikat Gigi Keras, Siapkan Sampel Crossmatch TC',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0516',
    no: 6,
    rm: '2553',
    eps: '12',
    patientRoomId: 'room-tulip-302',
    patientName: 'Tn. S.W. (58 th / L)',
    roomNumber: 'Kamar Tulip 302',
    wardName: 'Bangsal Tulip (Kelas VIP)',
    noLab: 'I-LAB-202510000516',
    tglOrder: '31/10/2025 07:05',
    layanan: 'HS TROPONIN I Kelas ICU',
    flagKritis: '**',
    pemeriksaan: 'HS Troponin I',
    hasil: '2.258',
    satuan: 'ng/mL',
    jamTemu: '07:18',
    jamDilapor: '31/10/2025 07:21:50',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'syarah.n',
    namaPerawat: 'Syarah Nur Hayah, S.Kep., Ns',
    dokter: 'dr. Ghea, Sp.PD',
    referenceRange: '< 0.04 ng/mL',
    isCritical: true,
    riskLevel: 4,
    clinicalNote: 'Peningkatan signifikan High-Sensitivity Troponin I > 50x batas normal. Terindikasi Infark Miokard Akut.',
    urgentActionNeeded: 'Ancaman Infark Miokard: Rekam EKG 12 Lead Segera & Berikan Tirah Baring Total',
    independentActionAllowed: 'Diizinkan Mandiri: Perekaman EKG 12 Lead dalam 10 Menit, Oksigen Kanul 3-4 Lpm jika SpO2 < 90%, Posisikan Nyaman',
    status: 'Terkirim ke Bangsal'
  },
  {
    id: 'lab-2025-0549',
    no: 7,
    rm: '26309',
    eps: '30',
    patientRoomId: 'room-lily-401',
    patientName: 'An. R.K. (8 th / L)',
    roomNumber: 'Kamar Lily 401',
    wardName: 'Bangsal Lily (Kelas VIP Anak)',
    noLab: 'I-LAB-202505000549',
    tglOrder: '28/05/2025 07:12',
    layanan: 'NATRIUM - KALIUM - KLORIDA Kelas VIP',
    flagKritis: '**',
    pemeriksaan: 'Natrium',
    hasil: '121.9',
    satuan: 'mmol/L',
    jamTemu: '07:22',
    jamDilapor: '28/05/2025 07:28:04',
    dilaporOleh: 'Analis Hendra Kurniawan, A.Md.AK',
    terimaOleh: 'kiki.s',
    namaPerawat: 'Kiki Septiana Hermawan, S.Kep., Ns',
    dokter: 'dr. Agus, Sp.A (K)',
    referenceRange: '135 - 147 mmol/L',
    isCritical: true,
    riskLevel: 2,
    clinicalNote: 'Hiponatremia pediatrik sedang-berat pasca gastroenteritis dehidrasi.',
    urgentActionNeeded: 'Rehidrasi & Evaluasi Elektrolit Berkala Bersama DPJP Sp.A',
    independentActionAllowed: 'Diizinkan Mandiri: Observasi Tanda Vital Anak, Hitung Balans Cairan Ketat, Koordinasikan Terapi Cairan Pediatrik',
    status: 'Terkirim ke Bangsal'
  }
];

export interface DispatchLabPayload {
  patientRoomId: string;
  rm: string;
  eps: string;
  noLab: string;
  layanan: string;
  flagKritis: string;
  pemeriksaan: string;
  hasil: string;
  satuan: string;
  jamTemu: string;
  jamDilapor: string;
  dilaporOleh: string;
  namaPerawat: string;
  dokter: string;
  referenceRange: string;
  isCritical: boolean;
  riskLevel: RiskLevel;
  clinicalNote: string;
  urgentActionNeeded: string;
  independentActionAllowed: string;
}

interface ClinicalContextType {
  rooms: WardRoom[];
  labRecords: LabTestRecord[];
  dispatchLabResult: (data: DispatchLabPayload) => void;
  deleteLabRecord: (recordId: string, resetRoom?: boolean) => void;
  resetPatientRoomStatus: (roomId: string) => void;
  lastNotification: string | null;
  clearNotification: () => void;
  resetAllData: () => void;
}

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

const STORAGE_KEY_ROOMS = 'jih_careguide_rooms_v2';
const STORAGE_KEY_LABS = 'jih_careguide_labs_v2';

export const ClinicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<WardRoom[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROOMS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
    return DUMMY_WARD_ROOMS;
  });

  const [labRecords, setLabRecords] = useState<LabTestRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LABS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
    return INITIAL_LAB_RECORDS;
  });

  const [lastNotification, setLastNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
    } catch {
      // Abaikan
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LABS, JSON.stringify(labRecords));
    } catch {
      // Abaikan
    }
  }, [labRecords]);

  const dispatchLabResult = (data: DispatchLabPayload) => {
    const targetRoom = rooms.find((r) => r.id === data.patientRoomId);
    const roomName = targetRoom ? targetRoom.roomNumber : 'Ruangan Pasien';
    const wardName = targetRoom ? targetRoom.wardName : 'Bangsal Rawat';
    const patientName = targetRoom ? `${targetRoom.patientInitials} (${targetRoom.ageGender})` : 'Pasien';

    const newRecord: LabTestRecord = {
      id: `lab-${Date.now().toString().slice(-4)}`,
      no: labRecords.length + 1,
      rm: data.rm || targetRoom?.rmNumber || '14437',
      eps: data.eps || targetRoom?.episodeNumber || '1',
      patientRoomId: data.patientRoomId,
      patientName,
      roomNumber: roomName,
      wardName,
      noLab: data.noLab || `I-LAB-2025${Math.floor(100000 + Math.random() * 900000)}`,
      tglOrder: new Date().toLocaleDateString('id-ID'),
      layanan: data.layanan,
      flagKritis: data.flagKritis || '**',
      pemeriksaan: data.pemeriksaan,
      hasil: data.hasil,
      satuan: data.satuan,
      jamTemu: data.jamTemu,
      jamDilapor: data.jamDilapor,
      dilaporOleh: data.dilaporOleh,
      terimaOleh: data.namaPerawat.toLowerCase().split(' ')[0],
      namaPerawat: data.namaPerawat,
      dokter: data.dokter || targetRoom?.doctorInCharge || 'dr. Ghea, Sp.PD',
      referenceRange: data.referenceRange,
      isCritical: data.isCritical,
      riskLevel: data.riskLevel,
      clinicalNote: data.clinicalNote,
      urgentActionNeeded: data.urgentActionNeeded,
      independentActionAllowed: data.independentActionAllowed,
      status: 'Terkirim ke Bangsal'
    };

    // Update antrean log laboratorium
    setLabRecords((prev) => [newRecord, ...prev]);

    // Update status pasien di ruangan bangsal secara langsung
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === data.patientRoomId) {
          return {
            ...room,
            rmNumber: data.rm,
            episodeNumber: data.eps,
            noLab: data.noLab,
            layananPanel: data.layanan,
            riskLevel: data.riskLevel,
            criticalFlag: `${data.pemeriksaan} ${data.hasil} ${data.satuan} (${data.flagKritis}) ${data.layanan}`,
            urgentActionNeeded: data.urgentActionNeeded,
            independentActionAllowed: data.independentActionAllowed,
            doctorInCharge: data.dokter,
            nurseReceiver: data.namaPerawat,
            reportedAt: data.jamDilapor,
            timeElapsedMinutes: 1
          };
        }
        return room;
      })
    );

    setLastNotification(
      `Hasil lab ${data.pemeriksaan} (${data.hasil} ${data.satuan} - Flag ${data.flagKritis}) untuk ${roomName} (RM ${data.rm}) berhasil diverifikasi & dikirim ke perawat ${data.namaPerawat} di ${wardName}!`
    );
  };

  const deleteLabRecord = (recordId: string, resetRoom: boolean = true) => {
    const targetRecord = labRecords.find((r) => r.id === recordId);
    if (!targetRecord) return;

    // Hapus dari riwayat diseminasi
    setLabRecords((prev) => prev.filter((r) => r.id !== recordId));

    if (resetRoom && targetRecord.patientRoomId) {
      // Normalisasikan status kamar pasien terkait di dasbor perawat
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.id === targetRecord.patientRoomId) {
            return {
              ...room,
              riskLevel: 1,
              criticalFlag: 'Tanda Vital & Hasil Lab Terpantau Normal Pasca-Evaluasi',
              urgentActionNeeded: 'Monitoring Rutin Terjadwal Tiap 8 Jam per Shift',
              independentActionAllowed: 'Diizinkan Mandiri: Observasi Keperawatan Standar, Edukasi Asupan Hidrasi Oral, Pencatatan Rekam Medis',
              timeElapsedMinutes: 1
            };
          }
          return room;
        })
      );
    }

    setLastNotification(
      `Data hasil lab ${targetRecord.pemeriksaan} untuk ${targetRecord.roomNumber} (RM ${targetRecord.rm}) telah berhasil dihapus. Status kamar di dasbor perawat otomatis dinormalkan.`
    );
  };

  const resetPatientRoomStatus = (roomId: string) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    const roomName = targetRoom ? targetRoom.roomNumber : 'Kamar Pasien';

    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            riskLevel: 1,
            criticalFlag: 'Tanda Vital & Hasil Lab Terpantau Normal Pasca-Evaluasi',
            urgentActionNeeded: 'Monitoring Rutin Terjadwal Tiap 8 Jam per Shift',
            independentActionAllowed: 'Diizinkan Mandiri: Observasi Keperawatan Standar, Edukasi Asupan Hidrasi Oral, Pencatatan Rekam Medis',
            timeElapsedMinutes: 1
          };
        }
        return room;
      })
    );

    setLastNotification(
      `Status pasien di ${roomName} berhasil dinormalkan kembali ke Level 1 (Stabil). Dasbor perawat langsung ter-update.`
    );
  };

  const clearNotification = () => setLastNotification(null);

  const resetAllData = () => {
    setRooms(DUMMY_WARD_ROOMS);
    setLabRecords(INITIAL_LAB_RECORDS);
    localStorage.removeItem(STORAGE_KEY_ROOMS);
    localStorage.removeItem(STORAGE_KEY_LABS);
    setLastNotification('Seluruh data pasien bangsal dan riwayat lab telah direset ke setelan awal LIS.');
  };

  return (
    <ClinicalContext.Provider
      value={{
        rooms,
        labRecords,
        dispatchLabResult,
        deleteLabRecord,
        resetPatientRoomStatus,
        lastNotification,
        clearNotification,
        resetAllData
      }}
    >
      {children}
    </ClinicalContext.Provider>
  );
};

export const useClinical = () => {
  const context = useContext(ClinicalContext);
  if (!context) {
    throw new Error('useClinical must be used within a ClinicalProvider');
  }
  return context;
};
