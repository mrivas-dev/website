import { registerCommand } from '@/lib/command-registry';

registerCommand({
  name: 'pwd',
  description: 'Print working directory',
  execute: (_args, ctx) => ({ type: 'text', content: ctx.cwd }),
});
