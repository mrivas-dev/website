import React from 'react';
import { registerCommand } from '@/lib/command-registry';
import { contact } from '@/lib/content/contact';

const GITHUB_URL = `https://${contact.github}`;

registerCommand({
  name: 'github',
  description: 'Open GitHub profile',
  execute: (_args, ctx) => {
    if (typeof window !== 'undefined') {
      window.open(GITHUB_URL, '_blank');
    }
    return {
      type: 'jsx',
      content: (
        <div>
          <div>{ctx.t('commands.github.opened')}</div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--terminal-accent)' }}
          >
            {contact.github}
          </a>
        </div>
      ),
    };
  },
});
