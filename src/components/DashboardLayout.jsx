import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar, Avatar, Box, Chip, Divider, Drawer, IconButton,
  List, ListItemButton, ListItemIcon, ListItemText,
  Stack, Toolbar, Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import logoPng from '../assets/chicoLogo.png'
import DashboardContent from './DashboardContent'
import { dashboardSections } from '../data/dashboardSections'

const DRAWER_WIDTH = 256

const sectionIcons = {
  'visao-geral': <DashboardOutlinedIcon fontSize="small" />,
  familias: <GroupsOutlinedIcon fontSize="small" />,
  cadastro: <AddCircleOutlineRoundedIcon fontSize="small" />,
  calendario: <CalendarMonthOutlinedIcon fontSize="small" />,
  perfil: <AccountCircleOutlinedIcon fontSize="small" />,
}

const currentUser = {
  nome: 'Carlos Eduardo Silva',
  cargo: 'Técnico de referência',
  initials: 'CE',
}

function SidebarContent({ sectionSlug, onNavigate, onClose }) {
  const visibleSections = dashboardSections.filter((s) => !s.hidden)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Brand */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5}  >
          <Box component="img" src={logoPng} alt="SASF" sx={{ width: 34, height: 34, objectFit: 'contain', flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1 }}>
              SASF · Painel
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, lineHeight: 1.3, color: 'text.primary' }}>
              Chico Mendes
            </Typography>
          </Box>
        </Stack>
        {onClose && (
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary', ml: 1 }}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Nav */}
      <Box sx={{ flex: 1, px: 1.5, py: 1.5, overflowY: 'auto' }}>
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {visibleSections.map((section) => {
            const selected = section.slug === sectionSlug
            return (
              <ListItemButton
                key={section.slug}
                selected={selected}
                onClick={() => onNavigate(section)}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  px: 1.5,
                  minHeight: 40,
                  '&.Mui-selected': {
                    backgroundColor: alpha('#1e88e5', 0.09),
                    color: '#1565c0',
                    '& .MuiListItemIcon-root': { color: '#1e88e5' },
                    '&:hover': { backgroundColor: alpha('#1e88e5', 0.13) },
                  },
                  '&:not(.Mui-selected)': {
                    color: '#6b7280',
                    '& .MuiListItemIcon-root': { color: '#9ca3af' },
                    '&:hover': {
                      backgroundColor: alpha('#111827', 0.05),
                      color: '#111827',
                      '& .MuiListItemIcon-root': { color: '#374151' },
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, mr: 0.5 }}>
                  {sectionIcons[section.slug] ?? <DashboardOutlinedIcon fontSize="small" />}
                </ListItemIcon>
               <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: selected ? 700 : 500,
                        fontSize: '0.875rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {section.label}
                    </Typography>
                  }
                />
                {selected && (
                  <Box sx={{
                    width: 3, height: 18, borderRadius: 2,
                    backgroundColor: 'primary.main', flexShrink: 0, ml: 1,
                  }} />
                )}
              </ListItemButton>
            )
          })}
        </List>
      </Box>

      <Divider />

      {/* User footer */}
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.25,
          p: 1.25, borderRadius: 2,
          backgroundColor: '#f8f9fb',
          border: '1px solid #e5e7eb',
        }}>
          <Avatar sx={{
            width: 34, height: 34,
            backgroundColor: 'primary.main',
            fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
          }}>
            {currentUser.initials}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.2, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentUser.nome}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', lineHeight: 1.3, mt: 0.2 }}>
              {currentUser.cargo}
            </Typography>
          </Box>
          <Tooltip title="Sair" placement="top">
            <IconButton
              size="small"
              onClick={() => onNavigate({ slug: 'sair' })}
              sx={{ color: '#9ca3af', flexShrink: 0, '&:hover': { color: 'error.main' } }}
            >
              <LogoutRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

function DashboardLayout({ sectionSlug, formId, actionSlug }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (section) => {
    setMobileOpen(false)
    if (section?.slug === 'sair') { navigate('/login'); return }
    if (section) navigate(`/dashboard/${section.slug}`)
  }

  const currentSection = dashboardSections.find((s) => s.slug === sectionSlug)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f6fa' }}>
      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            boxShadow: '1px 0 6px rgba(17,24,39,0.04)',
          },
        }}
      >
        <SidebarContent sectionSlug={sectionSlug} onNavigate={handleNavigate} />
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, backgroundColor: '#ffffff' },
        }}
      >
        <SidebarContent sectionSlug={sectionSlug} onNavigate={handleNavigate} onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile topbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            display: { xs: 'flex', md: 'none' },
            backgroundColor: '#ffffff',
            color: 'text.primary',
            borderBottom: '1px solid #e5e7eb',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ gap: 1.5, minHeight: '52px !important', px: 2 }}>
            <IconButton onClick={() => setMobileOpen(true)} size="small" edge="start">
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
            <Box component="img" src={logoPng} alt="SASF" sx={{ width: 26, height: 26, objectFit: 'contain' }} />
            <Typography sx={{ flex: 1, fontWeight: 700, fontSize: '0.9rem' }}>
              {currentSection?.label ?? 'SASF'}
            </Typography>
            <Avatar sx={{ width: 28, height: 28, backgroundColor: 'primary.main', fontSize: '0.7rem', fontWeight: 700 }}>
              {currentUser.initials}
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 2.5, md: 3 }, overflow: 'auto', maxWidth: '100%' }}>
          <DashboardContent sectionSlug={sectionSlug} formId={formId} actionSlug={actionSlug} />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
