import { getToken } from '../services/auth.service'

const BASE = import.meta.env.VITE_API_URL || ''

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function buildUrl(path) {
  return path.startsWith('http') ? path : `${BASE.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
}

async function request(path, opts = {}) {
  const url = buildUrl(path)
  const res = await fetch(url, { cache: 'no-store', ...opts, headers: { ...authHeaders(), ...opts.headers } })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    const message = data?.mensagem || data?.message || res.statusText || 'HTTP error'
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

async function requestBlob(path, opts = {}) {
  const url = buildUrl(path)
  const res = await fetch(url, { cache: 'no-store', ...opts, headers: { ...authHeaders(), ...opts.headers } })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let data
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    const err = new Error(res.statusText || 'HTTP error')
    err.status = res.status
    err.data = data
    throw err
  }

  return {
    blob: await res.blob(),
    headers: res.headers,
  }
}

export async function get(path, opts = {}) {
  return request(path, { method: 'GET', ...opts })
}

export async function getBlob(path, opts = {}) {
  return requestBlob(path, { method: 'GET', ...opts })
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

export default { get, getBlob, post, put, delete: del }
