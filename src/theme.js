import { createTheme, alpha } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1e88e5', dark: '#1565c0', light: '#64b5f6', 50: '#e3f2fd', 100: '#bbdefb' },
    secondary: { main: '#f6c343', dark: '#b38b00' },
    background: { default: '#f3f6fa', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#6b7280' },
    divider: '#e5e7eb',
    error: { main: '#dc2626', light: '#fee2e2' },
    success: { main: '#16a34a', light: '#dcfce7' },
    warning: { main: '#d97706', light: '#fef3c7' },
  },
  shape: { borderRadius: 8 },
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
        body: { margin: 0, minHeight: '100vh', backgroundColor: '#f3f6fa', color: '#111827' },
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
              borderColor: '#1e88e5',
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
            borderColor: '#1e88e5',
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
          fontWeight: 600,
          fontSize: '0.875rem',
          borderRadius: '8px',
          // ✅ Correct proportions — was '5px 12px' which was too short
          padding: '8px 16px',
          transition: 'all 180ms ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        contained: {
          boxShadow: '0 1px 4px rgba(30,136,229,0.2)',
          '&:hover': { boxShadow: '0 4px 12px rgba(30,136,229,0.28)' },
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#374151',
          backgroundColor: '#ffffff',
          '&:hover': { backgroundColor: '#f9fafb', borderColor: '#9ca3af' },
        },
        // ✅ sizeLarge/sizeSmall padding in correct proportion
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
            backgroundColor: alpha('#1e88e5', 0.09),
            color: '#1565c0',
            fontWeight: 600,
            '& .MuiListItemIcon-root': { color: '#1e88e5' },
            '&:hover': { backgroundColor: alpha('#1e88e5', 0.13) },
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
            backgroundColor: alpha('#1e88e5', 0.1),
            color: '#1e88e5',
            borderColor: alpha('#1e88e5', 0.3),
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