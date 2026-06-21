import '@/components/commands/easter-eggs';
import { getAllCommands, getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';

describe('Easter eggs are hidden from help', () => {
  const visible = getAllCommands().map((c) => c.name);
  ['fortune', 'joke', 'coffee', 'hack', 'matrix', 'rm', 'vim', 'sudo'].forEach((name) => {
    it(`${name} not in getAllCommands`, () => expect(visible).not.toContain(name));
  });
});

describe('fortune', () => {
  it('returns text', () => expect(getCommand('fortune')!.execute([], makeCtx()).type).toBe('text'));
  it('content is non-empty', () => {
    const r = getCommand('fortune')!.execute([], makeCtx());
    if (r.type === 'text') expect(r.content.length).toBeGreaterThan(0);
  });
  it('randomizes output (probabilistic)', () => {
    const results = new Set(
      Array.from({ length: 20 }, () => {
        const r = getCommand('fortune')!.execute([], makeCtx());
        return r.type === 'text' ? r.content : '';
      }),
    );
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('joke', () => {
  it('returns text', () => expect(getCommand('joke')!.execute([], makeCtx()).type).toBe('text'));
  it('content is non-empty', () => {
    const r = getCommand('joke')!.execute([], makeCtx());
    if (r.type === 'text') expect(r.content.length).toBeGreaterThan(0);
  });
});

describe('coffee', () => {
  it('returns text with ASCII art', () => {
    const r = getCommand('coffee')!.execute([], makeCtx());
    expect(r.type).toBe('text');
    if (r.type === 'text') {
      expect(r.content).toContain('Brewing');
      expect(r.content).toContain('☕');
    }
  });
});

describe('hack / matrix', () => {
  it('hack returns jsx', () => {
    expect(getCommand('hack')!.execute([], makeCtx()).type).toBe('jsx');
  });
  it('matrix is alias for hack', () => {
    expect(getCommand('matrix')).toBe(getCommand('hack'));
  });
});

describe('sudo hire-me', () => {
  it('returns jsx for sudo hire-me', () => {
    const r = getCommand('sudo')!.execute(['hire-me'], makeCtx());
    expect(r.type).toBe('jsx');
  });
  it('returns error for sudo without hire-me', () => {
    const r = getCommand('sudo')!.execute([], makeCtx());
    expect(r.type).toBe('error');
  });
});

describe('rm', () => {
  it('returns safe text for rm -rf /', () => {
    const r = getCommand('rm')!.execute(['-rf', '/'], makeCtx({ t: makeRealT() }));
    expect(r.type).toBe('text');
    if (r.type === 'text') {
      expect(r.content).toBe('Nice try. This terminal is read-only.');
    }
  });
});

describe('vim', () => {
  it('returns non-empty text', () => {
    const r = getCommand('vim')!.execute([], makeCtx({ t: makeRealT() }));
    expect(r.type).toBe('text');
    if (r.type === 'text') {
      expect(r.content).toContain('vim');
    }
  });
});
