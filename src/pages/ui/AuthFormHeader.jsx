import { Box, Divider, Typography } from '@mui/material'
import {
  authDividerSx,
  authHeaderSx,
  authIconFrameSx,
  authIconSx,
  authSubtitleSx,
  authTitleSx,
} from './uiStyles'

function AuthFormHeader({ icon, title, subtitle, divider = true }) {
  const Icon = icon

  return (
    <>
      <Box sx={authHeaderSx}>
        <Box sx={authIconFrameSx}>
          <Icon sx={authIconSx} />
        </Box>
        <Typography variant="h6" sx={authTitleSx}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={authSubtitleSx}>
          {subtitle}
        </Typography>
      </Box>

      {divider ? <Divider sx={authDividerSx} /> : null}
    </>
  )
}

export default AuthFormHeader
