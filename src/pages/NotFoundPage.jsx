import Button from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { PageSection, PageToolbar, PageWrapper } from './ui'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="404"
        title="Página não encontrada"
        description="A página que você tentou acessar não existe ou foi removida. Verifique o endereço ou volte para a área principal."
        direction="column"
        alignItems="center"
        contentSx={{ textAlign: 'center' }}
      >
        <PageToolbar direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={() => navigate('/dashboard')}>Ir para o painel</Button>
          <Button variant="outlined" onClick={() => navigate('/login')}>Voltar ao login</Button>
        </PageToolbar>
      </PageSection>
    </PageWrapper>
  )
}

export default NotFoundPage
