import React, { useState } from 'react';
import { LogIn, ShieldAlert, User, CheckCircle2, FlaskConical, Stethoscope } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { HospitalLogo } from '../components/common/HospitalLogo';
import { UserProfile } from '../types/clinical';

export const LoginPage: React.FC = () => {
  const { loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'nurse' | 'laboran'>('nurse');
  const [selectedUser, setSelectedUser] = useState<UserProfile>(
    DEMO_USERS.find((u) => u.roleType !== 'laboran') || DEMO_USERS[0]
  );

  const handleRoleChange = (role: 'nurse' | 'laboran') => {
    setSelectedRole(role);
    const firstUserInRole = DEMO_USERS.find((u) =>
      role === 'laboran' ? u.roleType === 'laboran' : u.roleType !== 'laboran'
    );
    if (firstUserInRole) {
      setSelectedUser(firstUserInRole);
    }
  };

  const filteredUsers = DEMO_USERS.filter((user) =>
    selectedRole === 'laboran' ? user.roleType === 'laboran' : user.roleType !== 'laboran'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedUser);
  };

  const isLaboran = selectedRole === 'laboran';

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
            Portal Klinis & Laboratorium
          </h2>
          <p className="text-xs text-blue-200/80 mt-1">
            Clinical Decision Support System (CDSS) RS JIH Purwokerto
          </p>
        </div>

        {/* Form Pilihan Pengguna Demo Bertahap */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* LANGKAH 1: PILIH PERAN (ROLE) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              Langkah 1: Pilih Peran Anda Saat Ini:
            </label>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Pilihan Peran">
              {/* Opsi Perawat */}
              <button
                type="button"
                role="radio"
                aria-checked={!isLaboran}
                onClick={() => handleRoleChange('nurse')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  !isLaboran
                    ? 'border-jih-blue bg-blue-50/80 shadow-xs ring-2 ring-jih-blue text-jih-navy'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      !isLaboran ? 'bg-jih-blue text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4" aria-hidden="true" />
                  </div>
                  {!isLaboran && (
                    <span className="w-2 h-2 rounded-full bg-jih-blue" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Perawat Bangsal</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    Monitoring pasien & tindakan mandiri
                  </p>
                </div>
              </button>

              {/* Opsi Laboran */}
              <button
                type="button"
                role="radio"
                aria-checked={isLaboran}
                onClick={() => handleRoleChange('laboran')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isLaboran
                    ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-2 ring-amber-500 text-amber-950'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isLaboran ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4" aria-hidden="true" />
                  </div>
                  {isLaboran && (
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Petugas Laborat</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    Entri & verifikasi nilai kritis (LIS)
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* LANGKAH 2: PILIH NAMA PETUGAS SESUAI PERAN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Langkah 2: Pilih Nama {isLaboran ? 'Analis Laboratorium' : 'Perawat'}:
              </label>
              <span className="text-[10px] font-medium text-slate-500">
                {filteredUsers.length} Pilihan Akun
              </span>
            </div>

            <div
              className="space-y-2"
              role="radiogroup"
              aria-label={`Daftar nama ${isLaboran ? 'laboran' : 'perawat'}`}
            >
              {filteredUsers.map((user) => {
                const isSelected = selectedUser.id === user.id;

                return (
                  <button
                    key={user.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? isLaboran
                          ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-1 ring-amber-500'
                          : 'border-jih-blue bg-blue-50/80 shadow-xs ring-1 ring-jih-blue'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? isLaboran
                              ? 'bg-amber-600 text-white'
                              : 'bg-jih-blue text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isLaboran ? (
                          <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <User className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.role}
                        </p>
                        <p
                          className={`text-[10px] font-semibold truncate mt-0.5 ${
                            isLaboran ? 'text-amber-800' : 'text-jih-blue'
                          }`}
                        >
                          {user.ward}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ml-2 ${
                          isLaboran ? 'text-amber-600' : 'text-jih-blue'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              isLaboran
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-jih-blue hover:bg-jih-blue-hover'
            }`}
          >
            {isLaboran ? (
              <FlaskConical className="w-4 h-4" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span>
              Masuk Sebagai {selectedUser.name.split(',')[0]} ({isLaboran ? 'Laboran LIS' : 'Perawat'})
            </span>
          </button>

          {/* Catatan Penafian Prototype */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950">
                Pemberitahuan Prototype Frontend:
              </span>
              Sistem ini untuk demonstrasi alur kerja panduan klinis perawat dan entri hasil lab kritis. Data sepenuhnya fiktif untuk ilustrasi dan belum divalidasi klinis.
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
