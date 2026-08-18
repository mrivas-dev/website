'use client';

import { useEffect } from 'react';
import { useOS } from '@/lib/contexts/OSContext';
import { themes } from '@/components/themes';
import {
  applyTerminalCssVars,
  designTokens,
  MOBILE_BREAKPOINT_PX,
} from '@/lib/design-tokens';

function applyThemeVars(os: NonNullable<ReturnType<typeof useOS>['os']>, mobile: boolean) {
  const theme = themes[os];
  const tokens = designTokens[os];
  const root = document.documentElement;

  applyTerminalCssVars(root, os, { mobile });

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

  const mobileTokens = tokens.mobile;
  root.style.setProperty('--tap-hint-bg', mobileTokens.hint.background);
  root.style.setProperty('--tap-hint-border', mobileTokens.hint.border);
  root.style.setProperty('--tap-hint-color', mobileTokens.hint.color);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { os } = useOS();

  useEffect(() => {
    if (!os) return;

    const media =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)
        : null;

    const apply = (mobile: boolean) => applyThemeVars(os, mobile);

    apply(media?.matches ?? false);

    if (!media) return;

    const handleChange = (event: MediaQueryListEvent) => {
      apply(event.matches);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [os]);

  return <>{children}</>;
}
