import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface ActionChecklistProps {
  scenarioTitle: string;
  actions: {
    step: number;
    action: string;
    rationale: string;
    isMandatory: boolean;
  }[];
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({
  actions
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      {/* Header Read-Only */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-jih-blue" />
          <h3 className="text-sm sm:text-base font-bold text-jih-navy">
            Alur Tindakan Mandiri Keperawatan (Read-Only)
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Panduan langkah demi langkah yang telah disetujui dokter. Perawat cukup membaca urutan tindakan ini tanpa perlu mengisi atau mencentang sistem.
        </p>
      </div>

      {/* Daftar Langkah Tindakan (Read-Only) */}
      <div className="space-y-3 pt-4">
        {actions.map((item) => (
          <div
            key={item.step}
            className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800"
          >
            <span className="w-6 h-6 rounded-full bg-jih-navy text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              {item.step}
            </span>
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 flex-wrap">
                <span>Langkah {item.step}: {item.action}</span>
                {item.isMandatory && (
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    Wajib Segera
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed bg-white border border-slate-200 rounded p-2 mt-1">
                <strong className="text-slate-700">Rasional Klinis:</strong> {item.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
