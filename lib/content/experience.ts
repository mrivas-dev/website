import type { Locale } from '@/lib/i18n';

export interface Role {
  company: string;
  title: Record<Locale, string>;
  startYear: number;
  endYear: number | 'Present';
  description: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
}

export const experience: Role[] = [
  {
    company: 'TechCorp',
    title: { en: 'Engineering Manager', es: 'Gerente de Ingeniería' },
    startYear: 2021,
    endYear: 'Present',
    description: {
      en: 'Lead a team of 12 engineers across platform and product squads.',
      es: 'Lidero un equipo de 12 ingenieros en squads de plataforma y producto.',
    },
    bullets: {
      en: [
        'Scaled the platform to handle 3x traffic growth',
        'Reduced incident rate by 40% through SRE practices',
        'Hired and mentored 8 engineers in two years',
      ],
      es: [
        'Escalé la plataforma para soportar 3x más tráfico',
        'Reduje incidentes un 40% con prácticas SRE',
        'Contraté y mentoré a 8 ingenieros en dos años',
      ],
    },
  },
  {
    company: 'StartupXYZ',
    title: { en: 'Senior Software Engineer', es: 'Ingeniero de Software Senior' },
    startYear: 2018,
    endYear: 2021,
    description: {
      en: 'Full-stack engineer on the core product team.',
      es: 'Ingeniero full-stack en el equipo de producto principal.',
    },
    bullets: {
      en: [
        'Built the payments microservice from scratch',
        'Led migration from monolith to microservices',
        'Introduced automated testing across the codebase',
      ],
      es: [
        'Construí el microservicio de pagos desde cero',
        'Lideré la migración de monolito a microservicios',
        'Introduje pruebas automatizadas en todo el código',
      ],
    },
  },
  {
    company: 'AgencyCo',
    title: { en: 'Software Engineer', es: 'Ingeniero de Software' },
    startYear: 2015,
    endYear: 2018,
    description: {
      en: 'Delivered client projects across fintech and e-commerce.',
      es: 'Entregué proyectos para clientes en fintech y e-commerce.',
    },
    bullets: {
      en: [
        'Shipped 15+ client projects on time and on budget',
        'Built reusable component library adopted by 5 teams',
        'Mentored junior developers on best practices',
      ],
      es: [
        'Entregué más de 15 proyectos a tiempo y dentro del presupuesto',
        'Construí biblioteca de componentes reutilizable adoptada por 5 equipos',
        'Mentoré a desarrolladores junior en buenas prácticas',
      ],
    },
  },
  {
    company: 'UniLab',
    title: { en: 'Junior Developer', es: 'Desarrollador Junior' },
    startYear: 2013,
    endYear: 2015,
    description: {
      en: 'Research lab software for data visualization.',
      es: 'Software de laboratorio de investigación para visualización de datos.',
    },
    bullets: {
      en: [
        'Developed interactive dashboards for research datasets',
        'Contributed to open-source visualization library',
      ],
      es: [
        'Desarrollé dashboards interactivos para conjuntos de datos de investigación',
        'Contribuí a una biblioteca open-source de visualización',
      ],
    },
  },
];
