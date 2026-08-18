export function asciiFitScale(
  containerWidth: number,
  contentWidth: number,
): number {
  if (containerWidth <= 0 || contentWidth <= 0) return 1;
  return Math.min(1, containerWidth / contentWidth);
}
