import React, { useState } from 'react';
import hospitalLogo from '../../assets/hospital-logo.png';

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
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Rumah Sakit Resmi */}
      <div
        className="relative flex items-center justify-center shrink-0 w-10 h-10 rounded-lg bg-white p-1 border border-blue-200 shadow-xs overflow-hidden"
        title="Logo Rumah Sakit JIH Purwokerto"
      >
        {!hasError ? (
          <img
            src={hospitalLogo}
            alt="Logo RS JIH Purwokerto"
            className="w-full h-full object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-[10px] font-bold text-jih-navy text-center leading-tight">
            JIH
          </span>
        )}
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
