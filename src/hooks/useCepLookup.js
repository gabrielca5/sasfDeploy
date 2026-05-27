import { useCallback, useRef, useState } from 'react';
import { lookupCep } from '../services/cepService';

// Hook that returns { lookup, loading, error }
// lookup(cep) debounces calls by 500ms and only performs request when cep has 8 digits.
export function useCepLookup({ debounceMs = 500 } = {}) {
  const timerRef = useRef(null);
  const pendingResolveRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = useCallback((cep) => {
    // clear previous timer and resolve previous pending lookup as null
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pendingResolveRef.current) {
      pendingResolveRef.current(null);
      pendingResolveRef.current = null;
    }

    // sanitize cep digits
    const digits = (cep || '').replace(/\D/g, '');

    return new Promise((resolve) => {
      pendingResolveRef.current = resolve;

      // if not 8 digits, cancel and return null
      if (digits.length !== 8) {
        setLoading(false);
        setError(null);
        resolve(null);
        pendingResolveRef.current = null;
        return;
      }

      timerRef.current = setTimeout(async () => {
        setLoading(true);
        setError(null);
        try {
          // services currently use fetch via apiClient; we don't pass signal there
          const data = await lookupCep(digits);
          setLoading(false);
          setError(null);
          resolve(data);
        } catch (err) {
          setLoading(false);
          if (err && err.status === 404) {
            setError('CEP não encontrado');
          } else if (err && err.name === 'AbortError') {
            // aborted, do nothing
            setError(null);
          } else {
            setError('Não foi possível buscar o CEP. Tente novamente.');
          }
          resolve(null);
        } finally {
          pendingResolveRef.current = null;
        }
      }, debounceMs);
    });
  }, [debounceMs]);

  return { lookup, loading, error };
}

export default useCepLookup;
