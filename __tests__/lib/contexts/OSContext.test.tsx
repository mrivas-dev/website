import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OSProvider, useOS, DEV_OS_OVERRIDE_KEY } from '@/lib/contexts/OSContext';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

function OSConsumer() {
  const { os, profile, setOverrideOS } = useOS();

  return (
    <div>
      <span data-testid="os">{os ?? 'null'}</span>
      <span data-testid="prompt">{profile?.prompt('~') ?? 'null'}</span>
      <button type="button" onClick={() => setOverrideOS('windows')}>
        Set Windows
      </button>
      <button type="button" onClick={() => setOverrideOS(null)}>
        Clear Override
      </button>
    </div>
  );
}

describe('OSContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    });
  });

  it('provides detected OS by default', async () => {
    render(
      <OSProvider>
        <OSConsumer />
      </OSProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('os')).toHaveTextContent('macos');
    });
    expect(screen.getByTestId('prompt')).toHaveTextContent('mrivas@macbook ~ %');
  });

  it('respects localStorage override on mount', async () => {
    localStorageMock.setItem(DEV_OS_OVERRIDE_KEY, 'linux');

    render(
      <OSProvider>
        <OSConsumer />
      </OSProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('os')).toHaveTextContent('linux');
    });
    expect(screen.getByTestId('prompt')).toHaveTextContent('mrivas@ubuntu:~$');
  });

  it('setOverrideOS updates context and localStorage', async () => {
    const user = userEvent.setup();

    render(
      <OSProvider>
        <OSConsumer />
      </OSProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('os')).toHaveTextContent('macos');
    });

    await user.click(screen.getByRole('button', { name: 'Set Windows' }));

    expect(screen.getByTestId('os')).toHaveTextContent('windows');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(DEV_OS_OVERRIDE_KEY, 'windows');
  });

  it('setOverrideOS(null) clears override and restores detection', async () => {
    const user = userEvent.setup();
    localStorageMock.setItem(DEV_OS_OVERRIDE_KEY, 'windows');

    render(
      <OSProvider>
        <OSConsumer />
      </OSProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('os')).toHaveTextContent('windows');
    });

    await user.click(screen.getByRole('button', { name: 'Clear Override' }));

    expect(screen.getByTestId('os')).toHaveTextContent('macos');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(DEV_OS_OVERRIDE_KEY);
  });
});
