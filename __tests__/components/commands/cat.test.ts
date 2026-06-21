import '@/components/commands/cat';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('cat command', () => {
  const cmd = getCommand('cat');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('reads about.txt', () => {
    const result = cmd!.execute(['about.txt'], makeCtx({ cwd: '~' }));
    expect(result.type).toBe('text');
    if (result.type === 'text') {
      expect(result.content.length).toBeGreaterThan(0);
    }
  });

  it('nonexistent file returns error', () => {
    const result = cmd!.execute(['nonexistent-xyz'], makeCtx());
    expect(result.type).toBe('error');
  });

  it('directory path returns error', () => {
    const result = cmd!.execute(['experience'], makeCtx({ cwd: '~' }));
    expect(result.type).toBe('error');
  });

  it('type alias works', () => {
    expect(getCommand('type')).toBeDefined();
    expect(getCommand('type')?.name).toBe('cat');
  });
});
