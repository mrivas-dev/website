import { registerCommand } from '@/lib/command-registry';
import { about as aboutContent } from '@/lib/content/about';

registerCommand({
  name: 'about',
  description: 'About me',
  execute: (_args, ctx) => {
    const data = aboutContent[ctx.locale];
    const years = ctx.t('commands.about.yearsFormat').replace(
      '{years}',
      String(data.yearsOfExperience),
    );
    const content = [
      data.name,
      `${data.role} · ${years}`,
      '',
      data.summary,
      '',
      ctx.t('commands.about.hint'),
    ].join('\n');
    return { type: 'text', content };
  },
});
