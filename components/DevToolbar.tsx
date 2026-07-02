'use client';

import { useEffect, useRef, useState } from 'react';
import { type OS } from '@/lib/os-detect';
import { useOS } from '@/lib/contexts/OSContext';
import { useLocale } from '@/lib/contexts/LocaleContext';
import { type Locale } from '@/lib/i18n';
import { isDevelopment } from '@/lib/is-dev';

const OS_OPTIONS: { value: OS; label: string }[] = [
  { value: 'macos', label: 'MacOS' },
  { value: 'linux', label: 'LinuxOS' },
  { value: 'windows', label: 'WindowsOS' },
];

const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

function GearIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OSIcon({ os }: { os: OS }) {
  const iconMap: Record<OS, string> = {
    macos: '/images/icons/macos.png',
    linux: '/images/icons/linux.png',
    windows: '/images/icons/windows.png',
  };

  return (
    <img
      src={iconMap[os]}
      alt=""
      aria-hidden="true"
      className="h-6 w-6 rounded"
    />
  );
}

function LocaleIcon({ locale }: { locale: Locale }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs font-semibold text-white"
    >
      {locale.toUpperCase()}
    </span>
  );
}

export function DevToolbar() {
  const { os, setOverrideOS } = useOS();
  const { locale, setLocale } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(isDevelopment());
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [expanded]);

  if (!visible) {
    return null;
  }

  const handleSelect = (value: OS) => {
    setOverrideOS(value);
    setExpanded(false);
  };

  const handleLocaleSelect = (value: Locale) => {
    setLocale(value);
    setExpanded(false);
  };

  const menuItemClass = (selected: boolean) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 ${
      selected ? 'bg-blue-500/20 ring-1 ring-blue-400/60' : ''
    }`;

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div
          className="relative min-w-[180px] rounded-xl border border-white/10 bg-[#1a1a1a]/95 p-2 shadow-2xl backdrop-blur-sm"
          role="menu"
        >
          <ul className="flex flex-col gap-1">
            {OS_OPTIONS.map((option) => {
              const selected = os === option.value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="menuitem"
                    aria-current={selected ? 'true' : undefined}
                    className={menuItemClass(selected)}
                    onClick={() => handleSelect(option.value)}
                  >
                    <OSIcon os={option.value} />
                    <span>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div aria-hidden="true" className="my-2 border-t border-white/10" />

          <ul className="flex flex-col gap-1">
            {LOCALE_OPTIONS.map((option) => {
              const selected = locale === option.value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="menuitem"
                    aria-current={selected ? 'true' : undefined}
                    className={menuItemClass(selected)}
                    onClick={() => handleLocaleSelect(option.value)}
                  >
                    <LocaleIcon locale={option.value} />
                    <span>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            aria-hidden="true"
            className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-[#1a1a1a]/95"
          />
        </div>
      )}

      <button
        type="button"
        aria-expanded={expanded}
        aria-haspopup="menu"
        aria-label="Dev toolbar settings"
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a]/95 text-gray-200 shadow-lg transition-all hover:ring-2 hover:ring-blue-400/70 ${
          expanded ? 'ring-2 ring-blue-400' : ''
        }`}
        onClick={() => setExpanded((open) => !open)}
      >
        <GearIcon />
      </button>
    </div>
  );
}
