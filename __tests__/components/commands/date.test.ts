import '@/components/commands/date';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('date command', () => {
  const cmd = getCommand('date');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('returns non-empty content containing the current year', () => {
    const result = cmd!.execute([], makeCtx());
    const year = new Date().getFullYear().toString();
    if (result.type === 'text') {
      expect(result.content.length).toBeGreaterThan(0);
      expect(result.content).toContain(year);
    }
  });
});
