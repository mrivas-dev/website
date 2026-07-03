import type { OS } from '@/lib/os-detect';

const sessionId = crypto.randomUUID();

const OS_MAP: Record<OS, string> = {
  macos: 'macOS',
  linux: 'Linux',
  windows: 'Windows',
};

function getDeviceType(): 'desktop' | 'mobile' {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? 'mobile'
    : 'desktop';
}

const referrer = typeof document !== 'undefined' ? document.referrer || undefined : undefined;

export function trackEvent(
  os: OS,
  type: 'session_start' | 'command' | 'page_view' | 'session_end',
  payload?: Record<string, unknown>,
): void {
  if (!process.env.NEXT_PUBLIC_ANALYTICS_URL) return;

  const body = {
    session_id: sessionId,
    type,
    os: OS_MAP[os],
    device_type: getDeviceType(),
    referrer,
    payload,
  };

  if (type === 'session_end') {
    navigator.sendBeacon(
      process.env.NEXT_PUBLIC_ANALYTICS_URL,
      new Blob([JSON.stringify(body)], { type: 'application/json' }),
    );
    return;
  }

  fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {});
}
