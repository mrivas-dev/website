'use client';

import '@/components/commands';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete } from '@/components/Terminal/Autocomplete';
import { useOS } from '@/lib/contexts/OSContext';
import { useLocale } from '@/lib/contexts/LocaleContext';
import { navigateHistory } from '@/lib/history';
import { themes } from '@/components/themes';
import { getAllCommands } from '@/lib/command-registry';
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
import {
  getBootLine,
  getCommandNotFoundMessage,
  getWelcomeText,
  getTypingSlice,
  isTypingComplete,
  TYPING_INTERVAL_MS,
} from '@/lib/boot-sequence';

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
  const { locale, setLocale, t } = useLocale();
  const inputRef = useRef<TerminalInputHandle>(null);
  const hasBooted = useRef(false);
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTapHint, setShowTapHint] = useState(true);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);

  const clearHistory = useCallback(() => setHistory([]), []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const autocompleteMatches = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (query.length < 1) return [];
    return getAllCommands().filter((cmd) => cmd.name.toLowerCase().startsWith(query));
  }, [input]);

  useEffect(() => {
    setAutocompleteIndex(0);
  }, [input]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    if (!os || hasBooted.current) return;
    hasBooted.current = true;

    const bootLine: OutputLine = {
      id: nextLineId(),
      type: 'system',
      content: getBootLine(os),
      timestamp: new Date(),
    };

    const welcomeText = getWelcomeText(t('ui.bootMessage'), t('ui.welcomeHint'));
    const typingLineId = nextLineId();

    setHistory([
      bootLine,
      {
        id: typingLineId,
        type: 'system',
        content: '',
        timestamp: new Date(),
      },
    ]);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex += 1;
      const slice = getTypingSlice(welcomeText, charIndex);
      setHistory((prev) =>
        prev.map((line) =>
          line.id === typingLineId ? { ...line, content: slice } : line,
        ),
      );
      if (isTypingComplete(welcomeText, charIndex)) {
        clearInterval(interval);
      }
    }, TYPING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [os, t]);

  const dismissTapHint = useCallback(() => setShowTapHint(false), []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      if (value.length > 0) dismissTapHint();
    },
    [dismissTapHint],
  );

  const handleTabComplete = useCallback(() => {
    if (autocompleteMatches.length === 0) return;
    const index = autocompleteIndex % autocompleteMatches.length;
    setInput(autocompleteMatches[index].name);
    setAutocompleteIndex((prev) => (prev + 1) % autocompleteMatches.length);
  }, [autocompleteMatches, autocompleteIndex]);

  const handleSubmit = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed || !os || !profile) return;

      const prompt = profile.prompt(cwd);
      const inputLine: OutputLine = {
        id: nextLineId(),
        type: 'input',
        content: rawInput,
        prompt,
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
        locale,
        setLocale,
        t,
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
            content: getCommandNotFoundMessage(os, resolvedName),
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
    [os, profile, cwd, history, clearHistory, locale, setLocale, t, focusInput],
  );

  const handleHistoryUp = useCallback(() => {
    const { index, value } = navigateHistory(commandHistory, historyIndex, 'up');
    setHistoryIndex(index);
    setInput(value);
  }, [commandHistory, historyIndex]);

  const handleHistoryDown = useCallback(() => {
    const { index, value } = navigateHistory(commandHistory, historyIndex, 'down');
    setHistoryIndex(index);
    setInput(value);
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
    <div
      className="terminal-page"
      role="application"
      aria-label="Interactive terminal"
      onClick={focusInput}
    >
      <TerminalWindow os={os} title={title}>
        <TerminalOutput lines={history} />
        <div className="terminal-input-area">
          <Autocomplete
            input={input}
            activeIndex={autocompleteIndex}
            onSelect={setInput}
            onDismiss={() => {}}
          />
          <TerminalInput
            ref={inputRef}
            prompt={prompt}
            value={input}
            onChange={handleInputChange}
            onFocus={dismissTapHint}
            onSubmit={handleSubmit}
            onHistoryUp={handleHistoryUp}
            onHistoryDown={handleHistoryDown}
            onTabComplete={handleTabComplete}
            onCtrlC={handleCtrlC}
            onCtrlL={handleCtrlL}
          />
          {showTapHint && (
            <div className="tap-hint" aria-hidden="true">
              {t('ui.tapToType')}
            </div>
          )}
        </div>
      </TerminalWindow>
    </div>
  );
}
