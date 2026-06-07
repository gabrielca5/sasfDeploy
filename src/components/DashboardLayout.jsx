import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { get } from '../lib/apiClient'
import {
  AppBar, Avatar, Box, Divider, Drawer, IconButton,
  List, ListItemButton, ListItemIcon, ListItemText,
  Stack, Toolbar, Tooltip, Typography, useTheme,
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
import { ConfirmDialog } from '../pages/ui'

const DRAWER_WIDTH = 256

const sectionIcons = {
  'visao-geral': <DashboardOutlinedIcon fontSize="small" />,
  familias: <GroupsOutlinedIcon fontSize="small" />,
  cadastro: <AddCircleOutlineRoundedIcon fontSize="small" />,
  calendario: <CalendarMonthOutlinedIcon fontSize="small" />,
  perfil: <AccountCircleOutlinedIcon fontSize="small" />,
}

const cargoLabels = {
  ADMIN: 'Administrador',
  GESTOR: 'Gestor',
  TECNICO: 'Técnico',
  ORIENTADOR: 'Orientador',
}

function initials(value) {
  if (!value) return '?'
  const name = String(value).trim().split('@')[0]
  const parts = name.split(/[\s._-]/).filter(Boolean)
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

const SIDEBAR_BG = '#0f1729'
const SIDEBAR_SELECTED_BG = 'rgba(255,255,255,0.10)'
const SIDEBAR_HOVER_BG = 'rgba(255,255,255,0.06)'
const SIDEBAR_TEXT = 'rgba(255,255,255,0.55)'
const SIDEBAR_TEXT_SELECTED = '#ffffff'
const SIDEBAR_ICON = 'rgba(255,255,255,0.4)'
const SIDEBAR_ICON_SELECTED = '#60a5fa'
const SIDEBAR_DIVIDER = 'rgba(255,255,255,0.08)'

function SidebarContent({ sectionSlug, onNavigate, onClose, user }) {
  const visibleSections = dashboardSections.filter((s) => !s.hidden)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: SIDEBAR_BG }}>
      {/* Brand */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1.5}>
          <Box component="img" src={logoPng} alt="SASF" sx={{ width: 34, height: 34, objectFit: 'contain', flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: SIDEBAR_TEXT, lineHeight: 1 }}>
              SASF · Painel
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 800, lineHeight: 1.3, color: SIDEBAR_TEXT_SELECTED }}>
              Chico Mendes
            </Typography>
          </Box>
        </Stack>
        {onClose && (
          <IconButton size="small" onClick={onClose} sx={{ color: SIDEBAR_TEXT, ml: 1, '&:hover': { color: SIDEBAR_TEXT_SELECTED, backgroundColor: SIDEBAR_HOVER_BG } }}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: SIDEBAR_DIVIDER }} />

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
                    backgroundColor: SIDEBAR_SELECTED_BG,
                    color: SIDEBAR_TEXT_SELECTED,
                    '& .MuiListItemIcon-root': { color: SIDEBAR_ICON_SELECTED },
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.13)' },
                  },
                  '&:not(.Mui-selected)': {
                    color: SIDEBAR_TEXT,
                    '& .MuiListItemIcon-root': { color: SIDEBAR_ICON },
                    '&:hover': {
                      backgroundColor: SIDEBAR_HOVER_BG,
                      color: 'rgba(255,255,255,0.85)',
                      '& .MuiListItemIcon-root': { color: 'rgba(255,255,255,0.7)' },
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
                      sx={{ fontWeight: selected ? 700 : 500, fontSize: '0.875rem', lineHeight: 1.4 }}
                    >
                      {section.label}
                    </Typography>
                  }
                />
                {selected && (
                  <Box sx={{ width: 3, height: 18, borderRadius: 2, backgroundColor: SIDEBAR_ICON_SELECTED, flexShrink: 0, ml: 1 }} />
                )}
              </ListItemButton>
            )
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: SIDEBAR_DIVIDER }} />

      {/* User footer */}
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.25,
          p: 1.25, borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <Avatar sx={{
            width: 34, height: 34,
            backgroundColor: '#2563eb',
            fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
          }}>
            {initials(user?.name)}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.2, color: 'rgba(255,255,255,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name ?? ''}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3, mt: 0.2 }}>
              {cargoLabels[user?.cargo] ?? user?.cargo ?? ''}
            </Typography>
          </Box>
          <Tooltip title="Sair" placement="top">
            <IconButton
              size="small"
              onClick={() => onNavigate({ slug: 'sair' })}
              sx={{
                color: '#f87171',
                backgroundColor: 'rgba(220,38,38,0.15)',
                border: '1px solid rgba(220,38,38,0.2)',
                flexShrink: 0,
                '&:hover': { color: '#ffffff', backgroundColor: '#dc2626', borderColor: '#dc2626' },
              }}
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
  const { user, logout } = useAuth()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const { data: profile } = useQuery({
    queryKey: ['usuario', user?.userId],
    queryFn: () => get(`/usuario/${user.userId}`),
    enabled: !!user?.userId,
    staleTime: 5 * 60 * 1000,
  })
  const displayUser = {
    ...user,
    ...profile,
    name: profile?.name ?? profile?.nome ?? user?.name ?? user?.nome ?? user?.email ?? '',
    email: profile?.email ?? user?.email ?? '',
    cargo: profile?.cargo ?? user?.cargo ?? '',
  }

  const handleNavigate = (section) => {
    setMobileOpen(false)
    if (section?.slug === 'sair') { setLogoutDialogOpen(true); return }
    if (section) navigate(`/dashboard/${section.slug}`)
  }

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false)
    logout()
    navigate('/login')
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
            borderRight: 'none',
            backgroundColor: SIDEBAR_BG,
            boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
          },
        }}
      >
        <SidebarContent sectionSlug={sectionSlug} onNavigate={handleNavigate} user={displayUser} />
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, backgroundColor: SIDEBAR_BG, borderRight: 'none' },
        }}
      >
        <SidebarContent sectionSlug={sectionSlug} onNavigate={handleNavigate} user={displayUser} onClose={() => setMobileOpen(false)} />
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
            zIndex: theme.zIndex.appBar,
          }}
        >
          <Toolbar sx={{ gap: 1.5, minHeight: '52px !important', px: 2 }}>
            <IconButton onClick={() => setMobileOpen(prev => !prev)} size="small" edge="start">
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
            <Box component="img" src={logoPng} alt="SASF" sx={{ width: 26, height: 26, objectFit: 'contain' }} />
            <Typography sx={{ flex: 1, fontWeight: 700, fontSize: '0.9rem' }}>
              {currentSection?.label ?? 'SASF'}
            </Typography>
            <Avatar sx={{ width: 28, height: 28, backgroundColor: 'primary.main', fontSize: '0.7rem', fontWeight: 700 }}>
              {initials(displayUser.name ?? displayUser.email)}
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 2.5, md: 3 }, overflow: 'auto', maxWidth: '100%' }}>
          <DashboardContent sectionSlug={sectionSlug} formId={formId} actionSlug={actionSlug} />
        </Box>
      </Box>
      <ConfirmDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirmar saída"
        titleIcon={<LogoutRoundedIcon color="error" />}
        message="Deseja realmente sair da sua conta?"
        confirmLabel="Sair"
        confirmColor="error"
      />
    </Box>
  )
}

export default DashboardLayout
