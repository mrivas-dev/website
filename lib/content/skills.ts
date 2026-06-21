import type { Locale } from '@/lib/i18n';

export interface SkillGroup {
  category: Record<Locale, string>;
  skills: string[];
}

export const skills: SkillGroup[] = [
  {
    category: { en: 'Languages', es: 'Lenguajes' },
    skills: ['JavaScript', 'TypeScript', 'Java', 'Python'],
  },
  {
    category: { en: 'Frontend', es: 'Frontend' },
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: { en: 'Backend', es: 'Backend' },
    skills: ['Node.js', 'Spring Boot', 'REST', 'GraphQL'],
  },
  {
    category: { en: 'Leadership', es: 'Liderazgo' },
    skills: ['Engineering Management', 'Mentoring', 'Roadmaps', 'Hiring'],
  },
];
