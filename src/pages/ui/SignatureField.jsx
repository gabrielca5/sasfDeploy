import { useEffect, useRef } from 'react'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import ActionButton from './ActionButton'
import FormErrorMessage from './FormErrorMessage'
import PageToolbar from './PageToolbar'
import RequiredLabel from './RequiredLabel'
import {
  formSignatureCanvasFrameSx,
  formSignatureCanvasSx,
  formSignatureFooterSx,
  formSignatureShellSx,
  formSignatureStatusSx,
} from './uiStyles'

function SignatureField({ field, value, onChange, helperText, required = false, error = false }) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const signed = typeof value === 'string' && value.startsWith('data:image')
  const instruction = error
    ? 'Assine dentro do quadro acima (mouse, touch ou caneta).'
    : helperText || 'Assine dentro do quadro acima (mouse, touch ou caneta). A assinatura será salva como imagem PNG.'

  const paintCanvasBackground = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = '#111827'
    context.lineWidth = 2
  }

  useEffect(() => {
    paintCanvasBackground()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    paintCanvasBackground()

    if (typeof value === 'string' && value.startsWith('data:image')) {
      const image = new Image()
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
      }
      image.src = value
    }
  }, [value])

  const getPointerPosition = (event) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    }
  }

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const { x, y } = getPointerPosition(event)
    isDrawingRef.current = true
    context.beginPath()
    context.moveTo(x, y)
    canvas.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const { x, y } = getPointerPosition(event)
    context.lineTo(x, y)
    context.stroke()
  }

  const finishDrawing = () => {
    if (!isDrawingRef.current) return

    isDrawingRef.current = false
    const canvas = canvasRef.current
    if (!canvas) return

    onChange(canvas.toDataURL('image/png'))
  }

  const clearSignature = () => {
    paintCanvasBackground()
    onChange('')
  }

  return (
    <Paper elevation={0} sx={formSignatureShellSx}>
      <Stack spacing={1}>
        <RequiredLabel required={required}>{field.label}</RequiredLabel>

        <Box sx={formSignatureCanvasFrameSx({ signed, error })}>
          <Box
            component="canvas"
            ref={canvasRef}
            width={720}
            height={220}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrawing}
            onPointerLeave={finishDrawing}
            sx={formSignatureCanvasSx}
          />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={formSignatureFooterSx}>
          <PageToolbar justifyContent="flex-start">
            <Chip label={signed ? 'Assinado' : 'Vazio'} size="small" sx={formSignatureStatusSx({ signed })} />
            <Typography variant="caption" color="text.secondary">
              {instruction}
            </Typography>
          </PageToolbar>
          <ActionButton variant="text" color="error" size="sm" onClick={clearSignature}>
            Limpar assinatura
          </ActionButton>
        </Stack>

        <FormErrorMessage>{error ? helperText : ''}</FormErrorMessage>
      </Stack>
    </Paper>
  )
}

export default SignatureField
