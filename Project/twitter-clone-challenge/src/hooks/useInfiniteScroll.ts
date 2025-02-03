import { useCallback, useEffect, useRef, useState } from "react";

type FetchMoreDataFn = () => Promise<void>;

function useInfiniteScroll(
  fetchMoreData: FetchMoreDataFn
): [boolean, (node: HTMLElement | null) => void] {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isFetching) {
      setIsFetching(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isFetching) {
      fetchMoreData().finally(() => setIsFetching(false));
    }
  }, [isFetching, fetchMoreData]);

  const triggerRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(handleObserver, {
        threshold: 0.8,
      });
      if (node) observer.current.observe(node);
    },
    [handleObserver]
  );

  return [isFetching, triggerRef];
}

export default useInfiniteScroll;
