import { registerCommand } from '@/lib/command-registry';
import { getNode, resolvePath } from '@/lib/virtual-fs';

registerCommand({
  name: 'cat',
  aliases: ['type'],
  description: 'Print file contents',
  execute: (args, ctx) => {
    if (args.length === 0) {
      return { type: 'error', content: ctx.t('errors.invalidArgs') };
    }

    const targetPath = resolvePath(ctx.cwd, args[0]);
    const node = getNode(targetPath);

    if (!node) {
      return { type: 'error', content: ctx.t('errors.noSuchFile') };
    }

    if (node.type !== 'file') {
      return { type: 'error', content: ctx.t('errors.noSuchFile') };
    }

    const content = typeof node.content === 'function' ? node.content() : node.content;
    return { type: 'text', content };
  },
});
