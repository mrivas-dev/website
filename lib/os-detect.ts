export type OS = 'macos' | 'linux' | 'windows';

export function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Mac/.test(ua)) return 'macos';
  if (/Win/.test(ua)) return 'windows';
  return 'linux';
}

export interface OSProfile {
  os: OS;
  prompt: (cwd: string) => string;
  commandAliases: Record<string, string>;
  windowChrome: 'macos' | 'linux' | 'windows';
}

export const osProfiles: Record<OS, OSProfile> = {
  macos: {
    os: 'macos',
    prompt: (cwd) => `mrivas@macbook ${cwd} %`,
    commandAliases: {},
    windowChrome: 'macos',
  },
  linux: {
    os: 'linux',
    prompt: (cwd) => `mrivas@ubuntu:${cwd}$`,
    commandAliases: {},
    windowChrome: 'linux',
  },
  windows: {
    os: 'windows',
    prompt: () => 'PS C:\\Users\\mrivas>',
    commandAliases: { cls: 'clear', dir: 'ls', type: 'cat' },
    windowChrome: 'windows',
  },
};
