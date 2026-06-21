'use client';

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
} from 'react';

export interface TerminalInputHandle {
  focus: () => void;
}

interface TerminalInputProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onTabComplete: () => void;
  onCtrlC: () => void;
  onCtrlL: () => void;
}

export const TerminalInput = forwardRef<TerminalInputHandle, TerminalInputProps>(
  function TerminalInput(
    {
      prompt,
      value,
      onChange,
      onSubmit,
      onHistoryUp,
      onHistoryDown,
      onTabComplete,
      onCtrlC,
      onCtrlL,
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit(value);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        onHistoryUp();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        onHistoryDown();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        onTabComplete();
        return;
      }

      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        onCtrlC();
        return;
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        onCtrlL();
      }
    };

    return (
      <div className="terminal-input-line">
        <span className="terminal-prompt">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
      </div>
    );
  },
);
