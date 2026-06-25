/**
 * Centralized design tokens extracted from Designs/*.html mockups.
 * Source specs: .cursor/specs/ui-*.md
 *
 * Use these tokens in components instead of hardcoded hex values.
 * TerminalTheme (components/themes/*.ts) should stay in sync with .terminal.*
 */

import type { OS } from './os-detect';

export interface ChromeTokens {
  titleBarBackground: string;
  titleBarHeight: string;
  titleBarHeightMobile: string;
  borderRadius: string;
  borderRadiusMobile: string;
  borderBottom: string | null;
  titleColor: string;
  trafficLights: {
    red: string;
    yellow: string;
    green: string;
    size: string;
    gap: string;
    paddingLeft: string;
    insetShadow: string;
  } | null;
  linuxControls: {
    minimizeBorder: string;
    closeBackground: string;
    width: string;
    height: string;
    gap: string;
    borderRadius: string;
  } | null;
  windowsClose: {
    background: string;
    width: string;
    height: string;
    widthMobile: string;
    heightMobile: string;
    borderRadius: string;
  } | null;
}

export interface WindowTokens {
  background: string;
  contentBackground: string | null;
  borderRadius: string;
  borderRadiusMobile: string;
  shadow: string;
  innerHighlight: string;
}

export interface TerminalTokens {
  background: string;
  foreground: string;
  prompt: string;
  link: string;
  dimmed: string;
  dimmedStrong: string;
  error: string;
  divider: string;
  selection: string;
  caret: string;
  fontFamily: string;
  fontSize: string;
  fontSizeMobile: string;
  lineHeight: string;
  inputBorderTop: string;
}

export interface PromptTokens {
  macos: string;
  linux: string;
  windows: string;
}

export interface OutputTokens {
  heading: string;
  headingOpacity: number;
  body: string;
  bodyOpacity: number;
  meta: string;
  metaOpacity: number;
  link: string;
  divider: string;
  dividerMargin: string;
  highlightBackground: string;
  highlightBackgroundStrong: string;
}

export interface AutocompleteTokens {
  background: string;
  borderTop: string;
  rowHeight: string;
  rowPadding: string;
  activeBackground: string;
  activeBullet: string;
  activeBulletOpacity: number;
  activeCommand: string;
  activeDescription: string;
  activeDescriptionOpacity: number;
  inactiveCommand: string;
  inactiveCommandOpacity: number;
  inactiveDescription: string;
}

export interface BootTokens {
  loginLine: string;
  bannerPrimary: string;
  bannerSecondary: string;
  bannerTertiary: string;
  boxBorder: string;
  boxName: string;
  boxRole: string;
  boxRoleOpacity: number;
  tagline: string;
  hint: string;
  powershellHeader: string;
  lineHeight: string;
  promptDelayMs: number;
  charIntervalMs: number;
  postTypeDelayMs: number;
}

export interface MobileHintTokens {
  fontSize: string;
  letterSpacing: string;
  padding: string;
  borderRadius: string;
  bottom: string;
  animationDuration: string;
  background: string;
  border: string;
  color: string;
}

export interface MobileTokens {
  outputPadding: string;
  inputPadding: string;
  cardBorderRadius: string;
  cardShadow: string;
  scrollbarWidth: string;
  scrollbarThumb: string;
  hint: MobileHintTokens;
}

export interface OSTokens {
  chrome: ChromeTokens;
  window: WindowTokens;
  terminal: TerminalTokens;
  output: OutputTokens;
  autocomplete: AutocompleteTokens;
  boot: BootTokens;
  mobile: MobileTokens;
}

export type DesignTokens = Record<OS, OSTokens>;

const WINDOW_SHADOW =
  '0 2px 0 rgba(255,255,255,0.03) inset, 0 28px 90px rgba(0,0,0,0.75), 0 6px 20px rgba(0,0,0,0.4)';

const MOBILE_CARD_SHADOW =
  '0 32px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)';

const SHARED_MOBILE_HINT = {
  fontSize: '11px',
  letterSpacing: '0.12em',
  padding: '6px 20px',
  borderRadius: '100px',
  bottom: '80px',
  animationDuration: '0.4s',
} as const;

export const promptFormats: PromptTokens = {
  macos: 'mrivas@macbook ~ % ',
  linux: 'mrivas@ubuntu:~$ ',
  windows: 'PS C:\\Users\\mrivas> ',
};

