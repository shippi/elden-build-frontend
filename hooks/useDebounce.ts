import { useEffect, useState } from 'react';

/**
 * Custom hook used to create debounced versions of input values, e.g. username, email, etc.
 * Use if you want functions that trigger on input change to not trigger on every change, 
 * but some time after the user stops typing.
 * @param value 
 * @param delay 
 * @returns 
 */
export default function useDebounce <T>(value: T, delay = 200) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};