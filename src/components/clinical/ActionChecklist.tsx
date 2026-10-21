import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

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
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (step: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const handleReset = () => {
    setCheckedSteps({});
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const isAllCompleted = completedCount === actions.length && actions.length > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-jih-blue" />
            <h3 className="text-sm sm:text-base font-bold text-jih-navy">
              Checklist Simulasi Tindakan Mandiri Perawat
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tandai tindakan yang telah Anda pahami atau simulasikan saat menghadapi skenario ini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
            Selesai: {completedCount} / {actions.length}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            title="Reset Checklist"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full my-3 overflow-hidden">
        <div
          className="bg-jih-blue h-full transition-all duration-300"
          style={{ width: `${(completedCount / Math.max(actions.length, 1)) * 100}%` }}
        />
      </div>

      {isAllCompleted && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Seluruh langkah tindakan mandiri dan persiapan eskalasi telah selesai ditinjau!</span>
        </div>
      )}

      {/* Action Checkboxes */}
      <div className="space-y-3">
        {actions.map((item) => {
          const isDone = !!checkedSteps[item.step];

          return (
            <label
              key={item.step}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-300 text-slate-900'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60 text-slate-800'
              }`}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggleStep(item.step)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-jih-blue focus:ring-jih-blue cursor-pointer"
              />
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <span>Langkah {item.step}:</span>
                  <span className={isDone ? 'line-through text-slate-500' : ''}>
                    {item.action}
                  </span>
                  {item.isMandatory && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                      Wajib Segera
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Rasional Medis: {item.rationale}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
