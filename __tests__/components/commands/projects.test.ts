global.open = jest.fn();

import '@/components/commands/projects';
import '@/components/commands/contact';
import '@/components/commands/github';
import '@/components/commands/linkedin';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT, renderJsxText } from '../../helpers';

describe('projects command', () => {
  const cmd = getCommand('projects');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('lists projects with numbers', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text).toContain('[1]');
      expect(text).toContain('[2]');
    }
  });

  it('includes inspect hint', () => {
    const t = makeRealT('en');
    const result = cmd!.execute([], makeCtx({ locale: 'en', t }));
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toContain(t('commands.projects.inspect'));
    }
  });
});

describe('project command', () => {
  const cmd = getCommand('project');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns detail for project by number', () => {
    const result = cmd!.execute(['1'], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(result.type).toBe('jsx');
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text).toContain('AppDirect Marketplace');
      expect(text).toContain('React');
    }
  });

  it('returns detail for project by slug', () => {
    const result = cmd!.execute(
      ['appdirect-marketplace'],
      makeCtx({ locale: 'en', t: makeRealT('en') }),
    );
    expect(result.type).toBe('jsx');
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toContain('AppDirect Marketplace');
    }
  });

  it('returns detail for project by name (case-insensitive)', () => {
    const result = cmd!.execute(
      ['appdirect micro frontends'],
      makeCtx({ locale: 'en', t: makeRealT('en') }),
    );
    expect(result.type).toBe('jsx');
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toContain('AppDirect Micro Frontends');
    }
  });

  it('returns error for nonexistent project', () => {
    const result = cmd!.execute(
      ['nonexistent-xyz'],
      makeCtx({ locale: 'en', t: makeRealT('en') }),
    );
    expect(result.type).toBe('error');
  });
});

describe('github command', () => {
  const cmd = getCommand('github');

  beforeEach(() => {
    (global.open as jest.Mock).mockClear();
  });

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(result.type).toBe('jsx');
  });

  it('opens github URL in new tab', () => {
    cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(global.open).toHaveBeenCalledWith(
      'https://github.com/mrivas-dev',
      '_blank',
    );
  });
});

describe('linkedin command', () => {
  const cmd = getCommand('linkedin');

  beforeEach(() => {
    (global.open as jest.Mock).mockClear();
  });

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(result.type).toBe('jsx');
  });

  it('opens linkedin URL in new tab', () => {
    cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(global.open).toHaveBeenCalledWith(
      'https://linkedin.com/in/matiasrivasdev',
      '_blank',
    );
  });
});
