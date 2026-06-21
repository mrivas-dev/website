import '@/components/commands/tree';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('tree command', () => {
  const cmd = getCommand('tree');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns text type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('text');
  });

  it('content contains about.txt', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      expect(result.content).toContain('about.txt');
    }
  });

  it('content contains experience', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      expect(result.content).toContain('experience');
    }
  });

  it('uses tree characters ├── or └──', () => {
    const result = cmd!.execute([], makeCtx());
    if (result.type === 'text') {
      expect(result.content).toMatch(/├──|└──/);
    }
  });
});
