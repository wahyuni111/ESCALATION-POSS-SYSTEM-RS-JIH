import React, { useState } from 'react';
import {
  Search,
  Filter,
  X,
  ArrowRight,
  FileText
} from 'lucide-react';
import { DUMMY_SCENARIOS } from '../data/dummyScenarios';
import { RiskBadge } from '../components/common/RiskBadge';
import { RiskLevel } from '../types/clinical';
import { PageId } from '../components/layout/Sidebar';

interface SearchPageProps {
  onNavigate: (page: PageId) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onNavigate,
  onSelectScenario
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const departments = ['Rawat Inap', 'Poli Rawat Jalan', 'IGD'];
  const categories = ['Kardiologi', 'Respirasi', 'Metabolik & Lab', 'Sepsis & Infeksi'];

  const filteredScenarios = DUMMY_SCENARIOS.filter((sc) => {
    const query = searchTerm.toLowerCase();
    const matchQuery =
      sc.title.toLowerCase().includes(query) ||
      sc.criticalLabTrigger.toLowerCase().includes(query) ||
      sc.summary.toLowerCase().includes(query) ||
      sc.code.toLowerCase().includes(query) ||
      sc.doctorInCharge.toLowerCase().includes(query);

    const matchDept = selectedDept === 'all' || sc.department === selectedDept;
    const matchRisk = selectedRisk === 'all' || sc.riskLevel === selectedRisk;
    const matchCategory = selectedCategory === 'all' || sc.category === selectedCategory;

    return matchQuery && matchDept && matchRisk && matchCategory;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedRisk('all');
    setSelectedCategory('all');
  };

  const handleOpenDetail = (id: string) => {
    onSelectScenario(id);
    onNavigate('risk-detail');
  };

  const handleOpenGuideline = (id: string) => {
    onSelectScenario(id);
    onNavigate('guideline');
  };

  return (
    <div className="space-y-6">
      {/* Header Pencarian */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-jih-navy">
              Pencarian Jenis Pemeriksaan & Skenario Klinis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Temukan nilai kritis laboratorium, ambang batas fisiologis, dan panduan eskalasi perawat berdasarkan kata kunci.
            </p>
          </div>

          <div className="text-xs text-slate-500 self-start sm:self-auto font-medium">
            Ditemukan: <strong>{filteredScenarios.length}</strong> dari {DUMMY_SCENARIOS.length} Skenario
          </div>
        </div>

        {/* Input Bar Pencarian */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kata kunci: 'Kalium', 'GDS', 'Sepsis', 'Aritmia', 'Gagal Napas', atau nama dokter..."
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-jih-blue focus:ring-1 focus:ring-jih-blue outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Bar Multi-Kategori */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Filter:
          </span>

          {/* Unit / Departemen */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedDept === 'all'
                  ? 'bg-jih-navy text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Unit
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedDept === dept
                    ? 'bg-jih-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Kategori Spesialisasi */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Kategori
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden md:block h-4 w-px bg-slate-200 mx-1" />

          {/* Tingkat Risiko */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedRisk('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedRisk === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Risiko
            </button>
            <button
              onClick={() => setSelectedRisk(4)}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                selectedRisk === 4
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              Kritis (L4)
            </button>
            <button
              onClick={() => setSelectedRisk(3)}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                selectedRisk === 3
                  ? 'bg-orange-700 text-white'
                  : 'bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100'
              }`}
            >
              Tinggi (L3)
            </button>
            <button
              onClick={() => setSelectedRisk(2)}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                selectedRisk === 2
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Sedang (L2)
            </button>
            <button
              onClick={() => setSelectedRisk(1)}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                selectedRisk === 1
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              Rendah (L1)
            </button>
          </div>

          {/* Reset Tombol */}
          {(searchTerm ||
            selectedDept !== 'all' ||
            selectedRisk !== 'all' ||
            selectedCategory !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 text-xs"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Daftar Hasil Skenario */}
      {filteredScenarios.length > 0 ? (
        <div className="space-y-3">
          {filteredScenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {sc.code}
                  </span>
                  <RiskBadge level={sc.riskLevel} size="sm" />
                  <span className="text-[11px] font-medium text-slate-500">
                    {sc.department} • {sc.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  {sc.title}
                </h3>

                <div
                  className={`text-xs font-semibold rounded-md px-2.5 py-1 inline-block max-w-full truncate border ${
                    sc.riskLevel === 4
                      ? 'text-rose-950 bg-rose-50/80 border-rose-200'
                      : sc.riskLevel === 3
                      ? 'text-orange-950 bg-orange-50/80 border-orange-200'
                      : sc.riskLevel === 2
                      ? 'text-amber-950 bg-amber-50/80 border-amber-200'
                      : 'text-emerald-950 bg-emerald-50/80 border-emerald-200'
                  }`}
                >
                  {sc.riskLevel >= 3
                    ? 'Pemicu Nilai Kritis: '
                    : sc.riskLevel === 2
                    ? 'Pemicu Kondisi Waspada: '
                    : 'Kriteria Kondisi Terkendali: '}
                  {sc.criticalLabTrigger}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {sc.summary}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1">
                  <span>DPJP Pengesah: <strong>{sc.doctorInCharge}</strong></span>
                  <span>•</span>
                  <span>Ref: {sc.documentRef}</span>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => handleOpenDetail(sc.id)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Detail Risiko</span>
                </button>
                <button
                  onClick={() => handleOpenGuideline(sc.id)}
                  className="px-4 py-2 rounded-lg bg-jih-blue hover:bg-jih-blue-hover text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Buka Panduan SBAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Tidak Ada Skenario yang Sesuai dengan Kriteria
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tidak ditemukan skenario klinis atau nilai lab dengan kata kunci "<strong>{searchTerm}</strong>". Coba periksa ejaan atau reset filter pencarian.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-jih-blue text-white text-xs font-bold hover:bg-jih-blue-hover transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};
