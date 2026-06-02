import { Box } from '@mui/material'
import { authIllustrationSx } from '../pages/ui/uiStyles'

function BackgroundIllustration({ src }) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={authIllustrationSx}
    />
  )
}

export default BackgroundIllustration
