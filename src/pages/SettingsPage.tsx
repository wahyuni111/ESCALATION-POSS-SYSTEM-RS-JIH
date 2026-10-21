import React, { useState } from 'react';
import {
  Settings,
  History,
  ShieldCheck,
  Eye,
  Type,
  BellRing,
  Info
} from 'lucide-react';
import { DUMMY_AUDIT_LOGS } from '../data/dummyAudit';
import { RiskBadge } from '../components/common/RiskBadge';

export const SettingsPage: React.FC = () => {
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  const [highContrast, setHighContrast] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [auditSearch, setAuditSearch] = useState('');

  const filteredLogs = DUMMY_AUDIT_LOGS.filter(
    (log) =>
      log.nurseName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.scenarioTitle.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.ward.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Pengaturan & Audit */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-jih-blue" />
          <h2 className="text-base sm:text-lg font-bold text-jih-navy">
            Pengaturan Tampilan & Log Audit Kepatuhan
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Atur preferensi kenyamanan membaca di pos perawat bangsal dan pantau jejak aktivitas pembacaan panduan klinis.
        </p>
      </div>

      {/* Preferensi Tampilan Ruang Jaga */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-jih-blue" />
          <span>Preferensi Tampilan Ruang Jaga (Nurse Station)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Opsi Ukuran Teks */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Type className="w-4 h-4 text-slate-600" />
              <span>Ukuran Teks Panduan</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pilihan teks lebih besar memudahkan pembacaan dari jarak 1 meter di meja jaga.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setFontSize('standard')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  fontSize === 'standard'
                    ? 'bg-jih-navy text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                Standar
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  fontSize === 'large'
                    ? 'bg-jih-navy text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                Besar (+20%)
              </button>
            </div>
          </div>

          {/* Opsi Mode Kontras Tinggi */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span>Kontras Tinggi (WCAG AA)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Mempertegas garis batas kartu dan ketajaman teks pada layar monitor bangsal.
            </p>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                highContrast
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-slate-300 text-slate-700'
              }`}
            >
              {highContrast ? 'Kontras Tinggi Aktif' : 'Kontras Standar'}
            </button>
          </div>

          {/* Opsi Notifikasi Suara */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <BellRing className="w-4 h-4 text-slate-600" />
              <span>Bunyi Notifikasi Tindakan</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Simulasi peringatan audio saat terdeteksi kasus Level 4 baru di bangsal.
            </p>
            <button
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={`w-full py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                soundAlerts
                  ? 'bg-jih-blue text-white'
                  : 'bg-white border border-slate-300 text-slate-700'
              }`}
            >
              {soundAlerts ? 'Audio Siaga Aktif' : 'Audio Disenyapkan'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabel Log Audit Kepatuhan Akses Panduan */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-jih-navy flex items-center gap-2">
              <History className="w-4 h-4 text-jih-blue" />
              <span>Log Audit Telaah Panduan Klinis Keperawatan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pencatatan kepatuhan perawat dalam meninjau panduan dan melakukan simulasi SBAR.
            </p>
          </div>

          <input
            type="text"
            value={auditSearch}
            onChange={(e) => setAuditSearch(e.target.value)}
            placeholder="Saring nama perawat / skenario..."
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 outline-none w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Waktu Akses</th>
                <th className="py-2.5 px-4">Nama Perawat</th>
                <th className="py-2.5 px-4">Unit / Bangsal</th>
                <th className="py-2.5 px-4">Jenis Aktivitas</th>
                <th className="py-2.5 px-4">Skenario Klinis</th>
                <th className="py-2.5 px-4">Level Risiko</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {log.nurseName}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                    {log.ward}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      {log.actionType}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">
                    {log.scenarioTitle}
                  </td>
                  <td className="py-2.5 px-4">
                    <RiskBadge level={log.riskLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informasi Sistem & Atribusi */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1 leading-relaxed">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-jih-blue" />
          <span>Informasi Sistem & Hak Cipta:</span>
        </div>
        <p>
          <strong>JIH CareGuide (Clinical Decision Support for Nurses)</strong> • Versi 1.0.0-prototype.
        </p>
        <p>
          Dikembangkan untuk keperluan rancangan sistem pendukung keputusan klinis Rumah Sakit JIH Purwokerto. Dibangun menggunakan stack modern: React 18, Vite, TypeScript, dan Tailwind CSS.
        </p>
      </div>
    </div>
  );
};
