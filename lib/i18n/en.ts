import type { Translations } from './types';

const en: Translations = {
  ui: {
    windowTitle: 'Terminal Portfolio',
    bootMessage: 'System ready.',
    welcomeHint: 'Type "help" to see available commands.',
    inputPlaceholder: 'Enter command...',
    tapToType: 'Tap to type',
    commandNotFound: 'command not found',
  },
  commands: {
    help: {
      header: 'Available commands:',
      footer: 'Type a command name for more details.',
    },
    about: {
      yearsFormat: '{years} years of experience',
      hint: "Type 'resume' to download the résumé or 'experience' for career history.",
    },
    resume: {
      download: '📄 Download: resume.pdf',
    },
    experience: {
      present: 'Present',
      fullHint: "Type 'experience --full' for detailed descriptions.",
    },
    skills: {
      header: 'Skills & Technologies',
    },
    projects: {
      inspect: "Type 'project <name or number>' for details.",
    },
    project: {
      stack: 'Stack:',
      role: 'Role:',
      year: 'Year:',
      notFound: 'Project not found.',
    },
    contact: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    github: {
      opened: 'Opening GitHub profile...',
    },
    linkedin: {
      opened: 'Opening LinkedIn profile...',
    },
    lang: {
      current: 'Current language:',
      switched: 'Language updated.',
    },
  },
  eastereggs: {
    sudoHireMe: [
      'Checking permissions...',
      'Access granted.',
      'Welcome aboard!',
    ],
    coffee: 'Brewing... ☕ Hang tight.',
    hack: 'ACCESS GRANTED.',
    fortune: [
      'A bug in the hand is better than two in the code.',
      'You will refactor something you wrote last week.',
      'The best code is the code you delete.',
      'Trust the process, but verify with tests.',
      'Your next commit will be your best yet.',
    ],
    joke: [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
      'There are only 10 types of people: those who understand binary and those who don\'t.',
      'I would tell you a UDP joke, but you might not get it.',
      'Programming is 10% writing code and 90% understanding why it doesn\'t work.',
    ],
    rmRf: 'Nice try. This terminal is read-only.',
    vim: 'Entering vim... just kidding. Type \'help\' instead.',
  },
  errors: {
    commandNotFound: 'command not found',
    noSuchFile: 'No such file or directory',
    noSuchDir: 'No such file or directory',
    invalidArgs: 'Invalid arguments',
  },
};

export default en;
