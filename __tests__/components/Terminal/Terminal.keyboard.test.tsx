import { render, act } from '@testing-library/react';

jest.mock('@/lib/analytics', () => ({
  trackEvent: jest.fn(),
}));

jest.mock('@/lib/contexts/OSContext', () => ({
  useOS: () => ({
    os: 'macos' as const,
    profile: {
      os: 'macos' as const,
      prompt: (cwd: string) => `mrivas@macbook ${cwd} %`,
      commandAliases: {},
      windowChrome: 'macos' as const,
    },
    setOverrideOS: jest.fn(),
  }),
}));

jest.mock('@/lib/contexts/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: jest.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'ui.bootMessage': 'Booting...',
        'ui.welcomeHint': 'Type help to get started.',
        'ui.tapToType': 'Tap to type',
      };
      return map[key] ?? key;
    },
  }),
}));

import { Terminal } from '@/components/Terminal/Terminal';

function mockVisualViewport(height: number) {
  const listeners = new Map<string, Set<EventListener>>();
  const visualViewport = {
    height,
    width: 390,
    offsetTop: 0,
    offsetLeft: 0,
    pageTop: 0,
    pageLeft: 0,
    scale: 1,
    addEventListener: jest.fn((type: string, listener: EventListener) => {
      const set = listeners.get(type) ?? new Set();
      set.add(listener);
      listeners.set(type, set);
    }),
    removeEventListener: jest.fn((type: string, listener: EventListener) => {
      listeners.get(type)?.delete(listener);
    }),
    dispatch(type: string) {
      listeners.get(type)?.forEach((listener) => listener(new Event(type)));
    },
  };

  Object.defineProperty(window, 'visualViewport', {
    value: visualViewport,
    configurable: true,
    writable: true,
  });

  return visualViewport;
}

describe('Terminal virtual keyboard handling', () => {
  beforeEach(() => {
    document.documentElement.style.removeProperty('--app-height');
    Object.defineProperty(window, 'visualViewport', {
      value: null,
      configurable: true,
      writable: true,
    });
  });

  it('sets --app-height from visualViewport height on mount', async () => {
    mockVisualViewport(800);

    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(document.documentElement.style.getPropertyValue('--app-height')).toBe(
      '800px',
    );
  });

  it('updates --app-height when visualViewport resizes', async () => {
    const visualViewport = mockVisualViewport(800);

    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    visualViewport.height = 420;

    act(() => {
      visualViewport.dispatch('resize');
    });

    expect(document.documentElement.style.getPropertyValue('--app-height')).toBe(
      '420px',
    );
  });

  it('removes the visualViewport resize listener on unmount', async () => {
    const visualViewport = mockVisualViewport(800);

    const { unmount } = render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    unmount();

    expect(visualViewport.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('renders without crashing when visualViewport is unavailable', () => {
    expect(() => render(<Terminal />)).not.toThrow();
  });
});
