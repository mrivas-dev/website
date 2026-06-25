import { designTokens } from '@/lib/design-tokens';

export interface TerminalTheme {
  background: string;
  foreground: string;
  accent: string;
  dimmed: string;
  error: string;
  success: string;
  selection: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  borderRadius: string;
  windowTitle: string;
  wallpaper: string;
  link: string;
  caret: string;
  divider: string;
  titleBarBackground: string;
  contentBackground: string | null;
  windowShadow: string;
}

const t = designTokens.macos;

export const macosTheme: TerminalTheme = {
  background: t.terminal.background,
  foreground: t.terminal.foreground,
  accent: t.terminal.prompt,
  dimmed: t.terminal.dimmed,
  error: t.terminal.error,
  success: '#50fa7b',
  selection: t.terminal.selection,
  fontFamily: t.terminal.fontFamily,
  fontSize: t.terminal.fontSize,
  lineHeight: t.terminal.lineHeight,
  borderRadius: t.window.borderRadius,
  windowTitle: 'Terminal',
  wallpaper: '/images/wallpapers/macos.png',
  link: t.terminal.link,
  caret: t.terminal.caret,
  divider: t.terminal.divider,
  titleBarBackground: t.chrome.titleBarBackground,
  contentBackground: t.window.contentBackground,
  windowShadow: t.window.shadow,
};
