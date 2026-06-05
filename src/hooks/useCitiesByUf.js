import { useQuery } from '@tanstack/react-query'
import { lookupCitiesByUf } from '../services/cepService'

function normalizeUf(uf) {
  return String(uf || '').trim().toUpperCase()
}

export function useCitiesByUf(uf) {
  const normalizedUf = normalizeUf(uf)

  return useQuery({
    queryKey: ['cidades-uf', normalizedUf],
    queryFn: () => lookupCitiesByUf(normalizedUf),
    enabled: /^[A-Z]{2}$/.test(normalizedUf),
    staleTime: 24 * 60 * 60 * 1000,
  })
}

export default useCitiesByUf
