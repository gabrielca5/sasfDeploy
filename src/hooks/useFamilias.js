import { useQuery } from '@tanstack/react-query'
import { listFamilias } from '../services/familias.service'

export function useFamilias(filters = {}) {
  return useQuery({
    queryKey: ['familias', filters],
    queryFn: () => listFamilias(filters),
    staleTime: 60_000,
  })
}

export default useFamilias
