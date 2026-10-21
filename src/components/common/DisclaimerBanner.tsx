import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  if (compact) {
    return (
      <aside aria-label="Penafian status klinis prototype" className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-amber-950">[Ilustrasi: Belum Divalidasi Klinis]</span>
          <span className="truncate text-amber-800">
            Prototipe frontend CDS keperawatan RS JIH Purwokerto. Data bersifat fiktif & tidak terhubung ke SIMRS/alat lab.
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-amber-700 hover:text-amber-950 p-0.5 rounded transition-colors"
          title="Tutup catatan penafian"
          aria-label="Tutup catatan penafian"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Penafian status klinis prototype" className="bg-amber-50/90 border border-amber-200 rounded-lg p-3.5 shadow-sm text-amber-950 mb-6">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-amber-100 rounded-md text-amber-800 shrink-0 mt-0.5">
          <Info className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 text-xs leading-relaxed">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-amber-900 uppercase tracking-wide">
              Pemberitahuan Lingkungan Prototipe
            </span>
            <span className="bg-amber-200/80 text-amber-900 font-semibold px-2 py-0.5 rounded text-[10px]">
              Ilustrasi: Belum Divalidasi Klinis
            </span>
          </div>
          <p className="text-amber-900/90">
            Sistem <strong>JIH CareGuide</strong> ini merupakan rancangan antarmuka awal untuk membantu perawat memahami klasifikasi risiko dan membaca panduan tindak lanjut dokter. Seluruh skenario, nilai laboratorium pemicu, dan parameter adalah data dummy fiktif. Tidak ada sambungan aktif ke SIMRS, instrumen LIS laboratorium, atau basis data rekam medis pasien riil.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-amber-600 hover:text-amber-900 p-1 rounded hover:bg-amber-100 transition-colors shrink-0"
          title="Tutup banner"
          aria-label="Tutup banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
