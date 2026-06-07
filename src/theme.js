import { createTheme, alpha } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1d4ed8', dark: '#1e40af', light: '#93c5fd', 50: '#eff6ff', 100: '#dbeafe' },
    secondary: { main: '#f59e0b', dark: '#d97706' },
    background: { default: '#f5f6f8', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#6b7280' },
    divider: 'rgba(0,0,0,0.07)',
    error: { main: '#dc2626', light: '#fee2e2' },
    success: { main: '#059669', light: '#d1fae5' },
    warning: { main: '#f59e0b', light: '#fef3c7' },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    '0 2px 6px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
    '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)',
    '0 6px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
    '0 8px 20px rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.05)',
    '0 10px 24px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.05)',
    '0 12px 28px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
    '0 14px 32px rgba(0,0,0,0.08), 0 5px 14px rgba(0,0,0,0.05)',
    '0 16px 36px rgba(0,0,0,0.08), 0 5px 16px rgba(0,0,0,0.05)',
    '0 18px 40px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.05)',
    '0 20px 44px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.05)',
    '0 22px 48px rgba(0,0,0,0.08), 0 7px 22px rgba(0,0,0,0.05)',
    '0 24px 52px rgba(0,0,0,0.08), 0 7px 24px rgba(0,0,0,0.05)',
    '0 26px 56px rgba(0,0,0,0.08), 0 8px 26px rgba(0,0,0,0.05)',
    '0 28px 60px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.05)',
    '0 30px 64px rgba(0,0,0,0.08), 0 9px 30px rgba(0,0,0,0.05)',
    '0 32px 68px rgba(0,0,0,0.08), 0 9px 32px rgba(0,0,0,0.05)',
    '0 34px 72px rgba(0,0,0,0.08), 0 10px 34px rgba(0,0,0,0.05)',
    '0 36px 76px rgba(0,0,0,0.08), 0 10px 36px rgba(0,0,0,0.05)',
    '0 38px 80px rgba(0,0,0,0.08), 0 11px 38px rgba(0,0,0,0.05)',
    '0 40px 84px rgba(0,0,0,0.08), 0 11px 40px rgba(0,0,0,0.05)',
    '0 42px 88px rgba(0,0,0,0.08), 0 12px 42px rgba(0,0,0,0.05)',
    '0 44px 92px rgba(0,0,0,0.08), 0 12px 44px rgba(0,0,0,0.05)',
    '0 46px 96px rgba(0,0,0,0.08), 0 13px 46px rgba(0,0,0,0.05)',
  ],
  // ✅ Removed spacing: 4 — MUI default (8px/unit) is correct
  typography: {
    fontFamily: ['Inter', 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    h4: { fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em' },
    h5: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em' },
    h6: { fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4 },
    subtitle1: { fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
    caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.5 },
    overline: {
      fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.5,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { margin: 0, minHeight: '100vh', backgroundColor: '#f5f6f8', color: '#111827' },
        '#root': { minHeight: '100vh' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { transition: 'box-shadow 200ms ease, border-color 200ms ease' },
        outlined: { borderColor: '#e5e7eb', backgroundColor: '#ffffff' },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, transition: 'all 200ms ease' } },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true, variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': { fontSize: '0.875rem' },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            fontSize: '0.875rem',
            transition: 'all 200ms ease',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e5e7eb',
              transition: 'border-color 200ms ease',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1d4ed8',
              borderWidth: '2px',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#dc2626' },
          },
          // ✅ Use CSS selector, not sx-style keys
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginTop: '4px',
            fontSize: '0.75rem',
          },
        },
      },
    },
    // ✅ Removed broken MuiSelect.outlined slot — target OutlinedInput instead
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '0.875rem',
          backgroundColor: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1d4ed8',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { fontSize: '0.875rem' } },
    },
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.875rem',
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 180ms ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none', filter: 'brightness(1.06)' },
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#374151',
          backgroundColor: '#ffffff',
          '&:hover': { backgroundColor: '#f9fafb', borderColor: '#9ca3af' },
        },
        sizeLarge: { padding: '11px 24px', fontSize: '0.9375rem' },
        sizeSmall: { padding: '5px 12px', fontSize: '0.8125rem' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 28,
          borderRadius: '6px',
        },
        sizeSmall: { height: 22, fontSize: '0.7rem', borderRadius: '5px' },
        outlined: { borderColor: '#d1d5db', color: '#374151' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'all 180ms ease',
          '&:hover': { backgroundColor: alpha('#111827', 0.05) },
          '&.Mui-selected': {
            backgroundColor: alpha('#1d4ed8', 0.09),
            color: '#1d4ed8',
            fontWeight: 600,
            '& .MuiListItemIcon-root': { color: '#1d4ed8' },
            '&:hover': { backgroundColor: alpha('#1d4ed8', 0.13) },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#e5e7eb' } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: '16px', boxShadow: '0 20px 60px rgba(17,24,39,0.12)' },
      },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { fontSize: '1.05rem', fontWeight: 700, paddingBottom: 8 } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1f2937', fontSize: '0.75rem',
          borderRadius: '6px', padding: '5px 10px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.8125rem',
          borderColor: '#e5e7eb',
          color: '#6b7280',
          // ✅ Consistent with button padding
          padding: '6px 14px',
          borderRadius: '8px !important',
          '&.Mui-selected': {
            backgroundColor: alpha('#1d4ed8', 0.1),
            color: '#1d4ed8',
            borderColor: alpha('#1d4ed8', 0.3),
          },
        },
      },
    },
    // ✅ Removed broken MuiToggleButtonGroup gap override
    MuiFormLabel: {
      styleOverrides: { root: { fontSize: '0.875rem', fontWeight: 600, color: '#374151' } },
    },
    MuiFormControlLabel: {
      styleOverrides: { label: { fontSize: '0.875rem' } },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: '10px', fontSize: '0.875rem' } },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: 'none' } },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRight: '1px solid #e5e7eb' } },
    },
  },
  
})

export default theme