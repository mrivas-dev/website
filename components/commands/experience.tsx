import { registerCommand } from '@/lib/command-registry';
import { experience as experienceContent } from '@/lib/content/experience';
import {
  OutputBody,
  OutputCard,
  OutputDivider,
  OutputHeading,
  OutputMeta,
} from '@/components/Terminal/OutputCard';

function formatYearRange(
  startYear: number,
  endYear: number | 'Present',
  presentLabel: string,
): string {
  const end = endYear === 'Present' ? presentLabel : String(endYear);
  return `${startYear}–${end}`;
}

registerCommand({
  name: 'experience',
  description: 'Career history',
  execute: (args, ctx) => {
    const isFull = args.includes('--full');
    const present = ctx.t('commands.experience.present');
    const roles = isFull ? experienceContent : experienceContent.slice(0, 3);

    if (isFull) {
      return {
        type: 'jsx',
        content: (
          <OutputCard>
            {roles.map((role, index) => (
              <div key={role.company}>
                <OutputDivider />
                <OutputHeading>
                  {role.company} — {role.title[ctx.locale]}
                </OutputHeading>
                <OutputMeta>
                  {formatYearRange(role.startYear, role.endYear, present)}
                </OutputMeta>
                {role.bullets[ctx.locale].map((bullet) => (
                  <OutputMeta key={bullet}> • {bullet}</OutputMeta>
                ))}
                {index < roles.length - 1 && <OutputDivider />}
              </div>
            ))}
          </OutputCard>
        ),
      };
    }

    return {
      type: 'jsx',
      content: (
        <OutputCard>
          {roles.map((role) => (
            <OutputBody key={role.company}>
              {'  '}
              {role.company}  {role.title[ctx.locale]}  {formatYearRange(role.startYear, role.endYear, present)}
            </OutputBody>
          ))}
          <OutputMeta>{ctx.t('commands.experience.fullHint')}</OutputMeta>
        </OutputCard>
      ),
    };
  },
});
