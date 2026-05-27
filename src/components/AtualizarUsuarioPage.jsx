import { useMemo, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardContent, Chip, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

function AtualizarUsuarioPage({ users = [], onBack, onOpenForm }) {
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? '')

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) {
      return users
    }

    return users.filter((user) => {
      return [user.nome, user.familia, user.status, user.documento, user.cpf].some((value) =>
        String(value ?? '').toLowerCase().includes(term),
      )
    })
  }, [search, users])

  const selectedUser = useMemo(() => {
    return users.find((user) => user.id === selectedUserId) ?? users[0] ?? null
  }, [selectedUserId, users])

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1180 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="overline" color="primary" letterSpacing={1.8}>
          Usuários
        </Typography>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Atualizar usuário
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.7 }}>
          Primeiro escolha uma pessoa na lista. Depois o sistema abre o contexto correto para atualizar os dados com base naquele usuário.
        </Typography>
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
        <Stack spacing={1.5}>
          <TextField
            label="Pesquisar usuário"
            placeholder="Nome, CPF, família ou status"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
          <Typography variant="body2" color="text.secondary">
            {filteredUsers.length} usuário(s) encontrado(s)
          </Typography>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: 2 }}>
        <Paper elevation={0} variant="outlined" sx={{ p: 2.25, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
              Lista de usuários
            </Typography>

            <Stack spacing={1.25}>
              {filteredUsers.map((user) => {
                const selected = user.id === selectedUser?.id

                return (
                  <Card
                    key={user.id}
                    elevation={0}
                    variant="outlined"
                    sx={{ borderRadius: 2.5, borderColor: selected ? 'primary.main' : 'divider', backgroundColor: selected ? '#edf5f0' : '#ffffff' }}
                  >
                    <CardActionArea onClick={() => setSelectedUserId(user.id)} sx={{ alignItems: 'stretch' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                                {user.nome}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {user.familia}
                              </Typography>
                            </Box>
                            <Chip label={selected ? 'Selecionado' : 'Abrir'} size="small" sx={{ fontWeight: 700 }} />
                          </Stack>

                          <Divider />

                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap">
                            <Chip label={user.status} size="small" sx={{ backgroundColor: '#edf5f0', color: 'primary.dark', fontWeight: 700 }} />
                            {user.cpf && <Chip label={user.cpf} size="small" variant="outlined" />}
                            {user.ultimaAtualizacao && <Chip label={`Atualizado em ${user.ultimaAtualizacao}`} size="small" variant="outlined" />}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })}
            </Stack>
          </Stack>
        </Paper>

        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
          <Stack spacing={1.5} sx={{ height: '100%' }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
              Detalhes da seleção
            </Typography>

            {filteredUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum usuário encontrado com o filtro atual. Limpe a busca para voltar à lista.
              </Typography>
            ) : selectedUser ? (
              <>
                <Box>
                  <Typography variant="h6" fontWeight={800} gutterBottom>
                    {selectedUser.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {selectedUser.familia}
                  </Typography>
                </Box>

                <Stack spacing={1}>
                  <Chip label={selectedUser.status} sx={{ backgroundColor: '#edf5f0', color: 'primary.dark', fontWeight: 700, width: 'fit-content' }} />
                  {selectedUser.documento && <Typography variant="body2" color="text.secondary">Documento: {selectedUser.documento}</Typography>}
                  {selectedUser.cpf && <Typography variant="body2" color="text.secondary">CPF: {selectedUser.cpf}</Typography>}
                  {selectedUser.ultimaAtualizacao && <Typography variant="body2" color="text.secondary">Última atualização: {selectedUser.ultimaAtualizacao}</Typography>}
                  {selectedUser.observacao && <Typography variant="body2" color="text.secondary">{selectedUser.observacao}</Typography>}
                </Stack>

                <Button variant="contained" onClick={() => onOpenForm?.(selectedUser.id)} sx={{ alignSelf: 'flex-start' }}>
                  Abrir atualização do usuário
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um usuário na lista para começar a atualização.
              </Typography>
            )}

            <Box sx={{ mt: 'auto' }}>
              <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onBack} sx={{ alignSelf: 'flex-start' }}>
                Voltar para cadastro
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

export default AtualizarUsuarioPage
