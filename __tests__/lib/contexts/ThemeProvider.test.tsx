import { render } from '@testing-library/react';
import { ThemeProvider } from '@/lib/contexts/ThemeProvider';
import { themes } from '@/components/themes';

const mockUseOS = jest.fn();

jest.mock('@/lib/contexts/OSContext', () => ({
  useOS: () => mockUseOS(),
}));

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
    mockUseOS.mockReset();
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
});
