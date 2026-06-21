import '@/components/commands/resume';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';
import { render } from '@testing-library/react';

describe('resume command', () => {
  const cmd = getCommand('resume');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('jsx content includes download link to resume.pdf', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const { container } = render(result.content);
      const link = container.querySelector('a[href="/resume.pdf"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('target')).toBe('_blank');
    }
  });

  it('jsx content includes summary text', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const { container } = render(result.content);
      expect(container.textContent?.length).toBeGreaterThan(0);
    }
  });

  it('content differs between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'jsx' && es.type === 'jsx') {
      const { container: enC } = render(en.content);
      const { container: esC } = render(es.content);
      expect(enC.textContent).not.toBe(esC.textContent);
    }
  });
});
