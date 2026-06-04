import { useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  CircularProgress,
  MenuItem,
  InputAdornment,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FlowStepper from './FlowStepper'
import { useCepLookup } from '../hooks/useCepLookup'
import {
  ActionButton,
  ButtonLoading,
  FormActionsBar,
  FormField,
  FormGrid,
  FormHeader,
  FormSection,
  FormTextArea,
  InlineFeedback,
  PageDialog,
  PageStack,
  PageToolbar,
  PageWrapper,
  RepeatableFormItem,
  SignatureField,
  SavingState,
  SuccessState,
  YesNoField,
} from '../pages/ui'
import {
  formAddRowButtonSx,
  formChipWrapSx,
  formControlSx,
  formHelperTextSx,
  formInputSx,
  formLabelSx,
  formMultiSelectSx,
  formOptionControlSx,
  formOptionGroupSx,
} from '../pages/ui/uiStyles'
import { formatCpf, isValidCpf, onlyDigits } from '../utils/formatters'

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

function formatCep(value) {
  const digits = onlyDigits(value).slice(0, 8)
  const part1 = digits.slice(0, 5)
  const part2 = digits.slice(5, 8)
  return part2 ? `${part1}-${part2}` : part1
}

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 10) {
    const part1 = digits.slice(0, 2)
    const part2 = digits.slice(2, 6)
    const part3 = digits.slice(6, 10)
    return part3 ? `(${part1}) ${part2}-${part3}` : part2 ? `(${part1}) ${part2}` : part1
  }
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 7)
  const part3 = digits.slice(7, 11)
  return `(${part1}) ${part2}-${part3}`
}

function isCpfField(field) {
  return field?.id?.toLowerCase().includes('cpf')
}

function formatFieldValue(field, value) {
  if (isCpfField(field)) {
    return formatCpf(value)
  }
  if (field?.id === 'cep' || field?.mascara === '00000-000') {
    return formatCep(value)
  }
  if (field?.tipo === 'tel' || field?.id?.includes('telefone')) {
    return formatPhone(value)
  }
  return value
}

function isYesNoOptions(options = []) {
  if (options.length !== 2) {
    return false
  }

  const normalizedOptions = options.map((option) =>
    String(option)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
  )

  return normalizedOptions.includes('sim') && normalizedOptions.includes('nao')
}

function isRequiredFlag(value) {
  return value === true || value === 1 || String(value).toLowerCase() === 'true' || String(value).toLowerCase() === 'sim'
}

function isFieldRequired(field) {
  return isRequiredFlag(field.required ?? field.obrigatorio ?? field.obrigatório ?? field.requerido)
}

function isEmptyFieldValue(value) {
  if (Array.isArray(value)) {
    return value.length === 0
  }

  return value === undefined || value === null || String(value).trim() === ''
}

function getFieldErrorKey(sectionId, fieldId) {
  return `${sectionId}.${fieldId}`
}

function getRowFieldErrorKey(sectionId, rowIndex, fieldId) {
  return `${sectionId}.${rowIndex}.${fieldId}`
}

function getRequiredErrorMessage(field) {
  return `${field.label} é obrigatório.`
}

function collectRequiredFieldError(errors, key, field, value) {
  if (isFieldRequired(field) && isEmptyFieldValue(value)) {
    errors[key] = getRequiredErrorMessage(field)
    return
  }

  if (isCpfField(field) && !isEmptyFieldValue(value) && !isValidCpf(value)) {
    errors[key] = 'CPF inválido.'
  }
}

function validateFormDraft(form, draft) {
  const errors = {}

  form.secoes.forEach((section) => {
    if (Array.isArray(section.campos)) {
      section.campos.forEach((field) => {
        collectRequiredFieldError(errors, getFieldErrorKey(section.id, field.id), field, draft[section.id]?.[field.id])
      })
      return
    }

    if (Array.isArray(section.colunas) || Array.isArray(section.campos_por_item)) {
      const fields = section.colunas ?? section.campos_por_item ?? []
      const rows = draft[section.id] ?? []
      rows.forEach((row, rowIndex) => {
        fields.forEach((field) => {
          collectRequiredFieldError(errors, getRowFieldErrorKey(section.id, rowIndex, field.id), field, row?.[field.id])
        })
      })
      return
    }

    if (section.tipo === 'lista_numerada' && section.campo) {
      const rows = draft[section.id] ?? []
      rows.forEach((row, rowIndex) => {
        collectRequiredFieldError(errors, getRowFieldErrorKey(section.id, rowIndex, section.campo.id), section.campo, row?.[section.campo.id])
      })
    }
  })

  return errors
}

