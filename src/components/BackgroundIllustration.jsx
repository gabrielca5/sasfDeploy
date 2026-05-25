import { Box } from '@mui/material'

function BackgroundIllustration({ src }) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={{
        position: 'absolute',
        left: { xs: '-8rem', sm: '-10rem', md: '-14rem' },
        bottom: { xs: '-7rem', sm: '-9rem', md: '-11rem' },
        width: { xs: 'min(120vw, 720px)', sm: 'min(90vw, 860px)', md: 'min(68vw, 980px)' },
        height: 'auto',
        opacity: { xs: 0.22, sm: 0.28, md: 0.34 },
        filter: 'saturate(0.9)',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default BackgroundIllustration