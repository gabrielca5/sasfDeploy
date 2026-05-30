const DEFAULT_CEP_API_BASE = 'https://h-apigateway.conectagov.np.estaleiro.serpro.gov.br/api-cep/v1'
const FALLBACK_CEP_API_BASE = 'https://viacep.com.br/ws'

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

async function fetchJson(url, timeoutMs = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { signal: controller.signal })
    const text = await response.text()

    let data = null
    try {
      data = text ? JSON.parse(text) : null
    } catch (error) {
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

export default { lookupCep }
