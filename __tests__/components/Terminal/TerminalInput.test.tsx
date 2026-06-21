import { render, screen } from '@testing-library/react';
import { TerminalInput } from '@/components/Terminal/TerminalInput';

const defaultProps = {
  prompt: '~ $ ',
  value: '',
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  onHistoryUp: jest.fn(),
  onHistoryDown: jest.fn(),
  onTabComplete: jest.fn(),
  onCtrlC: jest.fn(),
  onCtrlL: jest.fn(),
};

describe('TerminalInput', () => {
  it('renders without crashing', () => {
    render(<TerminalInput {...defaultProps} />);
  });

  it('has inputMode="text"', () => {
    render(<TerminalInput {...defaultProps} />);
    const input = screen.getByLabelText('Terminal input');
    expect(input).toHaveAttribute('inputMode', 'text');
  });

  it('has .terminal-cursor element in DOM', () => {
    const { container } = render(<TerminalInput {...defaultProps} />);
    expect(container.querySelector('.terminal-cursor')).toBeInTheDocument();
  });
});
