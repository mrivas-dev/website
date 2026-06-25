import { render, screen, fireEvent } from '@testing-library/react';
import { Autocomplete } from '@/components/Terminal/Autocomplete';

jest.mock('@/lib/command-registry', () => ({
  getAllCommands: () => [
    { name: 'about', description: 'About me' },
    { name: 'autocomplete-test', description: 'Test command' },
    { name: 'cat', description: 'Show file contents' },
  ],
}));

describe('Autocomplete', () => {
  it('does not render with empty input', () => {
    const { container } = render(
      <Autocomplete
        input=""
        activeIndex={0}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows matching suggestions with descriptions', () => {
    render(
      <Autocomplete
        input="a"
        activeIndex={0}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('autocomplete-test')).toBeInTheDocument();
  });

  it('does not show non-matching suggestions', () => {
    render(
      <Autocomplete
        input="a"
        activeIndex={0}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.queryByText('cat')).not.toBeInTheDocument();
  });

  it('marks active suggestion with aria-selected', () => {
    render(
      <Autocomplete
        input="a"
        activeIndex={1}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onSelect when item clicked', () => {
    const onSelect = jest.fn();
    render(
      <Autocomplete
        input="a"
        activeIndex={0}
        onSelect={onSelect}
        onDismiss={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByText('about'));
    expect(onSelect).toHaveBeenCalledWith('about');
  });
});
