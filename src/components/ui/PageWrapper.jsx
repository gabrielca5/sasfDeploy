import { Box } from '@mui/material'

function PageWrapper({ children, maxWidth = 1120, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 2.5, md: 0 },
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default PageWrapper
