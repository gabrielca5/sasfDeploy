import { Box, Stack } from '@mui/material'

/**
 * PageWrapper
 * Constrains page content to a max-width and centers it horizontally.
 * Mirrors the wrapper used in FamiliasPage.jsx.
 */
function PageWrapper({ children, maxWidth=1200, spacing=3, centered = false, contentSx = {}, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 2.5, md: 0 },
        width: '100%',
        ...(centered ? { minHeight: '100vh', display: 'grid', placeItems: 'center' } : {}),
        ...sx,
      }}
      {...props}
    >
      {spacing ? (
        <Stack spacing={spacing} sx={{ minWidth: 0, ...contentSx }}>
          {children}
        </Stack>
      ) : (
        children
      )}
    </Box>
  )
}

export default PageWrapper
