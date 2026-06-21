import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DevToolbar } from '@/components/DevToolbar';
import { OSProvider } from '@/lib/contexts/OSContext';

const mockIsDevelopment = jest.fn();
const mockSetOverrideOS = jest.fn();

jest.mock('@/lib/is-dev', () => ({
  isDevelopment: () => mockIsDevelopment(),
}));

jest.mock('@/lib/contexts/OSContext', () => {
  const actual = jest.requireActual('@/lib/contexts/OSContext');
  return {
    ...actual,
    useOS: () => ({
      os: 'macos',
      profile: actual.osProfiles?.macos ?? null,
      setOverrideOS: mockSetOverrideOS,
    }),
  };
});

function renderToolbar() {
  return render(
    <OSProvider>
      <DevToolbar />
    </OSProvider>,
  );
}

describe('DevToolbar', () => {
  beforeEach(() => {
    mockIsDevelopment.mockReset();
    mockSetOverrideOS.mockReset();
  });

  it('renders null when not in development', () => {
    mockIsDevelopment.mockReturnValue(false);

    const { container } = renderToolbar();

    expect(container).toBeEmptyDOMElement();
  });

  it('renders collapsed button in development', () => {
    mockIsDevelopment.mockReturnValue(true);

    renderToolbar();

    expect(screen.getByRole('button', { name: /dev toolbar settings/i })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('expands menu on button click', async () => {
    mockIsDevelopment.mockReturnValue(true);
    const user = userEvent.setup();

    renderToolbar();

    await user.click(screen.getByRole('button', { name: /dev toolbar settings/i }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /macos/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /linuxos/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /windowsos/i })).toBeInTheDocument();
  });

  it('calls setOverrideOS when OS option clicked', async () => {
    mockIsDevelopment.mockReturnValue(true);
    const user = userEvent.setup();

    renderToolbar();

    await user.click(screen.getByRole('button', { name: /dev toolbar settings/i }));
    await user.click(screen.getByRole('menuitem', { name: /linuxos/i }));

    expect(mockSetOverrideOS).toHaveBeenCalledWith('linux');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('collapses when clicking outside', async () => {
    mockIsDevelopment.mockReturnValue(true);
    const user = userEvent.setup();

    render(
      <OSProvider>
        <div>
          <button type="button">Outside</button>
          <DevToolbar />
        </div>
      </OSProvider>,
    );

    await user.click(screen.getByRole('button', { name: /dev toolbar settings/i }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Outside' }));

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('shows visual indicator for current OS', async () => {
    mockIsDevelopment.mockReturnValue(true);
    const user = userEvent.setup();

    renderToolbar();

    await user.click(screen.getByRole('button', { name: /dev toolbar settings/i }));

    expect(screen.getByRole('menuitem', { name: /macos/i })).toHaveAttribute('aria-current', 'true');
  });

  it('renders OS icon images in the expanded menu', async () => {
    mockIsDevelopment.mockReturnValue(true);
    const user = userEvent.setup();

    renderToolbar();

    await user.click(screen.getByRole('button', { name: /dev toolbar settings/i }));

    expect(screen.getByRole('menuitem', { name: /macos/i }).querySelector('img')).toHaveAttribute(
      'src',
      '/images/icons/macos.png',
    );
    expect(screen.getByRole('menuitem', { name: /linuxos/i }).querySelector('img')).toHaveAttribute(
      'src',
      '/images/icons/linux.png',
    );
    expect(
      screen.getByRole('menuitem', { name: /windowsos/i }).querySelector('img'),
    ).toHaveAttribute('src', '/images/icons/windows.png');
  });
});
