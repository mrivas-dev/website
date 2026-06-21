import { registerCommand } from '@/lib/command-registry';
import { projects as projectsContent } from '@/lib/content/projects';
import type { Project } from '@/lib/content/projects';

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

function formatProjectDetail(project: Project, ctx: { locale: 'en' | 'es'; t: (key: string) => string }): string {
  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ` ${project.name}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ` ${ctx.t('commands.project.stack')}  ${project.stack.join(' · ')}`,
    ` ${ctx.t('commands.project.role')}   ${project.role[ctx.locale]}`,
    ` ${ctx.t('commands.project.year')}   ${project.year}`,
    '',
    ` ${project.description[ctx.locale]}`,
  ];
  if (project.github) {
    lines.push('', ` → ${project.github}`);
  }
  if (project.url) {
    lines.push('', ` → ${project.url}`);
  }
  return lines.join('\n');
}

registerCommand({
  name: 'projects',
  description: 'List projects',
  execute: (_args, ctx) => {
    const lines = projectsContent.map(
      (p) => `[${p.number}] ${p.name} — ${p.tagline[ctx.locale]}`,
    );
    lines.push('', ctx.t('commands.projects.inspect'));
    return { type: 'text', content: lines.join('\n') };
  },
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
    return { type: 'text', content: formatProjectDetail(project, ctx) };
  },
});
