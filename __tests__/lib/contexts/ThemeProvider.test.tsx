import { render } from '@testing-library/react';
import { ThemeProvider } from '@/lib/contexts/ThemeProvider';
import { themes } from '@/components/themes';

const mockUseOS = jest.fn();

jest.mock('@/lib/contexts/OSContext', () => ({
  useOS: () => mockUseOS(),
}));

function createMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQueryList = {
    matches: initialMatches,
    media: '(max-width: 768px)',
    addEventListener: jest.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      if (event === 'change') listeners.add(listener);
    }),
    removeEventListener: jest.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      if (event === 'change') listeners.delete(listener);
    }),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatch(matches: boolean) {
      mediaQueryList.matches = matches;
      listeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent),
      );
    },
  };
  return mediaQueryList;
}

describe('ThemeProvider', () => {
  let matchMediaMock: ReturnType<typeof createMatchMedia>;

  beforeEach(() => {
    document.documentElement.style.cssText = '';
    mockUseOS.mockReset();
    matchMediaMock = createMatchMedia(false);
    window.matchMedia = jest.fn().mockReturnValue(matchMediaMock);
  });

  it('sets page wallpaper CSS variable from the active OS theme', () => {
    mockUseOS.mockReturnValue({ os: 'linux' });

    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.style.getPropertyValue('--page-wallpaper')).toBe(
      `url("${themes.linux.wallpaper}")`,
    );
  });

  it('updates wallpaper when OS changes', () => {
    mockUseOS.mockReturnValue({ os: 'macos' });

    const { rerender } = render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.style.getPropertyValue('--page-wallpaper')).toBe(
      `url("${themes.macos.wallpaper}")`,
    );

    mockUseOS.mockReturnValue({ os: 'windows' });
    rerender(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.style.getPropertyValue('--page-wallpaper')).toBe(
      `url("${themes.windows.wallpaper}")`,
    );
  });

  it('does not set wallpaper when OS is null', () => {
    mockUseOS.mockReturnValue({ os: null });

    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(document.documentElement.style.getPropertyValue('--page-wallpaper')).toBe('');
  });

  it('applies desktop font size when viewport is wider than 768px', () => {
    mockUseOS.mockReturnValue({ os: 'macos' });

    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--terminal-font-size'),
    ).toBe('14px');
  });

  it('updates terminal font size when the viewport crosses the mobile breakpoint', () => {
    mockUseOS.mockReturnValue({ os: 'macos' });

    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.style.getPropertyValue('--terminal-font-size'),
    ).toBe('14px');

    matchMediaMock.dispatch(true);

    expect(
      document.documentElement.style.getPropertyValue('--terminal-font-size'),
    ).toBe('16px');
  });

  it('subscribes to matchMedia change on mount and unsubscribes on unmount', () => {
    mockUseOS.mockReturnValue({ os: 'macos' });

    const { unmount } = render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    unmount();

    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
