import { isDevelopment, isLocalDevHostname } from '@/lib/is-dev';

describe('isLocalDevHostname', () => {
  it('returns true for localhost', () => {
    expect(isLocalDevHostname('localhost')).toBe(true);
  });

  it('returns true for 127.0.0.1', () => {
    expect(isLocalDevHostname('127.0.0.1')).toBe(true);
  });

  it('returns false for production hostnames', () => {
    expect(isLocalDevHostname('example.com')).toBe(false);
  });
});

describe('isDevelopment', () => {
  it('returns true when running on a local dev hostname', () => {
    expect(typeof window).toBe('object');
    expect(isDevelopment()).toBe(isLocalDevHostname(window.location.hostname));
  });
});
