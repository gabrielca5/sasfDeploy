import { useQuery } from '@tanstack/react-query'
import { getFamiliaContato } from '../services/familias.service'

export function useFamiliaContato(prontuarioId) {
  return useQuery({
    queryKey: ['familia-contato', prontuarioId],
    queryFn: () => getFamiliaContato(prontuarioId),
    enabled: !!prontuarioId,
    staleTime: 120_000,
  })
}

export default useFamiliaContato
