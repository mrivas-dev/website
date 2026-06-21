import '@/components/commands/lang';
import { getCommand } from '@/lib/command-registry';
import { makeCtx } from '../../helpers';

describe('lang command', () => {
  const cmd = getCommand('lang')!;

  it('is registered', () => {
    expect(cmd).toBeDefined();
  });

  it('no args shows current locale', () => {
    const r = cmd.execute([], makeCtx({ locale: 'en' }));
    expect(r.type).toBe('text');
    if (r.type === 'text') expect(r.content).toMatch(/en/i);
  });

  it('switches to es', () => {
    const setLocale = jest.fn();
    cmd.execute(['es'], makeCtx({ setLocale }));
    expect(setLocale).toHaveBeenCalledWith('es');
  });

  it('switches to en', () => {
    const setLocale = jest.fn();
    cmd.execute(['en'], makeCtx({ locale: 'es', setLocale }));
    expect(setLocale).toHaveBeenCalledWith('en');
  });

  it('rejects unsupported locale', () => {
    expect(cmd.execute(['fr'], makeCtx()).type).toBe('error');
  });
});
