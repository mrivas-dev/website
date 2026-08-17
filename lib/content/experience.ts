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
        'Collaborate closely with cross-functional teams, including product management and design, to define the technical vision and roadmap',
        'Identify opportunities to leverage technology to enhance customer experience and operational efficiency',
        'Set and maintain high standards for software development practices, code quality, and delivery excellence',
        'Lead the exploration of new front end technologies, e.g. Micro Frontends using Webpack v5',
        'Lead and mentor a team of software engineers (backend, frontend, and quality), fostering a culture of craftsmanship',
        'Prioritize feature development, balancing quality, timelines, and customer expectations',
        'Implement and refine agile methodologies for efficient development and delivery',
        'Conduct regular performance reviews (1:1s), providing feedback and identifying growth opportunities',
      ],
      es: [
        'Colaboro con equipos multifuncionales, incluyendo producto y diseño, para definir la visión técnica y el roadmap',
        'Identifico oportunidades para aprovechar la tecnología y mejorar la experiencia del cliente y la eficiencia operativa',
        'Establezco y mantengo altos estándares de desarrollo, calidad de código y excelencia en la entrega',
        'Lidero la exploración de nuevas tecnologías frontend, por ejemplo Micro Frontends con Webpack v5',
        'Lidero y mentoreo un equipo de ingenieros (backend, frontend y calidad), fomentando una cultura de excelencia',
        'Priorizo el desarrollo de features, balanceando calidad, plazos y expectativas del cliente',
        'Implemento y refino metodologías ágiles para un desarrollo y entrega eficientes',
        'Realizo revisiones de desempeño periódicas (1:1), dando feedback e identificando oportunidades de crecimiento',
      ],
    },
  },
  {
    company: 'AppDirect',
    title: { en: 'Lead Frontend', es: 'Lead Frontend' },
    startYear: 2021,
    endYear: 2024,
    description: {
      en: 'Front End Tech Lead driving front-end solutions, innovation, and high-quality code delivery.',
      es: 'Tech Lead Frontend impulsando soluciones frontend, innovación y entrega de código de alta calidad.',
    },
    bullets: {
      en: [
        'Led a team of 4: 2 frontend developers, 1 backend developer, and 1 quality engineer',
        'Collaborated with product managers, designers, and backend developers to deliver exceptional user experiences',
        'Architected, designed, and implemented front end solutions using ReactJS and TypeScript',
        'Ensured code quality through code reviews, testing, and continuous integration',
        'Advocated for the adoption of emerging front end technologies and best practices',
        'Worked closely with stakeholders to translate requirements into technical solutions',
        'Contributed to the overall technical strategy and roadmap of the front end stack',
        'Participated in recruitment to build and grow the front end development team',
      ],
      es: [
        'Lideré un equipo de 4: 2 desarrolladores frontend, 1 desarrollador backend y 1 ingeniero de calidad',
        'Colaboré con product managers, diseñadores y desarrolladores backend para entregar experiencias excepcionales',
        'Diseñé e implementé soluciones frontend con ReactJS y TypeScript',
        'Aseguré la calidad del código mediante revisiones, testing e integración continua',
        'Impulsé la adopción de tecnologías frontend emergentes y mejores prácticas',
        'Trabajé con stakeholders para traducir requerimientos en soluciones técnicas',
        'Contribuí a la estrategia técnica y el roadmap del stack frontend',
        'Participé en procesos de selección para hacer crecer el equipo de desarrollo frontend',
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
        'Developed re-usable components in ReactJS',
        'Applied Test-Driven Development (TDD) practices',
        'Actively created and participated in technical designs',
        'Led and participated in Scrum ceremonies: dailies, planning, and retrospectives',
        'Conducted code reviews for peers from other teams and countries',
        'Contributed to the company private ReactJS component repository',
        'Worked closely with UX/UI designers to develop new components',
      ],
      es: [
        'Desarrollé componentes reutilizables en ReactJS',
        'Apliqué prácticas de Test-Driven Development (TDD)',
        'Creé y participé activamente en diseños técnicos',
        'Lideré y participé en ceremonias Scrum: dailies, planning y retrospectivas',
        'Realicé code reviews para colegas de otros equipos y países',
        'Contribuí al repositorio privado de componentes ReactJS de la empresa',
        'Trabajé con diseñadores UX/UI en el desarrollo de nuevos componentes',
      ],
    },
  },
  {
    company: 'Digital House',
    title: { en: 'Front End Specialization Professor', es: 'Profesor Especialización Front End' },
    startYear: 2022,
    endYear: 2022,
    description: {
      en: 'Taught front-end specialization courses at Digital House.',
      es: 'Enseñé cursos de especialización front-end en Digital House.',
    },
    bullets: {
      en: [
        'Taught ReactJS, JavaScript, TypeScript, and ECMAScript',
        'Covered Redux, Redux Thunk, Testing Library, and Git',
        'Honed the ability to explain complex concepts clearly, empowering students and colleagues',
      ],
      es: [
        'Enseñé ReactJS, JavaScript, TypeScript y ECMAScript',
        'Cubrí Redux, Redux Thunk, Testing Library y Git',
        'Perfeccioné la capacidad de explicar conceptos complejos con claridad, potenciando a alumnos y colegas',
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
        'Worked side by side with ReactJS on the frontend and NodeJS on the backend',
        'Used Bootstrap as the styles framework',
      ],
      es: [
        'Trabajé con ReactJS en el frontend y NodeJS en el backend',
        'Usé Bootstrap como framework de estilos',
      ],
    },
  },
  {
    company: 'EcomExperts',
    title: { en: 'Front-end Developer', es: 'Desarrollador de front-end' },
    startYear: 2019,
    endYear: 2020,
    description: {
      en: 'Front-end developer building client web applications.',
      es: 'Desarrollador front-end construyendo aplicaciones web para clientes.',
    },
    bullets: {
      en: [
        'Front end development with Angular 7.x and Material Design',
        'Consumed a GraphQL API',
        'Added modifications to GraphQL / NodeJS endpoints',
      ],
      es: [
        'Desarrollo frontend con Angular 7.x y Material Design',
        'Consumí una API GraphQL',
        'Agregué modificaciones a endpoints GraphQL / NodeJS',
      ],
    },
  },
  {
    company: 'Tres Erres Software',
    title: { en: 'Full-stack Developer', es: 'Desarrollador Full stack' },
    startYear: 2017,
    endYear: 2019,
    description: {
      en: 'Crafted websites from scratch with direct contact with the customer.',
      es: 'Construí sitios web desde cero con contacto directo con el cliente.',
    },
    bullets: {
      en: [
        'Front end with Angular 4.x, 6.x, and 7.x plus Material Design',
        'Back end first with SLIM PHP as an API, then Laravel PHP',
        'MySQL as the database engine',
      ],
      es: [
        'Frontend con Angular 4.x, 6.x y 7.x junto a Material Design',
        'Backend primero con SLIM PHP como API y luego Laravel PHP',
        'MySQL como motor de base de datos',
      ],
    },
  },
  {
    company: 'Grifo Creativo',
    title: { en: 'Software Developer', es: 'Desarrollador de software' },
    startYear: 2017,
    endYear: 2017,
    description: {
      en: 'Software developer at the Incubatec incubator.',
      es: 'Desarrollador de software en la incubadora Incubatec.',
    },
    bullets: {
      en: [
        'Programming with vTiger 6.0',
        'Attending meetings with customers',
      ],
      es: [
        'Programación con vTiger 6.0',
        'Participación en reuniones con clientes',
      ],
    },
  },
];
