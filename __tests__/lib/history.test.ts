import { navigateHistory } from '@/lib/history';

const hist = ['cmd1', 'cmd2', 'cmd3'];

describe('navigateHistory — empty history', () => {
  it('up returns empty', () => {
    expect(navigateHistory([], -1, 'up')).toEqual({ index: -1, value: '' });
  });

  it('down returns empty', () => {
    expect(navigateHistory([], -1, 'down')).toEqual({ index: -1, value: '' });
  });
});

describe('navigateHistory — up', () => {
  it('from -1 returns most recent', () => {
    expect(navigateHistory(hist, -1, 'up')).toEqual({ index: 0, value: 'cmd3' });
  });

  it('from 0 returns second-most-recent', () => {
    expect(navigateHistory(hist, 0, 'up')).toEqual({ index: 1, value: 'cmd2' });
  });

  it('from 1 returns oldest', () => {
    expect(navigateHistory(hist, 1, 'up')).toEqual({ index: 2, value: 'cmd1' });
  });

  it('at oldest stays at oldest', () => {
    const result = navigateHistory(hist, 2, 'up');
    expect(result.value).toBe('cmd1');
    expect(result.index).toBe(2);
  });
});

describe('navigateHistory — down', () => {
  it('from 2 returns cmd2', () => {
    expect(navigateHistory(hist, 2, 'down')).toEqual({ index: 1, value: 'cmd2' });
  });

  it('from 1 returns cmd3', () => {
    expect(navigateHistory(hist, 1, 'down')).toEqual({ index: 0, value: 'cmd3' });
  });

  it('from 0 clears input', () => {
    expect(navigateHistory(hist, 0, 'down')).toEqual({ index: -1, value: '' });
  });

  it('from -1 stays empty', () => {
    expect(navigateHistory(hist, -1, 'down')).toEqual({ index: -1, value: '' });
  });
});
