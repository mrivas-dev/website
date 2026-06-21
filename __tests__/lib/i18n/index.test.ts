Object.defineProperty(navigator, 'languages', {
  get: () => ['en-US'],
  configurable: true,
});

Object.defineProperty(navigator, 'language', {
  get: () => 'en-US',
  configurable: true,
});

import { createT, detectLocale } from '@/lib/i18n';

describe('createT — key resolution', () => {
  const t = createT('en');

  it('resolves a known nested key', () => {
    expect(t('ui.commandNotFound')).not.toBe('ui.commandNotFound');
  });

  it('returns the key for unknown paths', () => {
    expect(t('totally.unknown.xyz')).toBe('totally.unknown.xyz');
  });

  it('falls back to en for missing es key', () => {
    const tEs = createT('es');
    expect(tEs('errors.noSuchFile')).not.toBe('errors.noSuchFile');
  });
});

describe('createT — locale differentiation', () => {
  it('en and es prose keys differ', () => {
    expect(createT('en')('commands.about.hint')).not.toBe(
      createT('es')('commands.about.hint'),
    );
  });
});

describe('detectLocale', () => {
  it('returns a supported locale', () => {
    expect(['en', 'es']).toContain(detectLocale());
  });

  it('returns en when no match found', () => {
    const spy = jest.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR', 'de']);
    expect(detectLocale()).toBe('en');
    spy.mockRestore();
  });

  it('detects es from navigator', () => {
    const spy = jest.spyOn(navigator, 'languages', 'get').mockReturnValue(['es-MX', 'en']);
    expect(detectLocale()).toBe('es');
    spy.mockRestore();
  });
});
