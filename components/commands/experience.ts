import { registerCommand } from '@/lib/command-registry';
import { experience as experienceContent } from '@/lib/content/experience';

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

    const lines: string[] = [];

    if (isFull) {
      roles.forEach((role) => {
        lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        lines.push(` ${role.company} — ${role.title[ctx.locale]}`);
        lines.push(` ${formatYearRange(role.startYear, role.endYear, present)}`);
        lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        role.bullets[ctx.locale].forEach((bullet) => {
          lines.push(` • ${bullet}`);
        });
        lines.push('');
      });
    } else {
      roles.forEach((role) => {
        lines.push(
          `  ${role.company}  ${role.title[ctx.locale]}  ${formatYearRange(role.startYear, role.endYear, present)}`,
        );
      });
      lines.push('');
      lines.push(ctx.t('commands.experience.fullHint'));
    }

    return { type: 'text', content: lines.join('\n').trimEnd() };
  },
});
