import apiClient from '../lib/apiClient'

/**
 * @typedef {'PENDENTE' | 'ATIVO' | 'INATIVO' | 'DELETADO'} UserStatus
 */

/**
 * @typedef {'ADMIN' | 'GESTOR' | 'TECNICO' | 'ORIENTADOR'} UserCargo
 */

export async function listUsuarios() {
  try {
    const [resUsuarios, resOrientadores] = await Promise.all([
      apiClient.get('/usuario?size=2000').catch(() => ({ content: [] })),
      apiClient.get('/orientador?size=2000').catch(() => ({ content: [] }))
    ])

    const usuarios = Array.isArray(resUsuarios) ? resUsuarios : resUsuarios?.content || []
    const orientadores = Array.isArray(resOrientadores) ? resOrientadores : resOrientadores?.content || []

    // Mesclar dados específicos de orientador (como 'cor') na lista principal de usuários
    return usuarios.map(u => {
      if (u.cargo === 'ORIENTADOR') {
        const uId = u.id || u.userId || u.id_usuario
        const o = orientadores.find(ord => (ord.id === uId || ord.userId === uId || ord.id_usuario === uId))
        if (o) {
          return { ...u, ...o }
        }
      }
      return u
    })
  } catch (err) {
    console.error('Erro ao listar usuários:', err)
    return []
  }
}

export async function listTecnicos() {
  const res = await apiClient.get('/tecnico?size=2000').catch(() => ({ content: [] }))
  return Array.isArray(res) ? res : res?.content || []
}

export async function listOrientadores() {
  // Tenta primeiro o endpoint específico de orientadores
  let orientadores = []
  try {
    const res = await apiClient.get('/orientador?size=2000')
    orientadores = Array.isArray(res) ? res : res?.content || []
  } catch (err) {
    console.warn('Falha ao buscar /orientador:', err)
  }

  // Se estiver vazio, tenta buscar via usuários filtrando pelo cargo
  if (orientadores.length === 0) {
    try {
      const res = await apiClient.get('/usuario?size=2000')
      const users = Array.isArray(res) ? res : res?.content || []
      orientadores = users.filter(u => String(u.cargo || '').toUpperCase() === 'ORIENTADOR')
    } catch (err) {
      console.warn('Falha ao buscar /usuario para orientadores:', err)
    }
  }

  // Garante que cada objeto tenha um id consistente para o Select
  return orientadores.map(o => ({
    ...o,
    id: o.id || o.userId || o.id_usuario,
    nome: o.nome || o.name || o.email || 'Orientador sem nome'
  }))
}

export async function getUsuario(id) {
  return apiClient.get(`/usuario/${id}`)
}

export async function updateUsuario(id, payload, currentUser = {}) {
  // Garante que o payload enviado contenha todos os campos obrigatórios exigidos pelo backend
  const fullPayload = {
    name: payload.name || currentUser.name || currentUser.nome,
    email: payload.email || currentUser.email,
    telefone: payload.telefone || currentUser.telefone || currentUser.telefoneCelular || '—',
    cargo: payload.cargo || currentUser.cargo,
    endereco: payload.endereco || currentUser.endereco || '—',
    cpf: payload.cpf || currentUser.cpf || '—',
    dataDeInclusao: payload.dataDeInclusao || currentUser.dataDeInclusao || currentUser.dataCriacao || new Date().toISOString().split('T')[0],
    status: payload.status || currentUser.status,
    ativo: payload.ativo !== undefined ? payload.ativo : currentUser.ativo,
    corFundo: payload.corFundo || currentUser.corFundo,
    corTexto: payload.corTexto || currentUser.corTexto,
    cor: payload.cor || currentUser.cor,
    tecnicoId: payload.tecnicoId || currentUser.tecnicoId || (currentUser.tecnico && currentUser.tecnico.id) || (currentUser.orientador && currentUser.orientador.tecnico && currentUser.orientador.tecnico.id),
  }

  const endpoint = fullPayload.cargo === 'ORIENTADOR' ? `/orientador/${id}` : `/usuario/${id}`
  return apiClient.put(endpoint, fullPayload)
}

export async function updateStatusUsuario(id, status, currentUser = {}) {
  // O backend exige o objeto completo no PUT para validação.
  // Criamos um payload limpo apenas com os campos esperados pelo UsuarioUpdateDTO + status
  const payload = {
    name: currentUser.name || currentUser.nome,
    email: currentUser.email,
    telefone: currentUser.telefone || currentUser.telefoneCelular || '—',
    cargo: currentUser.cargo,
    endereco: currentUser.endereco || '—',
    cpf: currentUser.cpf || '—',
    dataDeInclusao: currentUser.dataDeInclusao || currentUser.dataCriacao || new Date().toISOString().split('T')[0],
    status: status,
    ativo: status === 'ATIVO',
    cor: currentUser.cor,
    tecnicoId: currentUser.tecnicoId || (currentUser.tecnico && currentUser.tecnico.id) || (currentUser.orientador && currentUser.orientador.tecnico && currentUser.orientador.tecnico.id),
  }

  // Regras específicas de ativação/desativação
  // Mantemos ativo: true por enquanto para teste de visibilidade na lista
  if (status === 'DELETADO') {
    payload.ativo = false
  } else {
    payload.ativo = true
  }

  const endpoint = payload.cargo === 'ORIENTADOR' ? `/orientador/${id}` : `/usuario/${id}`
  return apiClient.put(endpoint, payload)
}

export async function deleteUsuario(id, currentUser = {}) {
  // Soft delete as per requirements: status=DELETADO, ativo=false
  return updateStatusUsuario(id, 'DELETADO', currentUser)
}

export default {
  listUsuarios,
  getUsuario,
  updateUsuario,
  updateStatusUsuario,
  deleteUsuario,
}
