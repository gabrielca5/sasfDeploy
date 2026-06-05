import { Box, Typography } from '@mui/material'
import {
  PageStack,
  flowIntroDialogHeaderSx,
  flowIntroMarkerSx,
  flowIntroStepContentSx,
  flowIntroStepSx,
  flowIntroTimelineSx,
  textSx,
} from './ui'

function ProntuarioFlowIntroContent({ config, showHeader = false }) {
  return (
    <PageStack spacing={2}>
      {showHeader ? (
        <Box sx={flowIntroDialogHeaderSx}>
          <Typography variant="overline" color="primary" letterSpacing={1.8} sx={textSx}>
            Fluxo
          </Typography>
          <Typography color="text.secondary" sx={textSx}>
            {config.subtitle}
          </Typography>
        </Box>
      ) : null}

      <Box component="ol" sx={flowIntroTimelineSx}>
        {config.steps.map((step, index) => (
          <Box
            component="li"
            key={step.title}
            sx={flowIntroStepSx({ isLast: index === config.steps.length - 1 })}
          >
            <Box sx={flowIntroMarkerSx}>{index + 1}</Box>
            <Box sx={flowIntroStepContentSx}>
              <Typography variant="subtitle1" fontWeight={800} sx={textSx}>
                {step.title}
              </Typography>
              <Typography color="text.secondary" sx={textSx}>
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </PageStack>
  )
}

export default ProntuarioFlowIntroContent
