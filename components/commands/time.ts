import { registerCommand } from '@/lib/command-registry';

registerCommand({
  name: 'time',
  description: 'Print current time',
  execute: (_args, ctx) => {
    const locale = ctx.locale === 'es' ? 'es-MX' : 'en-US';
    const formatted = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());
    return { type: 'text', content: formatted };
  },
});
