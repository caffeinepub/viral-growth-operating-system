import { useCallback, useRef } from 'react';

/**
 * Hook that provides a ripple click effect for buttons.
 * Returns a ref to attach to the button and a click handler.
 */
export function useRippleEffect<T extends HTMLElement = HTMLButtonElement>() {
  const ref = useRef<T>(null);

  const createRipple = useCallback((event: React.MouseEvent<T>) => {
    const button = ref.current;
    if (!button) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    // Remove any existing ripples
    const existing = button.querySelector('.ripple-effect');
    if (existing) existing.remove();

    button.classList.add('btn-ripple');
    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return { ref, createRipple };
}
