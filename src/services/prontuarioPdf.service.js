import { getBlob } from '../lib/apiClient'

export const FICHA_PDF_TYPES = {
  FICHA_CADASTRAL_FAMILIA: 'ficha-cadastral-familia',
  TERMO_AUTORIZACAO_IMAGEM: 'termo-autorizacao-imagem',
  ATUALIZACAO_QUADRO_SITUACIONAL: 'atualizacao-quadro-situacional',
  PLANO_DESENVOLVIMENTO_FAMILIAR: 'plano-desenvolvimento-familiar',
  FOLHA_PROSSEGUIMENTO: 'folha-prosseguimento',
  VISITA_DOMICILIAR: 'visita-domiciliar',
  PLANO_DESENVOLVIMENTO_USUARIO: 'plano-desenvolvimento-usuario',
}

const UNIQUE_FICHA_TYPES = new Set([
  FICHA_PDF_TYPES.FICHA_CADASTRAL_FAMILIA,
  FICHA_PDF_TYPES.TERMO_AUTORIZACAO_IMAGEM,
])

function encodePathSegment(value) {
  return encodeURIComponent(String(value))
}

function buildFichaPdfPath({ prontuarioId, tipoFicha, fichaId }) {
  if (!prontuarioId) {
    throw new Error('Prontuario nao informado para acessar o PDF.')
  }

  if (!tipoFicha) {
    throw new Error('Tipo de ficha nao informado para acessar o PDF.')
  }

  const basePath = `/prontuarios/${encodePathSegment(prontuarioId)}/fichas/${encodePathSegment(tipoFicha)}`

  if (UNIQUE_FICHA_TYPES.has(tipoFicha)) {
    return `${basePath}/pdf`
  }

  if (!fichaId) {
    throw new Error('Ficha nao informada para acessar o PDF.')
  }

  return `${basePath}/${encodePathSegment(fichaId)}/pdf`
}

function decodeHeaderValue(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function getFilenameFromContentDisposition(contentDisposition) {
  if (!contentDisposition) {
    return null
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (utf8Match?.[1]) {
    return decodeHeaderValue(utf8Match[1].trim().replace(/^["']|["']$/g, ''))
  }

  const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i)
  if (filenameMatch?.[1]) {
    return filenameMatch[1].trim()
  }

  return null
}

function normalizePdfFilename(filename, fallbackName) {
  const safeName = String(filename || fallbackName || 'ficha-prontuario')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')

  return safeName.toLowerCase().endsWith('.pdf') ? safeName : `${safeName}.pdf`
}

function triggerBlobDownload(blob, filename) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  try {
    link.href = objectUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
  } finally {
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function openBlankPdfPreviewWindow() {
  const previewWindow = window.open('', '_blank')

  if (!previewWindow) {
    throw new Error('Nao foi possivel abrir a visualizacao. Permita pop-ups para este site e tente novamente.')
  }

  previewWindow.opener = null
  previewWindow.document.open()
  previewWindow.document.write(`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Carregando PDF</title>
  </head>
  <body>
    <p style="font-family: system-ui, sans-serif; padding: 24px;">Carregando PDF...</p>
  </body>
</html>`)
  previewWindow.document.close()

  return previewWindow
}

function writePdfPreview(previewWindow, objectUrl, filename) {
  const safeFilename = escapeHtml(filename)
  const safeObjectUrl = escapeHtml(objectUrl)

  previewWindow.document.open()
  previewWindow.document.write(`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>${safeFilename}</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        background: #111827;
      }

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
        background: #ffffff;
      }
    </style>
  </head>
  <body>
    <iframe title="${safeFilename}" src="${safeObjectUrl}"></iframe>
  </body>
</html>`)
  previewWindow.document.close()
}

function scheduleObjectUrlRevoke(objectUrl) {
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10 * 60 * 1000)
}

async function getFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId }) {
  const path = buildFichaPdfPath({ prontuarioId, tipoFicha, fichaId })
  const { blob, headers } = await getBlob(path, {
    headers: {
      Accept: 'application/pdf',
    },
  })
  const headerFilename = getFilenameFromContentDisposition(headers.get('Content-Disposition'))
  const filename = normalizePdfFilename(headerFilename, tipoFicha)

  return { blob, filename }
}

export async function getFichaProntuarioPdfData({ prontuarioId, tipoFicha, fichaId }) {
  const { blob, filename } = await getFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId })
  const url = URL.createObjectURL(blob)
  return { url, filename }
}

export async function downloadFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId, print = false }) {
  const { blob, filename } = await getFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId })

  if (print) {
    const objectUrl = URL.createObjectURL(blob)
    const printWindow = window.open(objectUrl, '_blank')
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  } else {
    triggerBlobDownload(blob, filename)
  }

  return { filename }
}

export async function viewFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId }) {
  const previewWindow = openBlankPdfPreviewWindow()

  try {
    const { blob, filename } = await getFichaProntuarioPdf({ prontuarioId, tipoFicha, fichaId })
    const objectUrl = URL.createObjectURL(blob)

    writePdfPreview(previewWindow, objectUrl, filename)
    scheduleObjectUrlRevoke(objectUrl)

    return { filename }
  } catch (err) {
    if (!previewWindow.closed) {
      previewWindow.close()
    }

    throw err
  }
}

export default { downloadFichaProntuarioPdf, viewFichaProntuarioPdf, FICHA_PDF_TYPES }
