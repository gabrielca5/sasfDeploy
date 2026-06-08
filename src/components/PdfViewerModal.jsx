import React from 'react'
import { Box } from '@mui/material'
import { PageDialog, ActionButton } from '../pages/ui'

/**
 * Componente para visualização de PDF em um modal (popup).
 * 
 * @param {Object} props
 * @param {boolean} props.open - Se o modal está aberto.
 * @param {Function} props.onClose - Função para fechar o modal.
 * @param {string} props.pdfUrl - URL do blob do PDF.
 * @param {string} props.filename - Nome do arquivo para exibição e download.
 */
function PdfViewerModal({ open, onClose, pdfUrl, filename }) {
  const handleDownload = () => {
    if (!pdfUrl) return
    
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = filename || 'documento.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PageDialog
      open={open}
      onClose={onClose}
      title={filename || 'Visualização de PDF'}
      maxWidth="lg"
      showClose
      actions={
        <>
          <ActionButton onClick={onClose}>Fechar</ActionButton>
          <ActionButton variant="contained" onClick={handleDownload} disabled={!pdfUrl}>
            Baixar PDF
          </ActionButton>
        </>
      }
    >
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'grey.100',
          borderRadius: 1,
          overflow: 'hidden',
          minHeight: 400,
        }}
      >
        {pdfUrl ? (
          <iframe
            title={filename || 'PDF Viewer'}
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Carregando PDF...
          </Box>
        )}
      </Box>
    </PageDialog>
  )
}

export default PdfViewerModal
