import '@/components/commands/help';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('help command', () => {
  const cmd = getCommand('help');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('content contains at least 3 command names', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      const content = result.content.toLowerCase();
      const commandNames = ['help', 'ls', 'cd', 'cat', 'pwd', 'whoami', 'date'];
      const matches = commandNames.filter((name) => content.includes(name));
      expect(matches.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('alias ? works', () => {
    expect(getCommand('?')).toBeDefined();
    expect(getCommand('?')?.name).toBe('help');
  });
});
