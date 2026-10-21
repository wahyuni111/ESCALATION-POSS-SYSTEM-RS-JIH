import React from 'react';
import { Hospital } from 'lucide-react';

interface HospitalLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  collapsed?: boolean;
}

export const HospitalLogo: React.FC<HospitalLogoProps> = ({
  className = '',
  variant = 'dark',
  collapsed = false
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Rumah Sakit Resmi */}
      <div
        className={`relative flex items-center justify-center shrink-0 w-10 h-10 rounded-lg border transition-all ${
          isDark
            ? 'bg-jih-navy-light/80 border-blue-400/30 text-blue-200'
            : 'bg-jih-light-surface border-jih-blue/25 text-jih-blue'
        }`}
        title="Logo Rumah Sakit JIH Purwokerto"
      >
        <Hospital className="w-5 h-5 text-inherit" aria-hidden="true" />
        <span className="sr-only">Logo Rumah Sakit JIH Purwokerto</span>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-tight min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-bold tracking-wider uppercase ${
                isDark ? 'text-white' : 'text-jih-navy'
              }`}
            >
              RS JIH Purwokerto
            </span>
          </div>
          <span
            className={`text-[11px] font-medium tracking-tight truncate ${
              isDark ? 'text-blue-200/80' : 'text-jih-blue'
            }`}
          >
            JIH CareGuide (CDS Perawat)
          </span>
        </div>
      )}
    </div>
  );
};
