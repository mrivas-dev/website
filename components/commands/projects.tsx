import { registerCommand } from '@/lib/command-registry';
import { projects as projectsContent } from '@/lib/content/projects';
import type { Project } from '@/lib/content/projects';
import {
  OutputBody,
  OutputCard,
  OutputDivider,
  OutputHeading,
  OutputLink,
  OutputMeta,
} from '@/components/Terminal/OutputCard';

function findProject(query: string): Project | undefined {
  const num = parseInt(query, 10);
  if (!Number.isNaN(num)) {
    return projectsContent.find((p) => p.number === num);
  }
  const lower = query.toLowerCase();
  return projectsContent.find(
    (p) => p.id === lower || p.name.toLowerCase() === lower,
  );
}

registerCommand({
  name: 'projects',
  description: 'List projects',
  execute: (_args, ctx) => ({
    type: 'jsx',
    content: (
      <OutputCard>
        {projectsContent.map((p) => (
          <OutputBody key={p.id}>
            [{p.number}] {p.name} — {p.tagline[ctx.locale]}
          </OutputBody>
        ))}
        <OutputMeta>{ctx.t('commands.projects.inspect')}</OutputMeta>
      </OutputCard>
    ),
  }),
});

registerCommand({
  name: 'project',
  description: 'Project details',
  execute: (args, ctx) => {
    const query = args.join(' ').trim();
    if (!query) {
      return { type: 'error', content: ctx.t('errors.invalidArgs') };
    }
    const project = findProject(query);
    if (!project) {
      return { type: 'error', content: ctx.t('commands.project.notFound') };
    }

    return {
      type: 'jsx',
      content: (
        <OutputCard>
          <OutputDivider />
          <OutputHeading>{project.name}</OutputHeading>
          <OutputDivider />
          <OutputMeta>
            {ctx.t('commands.project.stack')}  {project.stack.join(' · ')}
          </OutputMeta>
          <OutputMeta>
            {ctx.t('commands.project.role')}   {project.role[ctx.locale]}
          </OutputMeta>
          <OutputMeta>
            {ctx.t('commands.project.year')}   {project.year}
          </OutputMeta>
          <OutputBody>{project.description[ctx.locale]}</OutputBody>
          {project.github && (
            <OutputLink href={`https://${project.github}`}>→ {project.github}</OutputLink>
          )}
          {project.url && <OutputLink href={project.url}>→ {project.url}</OutputLink>}
        </OutputCard>
      ),
    };
  },
});
