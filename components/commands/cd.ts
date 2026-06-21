import { registerCommand } from '@/lib/command-registry';
import { getNode, resolvePath } from '@/lib/virtual-fs';

registerCommand({
  name: 'cd',
  description: 'Change directory',
  execute: (args, ctx) => {
    if (args.length === 0 || args[0] === '~') {
      ctx.setCwd('~');
      return { type: 'text', content: '' };
    }

    const targetPath = resolvePath(ctx.cwd, args[0]);
    const node = getNode(targetPath);

    if (!node) {
      return { type: 'error', content: ctx.t('errors.noSuchDir') };
    }

    if (node.type !== 'dir') {
      return { type: 'error', content: ctx.t('errors.noSuchDir') };
    }

    ctx.setCwd(targetPath);
    return { type: 'text', content: '' };
  },
});
