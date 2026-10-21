import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  UserCheck,
  Stethoscope,
  ArrowRight,
  Filter,
  ShieldAlert
} from 'lucide-react';
import { DUMMY_WARD_ROOMS } from '../../data/dummyWards';
import { RiskLevel } from '../../types/clinical';
import { RiskBadge } from '../common/RiskBadge';

interface WardMonitoringBoardProps {
  onSelectScenario: (scenarioId: string) => void;
  onOpenGuideline: (scenarioId: string) => void;
}

export const WardMonitoringBoard: React.FC<WardMonitoringBoardProps> = ({
  onSelectScenario,
  onOpenGuideline
}) => {
  const [filterLevel, setFilterLevel] = useState<RiskLevel | 'all'>('all');
  const [selectedWard, setSelectedWard] = useState<string>('all');

  const wards = Array.from(new Set(DUMMY_WARD_ROOMS.map((r) => r.wardName)));

  const filteredRooms = DUMMY_WARD_ROOMS.filter((room) => {
    const matchLevel = filterLevel === 'all' || room.riskLevel === filterLevel;
    const matchWard = selectedWard === 'all' || room.wardName === selectedWard;
    return matchLevel && matchWard;
  });

  const criticalCount = DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 4).length;
  const highCount = DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 3).length;

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 lg:p-6 mb-8">
      {/* Header Visualisasi Ruang Jaga Bangsal & Poli */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-jih-navy text-white">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-jih-navy">
              Peta Ruang Jaga Bangsal & Poli (Ward Action Board)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi instan kondisi kamar rawat inap dan poli yang memerlukan tindakan keperawatan segera saat dokter sedang berhalangan.
          </p>
        </div>

        {/* Status Cepat Kesiapsiagaan */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{criticalCount} Tindakan Kritis Segera</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>{highCount} Siaga Resusitasi / SBAR</span>
          </div>
        </div>
      </div>

      {/* Filter Kontrol Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Tingkat Risiko:
          </span>
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filterLevel === 'all'
                ? 'bg-jih-navy text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({DUMMY_WARD_ROOMS.length})
          </button>
          <button
            onClick={() => setFilterLevel(4)}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filterLevel === 4
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Level 4: Kritis ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 4).length})
          </button>
          <button
            onClick={() => setFilterLevel(3)}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filterLevel === 3
                ? 'bg-orange-700 text-white'
                : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200'
            }`}
          >
            Level 3: Tinggi ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 3).length})
          </button>
          <button
            onClick={() => setFilterLevel(2)}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filterLevel === 2
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Level 2: Sedang ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 2).length})
          </button>
        </div>

        {/* Filter Unit / Bangsal */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="ward-select" className="text-slate-500 whitespace-nowrap">Unit Bangsal:</label>
          <select
            id="ward-select"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-medium text-slate-700 outline-none text-xs"
          >
            <option value="all">Semua Bangsal & Poli</option>
            {wards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Kartu Ruangan Bangsal & Poli */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const isCritical = room.riskLevel === 4;
          const isHigh = room.riskLevel === 3;

          return (
            <div
              key={room.id}
              className={`rounded-xl border p-4.5 transition-all flex flex-col justify-between ${
                isCritical
                  ? 'bg-rose-50/50 border-rose-300 shadow-sm ring-1 ring-rose-200'
                  : isHigh
                  ? 'bg-orange-50/40 border-orange-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Kartu: Nama Kamar & Badge Risiko */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {room.roomNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        ({room.patientInitials}, {room.ageGender})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {room.wardName}
                    </span>
                  </div>
                  <RiskBadge level={room.riskLevel} size="sm" />
                </div>

                {/* Critical Lab Flag / Trigger */}
                <div className="mb-3 bg-white border border-slate-200 rounded-lg p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                    Critical Flag / Tanda Bahaya:
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {room.criticalFlag}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    Diagnosa: {room.currentDiagnosis}
                  </p>
                </div>

                {/* Kotak Rekomendasi Tindakan Mendesak */}
                <div
                  className={`rounded-lg p-2.5 mb-3 text-xs leading-relaxed ${
                    isCritical
                      ? 'bg-rose-100/80 border border-rose-300 text-rose-950 font-semibold'
                      : isHigh
                      ? 'bg-orange-100/70 border border-orange-200 text-orange-950 font-medium'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-bold mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Tindakan Yang Dibutuhkan:</span>
                  </div>
                  <p className="text-xs">{room.urgentActionNeeded}</p>
                </div>

                {/* Status Keberadaan Dokter DPJP */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-100/80 rounded-md px-2.5 py-1.5 mb-3">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    Status Dokter:
                  </span>
                  <span
                    className={`font-semibold ${
                      room.doctorStatus.includes('Operasi') ||
                      room.doctorStatus.includes('Visite') ||
                      room.doctorStatus.includes('Poli')
                        ? 'text-amber-800'
                        : 'text-emerald-700'
                    }`}
                  >
                    {room.doctorStatus}
                  </span>
                </div>

                {/* Kewenangan Tindakan Mandiri Perawat */}
                <div className="text-[11px] bg-blue-50 border border-blue-200 rounded-md p-2 text-jih-navy leading-normal mb-4">
                  <span className="font-bold text-jih-blue block text-[10px] uppercase tracking-wide mb-0.5">
                    Kewenangan Mandiri Perawat:
                  </span>
                  {room.independentActionAllowed}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/80 text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {room.timeElapsedMinutes} mnt lalu
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectScenario(room.scenarioId)}
                    className="px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 font-medium transition-colors"
                  >
                    Detail Risiko
                  </button>
                  <button
                    onClick={() => onOpenGuideline(room.scenarioId)}
                    className={`px-3 py-1 rounded-md font-bold text-white flex items-center gap-1 shadow-xs transition-colors ${
                      isCritical
                        ? 'bg-rose-700 hover:bg-rose-800'
                        : isHigh
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-jih-blue hover:bg-jih-blue-hover'
                    }`}
                  >
                    <span>Panduan SBAR</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
