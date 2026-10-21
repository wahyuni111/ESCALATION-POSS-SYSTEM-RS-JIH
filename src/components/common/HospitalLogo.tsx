import React from 'react';

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
      {/* Slot Logo Terstandarisasi */}
      <div
        className={`relative flex items-center justify-center shrink-0 w-10 h-10 rounded-lg border transition-all ${
          isDark
            ? 'bg-jih-navy-light border-jih-blue-subtle/50 text-blue-200'
            : 'bg-jih-light-surface border-jih-blue/20 text-jih-blue'
        }`}
        title="Area penempatan aset logo resmi Rumah Sakit JIH Purwokerto"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Simbol Palang Medis Terbuka */}
          <path d="M12 6v12M6 12h12" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
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
