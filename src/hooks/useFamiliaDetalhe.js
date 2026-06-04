import { useQuery } from '@tanstack/react-query'
import { get } from '../lib/apiClient'

async function fetchDetalhe(prontuarioId) {
  if (!prontuarioId) return null

  const prontuario = await get(`/prontuario/${prontuarioId}`).catch(() => null)

  const [
    fichaCadastral,
    planoFamiliar,
    folhaProsseguimento,
    pdu,
  ] = await Promise.all([
    prontuario?.fichaCadastralDaFamiliaId
      ? get(`/fichacadastral/${prontuario.fichaCadastralDaFamiliaId}`).catch(() => null)
      : null,
    prontuario?.planosDesenvolvimentoFamiliarIds?.[0]
      ? get(`/pdf/${prontuario.planosDesenvolvimentoFamiliarIds[0]}`).catch(() => null)
      : null,
    prontuario?.folhasProsseguimentoIds?.[0]
      ? get(`/folhaprosseguimento/${prontuario.folhasProsseguimentoIds[0]}`).catch(() => null)
      : null,
    prontuario?.planosDesenvolvimentoUsuarioIds?.[0]
      ? get(`/pdu/${prontuario.planosDesenvolvimentoUsuarioIds[0]}`).catch(() => null)
      : null,
  ])

  const representante = fichaCadastral?.representanteId
    ? await get(`/representante/${fichaCadastral.representanteId}`).catch(() => null)
    : null

  const endereco = representante?.enderecoId
    ? await get(`/endereco/${representante.enderecoId}`).catch(() => null)
    : null

  const todosTermos = await get('/termo?size=2000').catch(() => [])
  // O backend devolve coleções paginadas (Spring Page: { content: [...] }).
  const termosArray = Array.isArray(todosTermos)
    ? todosTermos
    : Array.isArray(todosTermos?.content)
      ? todosTermos.content
      : []
  const termos = termosArray.filter((t) => t.prontuarioId === prontuarioId)

  return {
    prontuario,
    fichaCadastral,
    representante,
    endereco,
    planoFamiliar,
    folhaProsseguimento,
    pdu,
    termos,
  }
}

export function useFamiliaDetalhe(prontuarioId) {
  return useQuery({
    queryKey: ['familia-detalhe', prontuarioId],
    queryFn: () => fetchDetalhe(prontuarioId),
    enabled: !!prontuarioId,
    staleTime: 120_000,
  })
}

export default useFamiliaDetalhe
