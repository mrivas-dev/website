'use client';

import { useEffect, useMemo } from 'react';
import { getAllCommands } from '@/lib/command-registry';

interface AutocompleteProps {
  input: string;
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

export function Autocomplete({ input, onSelect, onDismiss }: AutocompleteProps) {
  const matches = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (query.length < 1) return [];
    return getAllCommands()
      .map((cmd) => cmd.name)
      .filter((name) => name.toLowerCase().startsWith(query));
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  if (input.trim().length < 1 || matches.length === 0) {
    return null;
  }

  return (
    <ul
      className="terminal-autocomplete"
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 4px)',
        left: 0,
        background: 'var(--terminal-bg)',
        color: 'var(--terminal-fg)',
        border: '1px solid var(--terminal-accent)',
        listStyle: 'none',
        margin: 0,
        padding: '4px 0',
        zIndex: 10,
      }}
    >
      {matches.map((name) => (
        <li key={name}>
          <button
            type="button"
            onClick={() => onSelect(name)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--terminal-fg)',
              cursor: 'pointer',
              display: 'block',
              padding: '2px 8px',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}
