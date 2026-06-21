import { render, screen } from '@testing-library/react';
import { TerminalOutput, type OutputLine } from '@/components/Terminal/TerminalOutput';

function makeLine(overrides: Partial<OutputLine> = {}): OutputLine {
  return {
    id: '1',
    type: 'output',
    content: 'hello',
    timestamp: new Date(),
    ...overrides,
  };
}

describe('TerminalOutput', () => {
  it('renders without crashing', () => {
    render(<TerminalOutput lines={[]} />);
  });

  it('has role="log"', () => {
    render(<TerminalOutput lines={[]} />);
    expect(screen.getByRole('log')).toBeInTheDocument();
  });

  it('has aria-live="polite"', () => {
    render(<TerminalOutput lines={[]} />);
    const output = screen.getByLabelText('Terminal output');
    expect(output).toHaveAttribute('aria-live', 'polite');
  });

  it('renders ANSI sequences as colored spans', () => {
    render(
      <TerminalOutput
        lines={[makeLine({ content: '\x1b[31mred\x1b[0m default' })]}
      />,
    );
    const colored = document.querySelector('span[style*="color"]');
    expect(colored).toBeInTheDocument();
    expect(colored).toHaveTextContent('red');
  });
});