function getTextareaRows(field) {
  const maxRows = Math.max(field.linhas ?? 8, 6)
  const minRows = Math.min(field.linhas ?? 3, 4)

  return { minRows: Math.max(minRows, 3), maxRows }
}

function getFieldSpan(field, section) {
  if (field.tipo === 'assinatura') {
    return 'full'
  }

  if (section?.id === 'estrategias_intervencao') {
    return field.id === 'estrategia' || field.id === 'resultados_esperados' ? 'full' : 'auto'
  }

  if (field.tipo === 'textarea' || field.tipo === 'checkbox' || field.tipo === 'multiselect') {
    return 'full'
  }

  return 'auto'
}

function getRepeatableGridVariant(section) {
  return section.id === 'estrategias_intervencao' ? 'strategy' : 'compact'
}

function FieldInput({ field, value, onChange, rowNumber, helperText: helperTextOverride, disabled = false, endAdornment = null, rhfSetValue = null, required = false, error = false, errorMessage = '' }) {
  const baseHelperText = helperTextOverride ?? field.nota ?? field.mascara ?? ''
  const helperText = errorMessage || baseHelperText

  if (field.tipo === 'static') {
    return (
      <TextField
        label={field.label}
        value={field.id === 'numero' && rowNumber ? rowNumber : value}
        fullWidth
        size="small"
        InputProps={{ readOnly: true }}
        helperText={helperText}
        required={required}
        error={error}
        sx={formInputSx}
      />
    )
  }

  if (field.tipo === 'textarea') {
    const { minRows, maxRows } = getTextareaRows(field)

    return (
      <FormTextArea
        label={field.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minRows={minRows}
        maxRows={maxRows}
        helperText={helperText}
        disabled={disabled}
        required={required}
        error={error}
      />
    )
  }

  if (field.tipo === 'radio') {
    if (isYesNoOptions(field.opcoes ?? [])) {
      return (
        <YesNoField
          label={field.label}
          value={value}
          options={field.opcoes}
          onChange={onChange}
          helperText={helperText}
          required={required}
          error={error}
        />
      )
    }

    return (
      <FormControl fullWidth required={required} error={error} sx={formControlSx}>
        <FormLabel required={required} sx={formLabelSx}>{field.label}</FormLabel>
        <RadioGroup row value={value} onChange={(event) => onChange(event.target.value)} sx={formOptionGroupSx}>
          {(field.opcoes ?? []).map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio size="small" />}
              label={option}
              sx={formOptionControlSx}
            />
          ))}
        </RadioGroup>
        <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.tipo === 'checkbox') {
    return (
      <FormControl fullWidth required={required} error={error} sx={formControlSx}>
        <FormLabel required={required} sx={formLabelSx}>{field.label}</FormLabel>
        <FormGroup sx={formOptionGroupSx}>
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
                sx={formOptionControlSx}
              />
            )
          })}
        </FormGroup>
        <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.tipo === 'multiselect') {
    const selectedValues = Array.isArray(value) ? value : []

    return (
      <FormControl fullWidth size="small" required={required} error={error} sx={formControlSx}>
        <FormLabel required={required} sx={formLabelSx}>{field.label}</FormLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={(event) => onChange(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}
          inputProps={{ 'aria-label': field.label }}
          error={error}
          renderValue={(selected) => (
            <Box sx={formChipWrapSx}>
              {selected.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" />
              ))}
            </Box>
          )}
          sx={formMultiSelectSx}
        >
          {(field.opcoes ?? []).map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox size="small" checked={selectedValues.indexOf(option) > -1} />
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText>
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
        required={required}
        error={error}
        sx={formInputSx}
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
      <SignatureField field={field} value={value} onChange={onChange} helperText={helperText} required={required} error={error} />
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
        required={required}
        error={error}
        sx={formInputSx}
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
        required={required}
        error={error}
        sx={formInputSx}
      />
    )
  }

  return (
    <TextField
      label={field.label}
      value={value}
      onChange={(event) => {
        const nextValue = formatFieldValue(field, event.target.value)
        onChange(nextValue)
        if (rhfSetValue) rhfSetValue(field.id, nextValue)
      }}
      type={field.tipo === 'tel' ? 'tel' : 'text'}
      placeholder={field.placeholder}
      fullWidth
      size="small"
      helperText={helperText}
      disabled={disabled}
      required={required}
      error={error}
      InputProps={endAdornment ? { endAdornment } : undefined}
      sx={formInputSx}
      onBlur={() => {
        if (rhfSetValue) rhfSetValue(field.id, value)
      }}
    />
  )
}

