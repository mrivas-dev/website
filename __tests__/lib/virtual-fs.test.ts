import { resolvePath, getNode } from '@/lib/virtual-fs';

describe('resolvePath', () => {
  it('~ always returns ~', () => {
    expect(resolvePath('~/experience', '~')).toBe('~');
  });

  it('.. from nested returns parent', () => {
    expect(resolvePath('~/experience', '..')).toBe('~');
  });

  it('.. from root stays at ~', () => {
    expect(resolvePath('~', '..')).toBe('~');
  });

  it('. returns cwd', () => {
    expect(resolvePath('~/experience', '.')).toBe('~/experience');
  });

  it('relative from root', () => {
    expect(resolvePath('~', 'experience')).toBe('~/experience');
  });

  it('relative from nested', () => {
    expect(resolvePath('~/experience', 'sub')).toBe('~/experience/sub');
  });

  it('absolute ~/path passes through', () => {
    expect(resolvePath('~', '~/experience')).toBe('~/experience');
  });
});

describe('getNode', () => {
  it('finds a file at ~/about.txt', () => {
    expect(getNode('~/about.txt')?.type).toBe('file');
  });

  it('finds a nested dir', () => {
    expect(getNode('~/experience')?.type).toBe('dir');
  });

  it('returns null for missing path', () => {
    expect(getNode('~/nonexistent')).toBeNull();
  });

  it('returns null traversing through file', () => {
    expect(getNode('~/about.txt/child')).toBeNull();
  });
});
