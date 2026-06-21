import { registerCommand } from '@/lib/command-registry';
import type { Locale } from '@/lib/i18n';

const supportedLocales: Locale[] = ['en', 'es'];

registerCommand({
  name: 'lang',
  description: 'Show or switch language',
  execute: (args, ctx) => {
    if (args.length === 0) {
      return {
        type: 'text',
        content: `${ctx.t('commands.lang.current')} ${ctx.locale}`,
      };
    }

    const requested = args[0].toLowerCase() as Locale;
    if (!supportedLocales.includes(requested)) {
      return { type: 'error', content: ctx.t('errors.invalidArgs') };
    }

    ctx.setLocale(requested);
    return { type: 'text', content: ctx.t('commands.lang.switched') };
  },
});
