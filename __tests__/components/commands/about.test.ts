import '@/components/commands/about';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';

describe('about command', () => {
  const cmd = getCommand('about');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('content contains name and role', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content).toContain('Matias Rivas');
      expect(result.content).toContain('Engineering Manager');
    }
  });

  it('content contains years of experience', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content).toMatch(/\d+/);
    }
  });

  it('content differs between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'text' && es.type === 'text') {
      expect(en.content).not.toBe(es.content);
    }
  });

  it('hints at resume and experience commands', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content.toLowerCase()).toContain('resume');
      expect(result.content.toLowerCase()).toContain('experience');
    }
  });
});
