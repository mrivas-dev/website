import { registerCommand } from '@/lib/command-registry';
import { vfs, type VFSNode } from '@/lib/virtual-fs';

function buildTree(node: VFSNode, prefix = '', isLast = true): string {
  if (node.type !== 'dir') return '';

  const entries = Object.keys(node.children);
  const lines: string[] = [];

  entries.forEach((name, index) => {
    const child = node.children[name];
    const last = index === entries.length - 1;
    const connector = last ? '└── ' : '├── ';
    const suffix = child.type === 'dir' ? '/' : '';
    lines.push(`${prefix}${connector}${name}${suffix}`);

    if (child.type === 'dir' && Object.keys(child.children).length > 0) {
      const extension = last ? '    ' : '│   ';
      lines.push(buildTree(child, prefix + extension, last));
    }
  });

  return lines.filter(Boolean).join('\n');
}

registerCommand({
  name: 'tree',
  description: 'Display directory tree',
  execute: () => ({ type: 'text', content: buildTree(vfs) }),
});
