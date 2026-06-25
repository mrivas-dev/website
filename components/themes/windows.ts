import { designTokens } from '@/lib/design-tokens';
import type { TerminalTheme } from './macos';

const t = designTokens.windows;

export const windowsTheme: TerminalTheme = {
  background: t.terminal.background,
  foreground: t.terminal.foreground,
  accent: t.terminal.prompt,
  dimmed: t.terminal.dimmed,
  error: t.terminal.error,
  success: '#16c60c',
  selection: t.terminal.selection,
  fontFamily: t.terminal.fontFamily,
  fontSize: t.terminal.fontSize,
  lineHeight: t.terminal.lineHeight,
  borderRadius: t.window.borderRadius,
  windowTitle: 'Windows PowerShell',
  wallpaper: '/images/wallpapers/windows.jpg',
  link: t.terminal.link,
  caret: t.terminal.caret,
  divider: t.terminal.divider,
  titleBarBackground: t.chrome.titleBarBackground,
  contentBackground: t.window.contentBackground,
  windowShadow: t.window.shadow,
};