export const designTokens: DesignTokens = {
  macos: {
    chrome: {
      titleBarBackground: '#2d2d2d',
      titleBarHeight: '28px',
      titleBarHeightMobile: '36px',
      borderRadius: '8px',
      borderRadiusMobile: '8px',
      borderBottom: '1px solid rgba(0,0,0,0.4)',
      titleColor: 'rgba(255,255,255,0.55)',
      trafficLights: {
        red: '#ff5f57',
        yellow: '#ffbd2e',
        green: '#28c840',
        size: '12px',
        gap: '8px',
        paddingLeft: '14px',
        insetShadow: '0 0 0 0.5px rgba(0,0,0,0.3) inset',
      },
      linuxControls: null,
      windowsClose: null,
    },
    window: {
      background: '#1e1e1e',
      contentBackground: null,
      borderRadius: '8px',
      borderRadiusMobile: '14px',
      shadow: WINDOW_SHADOW,
      innerHighlight: '0 2px 0 rgba(255,255,255,0.03) inset',
    },
    terminal: {
      background: '#1e1e1e',
      foreground: '#e3e3e3',
      prompt: '#23d18b',
      link: '#5b9cf6',
      dimmed: 'rgba(255,255,255,0.35)',
      dimmedStrong: 'rgba(255,255,255,0.55)',
      error: '#f05a5a',
      divider: 'rgba(255,255,255,0.055)',
      selection: 'rgba(35,209,139,0.1)',
      caret: '#23d18b',
      fontFamily: "'SF Mono', ui-monospace, 'Cascadia Mono', monospace",
      fontSize: '14px',
      fontSizeMobile: '15px',
      lineHeight: '1.7',
      inputBorderTop: '1px solid rgba(255,255,255,0.06)',
    },
    output: {
      heading: '#23d18b',
      headingOpacity: 0.7,
      body: '#e3e3e3',
      bodyOpacity: 0.3,
      meta: '#3d5565',
      metaOpacity: 0.45,
      link: '#5b9cf6',
      divider: 'rgba(255,255,255,0.055)',
      dividerMargin: '12px 0',
      highlightBackground: 'rgba(35,209,139,0.04)',
      highlightBackgroundStrong: 'rgba(35,209,139,0.06)',
    },
    autocomplete: {
      background: '#191919',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      rowHeight: '18px',
      rowPadding: '5px 12px',
      activeBackground: 'rgba(35,209,139,0.1)',
      activeBullet: '#23d18b',
      activeBulletOpacity: 0.8,
      activeCommand: '#23d18b',
      activeDescription: '#e3e3e3',
      activeDescriptionOpacity: 0.6,
      inactiveCommand: '#23d18b',
      inactiveCommandOpacity: 0.4,
      inactiveDescription: '#3d3d3d',
    },
    boot: {
      loginLine: '#383838',
      bannerPrimary: '#383838',
      bannerSecondary: 'rgba(255,255,255,0.4)',
      bannerTertiary: 'rgba(255,255,255,0.28)',
      boxBorder: '#23d18b',
      boxName: '#e3e3e3',
      boxRole: '#e3e3e3',
      boxRoleOpacity: 0.65,
      tagline: 'rgba(255,255,255,0.4)',
      hint: '#5b9cf6',
      powershellHeader: '#6a7a8a',
      lineHeight: '1.75',
      promptDelayMs: 300,
      charIntervalMs: 58,
      postTypeDelayMs: 280,
    },
    mobile: {
      outputPadding: '18px 18px 8px',
      inputPadding: '8px 18px 32px',
      cardBorderRadius: '14px',
      cardShadow: MOBILE_CARD_SHADOW,
      scrollbarWidth: '2px',
      scrollbarThumb: 'rgba(255,255,255,0.07)',
      hint: {
        ...SHARED_MOBILE_HINT,
        background: 'rgba(35,209,139,0.07)',
        border: '1px solid rgba(35,209,139,0.18)',
        color: 'rgba(35,209,139,0.55)',
      },
    },
  },

  linux: {
    chrome: {
      titleBarBackground: '#300a24',
      titleBarHeight: '28px',
      titleBarHeightMobile: '32px',
      borderRadius: '4px',
      borderRadiusMobile: '4px',
      borderBottom: null,
      titleColor: 'rgba(255,255,255,0.85)',
      trafficLights: null,
      linuxControls: {
        minimizeBorder: 'rgba(255,255,255,0.2)',
        closeBackground: 'rgba(160,20,20,0.5)',
        width: '22px',
        height: '18px',
        gap: '4px',
        borderRadius: '2px',
      },
      windowsClose: null,
    },
    window: {
      background: '#300a24',
      contentBackground: '#1a0a15',
      borderRadius: '4px',
      borderRadiusMobile: '14px',
      shadow: WINDOW_SHADOW,
      innerHighlight: '0 2px 0 rgba(255,255,255,0.03) inset',
    },
    terminal: {
      background: '#300a24',
      foreground: '#e3e3e3',
      prompt: '#4e9a06',
      link: '#5b9cf6',
      dimmed: 'rgba(255,255,255,0.28)',
      dimmedStrong: 'rgba(255,255,255,0.55)',
      error: '#cc3333',
      divider: 'rgba(255,255,255,0.055)',
      selection: 'rgba(78,154,6,0.22)',
      caret: '#4e9a06',
      fontFamily: "'Ubuntu Mono', 'Fira Code', monospace",
      fontSize: '14px',
      fontSizeMobile: '15px',
      lineHeight: '1.7',
      inputBorderTop: '1px solid rgba(255,255,255,0.06)',
    },
    output: {
      heading: '#4e9a06',
      headingOpacity: 0.75,
      body: '#e3e3e3',
      bodyOpacity: 0.26,
      meta: '#737373',
      metaOpacity: 1,
      link: '#5b9cf6',
      divider: 'rgba(255,255,255,0.055)',
      dividerMargin: '12px 0',
      highlightBackground: 'rgba(78,154,6,0.06)',
      highlightBackgroundStrong: 'rgba(78,154,6,0.07)',
    },
    autocomplete: {
      background: '#1a0a15',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      rowHeight: '18px',
      rowPadding: '5px 12px',
      activeBackground: 'rgba(78,154,6,0.22)',
      activeBullet: '#4e9a06',
      activeBulletOpacity: 0.8,
      activeCommand: '#4e9a06',
      activeDescription: '#e3e3e3',
      activeDescriptionOpacity: 0.5,
      inactiveCommand: '#4e9a06',
      inactiveCommandOpacity: 0.4,
      inactiveDescription: '#3d3d3d',
    },
    boot: {
      loginLine: 'rgba(255,255,255,0.28)',
      bannerPrimary: 'rgba(255,255,255,0.55)',
      bannerSecondary: 'rgba(255,255,255,0.28)',
      bannerTertiary: 'rgba(255,255,255,0.22)',
      boxBorder: '#4e9a06',
      boxName: '#e3e3e3',
      boxRole: '#e3e3e3',
      boxRoleOpacity: 0.65,
      tagline: 'rgba(255,255,255,0.4)',
      hint: '#5b9cf6',
      powershellHeader: '#6a7a8a',
      lineHeight: '1.75',
      promptDelayMs: 300,
      charIntervalMs: 58,
      postTypeDelayMs: 280,
    },
    mobile: {
      outputPadding: '18px 18px 8px',
      inputPadding: '8px 18px 32px',
      cardBorderRadius: '14px',
      cardShadow: MOBILE_CARD_SHADOW,
      scrollbarWidth: '2px',
      scrollbarThumb: 'rgba(255,255,255,0.07)',
      hint: {
        ...SHARED_MOBILE_HINT,
        background: 'rgba(78,154,6,0.07)',
        border: '1px solid rgba(78,154,6,0.18)',
        color: 'rgba(78,154,6,0.55)',
      },
    },
  },

  windows: {
    chrome: {
      titleBarBackground: '#012456',
      titleBarHeight: '26px',
      titleBarHeightMobile: '23px',
      borderRadius: '6px',
      borderRadiusMobile: '7px',
      borderBottom: null,
      titleColor: '#cccccc',
      trafficLights: null,
      linuxControls: null,
      windowsClose: {
        background: '#c42b1c',
        width: '32px',
        height: '26px',
        widthMobile: '20px',
        heightMobile: '23px',
        borderRadius: '0 6px 0 0',
      },
    },
    window: {
      background: '#012456',
      contentBackground: null,
      borderRadius: '6px',
      borderRadiusMobile: '7px',
      shadow: WINDOW_SHADOW,
      innerHighlight: '0 2px 0 rgba(255,255,255,0.03) inset',
    },
    terminal: {
      background: '#012456',
      foreground: '#cccccc',
      prompt: '#cccccc',
      link: '#66b8ff',
      dimmed: 'rgba(204,204,204,0.38)',
      dimmedStrong: 'rgba(204,204,204,0.45)',
      error: '#f05a5a',
      divider: 'rgba(255,255,255,0.05)',
      selection: 'rgba(58,201,224,0.1)',
      caret: '#cccccc',
      fontFamily: "Consolas, 'Cascadia Code', monospace",
      fontSize: '14px',
      fontSizeMobile: '15px',
      lineHeight: '1.7',
      inputBorderTop: '1px solid rgba(255,255,255,0.06)',
    },
    output: {
      heading: '#3ac9e0',
      headingOpacity: 0.85,
      body: '#cccccc',
      bodyOpacity: 0.35,
      meta: '#8090b4',
      metaOpacity: 0.6,
      link: '#66b8ff',
      divider: 'rgba(255,255,255,0.05)',
      dividerMargin: '12px 0',
      highlightBackground: 'rgba(58,201,224,0.04)',
      highlightBackgroundStrong: 'rgba(58,201,224,0.05)',
    },
    autocomplete: {
      background: '#010e30',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      rowHeight: '18px',
      rowPadding: '5px 12px',
      activeBackground: 'rgba(58,201,224,0.1)',
      activeBullet: '#3ac9e0',
      activeBulletOpacity: 0.8,
      activeCommand: '#3ac9e0',
      activeDescription: '#8090b4',
      activeDescriptionOpacity: 0.6,
      inactiveCommand: '#3ac9e0',
      inactiveCommandOpacity: 0.4,
      inactiveDescription: '#6070a0',
    },
    boot: {
      loginLine: '#cccccc',
      bannerPrimary: '#cccccc',
      bannerSecondary: 'rgba(204,204,204,0.32)',
      bannerTertiary: 'rgba(204,204,204,0.32)',
      boxBorder: '#66b8ff',
      boxName: '#e3e3e3',
      boxRole: '#999999',
      boxRoleOpacity: 1,
      tagline: 'rgba(204,204,204,0.45)',
      hint: '#66b8ff',
      powershellHeader: '#6a7a8a',
      lineHeight: '1.75',
      promptDelayMs: 300,
      charIntervalMs: 58,
      postTypeDelayMs: 280,
    },
    mobile: {
      outputPadding: '18px 18px 8px',
      inputPadding: '8px 18px 32px',
      cardBorderRadius: '14px',
      cardShadow: MOBILE_CARD_SHADOW,
      scrollbarWidth: '2px',
      scrollbarThumb: 'rgba(255,255,255,0.07)',
      hint: {
        ...SHARED_MOBILE_HINT,
        background: 'rgba(58,201,224,0.07)',
        border: '1px solid rgba(58,201,224,0.18)',
        color: 'rgba(58,201,224,0.55)',
      },
    },
  },
};

