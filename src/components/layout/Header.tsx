import React from 'react';
import {
  Bell,
  Search,
  Clock,
  Menu,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PageId } from './Sidebar';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onToggleMobileMenu
}) => {
  const { currentUser, switchShift } = useAuth();

  const pageTitles: Record<PageId, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Panduan Klinis',
      subtitle: 'Monitoring Kesiapsiagaan Bangsal & Alur Eskalasi'
    },
    'lab-input': {
      title: 'Portal Input & Diseminasi Nilai Kritis Lab (LIS)',
      subtitle: 'Entri Hasil Uji Laboratorium Sentral untuk Memicu Panduan Eskalasi Bangsal'
    },
    search: {
      title: 'Pencarian Skenario & Pemeriksaan',
      subtitle: 'Katalog Nilai Kritis & Standar Tindakan Keperawatan'
    },
    'risk-detail': {
      title: 'Detail Klasifikasi Risiko',
      subtitle: 'Analisis Matriks Level 1 - Level 4 Berdasarkan Pustaka Klinis'
    },
    guideline: {
      title: 'Panduan Tindak Lanjut & Tindakan Mandiri',
      subtitle: 'Protokol Keperawatan Saat Dokter Berhalangan & Komunikasi SBAR'
    },
    analytics: {
      title: 'Dasbor Analitik & Kepatuhan Klinis',
      subtitle: 'Evaluasi Beban Risiko Bangsal, Rasio Kendala DPJP & Kepatuhan SBAR'
    },
    'model-manager': {
      title: 'Panel Pengelola Data & Model (Prototype UI)',
      subtitle: 'Eksplorasi Konfigurasi Ambang Batas Model CDS RS JIH'
    },
    settings: {
      title: 'Pengaturan Tampilan & Log Audit',
      subtitle: 'Audit Kepatuhan Telaah Panduan & Preferensi Ruang Jaga'
    }
  };

  const currentInfo = pageTitles[currentPage] || {
    title: 'JIH CareGuide',
    subtitle: 'Clinical Decision Support for Nurses'
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between gap-4 z-20 shrink-0 shadow-xs">
      {/* Kiri: Hamburger Mobile & Judul Halaman */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-jih-navy truncate">
              {currentInfo.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-blue-50 text-jih-blue border border-blue-200 px-1.5 py-0.5 rounded font-medium">
              <Shield className="w-3 h-3" />
              RS JIH PWT
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate hidden md:block">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Kanan: Pencarian Cepat, Shift Switcher, Notifikasi Alert, & Profil */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Tombol Pencarian Cepat (Khusus Perawat) */}
        {currentPage !== 'search' && currentUser?.roleType !== 'laboran' && (
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-white hover:text-slate-800 hover:border-slate-300 transition-colors text-xs"
            title="Buka pencarian skenario & nilai lab kritis"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Cari Skenario / Lab...</span>
          </button>
        )}

        {/* Shift Jaga Selector */}
        {currentUser && (
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
            <Clock className="w-3.5 h-3.5 text-jih-blue shrink-0" />
            <select
              value={currentUser.shift}
              onChange={(e) => switchShift(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-1"
              title="Pilih Shift Jaga Dinas"
            >
              <option value="Shift Pagi (07.00 - 14.00)">Shift Pagi (07.00 - 14.00)</option>
              <option value="Shift Sore (14.00 - 21.00)">Shift Sore (14.00 - 21.00)</option>
              <option value="Shift Malam (21.00 - 07.00)">Shift Malam (21.00 - 07.00)</option>
            </select>
          </div>
        )}

        {/* Indikator Peringatan Tindakan Kritis (Ward Alert) */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="relative p-2 rounded-lg text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          title="Ada 2 ruangan dengan status kritis butuh tindakan instan saat ini"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white">
            2
          </span>
        </button>

        {/* Pengguna Ringkas */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-jih-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .filter((_, i) => i < 2)
                .join('')}
            </div>
            <div className="hidden xl:block leading-tight text-left">
              <p className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate max-w-[130px]">
                {currentUser.role}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
