import { Box, Stack, Typography } from '@mui/material'
import fundoSasf from '../assets/fundo-sasf.jpg'
import logoPng from '../assets/chicoLogo.png'

function AuthLayout({ children, ariaLabel }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Painel esquerdo: foto + ilustração + tagline ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          width: { md: '52%', lg: '56%' },
          flexShrink: 0,
          overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        {/* Foto de fundo */}
        <Box
          component="img"
          src={fundoSasf}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />

        {/* Overlay com gradiente */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'rgba(15,23,42,0.55)',
          }}
        />

        {/* Conteúdo posicionado sobre a foto */}
        <Stack
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            p: { md: 4, lg: 6 },
            pb: { md: 5, lg: 7 },
          }}
        >
          {/* Logo + nome */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              component="img"
              src={logoPng}
              alt="Logo SASF"
              sx={{ width: 52, height: 52, objectFit: 'contain', flexShrink: 0 }}
            />
            <Box>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                SASF Chico Mendes
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.52)',
                  mt: 0.2,
                  letterSpacing: '0.02em',
                }}
              >
                UNAS Heliópolis e Região
              </Typography>
            </Box>
          </Stack>

          {/* Tagline — empurrada para o rodapé */}
          <Box sx={{ mt: 'auto' }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { md: '1.65rem', lg: '2.1rem' },
                color: '#ffffff',
                lineHeight: 1.28,
                letterSpacing: '-0.025em',
                maxWidth: 380,
              }}
            >
              Cuidar de quem cuida da comunidade
            </Typography>
            <Typography
              sx={{
                mt: 1.75,
                color: 'rgba(255,255,255,0.62)',
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                maxWidth: 360,
              }}
            >
              Registro e acompanhamento de famílias atendidas pela UNAS em
              Heliópolis e Região.
            </Typography>
          </Box>
        </Stack>

      </Box>

      {/* ── Painel direito: formulário ── */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f6f8',
          overflowY: 'auto',
          py: { xs: 4, sm: 5 },
          px: { xs: 2, sm: 3 },
          minHeight: '100vh',
        }}
      >
        {/* Header móvel (oculto em md+) */}
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{
            mb: 3,
            display: { xs: 'flex', md: 'none' },
            alignSelf: 'center',
            width: '100%',
            maxWidth: 440,
          }}
        >
          <Box
            component="img"
            src={logoPng}
            alt="Logo SASF"
            sx={{ width: 36, height: 36, objectFit: 'contain' }}
          />
          <Typography
            sx={{ fontWeight: 800, fontSize: '0.9375rem', color: '#111827' }}
          >
            SASF Chico Mendes
          </Typography>
        </Stack>

        <Box
          component="section"
          aria-label={ariaLabel}
          sx={{ width: '100%', maxWidth: 440 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default AuthLayout
