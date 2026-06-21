import '@/components/commands/whoami';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('whoami command', () => {
  const cmd = getCommand('whoami');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('returns content "m"', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      expect(result.content).toBe('m');
    }
  });
});
