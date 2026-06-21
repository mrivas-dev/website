import React from 'react';
import { registerCommand } from '@/lib/command-registry';
import { contact } from '@/lib/content/contact';

const linkStyle = { color: 'var(--terminal-accent)' };

registerCommand({
  name: 'contact',
  description: 'Contact information',
  execute: (_args, ctx) => ({
    type: 'jsx',
    content: (
      <div>
        <div>
          {ctx.t('commands.contact.email').padEnd(10)}
          <a href={`mailto:${contact.email}`} style={linkStyle}>
            {contact.email}
          </a>
        </div>
        <div>
          {ctx.t('commands.contact.linkedin').padEnd(10)}
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {contact.linkedin}
          </a>
        </div>
        <div>
          {ctx.t('commands.contact.github').padEnd(10)}
          <a
            href={`https://${contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {contact.github}
          </a>
        </div>
      </div>
    ),
  }),
});
