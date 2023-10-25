import { useState, useEffect } from "react";

export const useDebounce = (value: string | undefined, delay = 300): string | undefined=> {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};