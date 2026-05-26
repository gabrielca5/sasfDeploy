import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import logoPng from '../assets/chicoLogo.png'
import DashboardContent from './DashboardContent'
import { dashboardSections } from '../data/dashboardSections'

const drawerWidth = 300

const sectionIcons = {
  'visao-geral': <DashboardOutlinedIcon fontSize="small" />,
  graficos: <InsightsOutlinedIcon fontSize="small" />,
  familias: <GroupsOutlinedIcon fontSize="small" />,
  cadastro: <AppRegistrationOutlinedIcon fontSize="small" />,
  atendimentos: <EventNoteOutlinedIcon fontSize="small" />,
  calendario: <CalendarMonthOutlinedIcon fontSize="small" />,
}

function DashboardLayout({ sectionSlug, formId, actionSlug }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (nextSection) => {
    if (nextSection?.slug === 'sair') {
      navigate('/login')
      return
    }

    if (nextSection) {
      navigate(`/dashboard/${nextSection.slug}`)
      setMobileOpen(false)
    }
  }

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box component="img" src={logoPng} alt="Logo SASF" sx={{ width: 42, height: 42, objectFit: 'contain' }} />
        <Box>
          <Typography variant="overline" color="text.secondary" letterSpacing={1.4}>
            SASF
          </Typography>
          <Typography variant="h6" fontWeight={800} lineHeight={1.1}>
            Painel
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: '#f8faf9' }}>
        <Typography variant="caption" color="text.secondary" display="block">
          Navegação
        </Typography>
        <Typography variant="body2" fontWeight={700} color="text.primary">
          Estrutura responsiva com padrões clássicos de dashboard.
        </Typography>
      </Box>

      <Divider />

      <List disablePadding sx={{ flex: 1 }}>
        {dashboardSections.map((section) => {
          const selected = section.slug === sectionSlug

          return (
            <ListItemButton
              key={section.slug}
              selected={selected}
              onClick={() => handleNavigate(section)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                alignItems: 'center',
                '&.Mui-selected': {
                  backgroundColor: '#e5f3ea',
                  '&:hover': { backgroundColor: '#d8eadf' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: selected ? 'primary.main' : 'text.secondary' }}>
                {sectionIcons[section.slug] ?? <DashboardOutlinedIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText
                primary={section.label}
                primaryTypographyProps={{ fontWeight: selected ? 800 : 600, fontSize: '0.95rem' }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutRoundedIcon />}
        onClick={() => navigate('/login')}
        sx={{ mt: 'auto' }}
      >
        Sair
      </Button>
    </Box>
  )

  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          display: { md: 'none' },
          backgroundColor: '#ffffff',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64, gap: 1 }}>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Abrir navegação">
            <MenuRoundedIcon />
          </IconButton>
          <Box component="img" src={logoPng} alt="Logo SASF" sx={{ width: 34, height: 34, objectFit: 'contain' }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={800} lineHeight={1.1}>
              SASF Painel
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Navegação responsiva
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop ? true : mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          minHeight: '100vh',
          ml: { md: `${drawerWidth}px` },
          p: { xs: 1.5, sm: 2.5, md: 4 },
        }}
      >
        <DashboardContent sectionSlug={sectionSlug} formId={formId} actionSlug={actionSlug} />
      </Box>
    </Box>
  )
}

export default DashboardLayout
