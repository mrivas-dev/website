import type { Locale } from '@/lib/i18n';

export interface AboutContent {
  name: string;
  role: string;
  yearsOfExperience: number;
  intro: string;
  summary: string;
}

export const about: Record<Locale, AboutContent> = {
  en: {
    name: 'Matias Rivas',
    role: 'Engineering Manager',
    yearsOfExperience: 10,
    intro: 'Hi, I\'m Matias — I lead engineering teams building products that scale.',
    summary:
      'I combine hands-on technical depth with people leadership to ship reliable software. Over the past decade I\'ve grown teams, defined roadmaps, and delivered platforms used by thousands of users.',
  },
  es: {
    name: 'Matias Rivas',
    role: 'Gerente de Ingeniería',
    yearsOfExperience: 10,
    intro: 'Hola, soy Matias — lidero equipos de ingeniería que construyen productos que escalan.',
    summary:
      'Combino profundidad técnica con liderazgo de personas para entregar software confiable. En la última década he hecho crecer equipos, definido roadmaps y lanzado plataformas usadas por miles de usuarios.',
  },
};
