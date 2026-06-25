import React, { type ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { CommandContext } from '@/lib/command-registry';
import type { Locale } from '@/lib/i18n';

export function makeCtx(overrides: Partial<CommandContext> = {}): CommandContext {
  return {
    os: 'macos',
    cwd: '~',
    setCwd: jest.fn(),
    history: [],
    clearHistory: jest.fn(),
    locale: 'en',
    setLocale: jest.fn(),
    t: (key: string) => key,
    ...overrides,
  };
}

export function makeRealT(locale: Locale = 'en') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createT } = require('@/lib/i18n');
  return createT(locale) as (key: string) => string;
}

export function renderJsxText(content: ReactNode): string {
  const { container } = render(React.createElement(React.Fragment, null, content));
  return container.textContent ?? '';
}
