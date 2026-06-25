import React from 'react';
import { registerCommand } from '@/lib/command-registry';
import { contact } from '@/lib/content/contact';
import {
  OutputBody,
  OutputCard,
  OutputLink,
  OutputMeta,
} from '@/components/Terminal/OutputCard';

registerCommand({
  name: 'contact',
  description: 'Contact information',
  execute: (_args, ctx) => ({
    type: 'jsx',
    content: (
      <OutputCard>
        <OutputBody>
          {ctx.t('commands.contact.email').padEnd(10)}
          <OutputLink href={`mailto:${contact.email}`}>{contact.email}</OutputLink>
        </OutputBody>
        <OutputMeta>
          {ctx.t('commands.contact.linkedin').padEnd(10)}
          <OutputLink href={`https://${contact.linkedin}`}>{contact.linkedin}</OutputLink>
        </OutputMeta>
        <OutputMeta>
          {ctx.t('commands.contact.github').padEnd(10)}
          <OutputLink href={`https://${contact.github}`}>{contact.github}</OutputLink>
        </OutputMeta>
      </OutputCard>
    ),
  }),
});
