import type { Translations } from './types';

const es: Translations = {
  ui: {
    windowTitle: 'Portafolio Terminal',
    bootMessage: 'Sistema listo.',
    welcomeHint: 'Escribe "help" para ver los comandos disponibles.',
    inputPlaceholder: 'Ingresa un comando...',
    tapToType: 'Toca aquí para escribir un comando',
    commandNotFound: 'comando no encontrado',
  },
  commands: {
    help: {
      header: 'Comandos disponibles:',
      footer: 'Escribe un comando para más detalles.',
    },
    about: {
      yearsFormat: '{years} años de experiencia',
      hint: "Escribe 'resume' para descargar el currículum o 'experience' para ver tu historial.",
    },
    resume: {
      download: '📄 Descargar: resume.pdf',
    },
    experience: {
      present: 'Presente',
      fullHint: "Escribe 'experience --full' para ver descripciones detalladas.",
    },
    skills: {
      header: 'Habilidades y Tecnologías',
    },
    projects: {
      inspect: "Escribe 'project <nombre o número>' para ver detalles.",
    },
    project: {
      stack: 'Stack:',
      role: 'Rol:',
      year: 'Año:',
      notFound: 'Proyecto no encontrado.',
    },
    contact: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    github: {
      opened: 'Abriendo perfil de GitHub...',
    },
    linkedin: {
      opened: 'Abriendo perfil de LinkedIn...',
    },
    lang: {
      current: 'Idioma actual:',
      switched: 'Idioma actualizado.',
    },
  },
  eastereggs: {
    sudoHireMe: [
      'Verificando permisos...',
      'Acceso concedido.',
      '¡Bienvenido al equipo!',
    ],
    coffee: 'Preparando... ☕ Un momento.',
    hack: 'ACCESO CONCEDIDO.',
    fortune: [
      'El mejor código es ningún código.',
      '"En mi máquina funciona." — envía la máquina.',
      'Cualquier tonto puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos entienden.',
      'Primero, resuelve el problema. Luego, escribe el código.',
      'El código es como el humor. Cuando hay que explicarlo, es malo.',
    ],
    joke: [
      '¿Por qué los programadores prefieren el modo oscuro?\n\nPorque la luz atrae bugs.',
      '¿Por qué los desarrolladores Java usan lentes?\n\nPorque no C#.',
      'Una consulta SQL entra a un bar, se acerca a dos mesas y pregunta: "¿Puedo unirme?"',
      'Solo hay 10 tipos de personas: las que entienden binario y las que no.',
      'Te contaría un chiste de UDP, pero quizás no lo recibirías.',
    ],
    rmRf: 'Buen intento. Este terminal es de solo lectura.',
    vim: 'Entrando a vim... es broma. Escribe \'help\' en su lugar.',
  },
  errors: {
    commandNotFound: 'comando no encontrado',
    noSuchFile: 'No existe el archivo o directorio',
    noSuchDir: 'No existe el archivo o directorio',
    invalidArgs: 'Argumentos inválidos',
  },
};

export default es;
