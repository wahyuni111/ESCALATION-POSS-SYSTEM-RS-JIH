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
              <Stethoscope className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-jih-navy">
              Peta Ruang Jaga Bangsal & Poli (Ward Action Board)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi instan kondisi kamar rawat inap dan poli yang memerlukan tindakan keperawatan mandiri saat dokter berhalangan.
          </p>
        </div>

        {/* Status Cepat Kesiapsiagaan */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{criticalCount} Tindakan Kritis Segera</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />
            <span>{highCount} Siaga Resusitasi / SBAR</span>
          </div>
        </div>
      </div>

      {/* Filter Kontrol Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-700 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            Tingkat Risiko:
          </span>
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 'all'
                ? 'bg-jih-navy text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({DUMMY_WARD_ROOMS.length})
          </button>
          <button
            onClick={() => setFilterLevel(4)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 4
                ? 'bg-rose-700 text-white'
                : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            Level 4: Kritis ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 4).length})
          </button>
          <button
            onClick={() => setFilterLevel(3)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 3
                ? 'bg-orange-600 text-white'
                : 'bg-white text-orange-700 hover:bg-orange-50 border border-orange-200'
            }`}
          >
            Level 3: Tinggi ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 3).length})
          </button>
          <button
            onClick={() => setFilterLevel(2)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 2
                ? 'bg-amber-600 text-white'
                : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            Level 2: Sedang ({DUMMY_WARD_ROOMS.filter((r) => r.riskLevel === 2).length})
          </button>
        </div>

        {/* Filter Unit / Bangsal */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="ward-select" className="text-slate-500 whitespace-nowrap text-xs">Unit Bangsal:</label>
          <select
            id="ward-select"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none text-xs hover:border-slate-300 transition-colors"
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
              className={`rounded-xl border bg-white p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm ${
                isCritical
                  ? 'border-slate-200 border-l-4 border-l-rose-600'
                  : isHigh
                  ? 'border-slate-200 border-l-4 border-l-orange-500'
                  : 'border-slate-200 border-l-4 border-l-amber-400'
              }`}
            >
              <div>
                {/* Header Kartu: Nama Kamar, Pasien & Badge Risiko */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {room.roomNumber}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {room.patientInitials}, {room.ageGender} • {room.wardName}
                    </p>
                  </div>
                  <RiskBadge level={room.riskLevel} size="sm" />
                </div>

                {/* Tanda Bahaya & Temuan Kritis Klinis */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                    Tanda Bahaya & Nilai Kritis:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {room.criticalFlag}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <span className="font-medium text-slate-600">Diagnosis:</span> {room.currentDiagnosis}
                  </p>
                </div>

                {/* Rekomendasi Tindakan & Kewenangan Mandiri Terpadu */}
                <div
                  className={`mt-3 rounded-lg p-3 text-xs ${
                    isCritical
                      ? 'bg-rose-50/80 border border-rose-200/80 text-rose-950'
                      : isHigh
                      ? 'bg-orange-50/80 border border-orange-200/80 text-orange-950'
                      : 'bg-slate-50 border border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide mb-1 text-slate-800">
                    <AlertTriangle
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isCritical ? 'text-rose-600' : isHigh ? 'text-orange-600' : 'text-slate-500'
                      }`}
                      aria-hidden="true"
                    />
                    <span>Tindakan Yang Dibutuhkan:</span>
                  </div>
                  <p className="font-semibold leading-relaxed">{room.urgentActionNeeded}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] leading-relaxed text-slate-700">
                    <span className="font-bold text-jih-blue">Kewenangan Mandiri: </span>
                    <span>{room.independentActionAllowed}</span>
                  </div>
                </div>

                {/* Status Keberadaan Dokter DPJP & Waktu */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>DPJP:</span>
                    <span
                      className={`font-semibold truncate ${
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

                  <span className="flex items-center gap-1 shrink-0 ml-2">
                    <Clock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                    {room.timeElapsedMinutes} mnt lalu
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => onSelectScenario(room.scenarioId)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-center transition-colors"
                >
                  Detail Risiko
                </button>
                <button
                  onClick={() => onOpenGuideline(room.scenarioId)}
                  className={`flex-1 py-1.5 px-3 rounded-lg font-semibold text-white flex items-center justify-center gap-1 transition-colors ${
                    isCritical
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : isHigh
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-jih-blue hover:bg-jih-blue-hover'
                  }`}
                >
                  <span>Panduan SBAR</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
