import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, BellRing } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const RiskMatrixTable: React.FC = () => {
  const matrixData = [
    {
      level: 1 as const,
      name: 'Risiko Rendah (Stabil)',
      icon: ShieldCheck,
      colorClass: 'text-emerald-800 bg-emerald-50 border-emerald-300',
      indicators: 'Tanda vital dalam batas normal, hasil lab dasar stabil, tidak ada keluhan akut baru.',
      nursingActions: 'Observasi keperawatan standar tiap 8 jam per shift, edukasi nutrisi & hidrasi, pencatatan rekam medis berkala.',
      escalationTime: 'Sesuai jam visite dokter rutin',
      authorizedStandingOrders: 'Pemberian obat oral rutin sesuai resep rekam medis.'
    },
    {
      level: 2 as const,
      name: 'Risiko Sedang (Perhatian Khusus)',
      icon: AlertCircle,
      colorClass: 'text-amber-900 bg-amber-50 border-amber-300',
      indicators: 'Fluktuasi tanda vital ringan, hiperglikemia tanpa ketosis berat, tensi urgensi tanpa nyeri dada.',
      nursingActions: 'Peningkatan frekuensi observasi tiap 2 - 4 jam, bimbing tirah baring tenang, cek glukosa / tensi berkala.',
      escalationTime: 'Lapor dokter jaga bangsal / DPJP dalam < 60 menit',
      authorizedStandingOrders: 'Pemberian cairan rehidrasi oral, perekaman EKG dasar bila berdebar.'
    },
    {
      level: 3 as const,
      name: 'Risiko Tinggi (Siaga Eskalasi)',
      icon: AlertTriangle,
      colorClass: 'text-orange-950 bg-orange-50 border-orange-300',
      indicators: 'Early Warning Score meningkat, laktat > 3.0 mmol/L, GDS > 450 mg/dL disertai asidosis, leukositosis ekstrem.',
      nursingActions: 'Posisikan semi-fowler, pasang IV bore besar No. 18/20, berikan oksigen kanul 2-4 Lpm, pasang kateter urin untuk pantau output.',
      escalationTime: 'Lapor DPJP / Dokter Jaga dalam < 15 menit via SBAR',
      authorizedStandingOrders: 'Guyur kristaloid NaCl 0.9% 1000 mL awal, ambil kultur darah sebelum antibiotik.'
    },
    {
      level: 4 as const,
      name: 'Risiko Kritis (Intervensi Instan)',
      icon: BellRing,
      colorClass: 'text-rose-950 bg-rose-50 border-rose-300 font-bold',
      indicators: 'Henti jantung / nadi karotis tidak teraba, SpO2 < 85% dengan gagal napas akut, kalium serum ekstrem < 2.5 atau > 6.5 mEq/L.',
      nursingActions: 'Mulai Kompresi Dada (CPR) 100-120x/menit seketika, posisikan duduk tegak + NRM 12-15 Lpm, hisap lendir paten.',
      escalationTime: 'Aktivasi Code Blue / Tim Reaksi Cepat (< 1 menit)',
      authorizedStandingOrders: 'Pasang defibrilator/AED segera, bag-valve-mask 100% O2, delegasi lapor dokter jaga.'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-jih-navy">
            Matriks Klasifikasi Risiko & Kewenangan Klinis Perawat
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Disahkan oleh Komite Medik & Keperawatan RS JIH Purwokerto sebagai acuan batas kewenangan mandiri perawat.
          </p>
        </div>
        <span className="text-[11px] bg-blue-100 text-jih-blue border border-blue-200 px-2 py-0.5 rounded font-semibold hidden sm:inline-block">
          Acuan Standar Rumah Sakit
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 w-44">Tingkat Risiko</th>
              <th className="py-3 px-4 w-52">Kriteria / Parameter</th>
              <th className="py-3 px-4">Tindakan Mandiri Perawat (Saat Dokter Sibuk)</th>
              <th className="py-3 px-4 w-48">Standing Orders Disetujui</th>
              <th className="py-3 px-4 w-36">Batas Waktu Lapor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {matrixData.map((row) => (
              <tr key={row.level} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 align-top">
                  <RiskBadge level={row.level} size="sm" />
                  <div className="text-[11px] font-semibold text-slate-800 mt-1.5">
                    {row.name}
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top leading-relaxed text-slate-600">
                  {row.indicators}
                </td>
                <td className="py-3.5 px-4 align-top leading-relaxed text-slate-800 font-medium">
                  {row.nursingActions}
                </td>
                <td className="py-3.5 px-4 align-top leading-relaxed text-slate-600">
                  {row.authorizedStandingOrders}
                </td>
                <td className="py-3.5 px-4 align-top font-semibold text-slate-900 whitespace-nowrap">
                  {row.escalationTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
