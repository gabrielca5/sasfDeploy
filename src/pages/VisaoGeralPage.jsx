import { Typography } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import {
  PageCard,
  PageGrid,
  PageSection,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
} from './ui'

const actions = [
  {
    slug: 'cadastrar-usuario',
    label: 'Cadastrar usuário',
    help: 'Abrir o fluxo de novo cadastro com orientações claras passo a passo.',
    detail: 'Ideal quando a pessoa ainda não existe no sistema.',
    badge: 'Mais usado',
    tone: 'primary',
    icon: <PersonAddAlt1OutlinedIcon fontSize="small" />,
  },
  {
    slug: 'atualizar-usuario',
    label: 'Atualizar cadastro',
    help: 'Encontrar e corrigir informações já registradas.',
    detail: 'Use para ajustar dados, documentos ou contatos.',
    badge: 'Consulta e edição',
    tone: 'secondary',
    icon: <ManageAccountsOutlinedIcon fontSize="small" />,
  },
  {
    slug: 'transcricao-audio',
    label: 'Transcrição de áudio',
    help: 'Acessar o espaço preparado para organizar áudios e anotações.',
    detail: 'Pensado para apoiar registros sem exigir conhecimento técnico.',
    badge: 'Em preparação',
    tone: 'neutral',
    icon: <GraphicEqOutlinedIcon fontSize="small" />,
  },
]

function VisaoGeralPage({ onOpenAction }) {
  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Visão geral"
        title="Qual serviço você quer fazer agora?"
        description="Esta tela foi organizada para reduzir dúvidas: escolha pela tarefa, não pelo nome do sistema. As opções abaixo seguem a mesma estrutura visual para facilitar a leitura e evitar erros."
        actions={
          <PageToolbar direction={{ xs: 'column', sm: 'row' }}>
            <StatusChip label="Acesso guiado" tone="highlight" />
            <StatusChip label="3 ações disponíveis" />
            <StatusChip label="Acesso simplificado" />
          </PageToolbar>
        }
      />

      <PageGrid variant="cards">
        {actions.map((action) => (
          <PageCard
            key={action.slug}
            title={action.label}
            subtitle={action.help}
            icon={action.icon}
            iconTone={action.tone === 'primary' ? 'primary' : 'muted'}
            badge={action.badge}
            onClick={() => onOpenAction(action.slug)}
            hover
            footer={
              <>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {action.detail}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Clique para abrir.
                </Typography>
              </>
            }
          />
        ))}
      </PageGrid>

      <SectionBlock title="Como usar esta tela">
        <Typography variant="body2" color="text.secondary">
          1. Leia a descrição de cada card para identificar o objetivo.<br />
          2. Toque no card correspondente para abrir a próxima etapa.<br />
          3. Se estiver em dúvida, comece por cadastrar usuário e volte quando precisar ajustar ou registrar áudio.
        </Typography>
      </SectionBlock>
    </PageWrapper>
  )
}

export default VisaoGeralPage
