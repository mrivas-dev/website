import './whoami';
import './pwd';
import './date';
import './time';
import './lang';
import './ls';
import './cd';
import './cat';
import './tree';
import { getAllCommands, registerCommand } from '@/lib/command-registry';

function formatHelpTable(ctx: { t: (key: string) => string }): string {
  const commands = getAllCommands();
  const maxNameLen = Math.max(...commands.map((cmd) => cmd.name.length), 'command'.length);
  const maxDescLen = Math.max(
    ...commands.map((cmd) => cmd.description.length),
    'description'.length,
  );

  const header = ctx.t('commands.help.header');
  const footer = ctx.t('commands.help.footer');
  const nameCol = 'command'.padEnd(maxNameLen);
  const descCol = 'description'.padEnd(maxDescLen);
  const divider = '-'.repeat(maxNameLen).padEnd(maxNameLen) + '  ' + '-'.repeat(maxDescLen);

  const rows = commands
    .map((cmd) => `${cmd.name.padEnd(maxNameLen)}  ${cmd.description}`)
    .join('\n');

  return `${header}\n\n  ${nameCol}  ${descCol}\n  ${divider}\n${rows
    .split('\n')
    .map((row) => `  ${row}`)
    .join('\n')}\n\n${footer}`;
}

registerCommand({
  name: 'help',
  aliases: ['?'],
  description: 'Show available commands',
  execute: (_args, ctx) => ({ type: 'text', content: formatHelpTable(ctx) }),
});
