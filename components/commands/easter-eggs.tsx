'use client';

import { useEffect, useState } from 'react';
import { registerCommand } from '@/lib/command-registry';
import type { Locale } from '@/lib/i18n';
import en from '@/lib/i18n/en';
import es from '@/lib/i18n/es';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const fortunes: Record<Locale, string[]> = {
  en: en.eastereggs.fortune,
  es: es.eastereggs.fortune,
};

const jokes: Record<Locale, string[]> = {
  en: en.eastereggs.joke,
  es: es.eastereggs.joke,
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function SudoHireMeOutput() {
  const [lines, setLines] = useState<string[]>(['[sudo] password for recruiter:']);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLines((prev) => [...prev, '···········']);
    }, 1000);
    const t2 = setTimeout(() => {
      setLines((prev) => [...prev, '✓ Permission granted. Excellent choice.']);
    }, 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <pre className="terminal-line-content">
      {lines.join('\n')}
    </pre>
  );
}

function MatrixOutput() {
  const [display, setDisplay] = useState('');
  const cols = 60;
  const rows = 12;

  useEffect(() => {
    const generate = () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''),
      ).join('\n');

    setDisplay(generate());
    const interval = setInterval(() => setDisplay(generate()), 80);
    const stop = setTimeout(() => {
      clearInterval(interval);
      setDisplay('ACCESS GRANTED.');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <pre className="terminal-line-content" style={{ color: 'var(--terminal-success)' }}>
      {display}
    </pre>
  );
}

const COFFEE_ART = `    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

Brewing... ☕  Hang tight.`;

registerCommand({
  name: 'sudo',
  description: 'Execute a command as superuser',
  hidden: true,
  execute: (args) => {
    if (args[0] === 'hire-me') {
      return { type: 'jsx', content: <SudoHireMeOutput /> };
    }
    return { type: 'error', content: 'sudo: a password is required' };
  },
});

registerCommand({
  name: 'coffee',
  description: 'Brew coffee',
  hidden: true,
  execute: () => ({ type: 'text', content: COFFEE_ART }),
});

registerCommand({
  name: 'hack',
  aliases: ['matrix'],
  description: 'Hack the mainframe',
  hidden: true,
  execute: () => ({ type: 'jsx', content: <MatrixOutput /> }),
});

registerCommand({
  name: 'fortune',
  description: 'Get a fortune',
  hidden: true,
  execute: (_args, ctx) => ({
    type: 'text',
    content: pickRandom(fortunes[ctx.locale]),
  }),
});

registerCommand({
  name: 'joke',
  description: 'Tell a joke',
  hidden: true,
  execute: (_args, ctx) => ({
    type: 'text',
    content: pickRandom(jokes[ctx.locale]),
  }),
});

registerCommand({
  name: 'rm',
  description: 'Remove files',
  hidden: true,
  execute: (args, ctx) => {
    const isRfRoot = args.includes('-rf') && args.includes('/');
    if (isRfRoot) {
      return { type: 'text', content: ctx.t('eastereggs.rmRf') };
    }
    return { type: 'error', content: 'rm: missing operand' };
  },
});

registerCommand({
  name: 'vim',
  description: 'Open vim',
  hidden: true,
  execute: (_args, ctx) => ({
    type: 'text',
    content: ctx.t('eastereggs.vim'),
  }),
});
