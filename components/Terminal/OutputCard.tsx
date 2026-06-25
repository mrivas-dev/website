'use client';

import type { ReactNode } from 'react';

interface OutputCardProps {
  children: ReactNode;
}

export function OutputCard({ children }: OutputCardProps) {
  return <div className="output-card">{children}</div>;
}

export function OutputHeading({ children }: { children: ReactNode }) {
  return <span className="output-heading">{children}</span>;
}

export function OutputBody({
  children,
  strong,
}: {
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <span className={strong ? 'output-body output-body-strong' : 'output-body'}>
      {children}
    </span>
  );
}

export function OutputMeta({ children }: { children: ReactNode }) {
  return <span className="output-meta">{children}</span>;
}

export function OutputDivider() {
  return <hr className="output-divider" />;
}

export function OutputLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="output-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
