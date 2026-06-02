import { Avatar } from '@mui/material'

const sizes = {
  sm: { width: 34, height: 34, fontSize: '0.75rem' },
  md: { width: 48, height: 48, fontSize: '1rem' },
  lg: { width: 72, height: 72, fontSize: '1.5rem' },
}

function PageAvatar({ children, size = 'md', sx = {}, ...props }) {
  return (
    <Avatar
      sx={{
        ...(sizes[size] ?? sizes.md),
        bgcolor: 'primary.main',
        fontWeight: 800,
        boxShadow: '0 4px 14px rgba(30,136,229,0.3)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Avatar>
  )
}

export default PageAvatar
