'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type OS, detectOS, osProfiles, type OSProfile } from '@/lib/os-detect';

interface OSContextValue {
  os: OS | null;
  profile: OSProfile | null;
}

const OSContext = createContext<OSContextValue>({ os: null, profile: null });

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [os, setOs] = useState<OS | null>(null);

  useEffect(() => {
    // Client-only: navigator is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration gate
    setOs(detectOS());
  }, []);

  return (
    <OSContext.Provider value={{ os, profile: os ? osProfiles[os] : null }}>
      {children}
    </OSContext.Provider>
  );
}

export const useOS = () => useContext(OSContext);
