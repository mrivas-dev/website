export function navigateHistory(
  commandHistory: string[],
  currentIndex: number,
  direction: 'up' | 'down',
): { index: number; value: string } {
  const len = commandHistory.length;
  if (len === 0) return { index: -1, value: '' };
  if (direction === 'up') {
    const next = currentIndex < len - 1 ? currentIndex + 1 : currentIndex;
    return { index: next, value: commandHistory[len - 1 - next] };
  } else {
    const next = currentIndex > 0 ? currentIndex - 1 : -1;
    return { index: next, value: next === -1 ? '' : commandHistory[len - 1 - next] };
  }
}
