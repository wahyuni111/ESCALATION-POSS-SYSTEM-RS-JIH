import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, BellRing } from 'lucide-react';
import { RiskLevel } from '../../types/clinical';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showDescription = false,
  className = ''
}) => {
  const config = {
    1: {
      label: 'Level 1: Risiko Rendah',
      shortLabel: 'L1: Rendah',
      desc: 'Observasi rutin terjadwal',
      bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      iconClass: 'text-emerald-700',
      Icon: ShieldCheck,
      authority: 'Tindakan Keperawatan Standar'
    },
    2: {
      label: 'Level 2: Risiko Sedang',
      shortLabel: 'L2: Sedang',
      desc: 'Tirah baring & observasi berkala',
      bgClass: 'bg-amber-50 text-amber-900 border-amber-300',
      iconClass: 'text-amber-700',
      Icon: AlertCircle,
      authority: 'Peningkatan Observasi Perawat'
    },
    3: {
      label: 'Level 3: Risiko Tinggi',
      shortLabel: 'L3: Tinggi',
      desc: 'Siaga eskalasi & standing order',
      bgClass: 'bg-orange-50 text-orange-900 border-orange-300',
      iconClass: 'text-orange-700',
      Icon: AlertTriangle,
      authority: 'Tindakan Mandiri & Hubungi Dokter'
    },
    4: {
      label: 'Level 4: Kritis (Segera)',
      shortLabel: 'L4: Kritis',
      desc: 'Tindakan darurat instan / Code Blue',
      bgClass: 'bg-rose-50 text-rose-900 border-rose-300',
      iconClass: 'text-rose-700',
      Icon: BellRing,
      authority: 'Intervensi Mandiri Instan (CPR/Airway)'
    }
  }[level];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold'
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  }[size];

  const { Icon } = config;

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`inline-flex items-center rounded-md border shadow-sm ${config.bgClass} ${sizeClasses}`}
        title={`Klasifikasi Risiko: ${config.label}. Kewenangan: ${config.authority}`}
      >
        <Icon className={`${iconSizes} ${config.iconClass} shrink-0`} aria-hidden="true" />
        <span className="tracking-tight whitespace-nowrap">
          {size === 'sm' ? config.shortLabel : config.label}
        </span>
      </span>
      {showDescription && (
        <span className="text-[11px] text-slate-500 mt-1 font-normal">
          {config.desc}
        </span>
      )}
    </div>
  );
};
