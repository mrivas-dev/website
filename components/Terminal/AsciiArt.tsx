'use client';

import { useLayoutEffect, useRef } from 'react';
import { asciiFitScale } from '@/lib/ascii-fit';

export function AsciiArt({
  art,
  label,
}: {
  art: string;
  label?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const pre = preRef.current;
    if (!wrap || !pre) return;

    const fit = () => {
      pre.style.transform = 'scale(1)';
      const scale = asciiFitScale(wrap.clientWidth, pre.scrollWidth);
      pre.style.transform = `scale(${scale})`;
      pre.style.transformOrigin = 'top left';
      wrap.style.height = `${pre.scrollHeight * scale}px`;
    };

    fit();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [art]);

  return (
    <div className="ascii-art-fit" ref={wrapRef}>
      <pre
        ref={preRef}
        className="ascii-art"
        role="img"
        aria-label={label ?? 'ASCII portrait'}
        data-testid="ascii-art"
      >
        {art}
      </pre>
    </div>
  );
}
