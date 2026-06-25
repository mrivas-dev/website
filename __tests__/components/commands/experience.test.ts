import '@/components/commands/experience';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT, renderJsxText } from '../../helpers';

describe('experience command', () => {
  const cmd = getCommand('experience');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('default output contains role entries', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text.length).toBeGreaterThan(0);
      expect(text).toMatch(/\d{4}/);
    }
  });

  it('default output contains full hint', () => {
    const t = makeRealT('en');
    const result = cmd!.execute([], makeCtx({ locale: 'en', t }));
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toContain(t('commands.experience.fullHint'));
    }
  });

  it('--full returns longer content than default', () => {
    const ctx = makeCtx({ locale: 'en', t: makeRealT('en') });
    const defaultResult = cmd!.execute([], ctx);
    const fullResult = cmd!.execute(['--full'], ctx);
    if (defaultResult.type === 'jsx' && fullResult.type === 'jsx') {
      const defaultText = renderJsxText(defaultResult.content);
      const fullText = renderJsxText(fullResult.content);
      expect(fullText.length).toBeGreaterThan(defaultText.length);
      expect(fullText).toContain('•');
    }
  });

  it('default output shows at most 3 role lines', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const lines = renderJsxText(result.content)
        .split('\n')
        .filter((line) => line.trim().length > 0 && /\d{4}/.test(line) && !line.includes('--full'));
      expect(lines.length).toBeLessThanOrEqual(3);
    }
  });

  it('content differs between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'jsx' && es.type === 'jsx') {
      expect(renderJsxText(en.content)).not.toBe(renderJsxText(es.content));
    }
  });
});
