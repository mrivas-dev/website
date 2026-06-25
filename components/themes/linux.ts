import { designTokens } from '@/lib/design-tokens';
import type { TerminalTheme } from './macos';

const t = designTokens.linux;

export const linuxTheme: TerminalTheme = {
  background: t.terminal.background,
  foreground: t.terminal.foreground,
  accent: t.terminal.prompt,
  dimmed: t.terminal.dimmed,
  error: t.terminal.error,
  success: t.terminal.prompt,
  selection: t.terminal.selection,
  fontFamily: t.terminal.fontFamily,
  fontSize: t.terminal.fontSize,
  lineHeight: t.terminal.lineHeight,
  borderRadius: t.window.borderRadius,
  windowTitle: 'Terminal',
  wallpaper: '/images/wallpapers/linux.jpg',
  link: t.terminal.link,
  caret: t.terminal.caret,
  divider: t.terminal.divider,
  titleBarBackground: t.chrome.titleBarBackground,
  contentBackground: t.window.contentBackground,
  windowShadow: t.window.shadow,
};
