import { render, screen, fireEvent } from '@testing-library/react';
import { Autocomplete } from '@/components/Terminal/Autocomplete';

jest.mock('@/lib/command-registry', () => ({
  getAllCommands: () => [
    { name: 'about', description: '' },
    { name: 'autocomplete-test', description: '' },
    { name: 'cat', description: '' },
  ],
}));

describe('Autocomplete', () => {
  it('does not render with empty input', () => {
    const { container } = render(
      <Autocomplete input="" onSelect={jest.fn()} onDismiss={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows matching suggestions', () => {
    render(<Autocomplete input="a" onSelect={jest.fn()} onDismiss={jest.fn()} />);
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('autocomplete-test')).toBeInTheDocument();
  });

  it('does not show non-matching suggestions', () => {
    render(<Autocomplete input="a" onSelect={jest.fn()} onDismiss={jest.fn()} />);
    expect(screen.queryByText('cat')).not.toBeInTheDocument();
  });

  it('calls onSelect when item clicked', () => {
    const onSelect = jest.fn();
    render(<Autocomplete input="a" onSelect={onSelect} onDismiss={jest.fn()} />);
    fireEvent.click(screen.getByText('about'));
    expect(onSelect).toHaveBeenCalledWith('about');
  });
});
