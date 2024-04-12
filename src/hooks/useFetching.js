import { useState } from "react";

export const useFetching = (callback) => {
  const [error, setError] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const fetching = async (...args) => {
    try {
      setLoaded(false);
      await callback(...args);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
  };
  return [fetching, isLoaded, error];
};
