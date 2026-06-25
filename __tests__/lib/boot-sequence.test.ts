import {
  getBootLine,
  getCommandNotFoundMessage,
  getWelcomeText,
  getTypingSlice,
  isTypingComplete,
  TYPING_INTERVAL_MS,
} from '@/lib/boot-sequence';

describe('getBootLine', () => {
  const fixedDate = new Date('2025-06-21T14:23:11');

  it('returns macOS last-login line', () => {
    const line = getBootLine('macos', fixedDate);
    expect(line).toMatch(/^Last login:/);
    expect(line).toContain('ttys001');
  });

  it('returns Linux welcome line', () => {
    const line = getBootLine('linux', fixedDate);
    expect(line).toContain('Ubuntu 24.04.2');
    expect(line).toContain('GNU/Linux');
    expect(line).toContain('help.ubuntu.com');
  });

  it('returns Windows version line', () => {
    const line = getBootLine('windows', fixedDate);
    expect(line).toContain('Microsoft Windows');
    expect(line).toContain('10.0.26100');
  });
});

describe('getCommandNotFoundMessage', () => {
  it('returns zsh-style message on macOS', () => {
    expect(getCommandNotFoundMessage('macos', 'foo')).toBe(
      'zsh: command not found: foo',
    );
  });

  it('returns linux-style message', () => {
    expect(getCommandNotFoundMessage('linux', 'foo')).toBe('foo: command not found');
  });

  it('returns windows-style message', () => {
    expect(getCommandNotFoundMessage('windows', 'foo')).toBe(
      "'foo' is not recognized as an internal or external command.",
    );
  });
});

describe('getWelcomeText', () => {
  it('joins boot message and welcome hint with newline', () => {
    expect(getWelcomeText('System ready.', 'Type "help".')).toBe(
      'System ready.\nType "help".',
    );
  });
});

describe('typing animation helpers', () => {
  const text = 'Hello';

  it('exports typing interval constant', () => {
    expect(TYPING_INTERVAL_MS).toBe(40);
  });

  it('getTypingSlice returns progressively longer substrings', () => {
    expect(getTypingSlice(text, 0)).toBe('');
    expect(getTypingSlice(text, 1)).toBe('H');
    expect(getTypingSlice(text, 3)).toBe('Hel');
    expect(getTypingSlice(text, 5)).toBe('Hello');
  });

  it('isTypingComplete is false until all chars shown', () => {
    expect(isTypingComplete(text, 0)).toBe(false);
    expect(isTypingComplete(text, 4)).toBe(false);
    expect(isTypingComplete(text, 5)).toBe(true);
    expect(isTypingComplete(text, 6)).toBe(true);
  });
});
