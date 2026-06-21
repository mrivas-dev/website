import React from 'react';
import { registerCommand } from '@/lib/command-registry';
import { about as aboutContent } from '@/lib/content/about';

registerCommand({
  name: 'resume',
  aliases: ['download resume'],
  description: 'Download résumé',
  execute: (_args, ctx) => {
    const data = aboutContent[ctx.locale];
    return {
      type: 'jsx',
      content: (
        <div>
          <div>{data.summary}</div>
          <div style={{ marginTop: '0.5rem' }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--terminal-accent)' }}
            >
              {ctx.t('commands.resume.download')}
            </a>
          </div>
        </div>
      ),
    };
  },
});
