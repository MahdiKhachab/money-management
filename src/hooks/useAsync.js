import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '../api/client';

// Runs an async loader on mount (and when deps change); exposes { data, loading, error, reload }.
const useAsync = (loader, deps = [], initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const requestId = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(loader, deps);

  const reload = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError('');
    try {
      const result = await run();
      if (id === requestId.current) setData(result);
    } catch (err) {
      if (id === requestId.current) setError(getErrorMessage(err));
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [run]);

  useEffect(() => {
    reload();
    return () => {
      requestId.current += 1; // ignore responses that arrive after unmount
    };
  }, [reload]);

  return { data, setData, loading, error, reload };
};

export default useAsync;
