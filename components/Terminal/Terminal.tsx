'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useOS } from '@/lib/contexts/OSContext';
import { themes } from '@/components/themes';
import {
  getCommand,
  parseInput,
  type CommandContext,
  type CommandResult,
} from '@/lib/command-registry';
import { TerminalWindow } from '@/components/Terminal/TerminalWindow';
import {
  TerminalInput,
  type TerminalInputHandle,
} from '@/components/Terminal/TerminalInput';
import {
  TerminalOutput,
  type OutputLine,
} from '@/components/Terminal/TerminalOutput';

let lineId = 0;

function nextLineId(): string {
  lineId += 1;
  return `line-${lineId}`;
}

function resultToLine(result: CommandResult): OutputLine | null {
  switch (result.type) {
    case 'clear':
      return null;
    case 'text':
      return {
        id: nextLineId(),
        type: 'output',
        content: result.content,
        timestamp: new Date(),
      };
    case 'jsx':
      return {
        id: nextLineId(),
        type: 'output',
        content: result.content,
        timestamp: new Date(),
      };
    case 'error':
      return {
        id: nextLineId(),
        type: 'error',
        content: result.content,
        timestamp: new Date(),
      };
  }
}

export function Terminal() {
  const { os, profile } = useOS();
  const inputRef = useRef<TerminalInputHandle>(null);
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const clearHistory = useCallback(() => setHistory([]), []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const handleSubmit = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed || !os || !profile) return;

      const prompt = profile.prompt(cwd);
      const inputLine: OutputLine = {
        id: nextLineId(),
        type: 'input',
        content: `${prompt}${rawInput}`,
        timestamp: new Date(),
      };

      const { name, args } = parseInput(trimmed);
      const resolvedName = profile.commandAliases[name] ?? name;
      const command = getCommand(resolvedName);

      const ctx: CommandContext = {
        os,
        cwd,
        setCwd,
        history,
        clearHistory,
      };

      let newLines: OutputLine[] = [inputLine];

      if (command) {
        const result = command.execute(args, ctx);
        if (result.type === 'clear') {
          setHistory([]);
          setCommandHistory((prev) => [...prev, trimmed]);
          setHistoryIndex(-1);
          setInput('');
          focusInput();
          return;
        }

        const outputLine = resultToLine(result);
        if (outputLine) {
          newLines = [...newLines, outputLine];
        }
      } else {
        newLines = [
          ...newLines,
          {
            id: nextLineId(),
            type: 'error',
            content: `${resolvedName}: command not found`,
            timestamp: new Date(),
          },
        ];
      }

      setHistory((prev) => [...prev, ...newLines]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setInput('');
      focusInput();
    },
    [os, profile, cwd, history, clearHistory, focusInput],
  );

  const handleHistoryUp = useCallback(() => {
    if (commandHistory.length === 0) return;

    setHistoryIndex((prev) => {
      const nextIndex = prev === -1 ? commandHistory.length - 1 : Math.max(0, prev - 1);
      setInput(commandHistory[nextIndex] ?? '');
      return nextIndex;
    });
  }, [commandHistory]);

  const handleHistoryDown = useCallback(() => {
    if (commandHistory.length === 0 || historyIndex === -1) return;

    setHistoryIndex((prev) => {
      if (prev >= commandHistory.length - 1) {
        setInput('');
        return -1;
      }

      const nextIndex = prev + 1;
      setInput(commandHistory[nextIndex] ?? '');
      return nextIndex;
    });
  }, [commandHistory, historyIndex]);

  const handleCtrlC = useCallback(() => {
    setInput('');
    setHistory((prev) => [
      ...prev,
      {
        id: nextLineId(),
        type: 'system',
        content: '^C',
        timestamp: new Date(),
      },
    ]);
    focusInput();
  }, [focusInput]);

  const handleCtrlL = useCallback(() => {
    clearHistory();
    focusInput();
  }, [clearHistory, focusInput]);

  if (!os || !profile) return null;

  const title = themes[os].windowTitle;
  const prompt = profile.prompt(cwd);

  return (
    <div className="terminal-page" onClick={focusInput}>
      <TerminalWindow os={os} title={title}>
        <TerminalOutput lines={history} />
        <TerminalInput
          ref={inputRef}
          prompt={prompt}
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          onHistoryUp={handleHistoryUp}
          onHistoryDown={handleHistoryDown}
          onTabComplete={() => {}}
          onCtrlC={handleCtrlC}
          onCtrlL={handleCtrlL}
        />
      </TerminalWindow>
    </div>
  );
}
