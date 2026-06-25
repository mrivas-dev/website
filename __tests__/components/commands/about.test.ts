import '@/components/commands/about';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT, renderJsxText } from '../../helpers';

describe('about command', () => {
  const cmd = getCommand('about');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('content contains name and role', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text).toContain('Matias Rivas');
      expect(text).toContain('Engineering Manager');
    }
  });

  it('content contains years of experience', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toMatch(/\d+/);
    }
  });

  it('content differs between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'jsx' && es.type === 'jsx') {
      expect(renderJsxText(en.content)).not.toBe(renderJsxText(es.content));
    }
  });

  it('hints at resume and experience commands', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content).toLowerCase();
      expect(text).toContain('resume');
      expect(text).toContain('experience');
    }
  });
});
