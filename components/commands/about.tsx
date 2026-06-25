import { registerCommand } from '@/lib/command-registry';
import { about as aboutContent } from '@/lib/content/about';
import {
  OutputBody,
  OutputCard,
  OutputMeta,
} from '@/components/Terminal/OutputCard';

registerCommand({
  name: 'about',
  description: 'About me',
  execute: (_args, ctx) => {
    const data = aboutContent[ctx.locale];
    const years = ctx.t('commands.about.yearsFormat').replace(
      '{years}',
      String(data.yearsOfExperience),
    );

    return {
      type: 'jsx',
      content: (
        <OutputCard>
          <OutputBody strong>{data.name}</OutputBody>
          <OutputBody strong>
            {data.role} · {years}
          </OutputBody>
          <OutputBody>{data.summary}</OutputBody>
          <OutputMeta>{ctx.t('commands.about.hint')}</OutputMeta>
        </OutputCard>
      ),
    };
  },
});
