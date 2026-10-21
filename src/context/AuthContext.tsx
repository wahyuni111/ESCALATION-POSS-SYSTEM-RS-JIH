import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types/clinical';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-01',
    name: 'Ns. Uji Prihatiningsih, S.Kep',
    nip: 'JIH-PWT-2021-084',
    role: 'Perawat Penanggung Jawab Pasien (PPJP)',
    roleType: 'nurse',
    ward: 'Bangsal Tulip (Kelas VIP)',
    shift: 'Shift Sore (14.00 - 21.00)'
  },
  {
    id: 'user-02',
    name: 'Ns. Vita Anggis, S.Kep., Ners',
    nip: 'JIH-PWT-2019-032',
    role: 'Perawat ICU & Ruang Kritis',
    roleType: 'nurse',
    ward: 'Intensive Care Unit (ICU)',
    shift: 'Shift Pagi (07.00 - 14.00)'
  },
  {
    id: 'user-03',
    name: 'Ns. Diah Kartika, AMK',
    nip: 'JIH-PWT-2022-115',
    role: 'Perawat Pelaksana Bangsal',
    roleType: 'nurse',
    ward: 'Bangsal Tulip (Kelas VIP)',
    shift: 'Shift Pagi (07.00 - 14.00)'
  },
  {
    id: 'user-04',
    name: 'Ns. Shinta Pramudya, S.Kep., Ns',
    nip: 'JIH-PWT-2020-058',
    role: 'Perawat Pelaksana Bangsal',
    roleType: 'nurse',
    ward: 'Bangsal Orchid (Kelas VIP)',
    shift: 'Shift Sore (14.00 - 21.00)'
  },
  {
    id: 'user-05',
    name: 'Ns. Tri Harningsih, S.Kep., Ns',
    nip: 'JIH-PWT-2023-019',
    role: 'Perawat Pelaksana Bangsal',
    roleType: 'nurse',
    ward: 'Bangsal Olive (Junior Suite)',
    shift: 'Shift Malam (21.00 - 07.00)'
  },
  {
    id: 'user-06',
    name: 'Ns. Kiki Septiana, S.Kep., Ns',
    nip: 'JIH-PWT-2021-140',
    role: 'Perawat Perinatologi & Anak',
    roleType: 'nurse',
    ward: 'Bangsal Lily (Kelas VIP Anak)',
    shift: 'Shift Pagi (07.00 - 14.00)'
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