/** Get tokens for the active OS. Falls back to macOS if null. */
export function getDesignTokens(os: OS | null): OSTokens {
  return designTokens[os ?? 'macos'];
}

/** Resolve prompt string for an OS. */
export function getPromptFormat(os: OS): string {
  return promptFormats[os];
}

/** Apply terminal CSS custom properties to a DOM element. */
export function applyTerminalCssVars(
  element: HTMLElement,
  os: OS,
  options?: { mobile?: boolean },
): void {
  const { terminal, window: windowTokens, chrome } = designTokens[os];
  const isMobile = options?.mobile ?? false;

  element.style.setProperty('--terminal-bg', terminal.background);
  element.style.setProperty('--terminal-fg', terminal.foreground);
  element.style.setProperty('--terminal-accent', terminal.prompt);
  element.style.setProperty('--terminal-link', terminal.link);
  element.style.setProperty('--terminal-error', terminal.error);
  element.style.setProperty('--terminal-dimmed', terminal.dimmed);
  element.style.setProperty('--terminal-divider', terminal.divider);
  element.style.setProperty('--terminal-selection', terminal.selection);
  element.style.setProperty('--terminal-caret', terminal.caret);
  element.style.setProperty(
    '--terminal-font-size',
    isMobile ? terminal.fontSizeMobile : terminal.fontSize,
  );
  element.style.setProperty('--terminal-line-height', terminal.lineHeight);
  element.style.setProperty('--terminal-font-family', terminal.fontFamily);
  element.style.setProperty('--chrome-title-bar-bg', chrome.titleBarBackground);
  element.style.setProperty(
    '--chrome-title-bar-height',
    isMobile ? chrome.titleBarHeightMobile : chrome.titleBarHeight,
  );
  element.style.setProperty(
    '--window-radius',
    isMobile ? windowTokens.borderRadiusMobile : windowTokens.borderRadius,
  );
  element.style.setProperty('--window-shadow', windowTokens.shadow);
}

/** Breakpoint used across UI specs. */
export const MOBILE_BREAKPOINT_PX = 768;
