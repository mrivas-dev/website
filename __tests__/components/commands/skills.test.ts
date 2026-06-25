import '@/components/commands/skills';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT, renderJsxText } from '../../helpers';

describe('skills command', () => {
  const cmd = getCommand('skills');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('content contains skill names', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text).toContain('JavaScript');
      expect(text).toContain('React');
    }
  });

  it('content contains category separators', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toContain('─');
    }
  });

  it('category names differ between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'jsx' && es.type === 'jsx') {
      expect(renderJsxText(en.content)).toContain('Languages');
      expect(renderJsxText(es.content)).toContain('Lenguajes');
    }
  });
});
