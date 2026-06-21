import '@/components/commands/pwd';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('pwd command', () => {
  const cmd = getCommand('pwd');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('returns ctx.cwd', () => {
    const result = cmd!.execute([], makeCtx({ cwd: '~/experience' }));
    if (result.type === 'text') {
      expect(result.content).toBe('~/experience');
    }
  });

  it('defaults to ~ when cwd is ~', () => {
    const result = cmd!.execute([], makeCtx({ cwd: '~' }));
    if (result.type === 'text') {
      expect(result.content).toBe('~');
    }
  });
});
