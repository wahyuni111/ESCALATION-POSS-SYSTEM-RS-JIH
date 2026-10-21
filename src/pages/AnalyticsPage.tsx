import React, { useState } from 'react';
import {
  BarChart3,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  Stethoscope,
  Building2,
  FileCheck2,
  FileText
} from 'lucide-react';
import { PageId } from '../components/layout/Sidebar';
import { DUMMY_WARD_ROOMS } from '../data/dummyWards';
import { DUMMY_AUDIT_LOGS } from '../data/dummyAudit';

interface AnalyticsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onNavigate,
  onSelectScenario
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'shift' | '24h' | '7d'>('shift');
  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('all');

  // Perhitungan Data Riil dari data bangsal
  const totalRooms = DUMMY_WARD_ROOMS.length;
  const criticalCount = DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 4).length;
  const highRiskCount = DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 3).length;
  const busyDoctorCount = DUMMY_WARD_ROOMS.filter(
    (r) =>
      r.doctorStatus.includes('Operasi') ||
      r.doctorStatus.includes('Visite') ||
      r.doctorStatus.includes('Poli')
  ).length;

  const busyDoctorPercentage = Math.round((busyDoctorCount / totalRooms) * 100);

  // Distribusi Ruangan per Bangsal
  const wardBreakdown = [
    {
      name: 'Bangsal Melati (Bedah & Dalam)',
      code: 'Melati',
      total: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Melati')).length,
      critical: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Melati') && r.riskLevel === 4).length,
      high: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Melati') && r.riskLevel === 3).length,
      moderate: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Melati') && r.riskLevel === 2).length
    },
    {
      name: 'Instalasi Gawat Darurat (IGD)',
      code: 'IGD',
      total: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('IGD')).length,
      critical: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('IGD') && r.riskLevel === 4).length,
      high: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('IGD') && r.riskLevel === 3).length,
      moderate: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('IGD') && r.riskLevel === 2).length
    },
    {
      name: 'Poli Rawat Jalan Spesialis',
      code: 'Poli',
      total: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Poli')).length,
      critical: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Poli') && r.riskLevel === 4).length,
      high: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Poli') && r.riskLevel === 3).length,
      moderate: DUMMY_WARD_ROOMS.filter((r) => r.wardName.includes('Poli') && r.riskLevel === 2).length
    }
  ];

  // Skenario Paling Sering Di-trigger
  const scenarioTriggerFrequencies = [
    {
      id: 'sc-01',
      title: 'Henti Jantung / Aritmia Letal Akut',
      accessCount: 42,
      percentage: 38,
      riskLevel: 4,
      category: 'Kardiologi'
    },
    {
      id: 'sc-02',
      title: 'Desaturasi SpO2 & Gagal Napas Mendadak',
      accessCount: 31,
      percentage: 28,
      riskLevel: 4,
      category: 'Respirasi'
    },
    {
      id: 'sc-03',
      title: 'Sepsis Warning & NEWS Score Memburuk',
      accessCount: 22,
      percentage: 20,
      riskLevel: 3,
      category: 'Penyakit Dalam'
    },
    {
      id: 'sc-05',
      title: 'Krisis Hipertensi Tanpa Target Organ',
      accessCount: 16,
      percentage: 14,
      riskLevel: 2,
      category: 'Rawat Jalan'
    }
  ];

  const handleScenarioClick = (scenarioId: string) => {
    onSelectScenario(scenarioId);
    onNavigate('guideline');
  };

  return (
    <div className="space-y-6">
      {/* Header Analitik Klinis */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-jih-navy text-white">
              <BarChart3 className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-bold text-jih-navy">
              Dasbor Analitik Kesiapsiagaan & Audit SBAR
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Pemantauan distribusi beban risiko bangsal, rasio kendala ketersediaan dokter DPJP, dan kepatuhan perawat dalam menjalankan protokol mandiri.
          </p>
        </div>

        {/* Kontrol Filter Waktu */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setSelectedTimeframe('shift')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedTimeframe === 'shift'
                ? 'bg-white text-jih-navy shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shift Aktif
          </button>
          <button
            onClick={() => setSelectedTimeframe('24h')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedTimeframe === '24h'
                ? 'bg-white text-jih-navy shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            24 Jam
          </button>
          <button
            onClick={() => setSelectedTimeframe('7d')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedTimeframe === '7d'
                ? 'bg-white text-jih-navy shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7 Hari
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Kunci Kesiapsiagaan Klinis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrik 1: Pasien Kritis & Tinggi */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs border-l-4 border-l-rose-600">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">Pasien Kritis & Tinggi Aktif</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{criticalCount + highRiskCount}</span>
            <span className="text-xs text-rose-700 font-semibold">({criticalCount} Kritis, {highRiskCount} Tinggi)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Dari {totalRooms} kamar terpantau di bangsal dan IGD saat ini.
          </p>
        </div>

        {/* Metrik 2: Rasio Keterikatan DPJP */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">DPJP Sedang Berhalangan</span>
            <Clock className="w-4 h-4 text-amber-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{busyDoctorPercentage}%</span>
            <span className="text-xs text-amber-800 font-semibold">({busyDoctorCount} dari {totalRooms} dokter)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Sedang tindakan operasi, visite bangsal lain, atau poli.
          </p>
        </div>

        {/* Metrik 3: Kepatuhan Telaah SBAR */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">Kepatuhan Telaah SBAR</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">92.4%</span>
            <span className="text-xs text-emerald-700 font-semibold">(Standar: &gt; 85%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Perawat menuntaskan checklist sebelum eskalasi ke dokter.
          </p>
        </div>

        {/* Metrik 4: Kecepatan Akses Panduan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs border-l-4 border-l-jih-blue">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">Waktu Respons Panduan</span>
            <Stethoscope className="w-4 h-4 text-jih-blue" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1.8 Menit</span>
            <span className="text-xs text-slate-500 font-medium">(Rata-rata)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Waktu dari penanda kritis terdeteksi hingga buka protokol.
          </p>
        </div>
      </div>

      {/* Grid 2 Kolom: Analitik Bangsal & Frekuensi Protokol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom 1: Distribusi Beban Risiko per Bangsal */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-jih-blue" aria-hidden="true" />
                <h3 className="font-bold text-sm text-jih-navy">
                  Distribusi Beban Risiko Pasien per Unit Bangsal
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">Unit Terdaftar</span>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4">
              Pertanyaan klinis: Unit mana yang memiliki konsentrasi pasien risiko kritis terbanyak saat ini?
            </p>

            <div className="space-y-4">
              {wardBreakdown.map((ward) => (
                <div key={ward.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{ward.name}</span>
                    <span className="text-slate-500 font-medium">
                      {ward.total} Kamar Aktif
                    </span>
                  </div>

                  {/* Multi-segment Bar */}
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    {ward.critical > 0 && (
                      <div
                        style={{ width: `${(ward.critical / ward.total) * 100}%` }}
                        className="bg-rose-600 h-full"
                        title={`${ward.critical} Kritis`}
                      />
                    )}
                    {ward.high > 0 && (
                      <div
                        style={{ width: `${(ward.high / ward.total) * 100}%` }}
                        className="bg-orange-500 h-full"
                        title={`${ward.high} Tinggi`}
                      />
                    )}
                    {ward.moderate > 0 && (
                      <div
                        style={{ width: `${(ward.moderate / ward.total) * 100}%` }}
                        className="bg-amber-400 h-full"
                        title={`${ward.moderate} Sedang`}
                      />
                    )}
                  </div>

                  {/* Legenda Ringkas */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                    {ward.critical > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                        {ward.critical} Level 4 (Kritis)
                      </span>
                    )}
                    {ward.high > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                        {ward.high} Level 3 (Tinggi)
                      </span>
                    )}
                    {ward.moderate > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                        {ward.moderate} Level 2 (Sedang)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Kesiapsiagaan Tim Code Blue:</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Siaga Penuh (Standby)
            </span>
          </div>
        </div>

        {/* Kolom 2: Frekuensi Akses Protokol Mandiri Terbanyak */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-jih-blue" aria-hidden="true" />
                <h3 className="font-bold text-sm text-jih-navy">
                  Protokol Klinis Paling Sering Di-trigger
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">Frekuensi Akses</span>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4">
              Pertanyaan klinis: Panduan keperawatan mana yang paling banyak membutuhkan tindakan mandiri saat dokter berhalangan?
            </p>

            <div className="space-y-3.5">
              {scenarioTriggerFrequencies.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleScenarioClick(item.id)}
                  className="group cursor-pointer p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-800 group-hover:text-jih-blue transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="text-slate-500 font-medium shrink-0 ml-2">
                      {item.accessCount} kali ({item.percentage}%)
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage * 2}%` }}
                      className={`h-full rounded-full transition-all ${
                        item.riskLevel === 4
                          ? 'bg-rose-600'
                          : item.riskLevel === 3
                          ? 'bg-orange-500'
                          : 'bg-jih-blue'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                    <span className="uppercase font-semibold tracking-wider text-slate-400">
                      Kategori: {item.category}
                    </span>
                    <span className="text-jih-blue font-semibold group-hover:underline flex items-center gap-0.5">
                      Buka Panduan SBAR
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Divalidasi Komite Medik:</span>
            <span className="font-medium text-slate-700">dr. Sp.JP & dr. Sp.P (Aktif)</span>
          </div>
        </div>
      </div>

      {/* Tabel Log Audit & Jejak Telaah SBAR Terkini */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-jih-blue" aria-hidden="true" />
              <h3 className="font-bold text-sm text-jih-navy">
                Log Audit Aktivitas Telaah Panduan & Eksekusi SBAR Terkini
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Jejak digital verifikasi mandiri perawat saat membaca skenario dan mengonfirmasi tindakan mandiri.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" />
              Filter:
            </span>
            <select
              value={selectedWardFilter}
              onChange={(e) => setSelectedWardFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="all">Semua Ruang Jaga</option>
              <option value="Melati">Bangsal Melati</option>
              <option value="IGD">Instalasi Gawat Darurat</option>
              <option value="Poli">Poli Rawat Jalan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3">Waktu Transaksi</th>
                <th className="py-2.5 px-3">Perawat Dinas</th>
                <th className="py-2.5 px-3">Ruang / Bangsal</th>
                <th className="py-2.5 px-3">Aktivitas Klinis</th>
                <th className="py-2.5 px-3">Skenario Terkait</th>
                <th className="py-2.5 px-3 text-right">Status Kepatuhan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DUMMY_AUDIT_LOGS.filter(
                (log) => selectedWardFilter === 'all' || log.ward.includes(selectedWardFilter)
              ).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                    {log.nurseName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {log.ward}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {log.actionType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs truncate text-slate-800">
                    {log.scenarioTitle}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Tercatat Sah
                    </span>
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