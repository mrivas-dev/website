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
    id: 'ecommerce-platform',
    number: 1,
    name: 'Ecommerce Platform',
    tagline: {
      en: 'High-traffic online store with real-time inventory',
      es: 'Tienda en línea de alto tráfico con inventario en tiempo real',
    },
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    role: { en: 'Engineering Manager', es: 'Gerente de Ingeniería' },
    year: 2023,
    description: {
      en: 'Led the rebuild of a legacy e-commerce platform serving 50k daily users. Introduced event-driven architecture and cut page load times by 60%.',
      es: 'Lideré la reconstrucción de una plataforma e-commerce legacy con 50k usuarios diarios. Introduje arquitectura orientada a eventos y reduje tiempos de carga un 60%.',
    },
    github: 'github.com/matiasemrivas/ecommerce',
  },
  {
    id: 'devops-dashboard',
    number: 2,
    name: 'DevOps Dashboard',
    tagline: {
      en: 'Unified observability for distributed systems',
      es: 'Observabilidad unificada para sistemas distribuidos',
    },
    stack: ['React', 'GraphQL', 'Kubernetes'],
    role: { en: 'Tech Lead', es: 'Líder Técnico' },
    year: 2022,
    description: {
      en: 'Built an internal dashboard aggregating metrics, logs, and alerts across 30 microservices. Reduced mean time to detection by 50%.',
      es: 'Construí un dashboard interno que agrega métricas, logs y alertas de 30 microservicios. Reduje el tiempo medio de detección un 50%.',
    },
    github: 'github.com/matiasemrivas/devops-dashboard',
  },
  {
    id: 'mobile-banking',
    number: 3,
    name: 'Mobile Banking App',
    tagline: {
      en: 'Secure mobile banking for emerging markets',
      es: 'Banca móvil segura para mercados emergentes',
    },
    stack: ['React Native', 'Spring Boot', 'AWS'],
    role: { en: 'Senior Engineer', es: 'Ingeniero Senior' },
    year: 2020,
    description: {
      en: 'Core contributor to a mobile banking app with 200k+ active users. Implemented biometric auth and offline-first transaction queue.',
      es: 'Contribuidor principal de una app de banca móvil con más de 200k usuarios activos. Implementé autenticación biométrica y cola de transacciones offline-first.',
    },
    url: 'https://example.com/mobile-banking',
  },
];
