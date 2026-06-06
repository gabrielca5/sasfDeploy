import { get, post } from '../lib/apiClient'

export function salvarTranscricao(familiaId, payload) {
  return post(`/familia/${familiaId}/transcricao`, payload)
}

export function listarTranscricoes(familiaId) {
  return get(`/familia/${familiaId}/transcricao`)
}
