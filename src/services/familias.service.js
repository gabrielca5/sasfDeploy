import apiClient from '../lib/apiClient'
import familiesMock from '../data/familiesMock'

export async function listFamilias(params = {}) {
  try {
    const query = new URLSearchParams(params).toString()
    const path = `/familias${query ? `?${query}` : ''}`
    const res = await apiClient.get(path)
    return res
  } catch (e) {
    // fallback to local mock when API not available
    return familiesMock
  }
}

export async function getFamilia(id) {
  try {
    return await apiClient.get(`/familias/${id}`)
  } catch (e) {
    return familiesMock.find((f) => f.id === id) || null
  }
}

export async function createFamilia(payload) {
  if (apiClient.post) return apiClient.post('/familias', payload)
  // local fallback: append with generated id
  const newItem = { id: `local-${Date.now()}`, ...payload }
  familiesMock.unshift(newItem)
  return newItem
}

export async function updateFamilia(id, payload) {
  if (apiClient.put) return apiClient.put(`/familias/${id}`, payload)
  const idx = familiesMock.findIndex((f) => f.id === id)
  if (idx > -1) {
    familiesMock[idx] = { ...familiesMock[idx], ...payload }
    return familiesMock[idx]
  }
  throw new Error('Not found')
}

export async function deleteFamilia(id) {
  if (apiClient.delete) return apiClient.delete(`/familias/${id}`)
  const idx = familiesMock.findIndex((f) => f.id === id)
  if (idx > -1) {
    familiesMock.splice(idx, 1)
    return { ok: true }
  }
  throw new Error('Not found')
}

export default { listFamilias, getFamilia, createFamilia, updateFamilia, deleteFamilia }
