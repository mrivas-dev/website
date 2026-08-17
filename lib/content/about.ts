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
    name: 'Matías Rivas',
    role: 'Software Engineering Manager',
    yearsOfExperience: 10,
    intro: "Hi, I'm Matías — Software Engineering Manager leading teams that build scalable products.",
    summary:
      "Restless software engineer with over 10 years of hands-on experience in frontend development, primarily using JavaScript-based libraries and frameworks (ReactJS, Angular), but also enjoying challenges across Backend and DevOps. Currently at one of the leading SaaS companies, managing projects to success while helping teams grow. I excel in environments that foster innovation, collaboration, and continuous improvement, leading teams to deliver high-quality, scalable applications.",
  },
  es: {
    name: 'Matías Rivas',
    role: 'Software Engineering Manager',
    yearsOfExperience: 10,
    intro: 'Hola, soy Matías — Software Engineering Manager liderando equipos que construyen productos escalables.',
    summary:
      'Ingeniero de software inquieto con más de 10 años de experiencia práctica en desarrollo frontend, principalmente con librerías y frameworks basados en JavaScript (ReactJS, Angular), pero también disfrutando desafíos en Backend y DevOps. Actualmente en una de las principales empresas SaaS, gestionando proyectos con éxito mientras ayudo a los equipos a crecer. Destaco en entornos que fomentan la innovación, la colaboración y la mejora continua, liderando equipos para entregar aplicaciones escalables y de alta calidad.',
  },
};
