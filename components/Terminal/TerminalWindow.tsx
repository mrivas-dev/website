'use client';

import type { ReactNode } from 'react';
import type { OS } from '@/lib/os-detect';
import { themes } from '@/components/themes';

interface TerminalWindowProps {
  os: OS | null;
  title: string;
  children: ReactNode;
}

export function TerminalWindow({ os, title, children }: TerminalWindowProps) {
  const chrome = os ?? 'macos';
  const theme = themes[chrome];

  return (
    <div
      className="terminal-window"
      data-os={chrome}
      style={{
        borderRadius: theme.borderRadius,
        background: theme.background,
      }}
    >
      <div className="terminal-chrome" data-os={chrome}>
        {chrome === 'macos' && <MacOSChrome title={title} />}
        {chrome === 'linux' && <LinuxChrome title={title} />}
        {chrome === 'windows' && <WindowsChrome title={title} />}
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}

function MacOSChrome({ title }: { title: string }) {
  return (
    <div className="chrome-bar chrome-bar-macos">
      <div className="chrome-traffic-lights">
        <span className="traffic-light traffic-light-red" />
        <span className="traffic-light traffic-light-yellow" />
        <span className="traffic-light traffic-light-green" />
      </div>
      <span className="chrome-title">{title}</span>
    </div>
  );
}

function LinuxChrome({ title }: { title: string }) {
  return (
    <div className="chrome-bar chrome-bar-linux">
      <span className="chrome-title chrome-title-left">{title}</span>
      <div className="chrome-linux-controls">
        <span className="linux-btn linux-btn-neutral" />
        <span className="linux-btn linux-btn-close" />
      </div>
    </div>
  );
}

function WindowsChrome({ title }: { title: string }) {
  return (
    <div className="chrome-bar chrome-bar-windows">
      <span className="chrome-title chrome-title-left">{title}</span>
      <div className="chrome-windows-controls">
        <span className="win-btn">—</span>
        <span className="win-btn">□</span>
        <span className="win-btn win-btn-close">✕</span>
      </div>
    </div>
  );
}
