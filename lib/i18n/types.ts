export interface Translations {
  ui: {
    windowTitle: string;
    bootMessage: string;
    welcomeHint: string;
    inputPlaceholder: string;
    tapToType: string;
    commandNotFound: string;
  };
  commands: {
    help: { header: string; footer: string };
    about: { yearsFormat: string; hint: string };
    resume: { download: string };
    experience: { present: string; fullHint: string };
    skills: { header: string };
    projects: { inspect: string };
    project: { stack: string; role: string; year: string; notFound: string };
    contact: { email: string; linkedin: string; github: string };
    github: { opened: string };
    linkedin: { opened: string };
    lang: { current: string; switched: string };
  };
  eastereggs: {
    sudoHireMe: string[];
    coffee: string;
    hack: string;
    fortune: string[];
    joke: string[];
    rmRf: string;
    vim: string;
  };
  errors: {
    commandNotFound: string;
    noSuchFile: string;
    noSuchDir: string;
    invalidArgs: string;
  };
}
