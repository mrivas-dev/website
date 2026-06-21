import en from '@/lib/i18n/en';
import type { Translations } from '@/lib/i18n/types';

const _typeCheck: Translations = en;

describe('en dictionary completeness', () => {
  it('has all top-level sections', () => {
    expect(en.ui).toBeDefined();
    expect(en.commands).toBeDefined();
    expect(en.eastereggs).toBeDefined();
    expect(en.errors).toBeDefined();
  });

  it('fortune has ≥5 items', () => {
    expect(en.eastereggs.fortune.length).toBeGreaterThanOrEqual(5);
  });

  it('joke has ≥5 items', () => {
    expect(en.eastereggs.joke.length).toBeGreaterThanOrEqual(5);
  });

  it('no string values are empty', () => {
    function checkNoEmpty(obj: unknown, path = ''): void {
      if (typeof obj === 'string') {
        expect(obj.trim().length).toBeGreaterThan(0);
      } else if (Array.isArray(obj)) {
        obj.forEach((item, i) => checkNoEmpty(item, `${path}[${i}]`));
      } else if (obj && typeof obj === 'object') {
        Object.entries(obj).forEach(([k, v]) => checkNoEmpty(v, `${path}.${k}`));
      }
    }
    checkNoEmpty(en);
  });
});
