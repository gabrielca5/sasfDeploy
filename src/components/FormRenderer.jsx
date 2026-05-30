import { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  CircularProgress,
  MenuItem,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FlowStepper from './FlowStepper'
import { useCepLookup } from '../hooks/useCepLookup'

const pageSx = {
  maxWidth: 1120,
  mx: 'auto',
  px: { xs: 0, sm: 0.25, md: 0 },
}

const heroSx = {
  p: { xs: 1.75, sm: 2, md: 2.25 },
  borderRadius: 3,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
}

const sectionSx = {
  p: { xs: 1.5, sm: 1.75, md: 2 },
  borderRadius: 3,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
}

const nestedFieldSx = {
  p: 1,
  borderRadius: 2,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
}

const footerSx = {
  p: { xs: 1.5, sm: 1.75, md: 2 },
  borderRadius: 3,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
}

function getInitialFieldValue(field) {
  if (field.valor_padrao !== undefined) {
    return field.valor_padrao
  }

  if (field.tipo === 'checkbox' || field.tipo === 'multiselect') {
    return []
  }

  return ''
}

function getRowTemplate(columns) {
  return columns.reduce((accumulator, column) => {
    accumulator[column.id] = getInitialFieldValue(column)
    return accumulator
  }, {})
}

function createFormDraft(form) {
  return form.secoes.reduce((accumulator, section) => {
    if (Array.isArray(section.campos)) {
      accumulator[section.id] = section.campos.reduce((fieldsAccumulator, field) => {
        fieldsAccumulator[field.id] = getInitialFieldValue(field)
        return fieldsAccumulator
      }, {})
      return accumulator
    }

    if (Array.isArray(section.colunas)) {
      accumulator[section.id] = [getRowTemplate(section.colunas)]
      return accumulator
    }

    if (Array.isArray(section.campos_por_item)) {
      accumulator[section.id] = [getRowTemplate(section.campos_por_item)]
      return accumulator
    }

    if (section.tipo === 'lista_numerada' && section.campo) {
      accumulator[section.id] = [{ [section.campo.id]: getInitialFieldValue(section.campo) }]
      return accumulator
    }

    accumulator[section.id] = {}
    return accumulator
  }, {})
}

function SignatureField({ field, value, onChange, helperText }) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)

  const paintCanvasBackground = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

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
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

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
    if (!canvas) {
      return { x: 0, y: 0 }
    }

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
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const { x, y } = getPointerPosition(event)
    isDrawingRef.current = true
    context.beginPath()
    context.moveTo(x, y)
    canvas.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDrawingRef.current) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const { x, y } = getPointerPosition(event)
    context.lineTo(x, y)
    context.stroke()
  }

  const finishDrawing = () => {
    if (!isDrawingRef.current) {
      return
    }

    isDrawingRef.current = false
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    onChange(canvas.toDataURL('image/png'))
  }

  const clearSignature = () => {
    paintCanvasBackground()
    onChange('')
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        borderColor: 'rgba(17, 24, 39, 0.08)',
        backgroundColor: '#ffffff',
      }}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle2" fontWeight={700}>
          {field.label}
        </Typography>

        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          <Box
            component="canvas"
            ref={canvasRef}
            width={720}
            height={220}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrawing}
            onPointerLeave={finishDrawing}
            sx={{
              width: '100%',
              height: 160,
              display: 'block',
              touchAction: 'none',
              cursor: 'crosshair',
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {helperText || 'Assine dentro do quadro acima (mouse, touch ou caneta). A assinatura será salva como imagem PNG.'}
          </Typography>
          <Button variant="text" color="error" size="small" onClick={clearSignature}>
            Limpar assinatura
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

function FieldInput({ field, value, onChange, rowNumber, helperText: helperTextOverride, disabled = false, endAdornment = null, rhfSetValue = null }) {
  const helperText = helperTextOverride ?? field.nota ?? field.mascara ?? ''
  const inputSx = {
    '& .MuiInputBase-root': {
      backgroundColor: '#ffffff',
      borderRadius: 2,
    },
    '& .MuiFormHelperText-root': {
      ml: 0,
      mt: 0.5,
    },
  }

  if (field.tipo === 'static') {
    return (
      <TextField
        label={field.label}
        value={field.id === 'numero' && rowNumber ? rowNumber : value}
        fullWidth
        size="small"
        InputProps={{ readOnly: true }}
        helperText={helperText}
        sx={inputSx}
      />
    )
  }

  if (field.tipo === 'textarea') {
    return (
      <TextField
        label={field.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        multiline
        rows={field.linhas ?? 4}
        fullWidth
        size="small"
        helperText={helperText}
        disabled={disabled}
        sx={inputSx}
      />
    )
  }

  if (field.tipo === 'radio') {
    return (
      <FormControl fullWidth sx={{ gap: 0.5 }}>
        <FormLabel sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.92rem' }}>{field.label}</FormLabel>
        <RadioGroup row value={value} onChange={(event) => onChange(event.target.value)} sx={{ gap: 0.5, flexWrap: 'wrap' }}>
          {(field.opcoes ?? []).map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio size="small" />}
              label={option}
              sx={{
                mr: 1,
                px: 1,
                py: 0.25,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(17, 24, 39, 0.08)',
                backgroundColor: '#ffffff',
              }}
            />
          ))}
        </RadioGroup>
        <FormHelperText sx={{ mx: 0 }}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.tipo === 'checkbox') {
    return (
      <FormControl fullWidth sx={{ gap: 0.5 }}>
        <FormLabel sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.92rem' }}>{field.label}</FormLabel>
        <FormGroup sx={{ gap: 0.25 }}>
          {(field.opcoes ?? []).map((option) => {
            const checked = Array.isArray(value) && value.includes(option)

            return (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    size="small"
                    checked={checked}
                    onChange={(event) => {
                      const current = Array.isArray(value) ? value : []
                      const nextValue = event.target.checked
                        ? [...current, option]
                        : current.filter((item) => item !== option)
                      onChange(nextValue)
                    }}
                  />
                }
                label={option}
                sx={{
                  ml: 0,
                  px: 1,
                  py: 0.25,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgba(17, 24, 39, 0.08)',
                  backgroundColor: '#ffffff',
                }}
              />
            )
          })}
        </FormGroup>
        <FormHelperText sx={{ mx: 0 }}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.tipo === 'multiselect') {
    const selectedValues = Array.isArray(value) ? value : []

    return (
      <FormControl fullWidth size="small" sx={{ gap: 0.5 }}>
        <FormLabel sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.92rem' }}>{field.label}</FormLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={(event) => onChange(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}
          inputProps={{ 'aria-label': field.label }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" />
              ))}
            </Box>
          )}
          sx={{ backgroundColor: '#ffffff' }}
        >
          {(field.opcoes ?? []).map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox size="small" checked={selectedValues.indexOf(option) > -1} />
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ mx: 0 }}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.tipo === 'select') {
    return (
      <TextField
        select
        label={field.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
        helperText={helperText}
        disabled={disabled}
      >
        {(field.opcoes ?? []).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  if (field.tipo === 'assinatura') {
    return (
      <SignatureField field={field} value={value} onChange={onChange} helperText={helperText} />
    )
  }

  if (field.tipo === 'date') {
    return (
      <TextField
        label={field.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder=""
        inputMode="numeric"
        autoComplete="off"
        fullWidth
        size="small"
        helperText={helperText}
        disabled={disabled}
        sx={inputSx}
      />
    )
  }

  if (field.tipo === 'number') {
    return (
      <TextField
        label={field.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="number"
        inputProps={{ min: field.min ?? 0 }}
        fullWidth
        size="small"
        helperText={helperText}
        disabled={disabled}
        sx={inputSx}
      />
    )
  }

  return (
    <TextField
      label={field.label}
      value={value}
      onChange={(event) => {
        const nextValue = event.target.value
        onChange(nextValue)
        if (rhfSetValue) rhfSetValue(field.id, nextValue)
      }}
      type={field.tipo === 'tel' ? 'tel' : 'text'}
      placeholder={field.placeholder}
      fullWidth
      size="small"
      helperText={helperText}
      disabled={disabled}
      InputProps={endAdornment ? { endAdornment } : undefined}
      sx={inputSx}
      onBlur={() => {
        if (rhfSetValue) rhfSetValue(field.id, value)
      }}
    />
  )
}

function RepeatableSection({ section, rows, onAddRow, onRemoveRow, onChangeRow, rhfSetValue = null, control = null }) {
  const columns = section.colunas ?? section.campos_por_item ?? []
  const rowLimit = section.max_linhas ?? section.max_itens ?? 1

  // useFieldArray for RHF sync
  const { fields, append, remove, update, replace } = useFieldArray({ control, name: section.id })

  // when draft rows change, ensure RHF fields are in sync
  useEffect(() => {
    const draftRows = Array.isArray(rows) ? rows : []
    if (JSON.stringify(draftRows) !== JSON.stringify(fields.map((f) => ({ ...f })))) {
      replace(draftRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows?.length])

  const handleAdd = () => {
    const template = getRowTemplate(columns)
    append(template)
    onAddRow()
  }

  const handleRemove = (index) => {
    remove(index)
    onRemoveRow(index)
  }

  const handleChange = (index, fieldId, nextValue) => {
    const current = fields[index] ?? {}
    const updated = { ...current, [fieldId]: nextValue }
    update(index, updated)
    onChangeRow(index, fieldId, nextValue)
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={sectionSx}
    >
      <Stack spacing={1.25}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
            {section.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seção gerada a partir do arquivo forms.json. Máximo de linhas permitidas: {rowLimit}.
          </Typography>
        </Stack>

        <Stack spacing={1}>
          {fields.map((fieldObj, rowIndex) => (
            <Paper
              key={`${section.id}-${fieldObj.id ?? rowIndex}`}
              elevation={0}
              variant="outlined"
              sx={{ p: 1.25, borderRadius: 2, borderColor: 'rgba(17, 24, 39, 0.08)', backgroundColor: '#ffffff' }}
            >
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Chip label={`Linha ${rowIndex + 1}`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                  {fields.length > 1 && (
                    <Button variant="text" color="error" onClick={() => handleRemove(rowIndex)}>
                      Remover
                    </Button>
                  )}
                </Stack>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 1 }}>
                  {columns.map((field) => (
                    <Box key={field.id}>
                      <FieldInput
                        field={field}
                        rowNumber={rowIndex + 1}
                        value={fieldObj[field.id] ?? ''}
                        onChange={(nextValue) => handleChange(rowIndex, field.id, nextValue)}
                        rhfSetValue={(fid, v) => rhfSetValue && rhfSetValue(`${section.id}.${rowIndex}.${fid}`, v)}
                      />
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {fields.length < rowLimit && (
          <Button variant="outlined" onClick={handleAdd} sx={{ alignSelf: 'flex-start' }}>
            Adicionar linha
          </Button>
        )}
      </Stack>
    </Paper>
  )
}

function NumberedListSection({ section, rows, onAddRow, onRemoveRow, onChangeRow, rhfSetValue = null, control = null }) {
  const itemField = section.campo
  const rowLimit = section.max_itens ?? 1

    if (!itemField) {
    return (
      <Paper elevation={0} variant="outlined" sx={sectionSx}>
        <Typography variant="body2" color="text.secondary">
          Formato de seção não reconhecido. Verifique o JSON do formulário (campo "tipo") ou contate a equipe de desenvolvimento.
        </Typography>
      </Paper>
    )
  }

  // useFieldArray for numbered lists
  const { fields, append, remove, update, replace } = useFieldArray({ control, name: section.id })

  useEffect(() => {
    const draftRows = Array.isArray(rows) ? rows : []
    if (JSON.stringify(draftRows) !== JSON.stringify(fields.map((f) => ({ ...f })))) {
      replace(draftRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows?.length])

  const handleAdd = () => {
    append({ [itemField.id]: getInitialFieldValue(itemField) })
    onAddRow()
  }

  const handleRemove = (index) => {
    remove(index)
    onRemoveRow(index)
  }

  const handleChange = (index, fid, nextValue) => {
    const current = fields[index] ?? {}
    const updated = { ...current, [fid]: nextValue }
    update(index, updated)
    onChangeRow(index, fid, nextValue)
  }

  return (
    <Paper elevation={0} variant="outlined" sx={sectionSx}>
      <Stack spacing={1.25}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
            {section.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registre os itens na ordem de prioridade. Limite de linhas: {rowLimit}.
          </Typography>
        </Stack>

        <Stack spacing={1}>
          {fields.map((fieldObj, rowIndex) => (
            <Paper
              key={`${section.id}-${fieldObj.id ?? rowIndex}`}
              elevation={0}
              variant="outlined"
              sx={{ p: 1.25, borderRadius: 2, borderColor: 'rgba(17, 24, 39, 0.08)', backgroundColor: '#ffffff' }}
            >
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Chip label={`Item ${rowIndex + 1}`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                  {fields.length > 1 && (
                    <Button variant="text" color="error" onClick={() => handleRemove(rowIndex)}>
                      Remover
                    </Button>
                  )}
                </Stack>

                <Paper elevation={0} variant="outlined" sx={nestedFieldSx}>
                  <FieldInput
                    field={itemField}
                    value={fieldObj[itemField.id] ?? ''}
                    onChange={(nextValue) => handleChange(rowIndex, itemField.id, nextValue)}
                    rhfSetValue={(fid, v) => rhfSetValue && rhfSetValue(`${section.id}.${rowIndex}.${fid}`, v)}
                  />
                </Paper>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {fields.length < rowLimit && (
          <Button variant="outlined" onClick={handleAdd} sx={{ alignSelf: 'flex-start' }}>
            Adicionar item
          </Button>
        )}
      </Stack>
    </Paper>
  )
}

function QuantitySection({ section, values, onChange, rhfSetValue = null }) {
  const columns = section.colunas ?? []

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={sectionSx}
    >
      <Stack spacing={1.25}>
        <Box>
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800 }}>
            {section.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preencha as quantidades para cada indicador do quadro situacional.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 1 }}>
          {columns.map((field) => (
            <Box key={field.id}>
              <FieldInput
                field={field}
                value={values[field.id] ?? ''}
                onChange={(nextValue) => onChange(field.id, nextValue)}
                rhfSetValue={rhfSetValue}
              />
            </Box>
          ))}
        </Box>
      </Stack>
    </Paper>
  )
}

export function FormRenderer({ form, onBack, flowForms = [], onSelectFlowForm }) {
  const [draft, setDraft] = useState(() => createFormDraft(form))
  const [saved, setSaved] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const { lookup: lookupCep, loading: cepLoading, error: cepError } = useCepLookup()
  const { register: rhfRegister, setValue: rhfSetValue, control } = useForm()
  const lastCepLookupRef = useRef(0)
  const currentFlowIndex = Math.max(0, flowForms.findIndex((flowForm) => flowForm.id === form.id))
  const previousFlowForm = currentFlowIndex > 0 ? flowForms[currentFlowIndex - 1] : undefined
  const nextFlowForm = currentFlowIndex >= 0 && currentFlowIndex < flowForms.length - 1 ? flowForms[currentFlowIndex + 1] : undefined

  const actionConfig = {
    save: {
      title: 'Você tem certeza?',
      description: 'Quer salvar este formulário agora?',
      confirmLabel: 'Salvar',
      confirmIcon: <SaveOutlinedIcon fontSize="small" />,
    },
    clear: {
      title: 'Você tem certeza?',
      description: 'Quer limpar todos os campos preenchidos?',
      confirmLabel: 'Limpar tudo',
      confirmIcon: <DeleteOutlineRoundedIcon fontSize="small" />,
    },
    leave: {
      title: 'Você tem certeza?',
      description: 'Quer sair da página sem continuar editando?',
      confirmLabel: 'Sair da página',
      confirmIcon: <ArrowBackRoundedIcon fontSize="small" />,
    },
  }

  const requestAction = (action) => {
    setPendingAction(action)
    setConfirmOpen(true)
  }

  const closeConfirm = () => {
    setConfirmOpen(false)
    setPendingAction(null)
  }

  const confirmAction = () => {
    if (pendingAction === 'save') {
      setSaved(true)
    }

    if (pendingAction === 'clear') {
      setDraft(createFormDraft(form))
      setSaved(false)
    }

    if (pendingAction === 'leave') {
      onBack()
    }

    closeConfirm()
  }

  const updateField = (sectionId, fieldId, value) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [sectionId]: {
        ...(currentDraft[sectionId] ?? {}),
        [fieldId]: value,
      },
    }))
  }

  const syncAddressFromCep = async (cepValue) => {
    const currentCep = (cepValue || '').replace(/\D/g, '')

    if (currentCep.length !== 8) {
      return
    }

    const lookupId = lastCepLookupRef.current + 1
    lastCepLookupRef.current = lookupId

    const addressData = await lookupCep(currentCep)
    const normalizedAddressData = addressData?.data ?? addressData ?? {}
    const normalizedCidade = normalizedAddressData.cidade ?? normalizedAddressData.localidade ?? normalizedAddressData.municipio ?? ''
    const normalizedBairro = normalizedAddressData.bairro ?? ''
    const normalizedEndereco = normalizedAddressData.endereco ?? normalizedAddressData.logradouro ?? normalizedAddressData.rua ?? ''
    const normalizedComplemento = normalizedAddressData.complemento ?? ''

    if (!normalizedAddressData || lastCepLookupRef.current !== lookupId) {
      return
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      dados_representante: {
        ...(currentDraft.dados_representante ?? {}),
        uf: normalizedAddressData.uf ?? currentDraft.dados_representante?.uf ?? '',
      },
      endereco: {
        ...(currentDraft.endereco ?? {}),
        uf: normalizedAddressData.uf ?? currentDraft.endereco?.uf ?? '',
        cidade: normalizedCidade || currentDraft.endereco?.cidade || '',
        bairro: normalizedBairro || currentDraft.endereco?.bairro || '',
        endereco: normalizedEndereco || currentDraft.endereco?.endereco || '',
        complemento: normalizedComplemento || currentDraft.endereco?.complemento || '',
      },
    }))

    // update react-hook-form values for these address fields as well
    try {
      if (rhfSetValue) {
        rhfSetValue('uf', normalizedAddressData.uf ?? '')
        rhfSetValue('cidade', normalizedCidade)
        rhfSetValue('bairro', normalizedBairro)
        rhfSetValue('endereco', normalizedEndereco)
        rhfSetValue('complemento', normalizedComplemento)
      }
    } catch (e) {
      // ignore if rhf not available in this context
    }

    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        const numeroField = document.getElementById('numero')
        if (numeroField && typeof numeroField.focus === 'function') {
          numeroField.focus()
        }
      }, 0)
    }
  }

  const updateRowField = (sectionId, rowIndex, fieldId, value) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [sectionId]: (currentDraft[sectionId] ?? []).map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [fieldId]: value,
            }
          : row,
      ),
    }))
  }

  const addRow = (sectionId, section) => {
    const columns = section.colunas ?? section.campos_por_item ?? []
    setDraft((currentDraft) => ({
      ...currentDraft,
      [sectionId]: [...(currentDraft[sectionId] ?? []), getRowTemplate(columns)],
    }))
  }

  const removeRow = (sectionId, rowIndex) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [sectionId]: (currentDraft[sectionId] ?? []).filter((_, index) => index !== rowIndex),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    requestAction('save')
  }

  useEffect(() => {
    if (!draft.endereco) {
      return
    }

    const cepValue = draft.endereco.cep || ''
    const cepDigits = cepValue.replace(/\D/g, '')

    if (cepDigits.length !== 8) {
      return
    }

    let active = true

    syncAddressFromCep(cepValue).then(() => {
      if (!active) {
        return
      }
    })

    return () => {
      active = false
    }
  }, [draft.endereco?.cep])

  const renderSection = (section) => {
    if (Array.isArray(section.campos)) {
      return (
        <Paper
          key={section.id}
          elevation={0}
          variant="outlined"
          sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff' }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                {section.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Campos principais renderizados conforme definidos no JSON do formulário.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {section.campos.map((field) => (
                <Box key={field.id} sx={{ flex: '1 1 260px', minWidth: 260 }}>
                  <Paper elevation={0} variant="outlined" sx={nestedFieldSx}>
                    <FieldInput
                      field={field}
                      value={draft[section.id]?.[field.id] ?? ''}
                      onChange={(nextValue) => updateField(section.id, field.id, nextValue)}
                      helperText={field.id === 'cep' && cepError ? cepError : undefined}
                      disabled={section.id === 'endereco' && cepLoading && ['uf', 'cidade', 'bairro', 'endereco'].includes(field.id)}
                      endAdornment={field.id === 'cep' && cepLoading ? <InputAdornment position="end"><CircularProgress size={16} /></InputAdornment> : null}
                      rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
                    />
                  </Paper>
                </Box>
              ))}
            </Box>
          </Stack>
        </Paper>
      )
    }

    if (section.tipo === 'tabela' || section.tipo === 'lista_repetivel') {
      const rows = draft[section.id] ?? []
      return (
            <RepeatableSection
          key={section.id}
          section={section}
              rows={rows}
              onAddRow={() => addRow(section.id, section)}
              onRemoveRow={(rowIndex) => removeRow(section.id, rowIndex)}
              onChangeRow={(rowIndex, fieldId, nextValue) => updateRowField(section.id, rowIndex, fieldId, nextValue)}
              rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
              control={control}
        />
      )
    }

    if (section.tipo === 'tabela_quantidades') {
      return (
        <QuantitySection
          key={section.id}
          section={section}
          values={draft[section.id] ?? {}}
          onChange={(fieldId, nextValue) => updateField(section.id, fieldId, nextValue)}
          rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
        />
      )
    }

    if (section.tipo === 'lista_numerada') {
      const rows = draft[section.id] ?? []
      return (
            <NumberedListSection
          key={section.id}
          section={section}
          rows={rows}
              onAddRow={() => addRow(section.id, { campos_por_item: [section.campo] })}
              onRemoveRow={(rowIndex) => removeRow(section.id, rowIndex)}
              onChangeRow={(rowIndex, fieldId, nextValue) => updateRowField(section.id, rowIndex, fieldId, nextValue)}
              rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
              control={control}
        />
      )
    }

    return (
      <Paper
        key={section.id}
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="body2" color="text.secondary">
          Formato de seção não reconhecido. Verifique o JSON do formulário (campo "tipo") ou contate a equipe de desenvolvimento.
        </Typography>
      </Paper>
    )
  }

  return (
    <Stack spacing={1.75} component="form" onSubmit={handleSubmit} sx={pageSx}>
      <FlowStepper
        forms={flowForms.length ? flowForms : [form]}
        activeFormId={form.id}
        onSelectForm={onSelectFlowForm}
        title="Fluxo do cadastro"
        subtitle="A etapa atual fica destacada e você pode alternar entre os formulários sem sair do processo."
        showNavigation
      />

      <Paper
        elevation={0}
        variant="outlined"
        sx={heroSx}
      >
        <Stack spacing={1.25} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-start' }}>
          <Box>
            <Typography variant="overline" color="primary" letterSpacing={1.4}>
              Formulário
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.25 }}>
              {form.titulo}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 820 }}>
              {form.orgao}
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => requestAction('leave')}
              sx={{ mt: 0.75, px: 0.5, minWidth: 'auto', width: 'fit-content', alignSelf: 'flex-start' }}
            >
              Voltar ao catálogo
            </Button>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
            {form.folhas && (
              <Chip label={`Folhas ${form.folhas}`} size="small" sx={{ backgroundColor: 'rgba(30, 136, 229, 0.12)', color: 'primary.dark', fontWeight: 700 }} />
            )}
          </Stack>
        </Stack>
      </Paper>

      {saved && (
        <Alert severity="success" variant="outlined" sx={{ borderRadius: 2 }}>
          Formulário preenchido em modo local. Os dados estão na tela, prontos para a próxima etapa.
        </Alert>
      )}

      {form.secoes.map((section) => renderSection(section))}

      <Paper
        elevation={0}
        variant="outlined"
        sx={footerSx}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => (previousFlowForm && onSelectFlowForm ? onSelectFlowForm(previousFlowForm.id) : requestAction('leave'))}
            sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, width: { xs: '100%', sm: 'auto' } }}
          >
            {previousFlowForm ? 'Etapa anterior' : 'Sair da página'}
          </Button>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            {nextFlowForm && onSelectFlowForm && (
              <Button variant="outlined" onClick={() => onSelectFlowForm(nextFlowForm.id)}>
                Próxima etapa
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineRoundedIcon />}
              onClick={() => requestAction('clear')}
            >
              Limpar tudo
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
            >
              Salvar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Dialog open={confirmOpen} onClose={closeConfirm} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{pendingAction ? actionConfig[pendingAction].title : 'Você tem certeza?'}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {pendingAction ? actionConfig[pendingAction].description : ''}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button variant="text" startIcon={<CloseRoundedIcon />} onClick={closeConfirm}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={pendingAction ? actionConfig[pendingAction].confirmIcon : <CheckRoundedIcon fontSize="small" />}
            onClick={confirmAction}
          >
            {pendingAction ? actionConfig[pendingAction].confirmLabel : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default FormRenderer
