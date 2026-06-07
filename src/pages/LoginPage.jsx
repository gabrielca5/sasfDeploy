import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'
import { ActionButton, InlineFeedback, PageDialog } from './ui'

function LoginPage() {
  const location = useLocation()
  const registered = location.state?.registered
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(Boolean(registered))

  return (
    <AuthLayout ariaLabel="Login de acesso">
      <LoginForm />
      <PageDialog
        open={approvalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)}
        title="Acesso pendente"
        titleIcon={<WarningAmberRoundedIcon color="warning" />}
        actions={
          <ActionButton variant="contained" onClick={() => setApprovalDialogOpen(false)}>
            Entendi
          </ActionButton>
        }
      >
        <InlineFeedback
          severity="warning"
          message="Cadastro enviado. Aguarde a aprovação do administrativo para fazer login."
        />
      </PageDialog>
    </AuthLayout>
  )
}

export default LoginPage
