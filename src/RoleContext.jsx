import React, { createContext, useContext, useState } from 'react';
import { PROFILES } from './mock';

const RoleCtx = createContext(null);

export function RoleProvider({ children }) {
  const [profile, setProfile] = useState(PROFILES[0]);
  return (
    <RoleCtx.Provider value={{ profile, setProfile }}>
      {children}
    </RoleCtx.Provider>
  );
}

export const useRole = () => useContext(RoleCtx);