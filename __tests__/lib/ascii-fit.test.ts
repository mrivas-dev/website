import { asciiFitScale } from '@/lib/ascii-fit';

describe('asciiFitScale', () => {
  it('returns the ratio when content is wider than the container', () => {
    expect(asciiFitScale(400, 800)).toBe(0.5);
  });

  it('does not scale up when content already fits', () => {
    expect(asciiFitScale(800, 400)).toBe(1);
  });

  it('returns 1 when content width equals container width', () => {
    expect(asciiFitScale(640, 640)).toBe(1);
  });

  it('returns 1 for zero or negative widths', () => {
    expect(asciiFitScale(0, 800)).toBe(1);
    expect(asciiFitScale(400, 0)).toBe(1);
    expect(asciiFitScale(-10, 800)).toBe(1);
  });
});
