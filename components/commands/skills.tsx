import { registerCommand } from '@/lib/command-registry';
import { skills as skillsContent } from '@/lib/content/skills';
import {
  OutputBody,
  OutputCard,
  OutputDivider,
  OutputHeading,
} from '@/components/Terminal/OutputCard';

const SEPARATOR_WIDTH = 30;

registerCommand({
  name: 'skills',
  description: 'Skills and technologies',
  execute: (_args, ctx) => {
    return {
      type: 'jsx',
      content: (
        <OutputCard>
          {skillsContent.map((group, index) => {
            const category = group.category[ctx.locale];
            const separator = '─'.repeat(Math.max(1, SEPARATOR_WIDTH - category.length));
            const skillList = group.skills.join(' · ');
            return (
              <div key={group.category.en}>
                <OutputHeading>
                  {category} {separator}
                </OutputHeading>
                <OutputBody>  {skillList}</OutputBody>
                {index < skillsContent.length - 1 && <OutputDivider />}
              </div>
            );
          })}
        </OutputCard>
      ),
    };
  },
});
