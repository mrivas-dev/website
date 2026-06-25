import type { OS } from '@/lib/os-detect';

export const TYPING_INTERVAL_MS = 40;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function formatMacBootDate(date: Date): string {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dom = date.getDate();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${day} ${month} ${dom} ${hours}:${minutes}:${seconds}`;
}

function formatLinuxSystemDate(date: Date): string {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dom = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month} ${dom} ${year}`;
}

export function getBootLine(os: OS, now = new Date()): string {
  switch (os) {
    case 'macos':
      return `Last login: ${formatMacBootDate(now)} on ttys001`;
    case 'linux':
      return [
        'Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.8.0-51-generic x86_64)',
        '',
        ' * Documentation:  https://help.ubuntu.com',
        ' * Management:     https://landscape.canonical.com',
        ' * Support:        https://ubuntu.com/pro',
        '',
        `System information as of ${formatLinuxSystemDate(now)}`,
        '',
        '0 packages can be updated.',
      ].join('\n');
    case 'windows':
      return [
        'Microsoft Windows [Version 10.0.26100]',
        '(c) Microsoft Corporation. All rights reserved.',
      ].join('\n');
  }
}

export function getWelcomeText(bootMessage: string, welcomeHint: string): string {
  return `${bootMessage}\n${welcomeHint}`;
}

export function getTypingSlice(text: string, charIndex: number): string {
  return text.slice(0, charIndex);
}

export function isTypingComplete(text: string, charIndex: number): boolean {
  return charIndex >= text.length;
}

export function getCommandNotFoundMessage(os: OS, command: string): string {
  switch (os) {
    case 'macos':
      return `zsh: command not found: ${command}`;
    case 'linux':
      return `${command}: command not found`;
    case 'windows':
      return `'${command}' is not recognized as an internal or external command.`;
  }
}
