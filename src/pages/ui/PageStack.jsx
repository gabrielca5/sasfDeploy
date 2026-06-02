import { Stack } from '@mui/material'

function PageStack({ children, spacing = 1.5, sx = {}, ...props }) {
  return (
    <Stack spacing={spacing} sx={{ minWidth: 0, ...sx }} {...props}>
      {children}
    </Stack>
  )
}

export default PageStack
