'use client';

import { useEffect } from 'react';
import { useOS } from '@/lib/contexts/OSContext';
import { themes } from '@/components/themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { os } = useOS();

  useEffect(() => {
    if (!os) return;

    const theme = themes[os];
    const root = document.documentElement;

    root.style.setProperty('--terminal-bg', theme.background);
    root.style.setProperty('--terminal-fg', theme.foreground);
    root.style.setProperty('--terminal-accent', theme.accent);
    root.style.setProperty('--terminal-dimmed', theme.dimmed);
    root.style.setProperty('--terminal-error', theme.error);
    root.style.setProperty('--terminal-success', theme.success);
    root.style.setProperty('--terminal-selection', theme.selection);
    root.style.setProperty('--terminal-font-family', theme.fontFamily);
    root.style.setProperty('--terminal-font-size', theme.fontSize);
    root.style.setProperty('--terminal-line-height', theme.lineHeight);
    root.style.setProperty('--terminal-border-radius', theme.borderRadius);
    root.style.setProperty('--page-wallpaper', `url("${theme.wallpaper}")`);
  }, [os]);

  return <>{children}</>;
}
