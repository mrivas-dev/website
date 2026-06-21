import type { OS } from '@/lib/os-detect';
import type { OutputLine } from '@/components/Terminal/TerminalOutput';
import type { Locale } from '@/lib/i18n';

export interface CommandContext {
  os: OS;
  cwd: string;
  setCwd: (path: string) => void;
  history: OutputLine[];
  clearHistory: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

export type CommandResult =
  | { type: 'text'; content: string }
  | { type: 'jsx'; content: React.ReactNode }
  | { type: 'clear' }
  | { type: 'error'; content: string };

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  hidden?: boolean;
  execute(args: string[], ctx: CommandContext): CommandResult;
}

const registry = new Map<string, Command>();

export function registerCommand(cmd: Command) {
  registry.set(cmd.name.toLowerCase(), cmd);
  cmd.aliases?.forEach((alias) => registry.set(alias.toLowerCase(), cmd));
}

export function getCommand(name: string): Command | undefined {
  return registry.get(name.toLowerCase());
}

export function getAllCommands(): Command[] {
  const seen = new Set<string>();
  return [...registry.values()].filter((cmd) => {
    if (seen.has(cmd.name)) return false;
    seen.add(cmd.name);
    return !cmd.hidden;
  });
}

export function parseInput(input: string): { name: string; args: string[] } {
  const tokens: string[] = [];
  const regex = /[^\s"]+|"([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[0]);
  }

  const [name = '', ...args] = tokens;
  return { name: name.toLowerCase(), args };
}

registerCommand({
  name: 'clear',
  aliases: ['cls'],
  description: 'Clear the terminal screen',
  execute: (_args, ctx) => {
    ctx.clearHistory();
    return { type: 'clear' };
  },
});

registerCommand({
  name: 'echo',
  description: 'Print arguments to the terminal',
  execute: (args) => ({ type: 'text', content: args.join(' ') }),
});
