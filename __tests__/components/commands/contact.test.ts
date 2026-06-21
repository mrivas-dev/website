import '@/components/commands/contact';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';
import { render } from '@testing-library/react';

describe('contact command', () => {
  const cmd = getCommand('contact');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('jsx contains email link', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const { container } = render(result.content);
      const emailLink = container.querySelector('a[href="mailto:hello@matias.dev"]');
      expect(emailLink).toBeTruthy();
      expect(container.textContent).toContain('hello@matias.dev');
    }
  });

  it('jsx contains linkedin link', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const { container } = render(result.content);
      const link = container.querySelector('a[href="https://linkedin.com/in/matiasrivas"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('target')).toBe('_blank');
    }
  });

  it('jsx contains github link', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const { container } = render(result.content);
      const link = container.querySelector('a[href="https://github.com/matiasemrivas"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('target')).toBe('_blank');
    }
  });
});
