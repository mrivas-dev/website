import '@/components/commands/cd';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('cd command', () => {
  const cmd = getCommand('cd');

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('no args sets cwd to ~', () => {
    const setCwd = jest.fn();
    cmd!.execute([], makeCtx({ setCwd }));
    expect(setCwd).toHaveBeenCalledWith('~');
  });

  it('~ arg sets cwd to ~', () => {
    const setCwd = jest.fn();
    cmd!.execute(['~'], makeCtx({ setCwd }));
    expect(setCwd).toHaveBeenCalledWith('~');
  });

  it('valid directory updates cwd', () => {
    const setCwd = jest.fn();
    cmd!.execute(['experience'], makeCtx({ cwd: '~', setCwd }));
    expect(setCwd).toHaveBeenCalledWith('~/experience');
  });

  it('nonexistent path returns error', () => {
    const result = cmd!.execute(['nonexistent-xyz'], makeCtx());
    expect(result.type).toBe('error');
  });

  it('file path returns error', () => {
    const result = cmd!.execute(['about.txt'], makeCtx({ cwd: '~' }));
    expect(result.type).toBe('error');
  });
});
