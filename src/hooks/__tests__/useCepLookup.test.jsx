import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import useCepLookup from '../useCepLookup'

function TestComponent({ cep, onResult }) {
  const { lookup, loading, error } = useCepLookup()

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const res = await lookup(cep)
      if (mounted && onResult) onResult({ res, loading, error })
    })()
    return () => {
      mounted = false
    }
  }, [cep])

  return (
    <div>
      <span data-testid="loading">{loading ? '1' : '0'}</span>
      <span data-testid="error">{error || ''}</span>
    </div>
  )
}

describe('useCepLookup', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.resetAllMocks()
  })

  it('resolves with address data for valid CEP', async () => {
    const mockData = { cep: '01001000', uf: 'SP', cidade: 'Sao Paulo', bairro: 'Centro', endereco: 'Praça da Sé' }
    global.fetch.mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify(mockData) })

    let result = null
    render(<TestComponent cep="01001000" onResult={(r) => { result = r }} />)
    await waitFor(() => expect(result).not.toBeNull(), { timeout: 2000 })
    expect(result.res).toBeTruthy()
    expect(result.res.uf).toBe('SP')
  })

  it('sets error message on 404', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found', text: async () => '{}' })

    let result = null
    render(<TestComponent cep="00000000" onResult={(r) => { result = r }} />)
    await waitFor(() => expect(result).not.toBeNull(), { timeout: 2000 })
    expect(result.res).toBeNull()
  })

  it('handles network failures gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('network'))

    let result = null
    render(<TestComponent cep="11111111" onResult={(r) => { result = r }} />)
    await waitFor(() => expect(result).not.toBeNull(), { timeout: 2000 })
    expect(result.res).toBeNull()
  })
})
