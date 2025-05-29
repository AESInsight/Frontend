import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsDesktop } from '../../context/desktop_context';

describe('useIsDesktop', () => {
  const originalInnerWidth = window.innerWidth;
  const mockResizeEvent = new Event('resize');

  beforeEach(() => {
    // Reset window.innerWidth before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('returns false when window width is less than 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it('returns true when window width is greater than or equal to 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it('updates when window is resized', () => {
    const { result } = renderHook(() => useIsDesktop());

    // Initial state with width < 768
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });
    act(() => {
      window.dispatchEvent(mockResizeEvent);
    });
    expect(result.current).toBe(false);

    // Resize to width >= 768
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    act(() => {
      window.dispatchEvent(mockResizeEvent);
    });
    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIsDesktop());

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
}); 