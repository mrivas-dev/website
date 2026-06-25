'use client';

import { useEffect } from 'react';
import { useOS } from '@/lib/contexts/OSContext';
import { themes } from '@/components/themes';
import { applyTerminalCssVars, designTokens } from '@/lib/design-tokens';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { os } = useOS();

  useEffect(() => {
    if (!os) return;

    const theme = themes[os];
    const tokens = designTokens[os];
    const root = document.documentElement;
    const isMobile =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 768px)').matches
        : false;

    applyTerminalCssVars(root, os, { mobile: isMobile });

    root.style.setProperty('--terminal-fg', theme.foreground);
    root.style.setProperty('--terminal-dimmed', theme.dimmed);
    root.style.setProperty('--terminal-error', theme.error);
    root.style.setProperty('--terminal-success', theme.success);
    root.style.setProperty('--terminal-border-radius', theme.borderRadius);
    root.style.setProperty('--page-wallpaper', `url("${theme.wallpaper}")`);

    const ac = tokens.autocomplete;
    root.style.setProperty('--autocomplete-bg', ac.background);
    root.style.setProperty('--autocomplete-border-top', ac.borderTop);
    root.style.setProperty('--autocomplete-active-bg', ac.activeBackground);
    root.style.setProperty('--autocomplete-active-command', ac.activeCommand);
    root.style.setProperty('--autocomplete-active-desc', ac.activeDescription);
    root.style.setProperty('--autocomplete-inactive-command', ac.inactiveCommand);
    root.style.setProperty('--autocomplete-inactive-desc', ac.inactiveDescription);

    const out = tokens.output;
    root.style.setProperty('--output-heading', out.heading);
    root.style.setProperty('--output-meta', out.meta);
    root.style.setProperty('--output-link', out.link);
    root.style.setProperty('--output-divider', out.divider);

    const mobile = tokens.mobile;
    root.style.setProperty('--tap-hint-bg', mobile.hint.background);
    root.style.setProperty('--tap-hint-border', mobile.hint.border);
    root.style.setProperty('--tap-hint-color', mobile.hint.color);
  }, [os]);

  return <>{children}</>;
}
