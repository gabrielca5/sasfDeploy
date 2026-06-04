import { Box, Skeleton, Stack } from '@mui/material'
import { skeletonBlockSx } from './uiStyles'

const variantRows = {
  cards: { height: 132 },
  form: { height: 56 },
  list: { height: 74 },
  page: { height: 96 },
}

function PageSkeleton({ variant = 'list', rows = 3, ariaLabel = 'Carregando conteúdo' }) {
  const config = variantRows[variant] ?? variantRows.list

  return (
    <Stack spacing={1.25} role="status" aria-live="polite" aria-label={ariaLabel} sx={{ minWidth: 0 }}>
      {Array.from({ length: rows }).map((_, index) => (
        <Box key={`${variant}-${index}`} sx={{ minWidth: 0 }}>
          <Skeleton variant="rounded" height={config.height} sx={skeletonBlockSx} />
        </Box>
      ))}
    </Stack>
  )
}

export default PageSkeleton
