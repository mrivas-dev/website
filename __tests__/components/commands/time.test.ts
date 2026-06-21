import '@/components/commands/time';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('time command', () => {
  const cmd = getCommand('time');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('returns content matching HH:MM pattern', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      expect(result.content).toMatch(/\d{2}:\d{2}/);
    }
  });
});
