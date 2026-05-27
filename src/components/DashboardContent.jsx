import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardSections } from '../data/dashboardSections'
import { getFormById, forms } from '../data/formsCatalog'
import { usersCatalog } from '../data/usersCatalog'
import AtualizarUsuarioPage from './AtualizarUsuarioPage'
import CadastrarUsuarioPage from './CadastrarUsuarioPage'
import CalendarioPage from './CalendarioPage'
import FamiliasPage from './FamiliasPage'
import FormRenderer from './FormRenderer'
import GraficosPage from './GraficosPage'
import TranscricaoAudioPage from './TranscricaoAudioPage'
import VisaoGeralPage from './VisaoGeralPage'
import ProfilePage from '../pages/ProfilePage'

const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

function CadastroLandingPage({ onStartUpdate, onStartCreate }) {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 980 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Stack spacing={1.25}>
          <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
            Cadastro
          </Typography>
          <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
            Por onde você quer começar?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, ...cardTextSx }}>
            Aqui o fluxo deixa de ser um catálogo solto. Primeiro você escolhe entre atualizar um usuário existente ou cadastrar um novo usuário, e depois segue pela ordem definida no forms.json.
          </Typography>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#ffffff', borderColor: 'divider' }}>
          <Stack spacing={1.25} sx={{ height: '100%' }}>
            <Typography variant="h6" fontWeight={800}>
              Atualizar usuário
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Abre a lista de usuários cadastrados para localizar uma pessoa e seguir para a atualização do cadastro.
            </Typography>
            <Button variant="contained" onClick={onStartUpdate} sx={{ alignSelf: 'flex-start', mt: 'auto' }}>
              Atualizar usuário
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#ffffff', borderColor: 'divider' }}>
          <Stack spacing={1.25} sx={{ height: '100%' }}>
            <Typography variant="h6" fontWeight={800}>
              Cadastrar novo usuário
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Abre o fluxo na ordem dos formulários definidos no catálogo, com a sequência visual já organizada para a equipe.
            </Typography>
            <Button variant="outlined" onClick={onStartCreate} sx={{ alignSelf: 'flex-start', mt: 'auto' }}>
              Cadastrar novo usuário
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff' }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Como usar
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          1. Atualize um usuário já existente quando precisar alterar uma ficha.
          2. Cadastre um novo usuário quando for iniciar um registro do zero.
          3. A sequência de formulários seguirá a ordem já definida no JSON para evitar pular etapas.
        </Typography>
      </Paper>
    </Stack>
  )
}

function DashboardContent({ sectionSlug, formId, actionSlug }) {
  const navigate = useNavigate()
  const cadastroForms = useMemo(() => forms.filter((form) => form.id !== 'ficha_atualizacao_unas'), [])

  const currentSection = useMemo(() => {
    return dashboardSections.find((section) => section.slug === sectionSlug) ?? dashboardSections[0]
  }, [sectionSlug])

  const currentForm = useMemo(() => getFormById(formId), [formId])

  const isCadastroSection = currentSection.slug === 'cadastro'
  const isCalendarioSection = currentSection.slug === 'calendario'
  const isFamiliasSection = currentSection.slug === 'familias'
  const isGraficosSection = currentSection.slug === 'graficos'
  const isVisaoGeralSection = currentSection.slug === 'visao-geral'
  const isPerfilSection = currentSection.slug === 'perfil'

  if (isFamiliasSection) {
    return <FamiliasPage />
  }

  if (isCalendarioSection) {
    return <CalendarioPage />
  }

  if (isGraficosSection) {
    return <GraficosPage />
  }

  if (isCadastroSection && actionSlug === 'novo') {
    return (
      <CadastrarUsuarioPage
        forms={cadastroForms}
        onBack={() => navigate('/dashboard/cadastro')}
        onOpenForm={(nextFormId) => navigate(`/dashboard/cadastro/formulario/${nextFormId}`)}
      />
    )
  }

  if (isCadastroSection && actionSlug === 'atualizar') {
    return (
      <AtualizarUsuarioPage
        users={usersCatalog}
        onBack={() => navigate('/dashboard/cadastro')}
        onOpenForm={() => navigate('/dashboard/cadastro/formulario/ficha_atualizacao_unas')}
      />
    )
  }

  if (isCadastroSection && currentForm) {
    const isAtualizacaoForm = currentForm.id === 'ficha_atualizacao_unas'

    return (
      <FormRenderer
        key={currentForm.id}
        form={currentForm}
        flowForms={isAtualizacaoForm ? [currentForm] : cadastroForms}
        onSelectFlowForm={(nextFormId) => navigate(`/dashboard/cadastro/formulario/${nextFormId}`)}
        onBack={() => navigate(isAtualizacaoForm ? '/dashboard/cadastro/atualizar' : '/dashboard/cadastro/novo')}
      />
    )
  }

  if (isCadastroSection) {
    return (
      <CadastroLandingPage
        onStartUpdate={() => navigate('/dashboard/cadastro/atualizar')}
        onStartCreate={() => navigate('/dashboard/cadastro/novo')}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'cadastrar-usuario') {
    return (
      <CadastrarUsuarioPage
        forms={cadastroForms}
        onBack={() => navigate('/dashboard/visao-geral')}
        onOpenForm={(nextFormId) => navigate(`/dashboard/cadastro/formulario/${nextFormId}`)}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'atualizar-usuario') {
    return (
      <AtualizarUsuarioPage
        users={usersCatalog}
        onBack={() => navigate('/dashboard/visao-geral')}
        onOpenForm={() => navigate('/dashboard/cadastro/formulario/ficha_atualizacao_unas')}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'transcricao-audio') {
    return <TranscricaoAudioPage onBack={() => navigate('/dashboard/visao-geral')} />
  }

  if (isVisaoGeralSection) {
    return <VisaoGeralPage onOpenAction={(slug) => navigate(`/dashboard/visao-geral/${slug}`)} />
  }

  if (isPerfilSection) {
    return <ProfilePage />
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 960 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
          {currentSection.title}
        </Typography>
        <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
          Área em preparação
        </Typography>
        <Typography color="text.secondary" sx={cardTextSx}>
          Esta seção está reservada e ainda não possui conteúdo específico.
        </Typography>
      </Paper>
    </Stack>
  )
}

export default DashboardContent