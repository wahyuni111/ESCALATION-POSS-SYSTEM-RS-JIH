import React from 'react';
import {
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Activity,
  BarChart3,
  FlaskConical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DUMMY_SCENARIOS } from '../data/dummyScenarios';
import { WardMonitoringBoard } from '../components/ward/WardMonitoringBoard';
import { RiskBadge } from '../components/common/RiskBadge';
import { PageId } from '../components/layout/Sidebar';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectScenario
}) => {
  const { currentUser } = useAuth();

  const handleOpenGuideline = (scenarioId: string) => {
    onSelectScenario(scenarioId);
    onNavigate('guideline');
  };

  const handleOpenRiskDetail = (scenarioId: string) => {
    onSelectScenario(scenarioId);
    onNavigate('risk-detail');
  };

  return (
    <div className="space-y-6">
      {/* Sambutan Shift Jaga Klinis */}
      <div className="bg-jih-navy rounded-xl p-5 sm:p-6 text-white border border-jih-navy-muted/40 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-200 text-xs font-medium">
              <Activity className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />
              <span>Kesiapsiagaan Klinis Bangsal RS JIH Purwokerto</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Selamat Bertugas, {currentUser?.name || 'Perawat Pelaksana'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-2xl">
              Unit: <span className="font-semibold text-white">{currentUser?.ward}</span> • Shift: <span className="font-semibold text-white">{currentUser?.shift}</span>.
              Pantau kondisi kamar pasien dan panduan tindakan mandiri saat dokter berhalangan pada papan kendali di bawah.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            {currentUser?.roleType === 'laboran' && (
              <button
                onClick={() => onNavigate('lab-input')}
                className="px-3.5 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Buka panel petugas laboran untuk entri hasil nilai kritis"
              >
                <FlaskConical className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Entri Nilai Kritis Lab (LIS)</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('analytics')}
              className="px-3.5 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Buka dasbor analitik kesiapsiagaan bangsal dan audit kepatuhan SBAR"
            >
              <BarChart3 className="w-4 h-4 text-blue-300" aria-hidden="true" />
              <span>Analitik Kesiapsiagaan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. VISUALISASI RUANG JAGA BANGSAL & POLI (Ward Action Board) */}
      <WardMonitoringBoard
        onSelectScenario={handleOpenRiskDetail}
        onOpenGuideline={handleOpenGuideline}
      />

      {/* 2. DAFTAR SKENARIO KLINIS TERVERIFIKASI DOKTER */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-jih-blue" aria-hidden="true" />
              <h3 className="text-base font-bold text-jih-navy">
                Katalog Skenario & Panduan Klinis Terverifikasi DPJP
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Protokol eskalasi dan tindakan keperawatan yang telah disetujui Komite Medik RS JIH Purwokerto.
            </p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-jih-blue hover:text-jih-blue-hover flex items-center gap-1 self-start sm:self-auto transition-colors"
          >
            <span>Buka Semua Skenario</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {DUMMY_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {sc.category} • {sc.wardLocation || sc.department}
                  </span>
                  <RiskBadge level={sc.riskLevel} size="sm" />
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug mb-2">
                  {sc.title}
                </h4>

                {/* Pemicu Nilai / Indikator Klinis Spesifik Risk Level */}
                <div
                  className={`border-l-2 pl-2.5 py-1.5 text-xs mb-3 rounded-r ${
                    sc.riskLevel === 4
                      ? 'border-rose-600 bg-rose-50/70 text-rose-950'
                      : sc.riskLevel === 3
                      ? 'border-orange-500 bg-orange-50/70 text-orange-950'
                      : sc.riskLevel === 2
                      ? 'border-amber-500 bg-amber-50/70 text-amber-950'
                      : 'border-emerald-500 bg-emerald-50/70 text-emerald-950'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      sc.riskLevel === 4
                        ? 'text-rose-700'
                        : sc.riskLevel === 3
                        ? 'text-orange-700'
                        : sc.riskLevel === 2
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {sc.riskLevel >= 3
                      ? 'Pemicu Nilai Kritis:'
                      : sc.riskLevel === 2
                      ? 'Pemicu Kondisi Waspada:'
                      : 'Kriteria Kondisi Terkendali:'}
                  </span>
                  <span className="font-semibold leading-tight block mt-0.5">
                    {sc.criticalLabTrigger}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {sc.summary}
                </p>

                <div className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    DPJP: <strong className="text-slate-800">{sc.doctorInCharge}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs">
                <button
                  onClick={() => handleOpenRiskDetail(sc.id)}
                  className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-center transition-colors"
                >
                  Detail Risiko
                </button>
                <button
                  onClick={() => handleOpenGuideline(sc.id)}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-jih-blue hover:bg-jih-blue-hover text-white font-semibold text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>Panduan SBAR</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
