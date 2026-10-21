import React from 'react';
import {
  LayoutDashboard,
  Search,
  Activity,
  FileCheck2,
  BarChart3,
  Cpu,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  ShieldAlert
} from 'lucide-react';
import { HospitalLogo } from '../common/HospitalLogo';
import { useAuth } from '../../context/AuthContext';

export type PageId =
  | 'dashboard'
  | 'search'
  | 'risk-detail'
  | 'guideline'
  | 'analytics'
  | 'model-manager'
  | 'settings';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const { currentUser, logout } = useAuth();

  const navItems = [
    {
      id: 'dashboard' as PageId,
      label: 'Dashboard Klinis',
      sublabel: 'Peta Ruang & Skenario Aktif',
      icon: LayoutDashboard,
      badge: '6 Ruang'
    },
    {
      id: 'analytics' as PageId,
      label: 'Analitik & Kepatuhan',
      sublabel: 'Beban Risiko & Audit SBAR',
      icon: BarChart3
    },
    {
      id: 'search' as PageId,
      label: 'Pencarian Skenario',
      sublabel: 'Pemeriksaan & Ambang Lab',
      icon: Search
    },
    {
      id: 'risk-detail' as PageId,
      label: 'Klasifikasi Risiko',
      sublabel: 'Matriks Level 1 - 4',
      icon: Activity
    },
    {
      id: 'guideline' as PageId,
      label: 'Panduan Tindak Lanjut',
      sublabel: 'Tindakan Mandiri & SBAR',
      icon: FileCheck2,
      highlight: true
    },
    {
      id: 'model-manager' as PageId,
      label: 'Pengelola Data & Model',
      sublabel: 'Prototype UI Eksploratif',
      icon: Cpu,
      isPrototype: true
    },
    {
      id: 'settings' as PageId,
      label: 'Pengaturan & Audit',
      sublabel: 'Jejak Baca & Preferensi',
      icon: Settings
    }
  ];

  return (
    <aside
      className={`bg-jih-navy text-slate-100 flex flex-col shrink-0 transition-all duration-300 relative border-r border-jih-navy-muted/40 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-jih-navy-light/60 bg-jih-navy-dark">
        <HospitalLogo variant="dark" collapsed={collapsed} />
        
        <button
          onClick={onToggleCollapse}
          className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-jih-navy-light transition-colors ml-auto"
          title={collapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
          aria-label={collapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Profil Perawat Aktif (Ringkas di Sidebar) */}
      {currentUser && (
        <div
          className={`px-4 py-3 border-b border-jih-navy-light/40 bg-jih-navy/60 ${
            collapsed ? 'text-center' : ''
          }`}
        >
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-jih-blue-accent/30 border border-jih-blue-accent text-blue-200 flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .filter((_, i) => i < 2)
                  .join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-blue-200/70 truncate">
                  <BedDouble className="w-3 h-3 text-blue-300" />
                  <span className="truncate">{currentUser.ward.split('(')[0]}</span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="w-8 h-8 mx-auto rounded-full bg-jih-blue-accent/30 border border-jih-blue-accent text-blue-200 flex items-center justify-center font-bold text-xs"
              title={`${currentUser.name} - ${currentUser.ward}`}
            >
              {currentUser.name[0]}
            </div>
          )}
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {!collapsed ? 'Menu Utama Keperawatan' : '•'}
        </div>

        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group ${
                isActive
                  ? 'bg-jih-blue text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-jih-navy-light hover:text-white font-medium'
              }`}
              title={collapsed ? `${item.label} (${item.sublabel})` : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-300'
                }`}
              />

              {!collapsed && (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-xs truncate flex items-center gap-1.5">
                      <span>{item.label}</span>
                      {item.isPrototype && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded">
                          UI Mock
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-[10px] truncate ${
                        isActive ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {item.sublabel}
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] bg-jih-navy-dark text-blue-300 px-1.5 py-0.5 rounded border border-blue-900/50">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Nav & Logout Demo */}
      <div className="p-3 border-t border-jih-navy-light/60 bg-jih-navy-dark/70 space-y-2">
        {!collapsed && (
          <div className="bg-jih-navy-light/40 border border-jih-blue-subtle/20 rounded p-2 text-[10px] text-blue-200/80 leading-tight">
            <div className="flex items-center gap-1 font-semibold text-white mb-0.5">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>Standar RS JIH</span>
            </div>
            <span>Eskalasi keperawatan mandiri disahkan Komite Medik.</span>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors text-xs font-medium"
          title="Keluar dari sesi demo"
        >
          <LogOut className="w-4 h-4 shrink-0 text-rose-400" />
          {!collapsed && <span>Ganti Akun Demo</span>}
        </button>
      </div>
    </aside>
  );
};
