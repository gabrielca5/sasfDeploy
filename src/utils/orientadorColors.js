/**
 * Paleta oficial de cores para o cargo de Orientador.
 * Alinhada com o enum CorOrientador do Backend:
 * VERMELHO, AMARELO, VERDE, AZUL, ROXO, LARANJA, ROSA, MARROM
 */

export const ORIENTADOR_COLORS = {
  VERMELHO: {
    backgroundColor: '#FDECEC',
    color: '#B91C1C',
    label: 'Vermelho'
  },
  AMARELO: {
    backgroundColor: '#FEF9C3',
    color: '#FFD700',
    label: 'Amarelo'
  },
  VERDE: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    label: 'Verde'
  },
  AZUL: {
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    label: 'Azul'
  },
  ROXO: {
    backgroundColor: '#F3E8FF',
    color: '#7E22CE',
    label: 'Roxo'
  },
  LARANJA: {
    backgroundColor: '#FFEDD5',
    color: '#FFA500 ',
    label: 'Laranja'
  },
  ROSA: {
    backgroundColor: '#FCE7F3',
    color: '#F789D0',
    label: 'Rosa'
  },
  MARROM: {
    backgroundColor: '#EFE2D6',
    color: '#7C2D12',
    label: 'Marrom'
  }
}

/**
 * Retorna o objeto de cores baseado no enum 'cor' retornado pelo backend.
 * Caso não encontre ou seja nulo, retorna um fallback baseado em um hash do seed fornecido.
 */
export function getOrientadorColors(corEnum, seed = '') {
  const normalizedKey = String(corEnum || '').toUpperCase().trim()

  if (normalizedKey && ORIENTADOR_COLORS[normalizedKey]) {
    return { ...ORIENTADOR_COLORS[normalizedKey], enumKey: normalizedKey }
  }

  // Fallback baseado em hash para consistência visual quando não há cor definida
  const keys = Object.keys(ORIENTADOR_COLORS)
  const value = String(seed || '')
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) % 2147483647
  }
  
  const key = keys[hash % keys.length]
  return { ...ORIENTADOR_COLORS[key], isFallback: true, enumKey: key }
}

export default ORIENTADOR_COLORS
