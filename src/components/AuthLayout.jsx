import { Box } from '@mui/material'
import BackgroundIllustration from './BackgroundIllustration'
import BrandHeader from './BrandHeader'

function AuthLayout({ illustrationSrc, logoSrc, subtitle, ariaLabel, children }) {
  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <BackgroundIllustration src={illustrationSrc} />

      <Box
        component="section"
        aria-label={ariaLabel}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 360,
        }}
      >
        <BrandHeader logoSrc={logoSrc} subtitle={subtitle} />
        {children}
      </Box>
    </Box>
  )
}

export default AuthLayout