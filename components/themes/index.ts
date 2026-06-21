export type { TerminalTheme } from './macos';
export { macosTheme } from './macos';
export { linuxTheme } from './linux';
export { windowsTheme } from './windows';

import type { OS } from '@/lib/os-detect';
import { macosTheme } from './macos';
import { linuxTheme } from './linux';
import { windowsTheme } from './windows';
import type { TerminalTheme } from './macos';

export const themes: Record<OS, TerminalTheme> = {
  macos: macosTheme,
  linux: linuxTheme,
  windows: windowsTheme,
};
