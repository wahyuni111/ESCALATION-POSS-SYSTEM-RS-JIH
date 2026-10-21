import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  UserCheck,
  Stethoscope,
  ArrowRight,
  Filter,
  ShieldAlert,
  FlaskConical,
  Trash2,
  CheckCircle2,
  Star
} from 'lucide-react';
import { useClinical } from '../../context/ClinicalContext';
import { useAuth } from '../../context/AuthContext';
import { RiskLevel, WardRoom } from '../../types/clinical';
import { RiskBadge } from '../common/RiskBadge';

interface WardMonitoringBoardProps {
  onSelectScenario: (scenarioId: string) => void;
  onOpenGuideline: (scenarioId: string) => void;
}

export const WardMonitoringBoard: React.FC<WardMonitoringBoardProps> = ({
  onSelectScenario,
  onOpenGuideline
}) => {
  const { rooms, deleteRoom, clearNormalRooms } = useClinical();
  const { currentUser } = useAuth();

  const [filterScope, setFilterScope] = useState<'all' | 'my-rooms'>('all');
  const [filterLevel, setFilterLevel] = useState<RiskLevel | 'all'>('all');
  const [selectedWard, setSelectedWard] = useState<string>('all');

  const wards = Array.from(new Set(rooms.map((r) => r.wardName)));

  // Cek apakah ruangan ini merupakan tanggung jawab perawat yang sedang login
  const isRoomAssignedToMe = (room: WardRoom): boolean => {
    if (!currentUser || currentUser.roleType !== 'nurse') return false;

    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/^(ns\.|br\.)\s*/, '')
        .replace(/,\s*(s\.kep|ners|amk|amd\.kep|ns).*$/i, '')
        .trim();

    const myName = clean(currentUser.name);
    const assigned = room.assignedNurse ? clean(room.assignedNurse) : '';
    const receiver = room.nurseReceiver ? clean(room.nurseReceiver) : '';

    if (assigned && (assigned.includes(myName) || myName.includes(assigned))) return true;
    if (receiver && (receiver.includes(myName) || myName.includes(receiver))) return true;

    return false;
  };

  const myAssignedRooms = rooms.filter(isRoomAssignedToMe);
  const myAssignedCount = myAssignedRooms.length;

  const filteredRooms = rooms.filter((room) => {
    const matchScope = filterScope === 'all' || isRoomAssignedToMe(room);
    const matchLevel = filterLevel === 'all' || room.riskLevel === filterLevel;
    const matchWard = selectedWard === 'all' || room.wardName === selectedWard;
    return matchScope && matchLevel && matchWard;
  });

  const criticalCount = rooms.filter((r) => r.riskLevel === 4).length;
  const highCount = rooms.filter((r) => r.riskLevel === 3).length;
  const moderateCount = rooms.filter((r) => r.riskLevel === 2).length;
  const normalCount = rooms.filter((r) => r.riskLevel === 1).length;

  const isLaboran = currentUser?.roleType === 'laboran';
  const isNurse = currentUser?.roleType === 'nurse';

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

      {/* Banner Penugasan Khusus Perawat: Membantu Perawat Mengetahui Ruangan Tanggung Jawabnya */}
      {isNurse && (
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-lg bg-jih-blue text-white shrink-0">
              <UserCheck className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 truncate">
                Penugasan Shift Jaga: <span className="text-jih-blue">{currentUser.name}</span> ({currentUser.ward.split('(')[0].trim()})
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {myAssignedCount > 0 ? (
                  <>
                    Anda bertanggung jawab langsung mengasuh{' '}
                    <strong className="text-slate-900">{myAssignedCount} ruangan</strong>:{' '}
                    <span className="font-semibold text-jih-blue">
                      {myAssignedRooms.map((r) => r.roomNumber).join(', ')}
                    </span>
                    . Kartu kamar Anda ditandai lencana bintang emas agar Anda dapat fokus dan memprioritaskan penanganan.
                  </>
                ) : (
                  <>Anda sedang memantau seluruh pasien di unit {currentUser.ward}.</>
                )}
              </p>
            </div>
          </div>

          {myAssignedCount > 0 && (
            <button
              type="button"
              onClick={() => setFilterScope(filterScope === 'my-rooms' ? 'all' : 'my-rooms')}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-2xs ${
                filterScope === 'my-rooms'
                  ? 'bg-jih-blue text-white ring-2 ring-blue-300'
                  : 'bg-white text-jih-blue border border-jih-blue/40 hover:bg-blue-50'
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  filterScope === 'my-rooms' ? 'text-amber-300 fill-amber-300' : 'text-amber-500 fill-amber-400'
                }`}
                aria-hidden="true"
              />
              <span>{filterScope === 'my-rooms' ? 'Tampilkan Semua Ruangan' : 'Fokus Kamar Tanggung Jawab Saya'}</span>
            </button>
          )}
        </div>
      )}

      {/* Filter Kontrol Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 py-4 text-xs border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab Filter Tanggung Jawab Saya vs Semua Ruangan (Khusus Perawat) */}
          {isNurse && myAssignedCount > 0 && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 mr-1">
              <button
                type="button"
                onClick={() => setFilterScope('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  filterScope === 'all'
                    ? 'bg-white text-jih-navy shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({rooms.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterScope('my-rooms')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                  filterScope === 'my-rooms'
                    ? 'bg-jih-blue text-white shadow-xs'
                    : 'text-jih-blue hover:text-blue-900'
                }`}
              >
                <Star className={`w-3 h-3 ${filterScope === 'my-rooms' ? 'text-amber-300 fill-amber-300' : 'text-amber-500'}`} />
                <span>Tugas Saya ({myAssignedCount})</span>
              </button>
            </div>
          )}

          <span className="font-semibold text-slate-700 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            Risiko:
          </span>
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 'all'
                ? 'bg-jih-navy text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Level
          </button>
          <button
            onClick={() => setFilterLevel(4)}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 4
                ? 'bg-rose-700 text-white'
                : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            Level 4: Kritis ({rooms.filter((r) => r.riskLevel === 4).length})
          </button>
          <button
            onClick={() => setFilterLevel(3)}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 3
                ? 'bg-orange-600 text-white'
                : 'bg-white text-orange-700 hover:bg-orange-50 border border-orange-200'
            }`}
          >
            Level 3: Tinggi ({rooms.filter((r) => r.riskLevel === 3).length})
          </button>
          <button
            onClick={() => setFilterLevel(2)}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 2
                ? 'bg-amber-600 text-white'
                : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            Level 2: Sedang ({moderateCount})
          </button>
          <button
            onClick={() => setFilterLevel(1)}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              filterLevel === 1
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            Level 1: Stabil ({normalCount})
          </button>

          {/* Tombol Bersihkan Kamar: HANYA HAK LABORAN */}
          {isLaboran && normalCount > 0 && (
            <button
              type="button"
              onClick={clearNormalRooms}
              className="ml-auto sm:ml-2 px-2.5 py-1.5 rounded-lg font-semibold text-[11px] text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 inline-flex items-center gap-1 transition-colors"
              title="Khusus Petugas Laboratorium: Bersihkan kamar yang sudah normal dari papan kendali"
            >
              <Trash2 className="w-3 h-3 text-rose-600" aria-hidden="true" />
              <span>Bersihkan {normalCount} Kamar Normal (Laboran)</span>
            </button>
          )}
        </div>

        {/* Filter Unit / Bangsal */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <label htmlFor="ward-select" className="text-slate-500 whitespace-nowrap text-xs">Unit Bangsal:</label>
          <select
            id="ward-select"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none text-xs hover:border-slate-300 transition-colors"
          >
            <option value="all">Semua Bangsal & ICU</option>
            {wards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Kartu Ruangan Bangsal & Poli */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full py-12 px-4 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">
              {filterScope === 'my-rooms'
                ? 'Tidak Ada Kamar Tugas Anda yang Memerlukan Eskalasi'
                : 'Tidak Ada Kamar yang Perlu Eskalasi'}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              {filterScope === 'my-rooms'
                ? 'Semua pasien di ruangan asuhan Anda saat ini dalam kondisi stabil atau terpantau baik.'
                : 'Seluruh kamar pasien terpantau stabil sesuai kriteria filter yang Anda pilih.'}
            </p>
            {filterScope === 'my-rooms' && (
              <button
                type="button"
                onClick={() => setFilterScope('all')}
                className="mt-3 px-3 py-1.5 bg-jih-blue text-white rounded-lg text-xs font-semibold hover:bg-jih-blue-hover transition-colors"
              >
                Lihat Semua Kamar Bangsal
              </button>
            )}
          </div>
        ) : (
          filteredRooms.map((room) => {
            const isCritical = room.riskLevel === 4;
            const isHigh = room.riskLevel === 3;
            const isModerate = room.riskLevel === 2;
            const isNormal = room.riskLevel === 1;
            const isMyRoom = isRoomAssignedToMe(room);

            return (
              <div
                key={room.id}
                className={`rounded-xl border bg-white p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm ${
                  isMyRoom
                    ? 'ring-2 ring-jih-blue/80 border-jih-blue bg-gradient-to-b from-blue-50/30 to-white shadow-sm'
                    : isCritical
                    ? 'border-slate-200 border-l-4 border-l-rose-600'
                    : isHigh
                    ? 'border-slate-200 border-l-4 border-l-orange-500'
                    : isModerate
                    ? 'border-slate-200 border-l-4 border-l-amber-400'
                    : 'border-slate-200 border-l-4 border-l-emerald-500 bg-emerald-50/10'
                }`}
              >
                <div>
                  {/* Badge Khusus Ruangan Tanggung Jawab Saya */}
                  {isMyRoom && (
                    <div className="mb-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-100/90 border border-jih-blue/40 text-jih-blue text-[10px] font-bold">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" aria-hidden="true" />
                      <span>Ruang Asuhan Anda (Tanggung Jawab Shift Ini)</span>
                    </div>
                  )}

                  {/* Header Kartu: Nama Kamar, Pasien & Badge Risiko */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm text-slate-900 truncate">
                          {room.roomNumber}
                        </h3>
                        {room.rmNumber && (
                          <span className="font-mono text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded">
                            RM {room.rmNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {room.patientInitials}, {room.ageGender} • {room.wardName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <RiskBadge level={room.riskLevel} size="sm" />

                      {/* Tombol Hapus: HANYA HAK PETUGAS LABORAN */}
                      {isLaboran && (
                        <button
                          type="button"
                          onClick={() => deleteRoom(room.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                          title={`Hapus ${room.roomNumber} dari dasbor (Akses Khusus Laboran)`}
                          aria-label={`Hapus ${room.roomNumber}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tanda Bahaya & Temuan Kritis Klinis */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      <span>Tanda Bahaya & Nilai Kritis:</span>
                      <span className="text-[10px] text-jih-blue flex items-center gap-1 font-semibold normal-case font-mono">
                        <FlaskConical className="w-3 h-3 text-jih-blue" aria-hidden="true" />
                        {room.noLab ? `LIS ${room.noLab.slice(-6)}` : 'LIS Laborat'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                      {room.criticalFlag}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      <span className="font-medium text-slate-600">Diagnosis:</span> {room.currentDiagnosis}
                    </p>

                    {/* Informasi Perawat Penanggung Jawab (PPJP) */}
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-dashed border-slate-200">
                      <span className="truncate">
                        Perawat PPJP:{' '}
                        <strong className={isMyRoom ? 'text-jih-blue font-bold' : 'text-slate-800'}>
                          {isMyRoom
                            ? `Anda (${currentUser?.name})`
                            : room.assignedNurse || room.nurseReceiver || 'Tim Bangsal'}
                        </strong>
                      </span>
                      {room.reportedAt && (
                        <span className="font-mono text-[9px] text-slate-400 shrink-0 ml-1">
                          {room.reportedAt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rekomendasi Tindakan & Kewenangan Mandiri Terpadu */}
                  <div
                    className={`mt-3 rounded-lg p-3 text-xs ${
                      isCritical
                        ? 'bg-rose-50/80 border border-rose-200/80 text-rose-950'
                        : isHigh
                        ? 'bg-orange-50/80 border border-orange-200/80 text-orange-950'
                        : isModerate
                        ? 'bg-amber-50/80 border border-amber-200/80 text-amber-950'
                        : 'bg-emerald-50/70 border border-emerald-200/70 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide mb-1 text-slate-800">
                      <AlertTriangle
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isCritical
                            ? 'text-rose-600'
                            : isHigh
                            ? 'text-orange-600'
                            : isModerate
                            ? 'text-amber-600'
                            : 'text-emerald-600'
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
                      <span className="truncate">
                        {room.doctorInCharge ? `${room.doctorInCharge}:` : 'DPJP:'}
                      </span>
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
                        : isModerate
                        ? 'bg-jih-blue hover:bg-jih-blue-hover'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <span>{isNormal ? 'Pantau Terjadwal' : 'Panduan SBAR'}</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
