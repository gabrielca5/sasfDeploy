const DEFAULT_CEP_API_BASE = 'https://h-apigateway.conectagov.np.estaleiro.serpro.gov.br/api-cep/v1'
const FALLBACK_CEP_API_BASE = 'https://viacep.com.br/ws'
const DEFAULT_CIDADES_API_BASE = 'https://brasilapi.com.br/api/ibge/municipios/v1'

const UF_IBGE_CODES = {
  AC: 12,
  AL: 27,
  AP: 16,
  AM: 13,
  BA: 29,
  CE: 23,
  DF: 53,
  ES: 32,
  GO: 52,
  MA: 21,
  MT: 51,
  MS: 50,
  MG: 31,
  PA: 15,
  PB: 25,
  PR: 41,
  PE: 26,
  PI: 22,
  RJ: 33,
  RN: 24,
  RS: 43,
  RO: 11,
  RR: 14,
  SC: 42,
  SP: 35,
  SE: 28,
  TO: 17,
}

function normalizeCepPayload(payload) {
  const source = payload?.data ?? payload ?? {}

  return {
    cep: source.cep ?? '',
    uf: source.uf ?? '',
    cidade: source.cidade ?? source.localidade ?? source.municipio ?? '',
    bairro: source.bairro ?? '',
    endereco: source.endereco ?? source.logradouro ?? source.rua ?? '',
    complemento: source.complemento ?? '',
  }
}

function normalizeCityList(payload) {
  const list = Array.isArray(payload) ? payload : payload?.data ?? []

  return list
    .map((item) => item?.nome ?? item?.name ?? item?.municipio ?? item)
    .filter(Boolean)
    .map(String)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

async function fetchJson(url, timeoutMs = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { signal: controller.signal })
    const text = await response.text()

    let data = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    if (!response.ok) {
      const err = new Error(response.statusText || 'HTTP error')
      err.status = response.status
      err.data = data
      throw err
    }

    return data
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function lookupCep(cep) {
  if (!/^[0-9]{8}$/.test(cep)) {
    const err = new Error('CEP inválido')
    err.status = 400
    throw err
  }

  const primaryBase = import.meta.env.NEXT_PUBLIC_CEP_API_URL || import.meta.env.VITE_CEP_API_URL || DEFAULT_CEP_API_BASE
  const primaryUrl = `${primaryBase.replace(/\/$/, '')}/consulta/cep/${cep}`

  try {
    const primaryData = await fetchJson(primaryUrl)
    return normalizeCepPayload(primaryData)
  } catch (error) {
    if (error?.status === 404) {
      throw error
    }
  }

  const fallbackUrl = `${FALLBACK_CEP_API_BASE}/${cep}/json/`

  try {
    const fallbackData = await fetchJson(fallbackUrl)
    if (fallbackData?.erro) {
      const err = new Error('CEP não encontrado')
      err.status = 404
      throw err
    }
    return normalizeCepPayload(fallbackData)
  } catch (error) {
    if (error?.status === 404) {
      throw error
    }

    const err = new Error('Não foi possível buscar o CEP. Tente novamente.')
    err.status = 503
    throw err
  }
}

export async function lookupCitiesByUf(uf) {
  const normalizedUf = String(uf || '').trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(normalizedUf)) {
    return []
  }

  const primaryBase = import.meta.env.VITE_CIDADES_API_URL || DEFAULT_CIDADES_API_BASE
  const primaryUrl = `${primaryBase.replace(/\/$/, '')}/${normalizedUf}`

  try {
    return normalizeCityList(await fetchJson(primaryUrl))
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
  }

  const ibgeCode = UF_IBGE_CODES[normalizedUf]
  if (!ibgeCode) {
    return []
  }

  const fallbackUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ibgeCode}/municipios`
  return normalizeCityList(await fetchJson(fallbackUrl))
}

export default { lookupCep, lookupCitiesByUf }
