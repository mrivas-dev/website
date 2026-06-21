'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { type OS, detectOS, osProfiles, type OSProfile } from '@/lib/os-detect';

export const DEV_OS_OVERRIDE_KEY = 'dev-os-override';

function readOverride(): OS | null {
  const stored = localStorage.getItem(DEV_OS_OVERRIDE_KEY);
  if (stored === 'macos' || stored === 'linux' || stored === 'windows') {
    return stored;
  }
  return null;
}

interface OSContextValue {
  os: OS | null;
  profile: OSProfile | null;
  setOverrideOS: (os: OS | null) => void;
}

const OSContext = createContext<OSContextValue>({
  os: null,
  profile: null,
  setOverrideOS: () => {},
});

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [os, setOs] = useState<OS | null>(null);

  useEffect(() => {
    // Client-only: navigator is unavailable during SSR.
    const override = readOverride();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration gate
    setOs(override ?? detectOS());
  }, []);

  const setOverrideOS = useCallback((next: OS | null) => {
    if (next === null) {
      localStorage.removeItem(DEV_OS_OVERRIDE_KEY);
      setOs(detectOS());
      return;
    }

    localStorage.setItem(DEV_OS_OVERRIDE_KEY, next);
    setOs(next);
  }, []);

  return (
    <OSContext.Provider
      value={{ os, profile: os ? osProfiles[os] : null, setOverrideOS }}
    >
      {children}
    </OSContext.Provider>
  );
}

export const useOS = () => useContext(OSContext);
