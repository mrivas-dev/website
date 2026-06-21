import { themes } from '@/components/themes';

describe('themes', () => {
  it('defines a wallpaper path for each OS', () => {
    expect(themes.macos.wallpaper).toBe('/images/wallpapers/macos.png');
    expect(themes.linux.wallpaper).toBe('/images/wallpapers/linux.jpg');
    expect(themes.windows.wallpaper).toBe('/images/wallpapers/windows.jpg');
  });
});
