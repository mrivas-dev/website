import { registerCommand } from '@/lib/command-registry';

registerCommand({
  name: 'whoami',
  description: 'Print current user',
  execute: () => ({ type: 'text', content: 'm' }),
});
