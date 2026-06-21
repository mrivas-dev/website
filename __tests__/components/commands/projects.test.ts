global.open = jest.fn();

import '@/components/commands/projects';
import '@/components/commands/contact';
import '@/components/commands/github';
import '@/components/commands/linkedin';
import { getCommand } from '@/lib/command-registry';
import { makeCtx, makeRealT } from '../../helpers';

describe('projects command', () => {
  const cmd = getCommand('projects');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('lists projects with numbers', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'text') {
      expect(result.content).toContain('[1]');
      expect(result.content).toContain('[2]');
    }
  });

  it('includes inspect hint', () => {
    const t = makeRealT('en');
    const result = cmd!.execute([], makeCtx({ locale: 'en', t }));
    if (result.type === 'text') {
      expect(result.content).toContain(t('commands.projects.inspect'));
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
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content).toContain('Ecommerce Platform');
      expect(result.content).toContain('Next.js');
    }
  });

  it('returns detail for project by slug', () => {
    const result = cmd!.execute(
      ['ecommerce-platform'],
      makeCtx({ locale: 'en', t: makeRealT('en') }),
    );
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content).toContain('Ecommerce Platform');
    }
  });

  it('returns detail for project by name (case-insensitive)', () => {
    const result = cmd!.execute(
      ['devops dashboard'],
      makeCtx({ locale: 'en', t: makeRealT('en') }),
    );
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content).toContain('DevOps Dashboard');
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
      'https://github.com/matiasemrivas',
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
      'https://linkedin.com/in/matiasrivas',
      '_blank',
    );
  });
});
