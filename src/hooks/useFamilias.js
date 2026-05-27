import { useQuery } from '@tanstack/react-query'
import { listFamilias } from '../services/familias.service'

export function useFamilias(filters = {}) {
  return useQuery(['familias', filters], () => listFamilias(filters), {
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 5,
  })
}

export default useFamilias
