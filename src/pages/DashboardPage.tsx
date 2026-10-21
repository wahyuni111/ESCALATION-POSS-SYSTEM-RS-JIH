import React from 'react';
import {
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DUMMY_SCENARIOS } from '../data/dummyScenarios';
import { WardMonitoringBoard } from '../components/ward/WardMonitoringBoard';
import { RiskBadge } from '../components/common/RiskBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
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
      {/* Banner Utama Penafian Prototype */}
      <DisclaimerBanner />

      {/* Hero Sambutan Perawat Shift */}
      <div className="bg-gradient-to-r from-jih-navy to-jih-navy-light rounded-2xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-jih-navy-muted/40">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Kesiapsiagaan Klinis Bangsal RS JIH Purwokerto</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Bertugas, {currentUser?.name || 'Perawat'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
            Unit: <strong>{currentUser?.ward}</strong> • Shift Jaga: <strong>{currentUser?.shift}</strong>.
            Cek visualisasi ruang jaga di bawah ini untuk melihat kamar pasien yang memerlukan intervensi mandiri saat dokter berhalangan.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2 rounded-xl bg-white text-jih-navy hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-jih-blue" />
            <span>Cari Skenario / Lab</span>
          </button>
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
              <FileCheck2 className="w-5 h-5 text-jih-blue" />
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
            className="text-xs font-bold text-jih-blue hover:text-jih-blue-hover flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Lihat Semua Skenario</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {DUMMY_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-200/60 px-2 py-0.5 rounded">
                    {sc.category} • {sc.department}
                  </span>
                  <RiskBadge level={sc.riskLevel} size="sm" />
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug mb-1">
                  {sc.title}
                </h4>

                <div className="bg-white border border-slate-200 rounded-md p-2 text-[11px] mb-3">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                    Critical Lab Trigger:
                  </span>
                  <span className="font-semibold text-rose-900 leading-tight block">
                    {sc.criticalLabTrigger}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {sc.summary}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">DPJP: {sc.doctorInCharge}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200 text-xs">
                <button
                  onClick={() => handleOpenRiskDetail(sc.id)}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-center transition-colors"
                >
                  Detail Risiko
                </button>
                <button
                  onClick={() => handleOpenGuideline(sc.id)}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-jih-blue hover:bg-jih-blue-hover text-white font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
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
