import BackgroundIllustration from './BackgroundIllustration'
import ilustracao from '../assets/ilustracao.png'
import { AuthShell } from '../pages/ui'

function AuthLayout({ children, ariaLabel, illustrationSrc = ilustracao }) {
  return (
    <AuthShell ariaLabel={ariaLabel} illustration={<BackgroundIllustration src={illustrationSrc} />}>
      {children}
    </AuthShell>
  )
}

export default AuthLayout
