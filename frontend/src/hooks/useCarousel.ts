import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCarouselOptions {
  total: number;
  autoAdvanceMs?: number;
}

interface UseCarouselReturn {
  current: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Hook managing carousel state with auto-advance, manual navigation, and pause on hover.
 */
export function useCarousel({ total, autoAdvanceMs = 4000 }: UseCarouselOptions): UseCarouselReturn {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(next, autoAdvanceMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next, autoAdvanceMs]);

  return { current, next, prev, goTo, pause, resume };
}
