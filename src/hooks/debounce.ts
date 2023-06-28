import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number = 2000): string {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearInterval(handler);
  }, [value, delay]);

  return debounce;
}
