const mockFetch = jest.fn((_url: string, _opts?: RequestInit) =>
  Promise.resolve({ ok: true }),
);
const mockSendBeacon = jest.fn(() => true);

Object.defineProperty(global, 'fetch', { value: mockFetch, writable: true });
Object.defineProperty(navigator, 'sendBeacon', {
  value: mockSendBeacon,
  writable: true,
});
Object.defineProperty(global, 'crypto', {
  value: { randomUUID: () => '550e8400-e29b-41d4-a716-446655440000' },
  writable: true,
});

const ANALYTICS_URL = 'https://api.example.com/api/v1/events';

beforeEach(() => {
  mockFetch.mockClear();
  mockSendBeacon.mockClear();
  jest.resetModules();
});

describe('trackEvent', () => {
  it('is a no-op when NEXT_PUBLIC_ANALYTICS_URL is not set', async () => {
    delete process.env.NEXT_PUBLIC_ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'help' });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockSendBeacon).not.toHaveBeenCalled();
  });

  it('maps OS correctly (macos → macOS)', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'help' });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.os).toBe('macOS');
  });

  it('maps OS correctly (linux → Linux)', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('linux', 'session_start', { timezone: 'UTC' });

    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.os).toBe('Linux');
  });

  it('maps OS correctly (windows → Windows)', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('windows', 'page_view', { view: 'resume' });

    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.os).toBe('Windows');
  });

  it('uses fetch for non-session_end events', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'help' });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(ANALYTICS_URL, expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));
    expect(mockSendBeacon).not.toHaveBeenCalled();
  });

  it('uses sendBeacon for session_end events', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'session_end', { duration_seconds: 120 });

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(ANALYTICS_URL, expect.any(Blob));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('includes session_id, type, device_type, and payload in the body', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'projects', args: '--full' });

    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.session_id).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(body.type).toBe('command');
    expect(body.device_type).toMatch(/^(desktop|mobile)$/);
    expect(body.payload).toEqual({ command: 'projects', args: '--full' });
  });

  it('does not throw when fetch rejects', async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
    const { trackEvent } = await import('@/lib/analytics');

    expect(() => {
      trackEvent('macos', 'command', { command: 'help' });
    }).not.toThrow();
  });
});

describe('getDeviceType', () => {
  it('returns mobile for mobile user agents', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
      configurable: true,
    });
    jest.resetModules();
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'help' });

    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.device_type).toBe('mobile');
  });

  it('returns desktop for desktop user agents', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      configurable: true,
    });
    jest.resetModules();
    process.env.NEXT_PUBLIC_ANALYTICS_URL = ANALYTICS_URL;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('macos', 'command', { command: 'help' });

    const body = JSON.parse((mockFetch.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.device_type).toBe('desktop');
  });
});
