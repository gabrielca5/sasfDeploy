import apiClient from '../lib/apiClient'

const TOKEN_KEY = 'sasf_token'

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
  const data = await apiClient.post('/usuario/login', { email, senha })
  localStorage.setItem(TOKEN_KEY, data.token)
  return getUser()
}

export async function register(payload) {
  // Tentamos o endpoint genérico de usuário primeiro, pois o de orientador
  // pode estar com restrições de integridade (como falta de campo senha no DTO)
  return apiClient.post('/usuario', payload)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export default {
  getToken,
  getUser,
  login,
  register,
  logout,
}
