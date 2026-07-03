import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { trackEvent } from '@/lib/analytics';

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

const mockTrackEvent = trackEvent as jest.MockedFunction<typeof trackEvent>;

beforeEach(() => {
  mockTrackEvent.mockClear();
});

describe('Terminal analytics integration', () => {
  it('fires session_start once after boot', async () => {
    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'macos',
      'session_start',
      expect.objectContaining({ timezone: expect.any(String) }),
    );

    const sessionStartCalls = mockTrackEvent.mock.calls.filter(
      (call) => call[1] === 'session_start',
    );
    expect(sessionStartCalls).toHaveLength(1);
  });

  it('fires command event when a valid command is executed', async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    mockTrackEvent.mockClear();

    const input = screen.getByLabelText('Terminal input');
    await user.click(input);
    await user.type(input, 'help{Enter}');

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'macos',
      'command',
      expect.objectContaining({ command: 'help' }),
    );
  });

  it('fires command event with __unknown__ for invalid commands', async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    mockTrackEvent.mockClear();

    const input = screen.getByLabelText('Terminal input');
    await user.click(input);
    await user.type(input, 'notacommand{Enter}');

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'macos',
      'command',
      expect.objectContaining({ command: '__unknown__', args: 'notacommand' }),
    );
  });

  it('fires page_view event for content commands', async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    mockTrackEvent.mockClear();

    const input = screen.getByLabelText('Terminal input');
    await user.click(input);
    await user.type(input, 'resume{Enter}');

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'macos',
      'page_view',
      { view: 'resume' },
    );
  });

  it('fires session_end on visibilitychange to hidden', async () => {
    render(<Terminal />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    mockTrackEvent.mockClear();

    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden',
      writable: true,
      configurable: true,
    });

    act(() => {
      window.dispatchEvent(new Event('visibilitychange'));
    });

    expect(mockTrackEvent).toHaveBeenCalledWith(
      'macos',
      'session_end',
      expect.objectContaining({ duration_seconds: expect.any(Number) }),
    );
  });
});
