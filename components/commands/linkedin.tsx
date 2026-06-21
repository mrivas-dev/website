import React from 'react';
import { registerCommand } from '@/lib/command-registry';
import { contact } from '@/lib/content/contact';

const LINKEDIN_URL = `https://${contact.linkedin}`;

registerCommand({
  name: 'linkedin',
  description: 'Open LinkedIn profile',
  execute: (_args, ctx) => {
    if (typeof window !== 'undefined') {
      window.open(LINKEDIN_URL, '_blank');
    }
    return {
      type: 'jsx',
      content: (
        <div>
          <div>{ctx.t('commands.linkedin.opened')}</div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--terminal-accent)' }}
          >
            {contact.linkedin}
          </a>
        </div>
      ),
    };
  },
});
