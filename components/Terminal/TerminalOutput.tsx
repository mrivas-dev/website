'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | ReactNode;
  timestamp: Date;
}

interface TerminalOutputProps {
  lines: OutputLine[];
}

const ANSI_COLORS: Record<number, string> = {
  30: '#000000',
  31: '#ff5555',
  32: '#50fa7b',
  33: '#f1fa8c',
  34: '#bd93f9',
  35: '#ff79c6',
  36: '#8be9fd',
  37: '#f8f8f2',
  90: '#6272a4',
  91: '#ff6e6e',
  92: '#69ff94',
  93: '#ffffa5',
  94: '#d6acff',
  95: '#ff92df',
  96: '#a4ffff',
  97: '#ffffff',
};

function parseAnsi(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /\x1b\[(\d+)m/g;
  let lastIndex = 0;
  let currentColor: string | undefined;
  let match: RegExpExecArray | null;

  const pushSegment = (segment: string) => {
    if (!segment) return;
    parts.push(
      currentColor ? (
        <span key={`${parts.length}-${segment.slice(0, 12)}`} style={{ color: currentColor }}>
          {segment}
        </span>
      ) : (
        segment
      ),
    );
  };

  while ((match = regex.exec(text)) !== null) {
    pushSegment(text.slice(lastIndex, match.index));
    lastIndex = regex.lastIndex;

    const code = Number(match[1]);
    if (code === 0) {
      currentColor = undefined;
    } else if (ANSI_COLORS[code]) {
      currentColor = ANSI_COLORS[code];
    }
  }

  pushSegment(text.slice(lastIndex));
  return parts.length === 1 ? parts[0] : parts;
}

function renderContent(content: string | ReactNode): ReactNode {
  if (typeof content !== 'string') return content;
  if (!content.includes('\x1b[')) return content;
  return parseAnsi(content);
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={containerRef}
      className="terminal-output"
      aria-live="polite"
      aria-label="Terminal output"
    >
      {lines.map((line) => (
        <div key={line.id} className={`terminal-line terminal-line-${line.type}`}>
          {line.type === 'error' && <span className="terminal-error-prefix">✗ </span>}
          <pre className="terminal-line-content">{renderContent(line.content)}</pre>
        </div>
      ))}
    </div>
  );
}
