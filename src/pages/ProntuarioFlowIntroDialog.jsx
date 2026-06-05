import {
  ActionButton,
  PageDialog,
  PageToolbar,
  flowIntroActionsSx,
} from './ui'
import ProntuarioFlowIntroContent from './ProntuarioFlowIntroContent'

function ProntuarioFlowIntroDialog({ open, config, onClose, onStart }) {
  if (!config) {
    return null
  }

  return (
    <PageDialog
      open={open}
      onClose={onClose}
      title={config.title}
      maxWidth="lg"
      showClose
      closeLabel="Fechar orientação do fluxo"
      actions={
        <PageToolbar
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={flowIntroActionsSx}
        >
          <ActionButton variant="outlined" onClick={onClose}>
            {config.backLabel}
          </ActionButton>
          <ActionButton variant="contained" onClick={onStart}>
            {config.primaryActionLabel}
          </ActionButton>
        </PageToolbar>
      }
    >
      <ProntuarioFlowIntroContent config={config} showHeader />
    </PageDialog>
  )
}

export default ProntuarioFlowIntroDialog
