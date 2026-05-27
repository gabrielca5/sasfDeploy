// Simple HTTP client wrapper used by services
const BASE = import.meta.env.NEXT_PUBLIC_API_URL || import.meta.env.VITE_API_URL || ''

async function request(path, opts = {}) {
  const url = path.startsWith('http') ? path : `${BASE.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, opts)
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
