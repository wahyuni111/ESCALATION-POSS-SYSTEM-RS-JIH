import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Stethoscope,
  ListOrdered
} from 'lucide-react';
import { DUMMY_GUIDELINES } from '../data/dummyGuidelines';
import { DUMMY_SCENARIOS } from '../data/dummyScenarios';
import { RiskBadge } from '../components/common/RiskBadge';
import { SbarActionView } from '../components/clinical/SbarActionView';
import { ActionChecklist } from '../components/clinical/ActionChecklist';

interface GuidelinePageProps {
  scenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
}

export const GuidelinePage: React.FC<GuidelinePageProps> = ({
  scenarioId,
  onSelectScenario
}) => {
  const [activeTab, setActiveTab] = useState<'independent' | 'standing' | 'sbar' | 'checklist'>(
    'independent'
  );

  const guideline =
    DUMMY_GUIDELINES[scenarioId] || DUMMY_GUIDELINES['sc-01'];
  const scenario =
    DUMMY_SCENARIOS.find((s) => s.id === guideline.scenarioId) || DUMMY_SCENARIOS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Selector Skenario Cepat */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs no-print">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-jih-blue" />
          <span className="text-xs font-bold text-slate-700">Pilih Panduan Klinis:</span>
        </div>
        <select
          value={guideline.scenarioId}
          onChange={(e) => onSelectScenario(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none cursor-pointer max-w-md w-full sm:w-auto"
        >
          {DUMMY_SCENARIOS.map((s) => (
            <option key={s.id} value={s.id}>
              [{s.code}] {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Header Dokumen Panduan Klinis */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <RiskBadge level={guideline.riskLevel} size="md" />
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Ref Dokumen: {scenario.documentRef}
              </span>
              <span className="text-xs text-slate-400">Pembaruan: {guideline.lastUpdated}</span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-jih-navy leading-tight">
              Panduan Tindak Lanjut: {guideline.scenarioTitle}
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Nilai Kritis Pemicu: {guideline.criticalLabValue}</span>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="no-print px-3.5 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors self-start shrink-0"
            title="Cetak format panduan klinis untuk bangsal"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Panduan</span>
          </button>
        </div>

        {/* Info Pengesahan DPJP & Komite Medik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>DPJP Penanggung Jawab: <strong>{guideline.doctorInCharge}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Pengesah: <strong>{guideline.verifiedByCommittee}</strong></span>
          </div>
        </div>
      </div>

      {/* Tab Navigasi Antar Bagian Panduan (No-Print) */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-1 text-xs no-print">
        <button
          onClick={() => setActiveTab('independent')}
          className={`px-3.5 py-2 rounded-t-lg font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'independent'
              ? 'border-jih-blue text-jih-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>1. Tindakan Mandiri Saat Dokter Sibuk</span>
        </button>

        <button
          onClick={() => setActiveTab('standing')}
          className={`px-3.5 py-2 rounded-t-lg font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'standing'
              ? 'border-jih-blue text-jih-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>2. Standing Orders Dokter</span>
        </button>

        <button
          onClick={() => setActiveTab('sbar')}
          className={`px-3.5 py-2 rounded-t-lg font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'sbar'
              ? 'border-jih-blue text-jih-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>3. Alur Eskalasi & SBAR</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3.5 py-2 rounded-t-lg font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'checklist'
              ? 'border-jih-blue text-jih-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>4. Alur Tindakan Terstruktur</span>
        </button>
      </div>

      {/* KONTEN TAB 1: Tindakan Mandiri Saat Dokter Sibuk */}
      {(activeTab === 'independent' || typeof window === 'undefined') && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-jih-navy leading-relaxed">
            <span className="font-bold block text-jih-blue text-xs uppercase tracking-wide mb-1">
              Prinsip Penyelamatan Jiwa & Tindakan Mandiri Legal:
            </span>
            Seluruh tindakan di bawah ini adalah <strong>kewenangan mandiri keperawatan yang sah</strong> sesuai SK Komite Medik RS JIH Purwokerto. Perawat <em>tidak boleh menunda</em> tindakan ini demi menunggu konfirmasi verbal dokter jika tanda kegawatan terpenuhi.
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
              Langkah Urutan Tindakan Mandiri Perawat:
            </div>
            <div className="divide-y divide-slate-200">
              {guideline.immediateIndependentActions.map((act) => (
                <div key={act.step} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-jih-navy text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {act.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          {act.action}
                        </h4>
                        {act.isMandatory && (
                          <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                            Wajib Segera
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-700">Rasional Klinis:</strong> {act.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KONTEN TAB 2: Standing Orders Dokter */}
      {activeTab === 'standing' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-jih-navy">
              Standing Orders Dokter Penanggung Jawab Pelayanan (DPJP)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instruksi medik terstandarisasi yang telah disahkan sebelumnya dan boleh langsung diaktifkan oleh perawat bila syarat klinis terpenuhi.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {guideline.standingOrders.map((so, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {so.item}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Terverifikasi DPJP
                  </span>
                </div>
                <div className="text-slate-600">
                  <strong>Kondisi Pemicu:</strong> {so.condition}
                </div>
                <div className="text-slate-600 bg-white border border-slate-200 rounded p-2 text-[11px]">
                  <strong>Target Respon Klinis:</strong> {so.targetResponse}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KONTEN TAB 3: Format Komunikasi SBAR & Alur Eskalasi */}
      {activeTab === 'sbar' && (
        <SbarActionView
          sbar={guideline.sbar}
          escalationProtocol={guideline.escalationProtocol}
          doctorInCharge={guideline.doctorInCharge}
        />
      )}

      {/* KONTEN TAB 4: Checklist Simulasi Aksi */}
      {activeTab === 'checklist' && (
        <ActionChecklist
          scenarioTitle={guideline.scenarioTitle}
          actions={guideline.immediateIndependentActions}
        />
      )}

      {/* Kotak Monitoring Lanjutan & Tanda Bahaya Kritis */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-jih-blue" />
          <span>Interval Evaluasi & Tanda Bahaya Sekunder:</span>
        </h4>
        <p className="text-xs font-semibold text-slate-800 mb-3">
          {guideline.monitoringInterval}
        </p>

        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-700 block mb-1">Tanda Waspada Tambahan:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            {guideline.criticalSignsToWatch.map((sign, i) => (
              <li key={i}>{sign}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
