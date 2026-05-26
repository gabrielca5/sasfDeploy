import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardSections } from '../data/dashboardSections'
import { getFormById, forms } from '../data/formsCatalog'
import AtualizarUsuarioPage from './AtualizarUsuarioPage'
import CadastrarUsuarioPage from './CadastrarUsuarioPage'
import CalendarioPage from './CalendarioPage'
import FamiliasPage from './FamiliasPage'
import FormRenderer from './FormRenderer'
import GraficosPage from './GraficosPage'
import TranscricaoAudioPage from './TranscricaoAudioPage'
import VisaoGeralPage from './VisaoGeralPage'

const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

function CatalogCard({ form, onOpen }) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ p: 2.25, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff', height: '100%' }}
    >
      <Stack spacing={1.25} sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" fontWeight={800} gutterBottom sx={cardTextSx}>
            {form.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
            {form.orgao}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {form.folhas && <Chip label={`Folhas ${form.folhas}`} size="small" sx={{ backgroundColor: '#edf5f0', color: 'primary.dark', maxWidth: '100%' }} />}
          <Chip label={`${form.secoes.length} seção(ões)`} size="small" variant="outlined" />
        </Stack>

        <Button variant="contained" onClick={onOpen} sx={{ alignSelf: 'flex-start', borderRadius: 999 }}>
          Abrir formulário
        </Button>
      </Stack>
    </Paper>
  )
}

function DashboardContent({ sectionSlug, formId, actionSlug }) {
  const navigate = useNavigate()
  const implementedFormIds = useMemo(
    () => new Set(['ficha_cadastral_familia', 'ficha_cadastral_complementar', 'ficha_atualizacao_unas']),
    [],
  )

  const currentSection = useMemo(() => {
    return dashboardSections.find((section) => section.slug === sectionSlug) ?? dashboardSections[0]
  }, [sectionSlug])

  const currentForm = useMemo(() => getFormById(formId), [formId])

  const isCadastroSection = currentSection.slug === 'cadastro'
  const isCalendarioSection = currentSection.slug === 'calendario'
  const isFamiliasSection = currentSection.slug === 'familias'
  const isGraficosSection = currentSection.slug === 'graficos'
  const isVisaoGeralSection = currentSection.slug === 'visao-geral'

  if (isFamiliasSection) {
    return <FamiliasPage />
  }

  if (isCalendarioSection) {
    return <CalendarioPage />
  }

  if (isGraficosSection) {
    return <GraficosPage />
  }

  if (isCadastroSection && currentForm && implementedFormIds.has(currentForm.id)) {
    return (
      <FormRenderer
        key={currentForm.id}
        form={currentForm}
        onBack={() => navigate('/dashboard/cadastro')}
      />
    )
  }

  if (isCadastroSection && currentForm) {
    return (
      <Stack spacing={2.5}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
        >
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
                Formulário em construção
              </Typography>
              <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
                {currentForm.titulo}
              </Typography>
              <Typography color="text.secondary" sx={cardTextSx}>
                Esta ficha ainda não foi convertida para campos interativos. Os três primeiros formulários pedidos já estão ativos.
              </Typography>
            </Box>

            <Button variant="outlined" onClick={() => navigate('/dashboard/cadastro')} sx={{ alignSelf: { xs: 'stretch', md: 'center' } }}>
              Voltar ao catálogo
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Estrutura disponível
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A ficha existe no catálogo, mas o renderer interativo ainda será expandido para os próximos formulários.
          </Typography>
        </Paper>
      </Stack>
    )
  }

  if (isCadastroSection) {
    return (
      <Stack spacing={2.5}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
        >
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
                Cadastro
              </Typography>
              <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
                Formulários disponíveis
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 760, ...cardTextSx }}>
                Os botões abaixo são gerados a partir do `forms.json`. Cada ação abre uma página com a estrutura do formulário correspondente.
              </Typography>
            </Box>

            <Chip label={`${forms.length} formulários carregados`} sx={{ backgroundColor: '#edf5f0', color: 'primary.dark', fontWeight: 700 }} />
          </Stack>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
          {forms.map((form) => (
            <Box key={form.id} sx={{ minWidth: 0 }}>
              <CatalogCard form={form} onOpen={() => navigate(`/dashboard/cadastro/${form.id}`)} />
            </Box>
          ))}
        </Box>

        <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff' }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Como funciona
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A tela de cadastro não exibe gráficos. Ela serve como catálogo de acesso para os formulários definidos no arquivo raiz.
          </Typography>
        </Paper>
      </Stack>
    )
  }

  if (isVisaoGeralSection && actionSlug === 'cadastrar-usuario') {
    return <CadastrarUsuarioPage onBack={() => navigate('/dashboard/visao-geral')} />
  }

  if (isVisaoGeralSection && actionSlug === 'atualizar-usuario') {
    return <AtualizarUsuarioPage onBack={() => navigate('/dashboard/visao-geral')} />
  }

  if (isVisaoGeralSection && actionSlug === 'transcricao-audio') {
    return <TranscricaoAudioPage onBack={() => navigate('/dashboard/visao-geral')} />
  }

  if (isVisaoGeralSection) {
    return <VisaoGeralPage onOpenAction={(slug) => navigate(`/dashboard/visao-geral/${slug}`)} />
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