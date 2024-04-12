import { useRef } from "react";

const useDebounce = (t, fn) => {
  const timeout = useRef();

  const debouncedCallback = (...args) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      fn(...args);
    }, t);
  };

  return debouncedCallback;
};

export default useDebounce;
