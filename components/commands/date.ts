import { registerCommand } from '@/lib/command-registry';

registerCommand({
  name: 'date',
  description: 'Print current date',
  execute: (_args, ctx) => {
    const locale = ctx.locale === 'es' ? 'es-MX' : 'en-US';
    const formatted = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date());
    return { type: 'text', content: formatted };
  },
});
