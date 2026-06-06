import { useQuery, useQueryClient } from '@tanstack/react-query'
import { listarTranscricoes, salvarTranscricao } from '../services/transcricao.service'

export function useTranscricoes(familiaId) {
  return useQuery({
    queryKey: ['transcricoes', familiaId],
    queryFn: () => listarTranscricoes(familiaId),
    enabled: Boolean(familiaId),
  })
}

export function useSalvarTranscricao(familiaId) {
  const queryClient = useQueryClient()

  return async (payload) => {
    const result = await salvarTranscricao(familiaId, payload)
    queryClient.invalidateQueries({ queryKey: ['transcricoes', familiaId] })
    return result
  }
}
