import React, { useState } from 'react';
import { Copy, Check, PhoneCall, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SbarStep } from '../../types/clinical';

interface SbarActionViewProps {
  sbar: SbarStep[];
  escalationProtocol: {
    stage: number;
    targetParty: string;
    timeThreshold: string;
    actionIfNoResponse: string;
  }[];
  doctorInCharge: string;
}

export const SbarActionView: React.FC<SbarActionViewProps> = ({
  sbar,
  escalationProtocol,
  doctorInCharge
}) => {
  const [copied, setCopied] = useState(false);

  const fullSbarText = sbar
    .map(
      (item) =>
        `[${item.code} - ${item.title}]\n${item.content}`
    )
    .join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSbarText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getStepBadgeColor = (code: string) => {
    switch (code) {
      case 'S':
        return 'bg-blue-600 text-white';
      case 'B':
        return 'bg-slate-700 text-white';
      case 'A':
        return 'bg-amber-600 text-white';
      case 'R':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Kartu Format Komunikasi SBAR */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-jih-navy text-white text-xs font-bold">
                SBAR
              </span>
              <h3 className="text-sm sm:text-base font-bold text-jih-navy">
                Format Komunikasi Efektif SBAR ke DPJP / Dokter Jaga
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan kalimat panduan terstruktur ini saat menelepon dokter untuk mencegah keterlambatan penanganan.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-jih-blue text-white hover:bg-jih-blue-hover'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Format Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks SBAR</span>
              </>
            )}
          </button>
        </div>

        {/* Daftar 4 Komponen SBAR */}
        <div className="p-4 sm:p-5 space-y-4">
          {sbar.map((step) => (
            <div
              key={step.code}
              className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${getStepBadgeColor(
                      step.code
                    )}`}
                  >
                    {step.code}
                  </span>
                  <span className="font-bold text-xs text-slate-900">
                    {step.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium italic">
                  {step.label}
                </span>
              </div>

              {/* Teks Salinan SBAR */}
              <div className="bg-white border border-slate-200 rounded-md p-3 text-xs text-slate-800 leading-relaxed font-mono font-medium">
                "{step.content}"
              </div>

              {/* Petunjuk Komunikasi */}
              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Petunjuk: {step.instructions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alur Eskalasi Cepat Bila Dokter Berhalangan / Sedang Operasi */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <PhoneCall className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Alur Eskalasi Darurat (Saat DPJP {doctorInCharge} Sedang Sibuk / Operasi)
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Bila dokter yang dihubungi tidak merespons dalam ambang waktu di bawah ini, perawat wajib segera melompat ke tahap eskalasi berikutnya:
        </p>

        <div className="space-y-3">
          {escalationProtocol.map((esc) => (
            <div
              key={esc.stage}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-jih-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {esc.stage}
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {esc.targetParty}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Bila tidak respons: <span className="text-rose-700 font-semibold">{esc.actionIfNoResponse}</span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 text-rose-900 font-bold px-3 py-1 rounded-md text-xs self-start sm:self-auto shrink-0 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Maks: {esc.timeThreshold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
