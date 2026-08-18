import { render, screen, act } from '@testing-library/react';
import { AsciiArt } from '@/components/Terminal/AsciiArt';

describe('AsciiArt', () => {
  const art = '  **+++\n  *%%#';

  it('renders the art inside a pre element', () => {
    render(<AsciiArt art={art} />);

    const portrait = screen.getByTestId('ascii-art');
    expect(portrait.tagName).toBe('PRE');
    expect(portrait).toHaveTextContent('**+++');
    expect(portrait.textContent).toBe(art);
  });

  it('exposes the art as an image to assistive tech', () => {
    render(<AsciiArt art={art} label="Matías Rivas portrait" />);

    const portrait = screen.getByRole('img', { name: 'Matías Rivas portrait' });
    expect(portrait).toBeInTheDocument();
  });

  it('falls back to a default label when none is provided', () => {
    render(<AsciiArt art={art} />);

    expect(screen.getByRole('img', { name: 'ASCII portrait' })).toBeInTheDocument();
  });

  it('scales the art down when it overflows the container', () => {
    const observers: Array<{ callback: ResizeObserverCallback }> = [];
    class MockResizeObserver {
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        observers.push(this);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

    const { container } = render(<AsciiArt art={'x'.repeat(200)} />);
    const wrap = container.querySelector('.ascii-art-fit') as HTMLElement;
    const pre = screen.getByTestId('ascii-art');

    Object.defineProperty(wrap, 'clientWidth', { configurable: true, get: () => 400 });
    Object.defineProperty(pre, 'scrollWidth', { configurable: true, get: () => 800 });
    Object.defineProperty(pre, 'scrollHeight', { configurable: true, get: () => 200 });

    act(() => {
      observers[0].callback([] as ResizeObserverEntry[], observers[0] as unknown as ResizeObserver);
    });

    expect(pre.style.transform).toBe('scale(0.5)');
    expect(wrap.style.height).toBe('100px');
  });

  it('does not scale the art above its natural size', () => {
    const observers: Array<{ callback: ResizeObserverCallback }> = [];
    class MockResizeObserver {
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        observers.push(this);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

    const { container } = render(<AsciiArt art={art} />);
    const wrap = container.querySelector('.ascii-art-fit') as HTMLElement;
    const pre = screen.getByTestId('ascii-art');

    Object.defineProperty(wrap, 'clientWidth', { configurable: true, get: () => 800 });
    Object.defineProperty(pre, 'scrollWidth', { configurable: true, get: () => 400 });
    Object.defineProperty(pre, 'scrollHeight', { configurable: true, get: () => 100 });

    act(() => {
      observers[0].callback([] as ResizeObserverEntry[], observers[0] as unknown as ResizeObserver);
    });

    expect(pre.style.transform).toBe('scale(1)');
  });
});
