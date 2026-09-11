import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);
  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.current.observe(target.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [callback]);

  return { target };
}
