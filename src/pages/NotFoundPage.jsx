import { useNavigate } from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { ActionButton, PageState, PageToolbar, PageWrapper } from './ui'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageState
        type="notFound"
        title="Página não encontrada"
        message="A página que você tentou acessar não existe ou foi removida. Verifique o endereço ou volte para a área principal."
        centered
        action={
          <PageToolbar direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
            <ActionButton variant="contained" startIcon={<DashboardOutlinedIcon />} onClick={() => navigate('/dashboard')}>Ir para o painel</ActionButton>
            <ActionButton startIcon={<LoginOutlinedIcon />} onClick={() => navigate('/login')}>Voltar ao login</ActionButton>
          </PageToolbar>
        }
      />
    </PageWrapper>
  )
}

export default NotFoundPage
