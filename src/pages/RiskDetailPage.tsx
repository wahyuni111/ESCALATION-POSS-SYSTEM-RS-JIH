import React from 'react';
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { DUMMY_SCENARIOS } from '../data/dummyScenarios';
import { RiskBadge } from '../components/common/RiskBadge';
import { RiskMatrixTable } from '../components/clinical/RiskMatrixTable';
import { PageId } from '../components/layout/Sidebar';

interface RiskDetailPageProps {
  scenarioId: string;
  onNavigate: (page: PageId) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const RiskDetailPage: React.FC<RiskDetailPageProps> = ({
  scenarioId,
  onNavigate,
  onSelectScenario
}) => {
  const currentScenario =
    DUMMY_SCENARIOS.find((s) => s.id === scenarioId) || DUMMY_SCENARIOS[0];

  const handleOpenGuideline = () => {
    onSelectScenario(currentScenario.id);
    onNavigate('guideline');
  };

  return (
    <div className="space-y-6">
      {/* Selector Skenario Ringkas */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-jih-blue" />
          <span className="text-xs font-bold text-slate-700">Pilih Skenario untuk Telaah:</span>
        </div>
        <select
          value={currentScenario.id}
          onChange={(e) => onSelectScenario(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none cursor-pointer max-w-md w-full sm:w-auto"
        >
          {DUMMY_SCENARIOS.map((s) => (
            <option key={s.id} value={s.id}>
              [{s.code}] {s.title} (Level {s.riskLevel})
            </option>
          ))}
        </select>
      </div>

      {/* Kartu Utama Detail Klasifikasi Risiko Skenario */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Banner Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded">
                {currentScenario.code}
              </span>
              <RiskBadge level={currentScenario.riskLevel} size="md" />
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {currentScenario.department} • {currentScenario.category}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-jih-navy leading-tight">
              {currentScenario.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {currentScenario.summary}
            </p>
          </div>

          <button
            onClick={handleOpenGuideline}
            className="px-5 py-2.5 rounded-xl bg-jih-blue hover:bg-jih-blue-hover text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Buka Panduan Tindak Lanjut</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rincian Parameter Klinis & Ambang Batas Pemicu */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kolom Kiri: Critical Lab Flags */}
          <div className="space-y-4">
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Critical Lab Trigger (Pemicu Nilai Kritis):</span>
              </div>
              <p className="text-sm font-bold text-rose-950 leading-snug">
                {currentScenario.criticalLabTrigger}
              </p>
              <div className="mt-2 text-xs text-rose-800 bg-white/80 border border-rose-200 rounded p-2 font-mono">
                Contoh: {currentScenario.labThresholdExample}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Rasional Penentuan Tingkat Risiko:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Klasifikasi risiko ini dirumuskan berdasarkan kombinasi skor peringatan dini (*Early Warning Score*) dan nilai kritis hasil laboratorium yang berpotensi memicu kegawatan hemodinamik bila tidak direspons dalam rentang waktu toleransi klinis.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Dokumen Legalitas & Standing Order */}
          <div className="space-y-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
              <div className="flex items-center gap-2 text-jih-blue font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-jih-blue" />
                <span>Persetujuan Dokter & Komite Medik RS JIH:</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">DPJP Penanggung Jawab:</span>
                  <span className="font-bold text-slate-900">{currentScenario.doctorInCharge}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tanggal Pengesahan:</span>
                  <span className="font-medium text-slate-800">{currentScenario.approvalDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Nomor Dokumen Protokol:</span>
                  <span className="font-mono text-slate-800 font-semibold">{currentScenario.documentRef}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Ringkasan Standing Orders Disetujui:
              </h4>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {currentScenario.standingOrderSummary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matriks Standar Lengkap Level 1 s.d. Level 4 */}
      <RiskMatrixTable />
    </div>
  );
};
