import { registerCommand } from '@/lib/command-registry';
import { skills as skillsContent } from '@/lib/content/skills';

const SEPARATOR_WIDTH = 30;

registerCommand({
  name: 'skills',
  description: 'Skills and technologies',
  execute: (_args, ctx) => {
    const lines = skillsContent.map((group) => {
      const category = group.category[ctx.locale];
      const separator = '─'.repeat(Math.max(1, SEPARATOR_WIDTH - category.length));
      const skillList = group.skills.join(' · ');
      return `${category} ${separator}\n  ${skillList}`;
    });
    return { type: 'text', content: lines.join('\n\n') };
  },
});
