import { useMemo, useState } from 'react'
import { TextField } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import {
  ActionButton,
  EmptyState,
  FilterPanel,
  InfoGrid,
  PageCard,
  PageGrid,
  PageList,
  PageListItem,
  PageSection,
  PageStack,
  PageToolbar,
  PageWrapper,
  SectionBlock,
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

  const selectedUserDetails = selectedUser
    ? [
        selectedUser.documento && { label: 'Documento', value: selectedUser.documento, icon: <BadgeOutlinedIcon fontSize="small" /> },
        selectedUser.cpf && { label: 'CPF', value: selectedUser.cpf, icon: <BadgeOutlinedIcon fontSize="small" /> },
        selectedUser.ultimaAtualizacao && { label: 'Última atualização', value: selectedUser.ultimaAtualizacao, icon: <BadgeOutlinedIcon fontSize="small" /> },
        selectedUser.observacao && { label: 'Observação', value: selectedUser.observacao, icon: <PersonOutlineOutlinedIcon fontSize="small" /> },
      ].filter(Boolean)
    : []

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Usuários"
        title="Atualizar usuário"
        description="Primeiro escolha uma pessoa na lista. Depois o sistema abre o contexto correto para atualizar os dados com base naquele usuário."
        actions={<StatusChip label={`${users.length} usuários`} tone="highlight" />}
      />

      <FilterPanel title="Busca de usuário">
        <PageStack spacing={1.5}>
          <TextField
            label="Pesquisar usuário"
            placeholder="Nome, CPF, família ou status"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
          <PageToolbar justifyContent="flex-start">
            <StatusChip label={`${filteredUsers.length} usuário(s) encontrado(s)`} />
          </PageToolbar>
        </PageStack>
      </FilterPanel>

      <PageGrid variant="split">
        <PageList title="Lista de usuários" actions={<StatusChip label={`${filteredUsers.length}`} />}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
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
            })
          ) : (
            <EmptyState
              message="Nenhum usuário encontrado com o filtro atual."
              action={<ActionButton onClick={() => setSearch('')}>Limpar busca</ActionButton>}
            />
          )}
        </PageList>

        <PageCard
          eyebrow="Detalhes da seleção"
          title={selectedUser?.nome}
          subtitle={selectedUser?.familia}
          actions={selectedUser ? <StatusChip label={selectedUser.status} tone="highlight" /> : null}
        >
          <PageStack spacing={1.5}>
            {filteredUsers.length === 0 ? (
              <EmptyState
                message="Nenhum usuário encontrado com o filtro atual. Limpe a busca para voltar à lista."
                action={<ActionButton onClick={() => setSearch('')}>Limpar busca</ActionButton>}
              />
            ) : selectedUser ? (
              <>
                <SectionBlock title="Dados do usuário" variant="plain">
                  <InfoGrid detailVariant="plain" items={selectedUserDetails} />
                </SectionBlock>

                <PageToolbar justifyContent="flex-start">
                  <ActionButton variant="contained" startIcon={<EditOutlinedIcon />} onClick={() => onOpenForm?.(selectedUser.id)}>
                    Abrir atualização do usuário
                  </ActionButton>
                </PageToolbar>
              </>
            ) : (
              <EmptyState message="Selecione um usuário na lista para começar a atualização." />
            )}

            <PageToolbar justifyContent="flex-start">
              <ActionButton startIcon={<ArrowBackRoundedIcon />} onClick={onBack}>
                Voltar para cadastro
              </ActionButton>
            </PageToolbar>
          </PageStack>
        </PageCard>
      </PageGrid>
    </PageWrapper>
  )
}

export default AtualizarUsuarioPage
