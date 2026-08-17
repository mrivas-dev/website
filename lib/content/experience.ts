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
    company: 'AppDirect',
    title: { en: 'Engineering Manager', es: 'Engineering Manager' },
    startYear: 2024,
    endYear: 'Present',
    description: {
      en: 'Leading engineering teams building AppDirect\'s multi-category B2B platform.',
      es: 'Lidero equipos de ingeniería construyendo la plataforma B2B multicategoría de AppDirect.',
    },
    bullets: {
      en: [
        'Collaborate with product and design to define the technical vision and roadmap',
        'Lead and mentor a team of backend, frontend, and quality engineers',
        'Drive adoption of micro frontends and front-end best practices',
      ],
      es: [
        'Colaboro con producto y diseño para definir la visión técnica y el roadmap',
        'Lidero y mentoré un equipo de ingenieros backend, frontend y calidad',
        'Impulso la adopción de micro frontends y mejores prácticas frontend',
      ],
    },
  },
  {
    company: 'AppDirect',
    title: { en: 'Lead Frontend', es: 'Lead Frontend' },
    startYear: 2021,
    endYear: 2024,
    description: {
      en: 'Front End Tech Lead driving front-end solutions and team growth.',
      es: 'Tech Lead Frontend impulsando soluciones frontend y crecimiento del equipo.',
    },
    bullets: {
      en: [
        'Led a team of 4: 2 frontend devs, 1 backend dev, and 1 QA engineer',
        'Architected front-end solutions using ReactJS and TypeScript',
        'Drove code quality through reviews, testing, and continuous integration',
      ],
      es: [
        'Lideré un equipo de 4: 2 devs frontend, 1 dev backend y 1 QA',
        'Diseñé soluciones frontend con ReactJS y TypeScript',
        'Impulsé la calidad de código mediante revisiones, testing e integración continua',
      ],
    },
  },
  {
    company: 'AppDirect',
    title: { en: 'Full Stack Engineer', es: 'Full Stack Engineer' },
    startYear: 2020,
    endYear: 2021,
    description: {
      en: 'Fullstack engineer on the core subscription commerce platform.',
      es: 'Ingeniero fullstack en la plataforma principal de comercio de suscripciones.',
    },
    bullets: {
      en: [
        'Built reusable ReactJS components and applied Test-Driven Development',
        'Contributed to the company private ReactJS component repository',
        'Worked closely with UX/UI designers to develop new components',
      ],
      es: [
        'Construí componentes reutilizables en ReactJS y apliqué Test-Driven Development',
        'Contribuí al repositorio privado de componentes ReactJS de la empresa',
        'Trabajé con diseñadores UX/UI en el desarrollo de nuevos componentes',
      ],
    },
  },
  {
    company: 'Digital House',
    title: { en: 'Front End Professor', es: 'Profesor Front End' },
    startYear: 2022,
    endYear: 2022,
    description: {
      en: 'Taught front-end specialization courses at Digital House.',
      es: 'Enseñé cursos de especialización front-end en Digital House.',
    },
    bullets: {
      en: [
        'Taught ReactJS, TypeScript, Redux, Redux Thunk, Testing Library, Git, and ECMAScript',
      ],
      es: [
        'Enseñé ReactJS, TypeScript, Redux, Redux Thunk, Testing Library, Git y ECMAScript',
      ],
    },
  },
  {
    company: 'BTCJ',
    title: { en: 'Full Stack Engineer', es: 'Full Stack Engineer' },
    startYear: 2019,
    endYear: 2021,
    description: {
      en: 'Full-stack development across client projects.',
      es: 'Desarrollo full-stack en proyectos para clientes.',
    },
    bullets: {
      en: [
        'Full-stack development with ReactJS on the frontend and Node.js on the backend',
        'Styled applications using the Bootstrap framework',
      ],
      es: [
        'Desarrollo full-stack con ReactJS en el frontend y Node.js en el backend',
        'Estilé aplicaciones usando el framework Bootstrap',
      ],
    },
  },
  {
    company: 'EcomExperts',
    title: { en: 'Front-end Developer', es: 'Desarrollador Front-end' },
    startYear: 2019,
    endYear: 2020,
    description: {
      en: 'Front-end developer building client web applications.',
      es: 'Desarrollador front-end construyendo aplicaciones web para clientes.',
    },
    bullets: {
      en: [
        'Front-end development with Angular 7.x and Material Design',
        'Consumed and extended a GraphQL / Node.js API',
      ],
      es: [
        'Desarrollo frontend con Angular 7.x y Material Design',
        'Consumí y extendí una API GraphQL / Node.js',
      ],
    },
  },
  {
    company: 'Tres Erres Software',
    title: { en: 'Full-stack Developer', es: 'Desarrollador Full stack' },
    startYear: 2017,
    endYear: 2019,
    description: {
      en: 'Built websites from scratch with direct client contact.',
      es: 'Construí sitios web desde cero con contacto directo con el cliente.',
    },
    bullets: {
      en: [
        'Front-end with Angular 4.x / 6.x / 7.x and Material Design',
        'Back-end with SLIM PHP (as an API) then Laravel PHP; MySQL database',
      ],
      es: [
        'Frontend con Angular 4.x / 6.x / 7.x y Material Design',
        'Backend con SLIM PHP (como API) y luego Laravel PHP; base de datos MySQL',
      ],
    },
  },
];
