import type { Locale } from '@/lib/i18n';

export interface SkillGroup {
  category: Record<Locale, string>;
  skills: string[];
}

export const skills: SkillGroup[] = [
  {
    category: { en: 'Languages', es: 'Lenguajes' },
    skills: ['JavaScript', 'TypeScript', 'PHP', 'ECMAScript'],
  },
  {
    category: { en: 'Frontend', es: 'Frontend' },
    skills: ['React', 'Angular', 'Redux', 'Material Design', 'Bootstrap'],
  },
  {
    category: { en: 'Backend', es: 'Backend' },
    skills: ['Node.js', 'GraphQL', 'Laravel', 'MySQL'],
  },
  {
    category: { en: 'Leadership', es: 'Liderazgo' },
    skills: ['Engineering Management', 'Team Leadership', 'Mentoring', 'Agile', 'Hiring'],
  },
  {
    category: { en: 'Tools & Practices', es: 'Herramientas y Prácticas' },
    skills: ['Git', 'TDD', 'Micro Frontends', 'Code Review', 'Scrum'],
  },
];
