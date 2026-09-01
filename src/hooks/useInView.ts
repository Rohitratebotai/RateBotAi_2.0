import { useEffect, useRef, useState } from 'react';

type Options = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = { threshold: 0.2, once: true },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { once = true, threshold = 0.2, root = null, rootMargin = '0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold, root, rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
