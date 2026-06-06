const WHISPER_URL = import.meta.env.VITE_WHISPER_URL || 'http://98.89.223.51:8000'

export async function processarEntrevista(file) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${WHISPER_URL}/processar-entrevista/`, {
    method: 'POST',
    body: formData,
  })

  const text = await res.text()

  if (!res.ok) {
    const err = new Error('Erro ao processar entrevista')
    err.status = res.status
    err.data = text
    throw err
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    return text
  }

  if (data?.erro) {
    const err = new Error(data.erro)
    err.type = /quota|429|token/i.test(data.erro) ? 'quota' : 'processing'
    err.data = data.erro
    throw err
  }

  return data
}
