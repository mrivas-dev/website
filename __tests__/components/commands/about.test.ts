import React from 'react';
import { render } from '@testing-library/react';
import '@/components/commands/about';
import { getCommand } from '@/lib/command-registry';
import { ASCII_PORTRAIT } from '@/lib/content/ascii-portrait';
import { makeCtx, makeRealT, renderJsxText } from '../../helpers';

describe('about command', () => {
  const cmd = getCommand('about');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('returns jsx type', () => {
    const result = cmd!.execute([], makeCtx());
    expect(result.type).toBe('jsx');
  });

  it('content contains name and role', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content);
      expect(text).toContain('Matías Rivas');
      expect(text).toContain('Software Engineering Manager');
    }
  });

  it('content contains years of experience', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      expect(renderJsxText(result.content)).toMatch(/\d+/);
    }
  });

  it('content differs between en and es', () => {
    const en = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    const es = cmd!.execute([], makeCtx({ locale: 'es', t: makeRealT('es') }));
    if (en.type === 'jsx' && es.type === 'jsx') {
      expect(renderJsxText(en.content)).not.toBe(renderJsxText(es.content));
    }
  });

  it('hints at resume and experience commands', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    if (result.type === 'jsx') {
      const text = renderJsxText(result.content).toLowerCase();
      expect(text).toContain('resume');
      expect(text).toContain('experience');
    }
  });

  it('renders the ASCII portrait above the name', () => {
    const result = cmd!.execute([], makeCtx({ locale: 'en', t: makeRealT('en') }));
    expect(result.type).toBe('jsx');
    if (result.type !== 'jsx') return;

    const { getByTestId } = render(
      React.createElement(React.Fragment, null, result.content),
    );
    const portrait = getByTestId('ascii-art');
    const firstRow = ASCII_PORTRAIT.trimStart().split('\n')[0];
    expect(portrait.textContent).toContain(firstRow.trim());
    expect(portrait.textContent).toContain('E N G I N E E R I N G');
  });
});
