export type VFSNode =
  | { type: 'file'; content: string | (() => string) }
  | { type: 'dir'; children: Record<string, VFSNode> };

function aboutPlaceholder(): string {
  return 'About Matias Rivas — Engineering Manager';
}

function skillsPlaceholder(): string {
  return 'Skills: JavaScript, TypeScript, React, Node.js, and more.';
}

export const vfs: VFSNode = {
  type: 'dir',
  children: {
    'about.txt': { type: 'file', content: aboutPlaceholder },
    'skills.txt': { type: 'file', content: skillsPlaceholder },
    'resume.pdf': {
      type: 'file',
      content: '📄 Binary file. Use the `resume` command to download.',
    },
    experience: {
      type: 'dir',
      children: {},
    },
    projects: {
      type: 'dir',
      children: {},
    },
  },
};

export function resolvePath(cwd: string, input: string): string {
  if (input === '~' || input.startsWith('~/')) return input === '~' ? '~' : input;
  if (input === '..') {
    if (cwd === '~') return '~';
    const parts = cwd.replace(/^~\/?/, '').split('/').filter(Boolean);
    parts.pop();
    return parts.length === 0 ? '~' : `~/${parts.join('/')}`;
  }
  if (input === '.') return cwd;
  return cwd === '~' ? `~/${input}` : `${cwd}/${input}`;
}

export function getNode(path: string): VFSNode | null {
  if (path === '~') return vfs;
  const parts = path.replace(/^~\//, '').split('/').filter(Boolean);
  let node: VFSNode = vfs;
  for (const part of parts) {
    if (node.type !== 'dir') return null;
    const child = node.children[part];
    if (!child) return null;
    node = child;
  }
  return node;
}