function RepeatableSection({ section, rows, onAddRow, onRemoveRow, onChangeRow, validationErrors = {}, rhfSetValue = null, control = null }) {
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
    <FormSection
      title={section.titulo}
    >
      <Stack spacing={1}>
        {fields.map((fieldObj, rowIndex) => (
          <RepeatableFormItem
            key={`${section.id}-${fieldObj.id ?? rowIndex}`}
            label={`Linha ${rowIndex + 1}`}
            canRemove={fields.length > 1}
            onRemove={() => handleRemove(rowIndex)}
          >
            <FormGrid variant={getRepeatableGridVariant(section)}>
              {columns.map((field) => {
                const errorKey = getRowFieldErrorKey(section.id, rowIndex, field.id)

                return (
                <FormField key={field.id} span={getFieldSpan(field, section)}>
                  <FieldInput
                    field={field}
                    rowNumber={rowIndex + 1}
                    value={fieldObj[field.id] ?? ''}
                    onChange={(nextValue) => handleChange(rowIndex, field.id, nextValue)}
                    required={isFieldRequired(field)}
                    error={Boolean(validationErrors[errorKey])}
                    errorMessage={validationErrors[errorKey]}
                    rhfSetValue={(fid, v) => rhfSetValue && rhfSetValue(`${section.id}.${rowIndex}.${fid}`, v)}
                  />
                </FormField>
                )
              })}
            </FormGrid>
          </RepeatableFormItem>
        ))}

        {fields.length < rowLimit && (
          <ActionButton variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleAdd} sx={formAddRowButtonSx}>
            Adicionar linha
          </ActionButton>
        )}
      </Stack>
    </FormSection>
  )
}

function NumberedListSection({ section, rows, onAddRow, onRemoveRow, onChangeRow, validationErrors = {}, rhfSetValue = null, control = null }) {
  const itemField = section.campo
  const rowLimit = section.max_itens ?? 1
  const { fields, append, remove, update, replace } = useFieldArray({ control, name: section.id })

  useEffect(() => {
    const draftRows = Array.isArray(rows) ? rows : []
    if (JSON.stringify(draftRows) !== JSON.stringify(fields.map((f) => ({ ...f })))) {
      replace(draftRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows?.length])

  if (!itemField) {
    return (
      <FormSection title={section.titulo}>
        <Typography variant="body2" color="text.secondary">
          Formato de seção não reconhecido. Verifique o JSON do formulário (campo "tipo") ou contate a equipe de desenvolvimento.
        </Typography>
      </FormSection>
    )
  }

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
    <FormSection title={section.titulo} description={`Registre os itens na ordem de prioridade. Limite de linhas: ${rowLimit}.`}>
      <Stack spacing={1}>
        {fields.map((fieldObj, rowIndex) => (
          <RepeatableFormItem
            key={`${section.id}-${fieldObj.id ?? rowIndex}`}
            label={`Item ${rowIndex + 1}`}
            canRemove={fields.length > 1}
            onRemove={() => handleRemove(rowIndex)}
          >
            {(() => {
              const errorKey = getRowFieldErrorKey(section.id, rowIndex, itemField.id)

              return (
            <FieldInput
              field={itemField}
              value={fieldObj[itemField.id] ?? ''}
              onChange={(nextValue) => handleChange(rowIndex, itemField.id, nextValue)}
              required={isFieldRequired(itemField)}
              error={Boolean(validationErrors[errorKey])}
              errorMessage={validationErrors[errorKey]}
              rhfSetValue={(fid, v) => rhfSetValue && rhfSetValue(`${section.id}.${rowIndex}.${fid}`, v)}
            />
              )
            })()}
          </RepeatableFormItem>
        ))}

        {fields.length < rowLimit && (
          <ActionButton variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleAdd} sx={formAddRowButtonSx}>
            Adicionar item
          </ActionButton>
        )}
      </Stack>
    </FormSection>
  )
}

