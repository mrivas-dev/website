'use client';

import { useOS } from '@/lib/contexts/OSContext';

export function ShellGate({ children }: { children: React.ReactNode }) {
  const { os } = useOS();

  if (os === null) {
    return (
      <div className="shell-loading">
        <span className="shell-loading-cursor" aria-hidden="true">
          _
        </span>
      </div>
    );
  }

  return children;
}
