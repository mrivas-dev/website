import type { OS } from '@/lib/os-detect';

export const TYPING_INTERVAL_MS = 40;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

export function getBootLine(os: OS, now = new Date()): string {
  switch (os) {
    case 'macos':
      return `Last login: ${formatMacBootDate(now)} on ttys001`;
    case 'linux':
      return 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0 x86_64)';
    case 'windows':
      return 'Microsoft Windows [Version 11.0.22631.3737]\n(c) Microsoft Corporation. All rights reserved.';
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
