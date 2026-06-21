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
}

export const macosTheme: TerminalTheme = {
  background: '#1e1e1e',
  foreground: '#f8f8f2',
  accent: '#23d18b',
  dimmed: '#6c6c6c',
  error: '#ff5555',
  success: '#50fa7b',
  selection: 'rgba(255, 255, 255, 0.15)',
  fontFamily: "'SF Mono', Menlo, monospace",
  fontSize: '14px',
  lineHeight: '1.5',
  borderRadius: '10px',
  windowTitle: 'Terminal',
  wallpaper: '/images/wallpapers/macos.png',
};
