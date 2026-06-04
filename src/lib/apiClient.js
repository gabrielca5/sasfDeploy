import { getToken } from '../services/auth.service'

const BASE = import.meta.env.VITE_API_URL || ''

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, opts = {}) {
  const url = path.startsWith('http') ? path : `${BASE.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, { cache: 'no-store', ...opts, headers: { ...authHeaders(), ...opts.headers } })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (e) {
    data = text
  }
  if (!res.ok) {
    const err = new Error(res.statusText || 'HTTP error')
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export async function get(path, opts = {}) {
  return request(path, { method: 'GET', ...opts })
}

export async function post(path, body, opts = {}) {
  return request(path, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, ...opts })
}

export async function put(path, body, opts = {}) {
  return request(path, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, ...opts })
}

export async function del(path, opts = {}) {
  return request(path, { method: 'DELETE', ...opts })
}

export default { get, post, put, delete: del }
