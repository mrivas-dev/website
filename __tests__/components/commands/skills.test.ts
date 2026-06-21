import '@/components/commands/skills';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';

describe('skills command', () => {
  const cmd = getCommand('skills');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('content contains skill names', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content).toContain('JavaScript');
      expect(result.content).toContain('React');
    }
  });

  it('content contains category separators', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content).toContain('─');
    }
  });

  it('category names differ between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'text' && es.type === 'text') {
      expect(en.content).toContain('Languages');
      expect(es.content).toContain('Lenguajes');
    }
  });
});
