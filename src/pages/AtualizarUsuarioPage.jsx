import { useMemo, useState } from 'react'
import { Divider, TextField, Typography } from '@mui/material'
import Button from '../components/ui/button'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import {
  DetailItem,
  EmptyState,
  FilterPanel,
  PageCard,
  PageGrid,
  PageList,
  PageListItem,
  PageSection,
  PageToolbar,
  PageWrapper,
  StatusChip,
} from './ui'

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
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Usuários"
        title="Atualizar usuário"
        description="Primeiro escolha uma pessoa na lista. Depois o sistema abre o contexto correto para atualizar os dados com base naquele usuário."
      />

      <FilterPanel title="Busca de usuário">
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
      </FilterPanel>

      <PageGrid variant="split">
        <PageList title="Lista de usuários">
          {filteredUsers.map((user) => {
            const selected = user.id === selectedUser?.id

            return (
              <PageListItem
                key={user.id}
                title={user.nome}
                subtitle={user.familia}
                selected={selected}
                onClick={() => setSelectedUserId(user.id)}
                actions={<StatusChip label={selected ? 'Selecionado' : 'Abrir'} tone={selected ? 'highlight' : undefined} />}
                footer={
                  <PageToolbar justifyContent="flex-start">
                    <StatusChip label={user.status} tone="highlight" />
                    {user.cpf && <StatusChip label={user.cpf} />}
                    {user.ultimaAtualizacao && <StatusChip label={`Atualizado em ${user.ultimaAtualizacao}`} />}
                  </PageToolbar>
                }
              />
            )
          })}
        </PageList>

        <PageCard eyebrow="Detalhes da seleção" title={selectedUser?.nome} subtitle={selectedUser?.familia}>
          {filteredUsers.length === 0 ? (
            <EmptyState message="Nenhum usuário encontrado com o filtro atual. Limpe a busca para voltar à lista." />
          ) : selectedUser ? (
            <>
              <Divider />
              <PageGrid variant="detail2">
                <StatusChip label={selectedUser.status} tone="highlight" fit />
                {selectedUser.documento && <DetailItem label="Documento" value={selectedUser.documento} icon={<BadgeOutlinedIcon fontSize="small" />} />}
                {selectedUser.cpf && <DetailItem label="CPF" value={selectedUser.cpf} icon={<BadgeOutlinedIcon fontSize="small" />} />}
                {selectedUser.ultimaAtualizacao && <DetailItem label="Última atualização" value={selectedUser.ultimaAtualizacao} icon={<BadgeOutlinedIcon fontSize="small" />} />}
                {selectedUser.observacao && <DetailItem label="Observação" value={selectedUser.observacao} icon={<PersonOutlineOutlinedIcon fontSize="small" />} />}
              </PageGrid>

              <PageToolbar justifyContent="flex-start">
                <Button variant="contained" onClick={() => onOpenForm?.(selectedUser.id)}>
                  Abrir atualização do usuário
                </Button>
              </PageToolbar>
            </>
          ) : (
            <EmptyState message="Selecione um usuário na lista para começar a atualização." />
          )}

          <PageToolbar justifyContent="flex-start">
            <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onBack}>
              Voltar para cadastro
            </Button>
          </PageToolbar>
        </PageCard>
      </PageGrid>
    </PageWrapper>
  )
}

export default AtualizarUsuarioPage
