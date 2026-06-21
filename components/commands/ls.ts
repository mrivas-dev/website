import { registerCommand } from '@/lib/command-registry';
import { getNode, resolvePath } from '@/lib/virtual-fs';

registerCommand({
  name: 'ls',
  aliases: ['dir'],
  description: 'List directory contents',
  execute: (args, ctx) => {
    const targetPath = args.length > 0 ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
    const node = getNode(targetPath);

    if (!node) {
      return { type: 'error', content: ctx.t('errors.noSuchDir') };
    }

    if (node.type !== 'dir') {
      return { type: 'error', content: ctx.t('errors.noSuchDir') };
    }

    const entries = Object.keys(node.children).map((name) => {
      const child = node.children[name];
      return child.type === 'dir' ? `${name}/` : name;
    });

    if (entries.length === 0) {
      return { type: 'text', content: '\n' };
    }

    return { type: 'text', content: entries.join('\n') };
  },
});
