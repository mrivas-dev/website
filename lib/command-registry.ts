import type { OS } from '@/lib/os-detect';
import type { OutputLine } from '@/components/Terminal/TerminalOutput';

export interface CommandContext {
  os: OS;
  cwd: string;
  setCwd: (path: string) => void;
  history: OutputLine[];
  clearHistory: () => void;
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

export function parseInput(input: string): { name: string; args: string[] } {
  const tokens: string[] = [];
  const regex = /[^\s"]+|"([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[0]);
  }

  const [name = '', ...args] = tokens;
  return { name, args };
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
