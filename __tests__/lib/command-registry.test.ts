import {
  parseInput,
  registerCommand,
  getCommand,
  getAllCommands,
} from '@/lib/command-registry';

describe('parseInput', () => {
  it('parses a simple command', () => {
    expect(parseInput('echo hello')).toEqual({ name: 'echo', args: ['hello'] });
  });

  it('parses quoted arguments', () => {
    expect(parseInput('echo "hello world"')).toEqual({
      name: 'echo',
      args: ['hello world'],
    });
  });

  it('lowercases the command name', () => {
    expect(parseInput('ECHO hi')).toEqual({ name: 'echo', args: ['hi'] });
  });

  it('handles empty input', () => {
    expect(parseInput('')).toEqual({ name: '', args: [] });
  });

  it('handles multiple args', () => {
    expect(parseInput('cmd a b c')).toEqual({ name: 'cmd', args: ['a', 'b', 'c'] });
  });

  it('strips outer quotes and preserves inner spaces', () => {
    expect(parseInput('cmd "a b" c')).toEqual({ name: 'cmd', args: ['a b', 'c'] });
  });
});

describe('registerCommand / getCommand', () => {
  it('registers and retrieves a command', () => {
    registerCommand({
      name: 'orch-test',
      description: 'test',
      execute: () => ({ type: 'text', content: 'ok' }),
    });
    expect(getCommand('orch-test')).toBeDefined();
  });

  it('retrieves by alias', () => {
    registerCommand({
      name: 'aliased-cmd',
      aliases: ['ac'],
      description: 'x',
      execute: () => ({ type: 'text', content: '' }),
    });
    expect(getCommand('ac')?.name).toBe('aliased-cmd');
  });

  it('returns undefined for unknown command', () => {
    expect(getCommand('definitely-not-registered-xyz')).toBeUndefined();
  });

  it('is case-insensitive on lookup', () => {
    expect(getCommand('ORCH-TEST')).toBeDefined();
  });
});

describe('getAllCommands', () => {
  it('returns no duplicate names', () => {
    const names = getAllCommands().map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('excludes hidden commands', () => {
    registerCommand({
      name: 'hidden-orch',
      hidden: true,
      description: 'x',
      execute: () => ({ type: 'text', content: '' }),
    });
    expect(getAllCommands().find((c) => c.name === 'hidden-orch')).toBeUndefined();
  });

  it('includes visible commands', () => {
    expect(getAllCommands().find((c) => c.name === 'echo')).toBeDefined();
  });
});
