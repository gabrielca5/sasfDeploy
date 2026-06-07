import { Box } from '@mui/material'
import {
  ActionButton,
  PageSection,
  PageToolbar,
  PageWrapper,
  flowIntroActionsSx,
  flowIntroFooterSx,
} from './ui'
import ProntuarioFlowIntroContent from './ProntuarioFlowIntroContent'

function ProntuarioFlowIntroPage({ config, onBack, onStart }) {
  return (
    <PageWrapper maxWidth={1440} spacing={3}>
      <PageSection
        eyebrow="Fluxo"
        title={config.title}
        description={config.subtitle}
        childrenSx={{ gap: 0 }}
      >
        <ProntuarioFlowIntroContent config={config} />

        <Box sx={flowIntroFooterSx}>
          <PageToolbar
            direction={{ xs: 'column-reverse', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={flowIntroActionsSx}
          >
            <ActionButton variant="outlined" onClick={onBack}>
              {config.backLabel}
            </ActionButton>
            <ActionButton variant="contained" onClick={onStart}>
              {config.primaryActionLabel}
            </ActionButton>
          </PageToolbar>
        </Box>
      </PageSection>
    </PageWrapper>
  )
}

export default ProntuarioFlowIntroPage
