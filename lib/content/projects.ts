import type { Locale } from '@/lib/i18n';

export interface Project {
  id: string;
  number: number;
  name: string;
  tagline: Record<Locale, string>;
  stack: string[];
  role: Record<Locale, string>;
  year: number;
  description: Record<Locale, string>;
  github?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'appdirect-marketplace',
    number: 1,
    name: 'AppDirect Marketplace',
    tagline: {
      en: 'Core subscription commerce and B2B marketplace platform',
      es: 'Plataforma principal de comercio de suscripciones y marketplace B2B',
    },
    stack: ['React', 'Node.js', 'TypeScript'],
    role: { en: 'Full Stack Engineer', es: 'Full Stack Engineer' },
    year: 2021,
    description: {
      en: 'Built features end-to-end for AppDirect\'s core subscription commerce platform, improving subscription flows and strengthening the marketplace experience. Developed reusable ReactJS components and applied Test-Driven Development practices.',
      es: 'Construí features de punta a punta para la plataforma principal de comercio de suscripciones de AppDirect, mejorando los flujos de suscripción y fortaleciendo la experiencia del marketplace. Desarrollé componentes reutilizables en ReactJS y apliqué prácticas de Test-Driven Development.',
    },
    url: 'https://www.appdirect.com',
  },
  {
    id: 'appdirect-micro-frontends',
    number: 2,
    name: 'AppDirect Micro Frontends',
    tagline: {
      en: 'Cross-team micro frontends using Webpack Module Federation',
      es: 'Micro frontends entre equipos usando Webpack Module Federation',
    },
    stack: ['React', 'TypeScript', 'Webpack v5'],
    role: { en: 'Tech Lead & Senior Developer', es: 'Tech Lead & Senior Developer' },
    year: 2023,
    description: {
      en: 'Implemented micro frontends across the company using Webpack v5 Module Federation, enabling architectural consistency and cross-team impact. Led one team\'s technical direction and scaled front-end delivery standards organization-wide.',
      es: 'Implementé micro frontends en toda la empresa usando Webpack v5 Module Federation, habilitando consistencia arquitectónica e impacto entre equipos. Lideré la dirección técnica de un equipo y escalé los estándares de entrega frontend a nivel organizacional.',
    },
    url: 'https://www.appdirect.com',
  },
  {
    id: 'appdirect-everything-store',
    number: 3,
    name: 'AppDirect Everything Store',
    tagline: {
      en: 'Multi-category B2B ecosystem: energy, mobility, connectivity',
      es: 'Ecosistema B2B multicategoría: energía, movilidad, conectividad',
    },
    stack: ['React', 'TypeScript', 'Micro Frontends'],
    role: { en: 'Engineering Manager', es: 'Engineering Manager' },
    year: 2024,
    description: {
      en: 'Leading engineering teams building AppDirect\'s Everything Store vision — expanding the platform into energy procurement, mobility lifecycle management, network & connectivity, and hyperscaler integrations. Focus on growing engineers, building sustainable teams, and creating delivery clarity at scale.',
      es: 'Lidero equipos de ingeniería construyendo la visión Everything Store de AppDirect — expandiendo la plataforma a adquisición de energía, gestión del ciclo de vida de movilidad, red y conectividad, e integraciones con hyperscalers. Foco en hacer crecer ingenieros, construir equipos sostenibles y crear claridad de entrega a escala.',
    },
    url: 'https://www.appdirect.com',
  },
];
