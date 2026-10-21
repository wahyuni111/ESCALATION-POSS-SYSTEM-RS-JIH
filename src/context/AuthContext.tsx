import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types/clinical';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-01',
    name: 'Ns. Siti Rahayu, S.Kep',
    nip: 'JIH-PWT-2021-084',
    role: 'Perawat Pelaksana Bangsal',
    roleType: 'nurse',
    ward: 'Bangsal Tulip (Kelas VIP)',
    shift: 'Shift Sore (14.00 - 21.00)'
  },
  {
    id: 'user-lab-01',
    name: 'Analis Hendra Kurniawan, A.Md.AK',
    nip: 'JIH-LAB-2020-041',
    role: 'Pranata Laboratorium Medis (Laboran LIS)',
    roleType: 'laboran',
    ward: 'Laboratorium Sentral RS JIH Purwokerto',
    shift: 'Shift Sore (14.00 - 21.00)'
  },
  {
    id: 'user-lab-02',
    name: 'Analis Maya Safitri, S.Tr.Kes',
    nip: 'JIH-LAB-2022-092',
    role: 'Pranata Laboratorium Medis (Kimia Darah & AGD)',
    roleType: 'laboran',
    ward: 'Laboratorium Sentral RS JIH Purwokerto',
    shift: 'Shift Pagi (07.00 - 14.00)'
  },
  {
    id: 'user-02',
    name: 'Ns. Ahmad Fauzi, A.Md.Kep',
    nip: 'JIH-PWT-2019-032',
    role: 'Perawat Gawat Darurat & Triase',
    roleType: 'nurse',
    ward: 'Instalasi Gawat Darurat (IGD)',
    shift: 'Shift Pagi (07.00 - 14.00)'
  },
  {
    id: 'user-03',
    name: 'Ns. Tri Wahyuni, S.Kep',
    nip: 'JIH-PWT-2022-115',
    role: 'Perawat Rawat Jalan',
    roleType: 'nurse',
    ward: 'Poli Spesialis Jantung & Penyakit Dalam',
    shift: 'Shift Pagi (07.00 - 14.00)'
  },
  {
    id: 'user-04',
    name: 'Ns. Bambang Santoso, S.Kep, M.Kep',
    nip: 'JIH-PWT-2016-008',
    role: 'Supervisor Keperawatan & Komite Mutu',
    roleType: 'supervisor',
    ward: 'Komite Keperawatan RS JIH Purwokerto',
    shift: 'Shift Pagi (07.00 - 14.00)'
  }
];

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  loginAs: (user: UserProfile) => void;
  logout: () => void;
  switchShift: (newShift: UserProfile['shift']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const loginAs = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchShift = (newShift: UserProfile['shift']) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, shift: newShift });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loginAs,
        logout,
        switchShift
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
