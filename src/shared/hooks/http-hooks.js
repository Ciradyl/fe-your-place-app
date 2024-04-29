import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, // for canceling the request
        });

        const data = await response.json();

        // Remove the AbortController from the array before returning
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // if not status 200
        if (!response.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        // sends a data for the component to handle
        return data;
      } catch (e) {
        setErrorOccured(e.message);
        setIsLoading(false);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setErrorOccured(null);
  };

  useEffect(() => {
    return () => {
      // Abort all active requests when the component unmounts
      activeHttpRequests.current = activeHttpRequests.current.filter(
        (abortCtrl) => !abortCtrl.signal.aborted
      );
    };
  }, []);

  return { isLoading, errorOccured, sendRequest, clearError };
};
