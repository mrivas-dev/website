import '@/components/commands/ls';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('ls command', () => {
  const cmd = getCommand('ls');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('lists root directory', () => {
    const result = cmd!.execute([], makeCtx({ cwd: '~' }));
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content).toContain('about.txt');
      expect(result.content).toContain('experience');
    }
  });

  it('lists subdirectory', () => {
    const result = cmd!.execute([], makeCtx({ cwd: '~/experience' }));
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content.length).toBeGreaterThan(0);
    }
  });

  it('returns error for missing path', () => {
    const result = cmd!.execute(['nonexistent-xyz'], makeCtx());
    expect(result.type).toBe('error');
  });

  it('dir alias works', () => {
    expect(getCommand('dir')).toBeDefined();
    expect(getCommand('dir')?.name).toBe('ls');
  });
});
