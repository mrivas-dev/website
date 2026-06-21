export function isLocalDevHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function isDevelopment(): boolean {
  return typeof window !== 'undefined' && isLocalDevHostname(window.location.hostname);
}
