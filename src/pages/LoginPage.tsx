import React, { useState } from 'react';
import { LogIn, ShieldAlert, User, CheckCircle2 } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { HospitalLogo } from '../components/common/HospitalLogo';
import { UserProfile } from '../types/clinical';

export const LoginPage: React.FC = () => {
  const { loginAs } = useAuth();
  const [selectedUser, setSelectedUser] = useState<UserProfile>(DEMO_USERS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedUser);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-jih-navy to-slate-950">
      {/* Container Utama Login */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Biru Navy */}
        <div className="bg-jih-navy p-6 text-white text-center border-b border-jih-navy-light/40">
          <div className="flex justify-center mb-3">
            <HospitalLogo variant="dark" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            Portal Klinis Keperawatan
          </h2>
          <p className="text-xs text-blue-200/80 mt-1">
            Clinical Decision Support System (CDSS) RS JIH Purwokerto
          </p>
        </div>

        {/* Form Pilihan Pengguna Demo */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Pilih Profil Perawat Demo:
            </label>
            <div className="space-y-2.5" role="radiogroup" aria-label="Daftar profil perawat demo">
              {DEMO_USERS.map((user) => {
                const isSelected = selectedUser.id === user.id;

                return (
                  <button
                    key={user.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-jih-blue bg-blue-50/70 shadow-xs ring-1 ring-jih-blue'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-jih-blue text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <User className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.role}
                        </p>
                        <p className="text-[10px] text-jih-blue font-semibold truncate mt-0.5">
                          {user.ward}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-jih-blue shrink-0 ml-2" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-jih-blue hover:bg-jih-blue-hover text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sebagai {selectedUser.name.split(',')[0]}</span>
          </button>

          {/* Catatan Penafian Prototype */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950">
                Pemberitahuan Prototype Frontend:
              </span>
              Sistem ini untuk demonstrasi alur kerja panduan klinis perawat. Data sepenuhnya fiktif dan belum divalidasi secara klinis. Tidak ada form entri hasil lab atau koneksi SIMRS.
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Rumah Sakit JIH Purwokerto © 2026 - Versi Prototype 1.0.0
        </div>
      </div>
    </div>
  );
};
