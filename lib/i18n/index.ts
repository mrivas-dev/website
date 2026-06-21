import en from './en';
import es from './es';

export type Locale = 'en' | 'es';
export type { Translations } from './types';

const dictionaries = { en, es };

export function detectLocale(): Locale {
  const supported: Locale[] = ['en', 'es'];
  const preferred =
    typeof navigator !== 'undefined'
      ? (navigator.languages ?? [navigator.language])
      : ['en'];
  for (const lang of preferred) {
    const code = lang.slice(0, 2).toLowerCase() as Locale;
    if (supported.includes(code)) return code;
  }
  return 'en';
}

export function createT(locale: Locale) {
  return function t(key: string): string {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any = dictionaries[locale];
    for (const k of keys) val = val?.[k];
    if (typeof val === 'string') return val;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val = dictionaries['en'] as any;
    for (const k of keys) val = val?.[k];
    return typeof val === 'string' ? val : key;
  };
}