function QuantitySection({ section, values, onChange, validationErrors = {}, rhfSetValue = null }) {
  const columns = section.colunas ?? []

  return (
    <FormSection title={section.titulo} description="Preencha as quantidades para cada indicador do quadro situacional.">
      <FormGrid>
        {columns.map((field) => {
          const errorKey = getFieldErrorKey(section.id, field.id)

          return (
          <FormField key={field.id} span={getFieldSpan(field, section)}>
            <FieldInput
              field={field}
              value={values[field.id] ?? ''}
              onChange={(nextValue) => onChange(field.id, nextValue)}
              required={isFieldRequired(field)}
              error={Boolean(validationErrors[errorKey])}
              errorMessage={validationErrors[errorKey]}
              rhfSetValue={rhfSetValue}
            />
          </FormField>
          )
        })}
      </FormGrid>
    </FormSection>
  )
}

export function FormRenderer({ form, onBack, flowForms = [], onSelectFlowForm, onSave }) {
  const [draft, setDraft] = useState(() => createFormDraft(form))
  const [saved, setSaved] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const { lookup: lookupCep, loading: cepLoading, error: cepError } = useCepLookup()
  const { setValue: rhfSetValue, control } = useForm()
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

  const clearValidationError = (key) => {
    setValidationErrors((currentErrors) => {
      if (!currentErrors[key]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[key]
      return nextErrors
    })
  }

  const confirmAction = () => {
    const action = pendingAction
    closeConfirm()

    if (action === 'save') {
      if (onSave) {
        setSubmitting(true)
        setSubmitError(null)
        onSave(draft)
          .then(() => {
            setSaved(true)
            setValidationErrors({})
          })
          .catch((err) => {
            setSubmitError(err?.message || 'Erro ao salvar. Verifique sua conexão e tente novamente.')
          })
          .finally(() => setSubmitting(false))
        return
      }
      setSaved(true)
      setValidationErrors({})
      return
    }

    if (action === 'clear') {
      setDraft(createFormDraft(form))
      setSaved(false)
      setValidationErrors({})
      return
    }

    if (action === 'leave') {
      onBack()
    }
  }

  const updateField = (sectionId, fieldId, value) => {
    clearValidationError(getFieldErrorKey(sectionId, fieldId))
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
    } catch {
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
    clearValidationError(getRowFieldErrorKey(sectionId, rowIndex, fieldId))
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
    const nextValidationErrors = validateFormDraft(form, draft)

    setValidationErrors(nextValidationErrors)

    if (Object.keys(nextValidationErrors).length > 0) {
      setSaved(false)
      return
    }

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

  const validationErrorCount = Object.keys(validationErrors).length

  const renderSection = (section) => {
    if (Array.isArray(section.campos)) {
      return (
        <FormSection
          key={section.id}
          title={section.titulo}
          description="Campos principais renderizados conforme definidos no JSON do formulário."
        >
          <FormGrid>
            {section.campos.map((field) => {
              const errorKey = getFieldErrorKey(section.id, field.id)

              return (
              <FormField key={field.id} span={getFieldSpan(field, section)}>
                <FieldInput
                  field={field}
                  value={draft[section.id]?.[field.id] ?? ''}
                  onChange={(nextValue) => updateField(section.id, field.id, nextValue)}
                  helperText={field.id === 'cep' && cepError ? cepError : undefined}
                  disabled={section.id === 'endereco' && cepLoading && ['uf', 'cidade', 'bairro', 'endereco'].includes(field.id)}
                  endAdornment={field.id === 'cep' && cepLoading ? <InputAdornment position="end"><CircularProgress size={16} /></InputAdornment> : null}
                  required={isFieldRequired(field)}
                  error={Boolean(validationErrors[errorKey])}
                  errorMessage={validationErrors[errorKey]}
                  rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
                />
              </FormField>
              )
            })}
          </FormGrid>
        </FormSection>
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
              validationErrors={validationErrors}
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
          validationErrors={validationErrors}
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
              validationErrors={validationErrors}
              rhfSetValue={section.id === 'endereco' ? rhfSetValue : null}
              control={control}
        />
      )
    }

    return (
      <FormSection key={section.id} title={section.titulo || 'Seção do formulário'}>
        <Typography variant="body2" color="text.secondary">
          Formato de seção não reconhecido. Verifique o JSON do formulário (campo "tipo") ou contate a equipe de desenvolvimento.
        </Typography>
      </FormSection>
    )
  }

  return (
    <PageWrapper maxWidth={1200} spacing={3} component="form" onSubmit={handleSubmit} >
      <FlowStepper
        forms={flowForms.length ? flowForms : [form]}
        activeFormId={form.id}
        onSelectForm={onSelectFlowForm}
        title="Fluxo do cadastro"
        subtitle="A etapa atual fica destacada e você pode alternar entre os formulários sem sair do processo."
        showNavigation
      />

      <FormHeader
        title={form.titulo}
        subtitle={form.orgao}
        meta={form.folhas ? `Folhas ${form.folhas}` : null}
        backLabel="Voltar ao catálogo"
        backIcon={<ArrowBackRoundedIcon />}
        onBack={() => requestAction('leave')}
      />

      {submitting && (
        <SavingState message="Salvando dados..." />
      )}

      {submitError && !submitting && (
        <InlineFeedback severity="error" message={submitError} />
      )}

      {saved && !submitting && !submitError && (
        <SuccessState message="Dados salvos com sucesso." compact />
      )}

      {validationErrorCount > 0 && (
        <InlineFeedback severity="error" message="Revise os campos obrigatórios destacados antes de salvar." />
      )}

      {form.secoes.map((section) => renderSection(section))}

      <FormActionsBar
        leading={
          <ActionButton
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => (previousFlowForm && onSelectFlowForm ? onSelectFlowForm(previousFlowForm.id) : requestAction('leave'))}
          >
            {previousFlowForm ? 'Etapa anterior' : 'Sair da página'}
          </ActionButton>
        }
        actions={
          <PageToolbar direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
            {nextFlowForm && onSelectFlowForm && (
              <ActionButton variant="outlined" onClick={() => onSelectFlowForm(nextFlowForm.id)}>
                Próxima etapa
              </ActionButton>
            )}
            <ActionButton
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineRoundedIcon />}
              onClick={() => requestAction('clear')}
            >
              Limpar tudo
            </ActionButton>
            <ButtonLoading
              type="submit"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              loading={submitting}
              loadingLabel="Salvando..."
            >
              Salvar
            </ButtonLoading>
          </PageToolbar>
        }
      />

      <PageDialog
        open={confirmOpen}
        onClose={closeConfirm}
        maxWidth="xs"
        title={pendingAction ? actionConfig[pendingAction].title : 'Você tem certeza?'}
        actions={
          <>
            <ActionButton variant="text" startIcon={<CloseRoundedIcon />} onClick={closeConfirm}>
              Cancelar
            </ActionButton>
            <ActionButton
              variant="contained"
              startIcon={pendingAction ? actionConfig[pendingAction].confirmIcon : <CheckRoundedIcon fontSize="small" />}
              onClick={confirmAction}
            >
              {pendingAction ? actionConfig[pendingAction].confirmLabel : 'Confirmar'}
            </ActionButton>
          </>
        }
      >
        <PageStack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {pendingAction ? actionConfig[pendingAction].description : ''}
          </Typography>
        </PageStack>
      </PageDialog>
    </PageWrapper>
  )
}

export default FormRenderer
