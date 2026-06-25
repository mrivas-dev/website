'use client';

import { useEffect, useMemo } from 'react';
import { getAllCommands } from '@/lib/command-registry';

interface AutocompleteProps {
  input: string;
  activeIndex: number;
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

export function Autocomplete({
  input,
  activeIndex,
  onSelect,
  onDismiss,
}: AutocompleteProps) {
  const matches = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (query.length < 1) return [];
    return getAllCommands().filter((cmd) =>
      cmd.name.toLowerCase().startsWith(query),
    );
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

  const safeIndex = activeIndex % matches.length;

  return (
    <ul
      className="terminal-autocomplete"
      role="listbox"
      aria-label="Command suggestions"
    >
      {matches.map((cmd, index) => {
        const active = index === safeIndex;
        return (
          <li key={cmd.name} role="presentation">
            <button
              type="button"
              className={`terminal-autocomplete-row${active ? ' active' : ''}`}
              role="option"
              aria-selected={active}
              onClick={() => onSelect(cmd.name)}
            >
              <span className="terminal-autocomplete-bullet" aria-hidden="true" />
              <span className="terminal-autocomplete-command">{cmd.name}</span>
              <span className="terminal-autocomplete-desc">{cmd.description}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
