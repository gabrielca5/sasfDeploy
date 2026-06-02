const TOKEN_KEY = 'sasf_token'
const BASE = import.meta.env.VITE_API_URL || ''

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const token = getToken()
  if (!token) return null
  const payload = decodeToken(token)
  if (!payload || Date.now() / 1000 > payload.exp) {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
  return { userId: payload.userId, email: payload.sub, cargo: payload.cargoUsuario }
}

export async function login(email, senha) {
  const res = await fetch(`${BASE}/usuario/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
  const data = await res.json()
  if (!res.ok) {
    const err = new Error(data?.mensagem || 'Credenciais inválidas')
    err.status = res.status
    throw err
  }
  localStorage.setItem(TOKEN_KEY, data.token)
  return getUser()
}

export async function register(payload) {
  const res = await fetch(`${BASE}/usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) {
    const err = new Error(data?.mensagem || 'Erro ao cadastrar')
    err.status = res.status
    throw err
  }
  return data
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}
