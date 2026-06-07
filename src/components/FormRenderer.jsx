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
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useCepLookup } from '../hooks/useCepLookup'
import { useCitiesByUf } from '../hooks/useCitiesByUf'
import {
  ActionButton,
  ButtonLoading,
  FormActionsFooter,
  FormCard,
  FormFlowLayout,
  FormField,
  FormGrid,
  FormSection,
  FormStepper,
  FormTextArea,
  InlineFeedback,
  PageDialog,
  PageSection,
  PageStack,
  PageToolbar,
  RadioGroupField,
  RepeatableFormItem,
  SavingState,
  SuccessState,
} from '../pages/ui'
import {
  formAddRowButtonSx,
  formChipWrapSx,
  formControlSx,
  formFlowFormSx,
  formCardPlainSx,
  formHelperTextSx,
  formInputSx,
  formLabelSx,
  formPageHeaderTopSx,
  formMultiSelectSx,
  formNaturalidadeGridSx,
  formOptionControlSx,
  formOptionGroupSx,
  formReadOnlyGridSx,
  formReadOnlyItemSx,
  formReadOnlyLabelSx,
  formReadOnlyValueSx,
} from '../pages/ui/uiStyles'
import { isValidCpf } from '../utils/formatters'
import apiClient from '../lib/apiClient'

function getInitialFieldValue(field) {
  if (field.valor_padrao !== undefined) {
    return field.valor_padrao
  }

  if ((field.id === 'data_assinatura' || field.id === 'data_matricula') && field.tipo === 'date') {
    const now = new Date()
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    const [year, month, day] = localDate.toISOString().slice(0, 10).split('-')
    return `${day}/${month}/${year}`
  }

  if (field.tipo === 'checkbox' || field.tipo === 'multiselect') {
    return []
  }

  return ''
}

function mergeDraftValue(baseValue, initialValue) {
  if (initialValue === undefined || initialValue === null) {
    return baseValue
  }

  // Se baseValue é um array, o initialValue DEVE ser um array.
  // Caso contrário, ignoramos o rascunho antigo incompatível.
  if (Array.isArray(baseValue)) {
    return Array.isArray(initialValue) ? initialValue : baseValue
  }

  if (
    baseValue &&
    initialValue &&
    typeof baseValue === 'object' &&
    typeof initialValue === 'object' &&
    !Array.isArray(initialValue)
  ) {
    return Object.keys({ ...baseValue, ...initialValue }).reduce((accumulator, key) => {
      accumulator[key] = mergeDraftValue(baseValue[key], initialValue[key])
      return accumulator
    }, {})
  }

  return initialValue
}

function createInitialFormDraft(form, initialDraft) {
  return mergeDraftValue(createFormDraft(form), initialDraft ?? {})
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

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatDateInput(value) {
  const text = String(value || '').trim()
  const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoMatch) {
    return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`
  }

  const digits = onlyDigits(text).slice(0, 8)
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 4)
  const part3 = digits.slice(4, 8)
  return [part1, part2, part3].filter(Boolean).join('/')
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11)
  const part1 = digits.slice(0, 3)
  const part2 = digits.slice(3, 6)
  const part3 = digits.slice(6, 9)
  const part4 = digits.slice(9, 11)
  return [part1, part2, part3].filter(Boolean).join('.') + (part4 ? `-${part4}` : '')
}

function formatRg(value) {
  const chars = String(value || '').replace(/[^0-9xX]/g, '').toUpperCase().slice(0, 9)
  const part1 = chars.slice(0, 2)
  const part2 = chars.slice(2, 5)
  const part3 = chars.slice(5, 8)
  const part4 = chars.slice(8, 9)
  return [part1, part2, part3].filter(Boolean).join('.') + (part4 ? `-${part4}` : '')
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

function formatCurrency(value) {
  const digits = onlyDigits(value)
  if (!digits) return ''

  const amount = (parseInt(digits, 10) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `R$ ${amount}`
}

function isCpfField(field) {
  return field?.id?.toLowerCase().includes('cpf')
}

function formatFieldValue(field, value) {
  if (field?.tipo === 'date') {
    return formatDateInput(value)
  }
  if (field?.id?.includes('cpf') || field?.mascara === '000.000.000-00') {
    return formatCpf(value)
  }
  if (field?.id === 'rg' || field?.id?.includes('rg_') || field?.mascara === '00.000.000-0') {
    return formatRg(value)
  }
  if (field?.id === 'cep' || field?.mascara === '00000-000') {
    return formatCep(value)
  }
  if (field?.tipo === 'tel' || field?.id?.includes('telefone') || field?.mascara?.includes('(00)')) {
    return formatPhone(value)
  }
  if (field?.mascara === 'R$ 0,00') {
    return formatCurrency(value)
  }
  return value
}

const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

function parseNaturalidade(value) {
  const text = String(value || '').trim()
  const match = text.match(/^(.+?)\s*[/-]\s*([A-Z]{2})$/i)

  if (match) {
    return {
      cidade: match[1].trim(),
      uf: match[2].toUpperCase(),
    }
  }

  if (/^[A-Z]{2}$/i.test(text)) {
    return { cidade: '', uf: text.toUpperCase() }
  }

  return { cidade: text, uf: '' }
}

function formatNaturalidade(cidade, uf) {
  if (cidade && uf) {
    return `${cidade}/${uf}`
  }

  return uf || cidade || ''
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

function isVisibleField(field) {
  return (
    field?.tipo !== 'assinatura' &&
    !(field?.id === 'numero' && field?.tipo === 'static') &&
    field?.id !== 'numero_matricula'
  )
}

function validateFormDraft(form, draft) {
  const errors = {}

  form.secoes.forEach((section) => {
    if (Array.isArray(section.campos)) {
      section.campos.filter(isVisibleField).forEach((field) => {
        collectRequiredFieldError(errors, getFieldErrorKey(section.id, field.id), field, draft[section.id]?.[field.id])
      })
      return
    }

    if (Array.isArray(section.colunas) || Array.isArray(section.campos_por_item)) {
      const fields = (section.colunas ?? section.campos_por_item ?? []).filter(isVisibleField)
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

const FIELD_SPAN_BY_ID = {
  nome_representante: 'medium',
  naturalidade: 'medium',
  nome_autorizante: 'medium',
  nomes_criancas: 'medium',
  estado_civil: 'medium',
}

function getFieldSpan(field, section) {
  if (FIELD_SPAN_BY_ID[field.id]) {
    return FIELD_SPAN_BY_ID[field.id]
  }

  if (section?.id === 'estrategias_intervencao') {
    return field.id === 'estrategia' || field.id === 'resultados_esperados' ? 'full' : 'auto'
  }

  if (field.tipo === 'textarea' || field.tipo === 'checkbox' || field.tipo === 'multiselect') {
    return 'full'
  }

  return 'auto'
}

function getSheetPosition(folhas) {
  const match = String(folhas || '').trim().match(/^(\d+)\s*\/\s*(\d+)$/)

  if (!match) {
    return null
  }

  return {
    current: Number(match[1]),
    total: Number(match[2]),
  }
}

function isNextSheet(currentForm, nextForm) {
  const currentSheet = getSheetPosition(currentForm?.folhas)
  const nextSheet = getSheetPosition(nextForm?.folhas)

  return Boolean(
    currentSheet &&
      nextSheet &&
      currentSheet.total === nextSheet.total &&
      currentSheet.current + 1 === nextSheet.current,
  )
}

function getRepeatableGridVariant(section) {
  return section.id === 'estrategias_intervencao' ? 'strategy' : 'compact'
}

function getRepeatableItemLabel(section, rowIndex) {
  if (section.id === 'menores_acompanhantes') {
    return `Menor ${rowIndex + 1}`
  }

  return `Linha ${rowIndex + 1}`
}

function getRepeatableAddLabel(section) {
  if (section.id === 'menores_acompanhantes') {
    return 'Adicionar menor'
  }

  return 'Adicionar linha'
}

function ReadOnlyFieldsSection({ section, values = {} }) {
  const description = section.description || section.descricao

  return (
    <FormSection title={section.titulo}>
      {description && (
        <InlineFeedback severity="info" message={description} compact />
      )}
      <Box sx={formReadOnlyGridSx}>
        {(section.campos ?? []).map((field) => (
          <Box key={field.id} sx={formReadOnlyItemSx}>
            <Typography variant="caption" color="text.secondary" sx={formReadOnlyLabelSx}>
              {field.label}
            </Typography>
            <Typography variant="body2" sx={formReadOnlyValueSx}>
              {values[field.id] || field.valor_padrao || '—'}
            </Typography>
          </Box>
        ))}
      </Box>
    </FormSection>
  )
}

function NaturalidadeField({ field, value, onChange, required = false, error = false, errorMessage = '', disabled = false }) {
  const { cidade, uf } = parseNaturalidade(value)
  const { data: cidades = [], isLoading, isError } = useCitiesByUf(uf)
  const cityOptions = cidade && !cidades.includes(cidade) ? [cidade, ...cidades] : cidades
  const cityHelperText = errorMessage || (
    isLoading
      ? 'Carregando cidades...'
      : isError
        ? 'Não foi possível carregar cidades. Digite a cidade manualmente.'
        : field.nota || undefined
  )
  const useCitySelect = Boolean(uf && cityOptions.length && !isError)

  return (
    <Box sx={formNaturalidadeGridSx}>
      <TextField
        select
        label="Estado"
        value={uf}
        onChange={(event) => onChange(formatNaturalidade('', event.target.value))}
        fullWidth
        size="small"
        helperText={undefined}
        disabled={disabled}
        required={required}
        error={error}
        sx={formInputSx}
      >
        <MenuItem value="" disabled>
          Selecione
        </MenuItem>
        {UF_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select={useCitySelect}
        label="Cidade"
        value={cidade}
        onChange={(event) => onChange(formatNaturalidade(event.target.value, uf))}
        fullWidth
        size="small"
        helperText={cityHelperText}
        disabled={disabled || !uf || isLoading}
        required={required}
        error={error}
        sx={formInputSx}
      >
        {useCitySelect && (
          <MenuItem value="" disabled>
            Selecione
          </MenuItem>
        )}
        {useCitySelect && cityOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

function FieldInput({ field, value, onChange, rowNumber, helperText: helperTextOverride, disabled = false, endAdornment = null, rhfSetValue = null, required = false, error = false, errorMessage = '' }) {
  const baseHelperText = helperTextOverride ?? field.nota ?? ''
  const helperText = errorMessage || baseHelperText
  const fieldLabel = field.label || field.placeholder || field.id

  if (field.id === 'naturalidade') {
    return (
      <NaturalidadeField
        field={field}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        error={error}
        errorMessage={errorMessage}
      />
    )
  }

  if (field.tipo === 'static') {
    return (
      <TextField
        label={fieldLabel}
        value={field.id === 'numero' && rowNumber ? rowNumber : value}
        fullWidth
        size="small"
        InputProps={{ readOnly: true }}
        helperText={helperText || undefined}
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
        label={fieldLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minRows={minRows}
        maxRows={maxRows}
        helperText={helperText || undefined}
        disabled={disabled}
        required={required}
        error={error}
      />
    )
  }

  if (field.tipo === 'radio') {
    return (
      <RadioGroupField
        label={fieldLabel}
        value={value}
        options={field.opcoes}
        onChange={onChange}
        helperText={helperText || undefined}
        required={required}
        error={error}
      />
    )
  }

  if (field.tipo === 'checkbox') {
    return (
      <FormControl fullWidth required={required} error={error} sx={formControlSx}>
        <FormLabel required={required} sx={formLabelSx}>{fieldLabel}</FormLabel>
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
        {helperText ? <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText> : null}
      </FormControl>
    )
  }

  if (field.tipo === 'multiselect') {
    const selectedValues = Array.isArray(value) ? value : []

    return (
      <FormControl fullWidth size="small" required={required} error={error} sx={formControlSx}>
        <FormLabel required={required} sx={formLabelSx}>{fieldLabel}</FormLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={(event) => onChange(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}
          inputProps={{ 'aria-label': fieldLabel }}
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
        {helperText ? <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText> : null}
      </FormControl>
    )
  }

  if (field.tipo === 'select') {
    return (
      <TextField
        select
        label={fieldLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
        helperText={helperText || undefined}
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

  if (field.tipo === 'date') {
    return (
      <TextField
        label={fieldLabel}
        value={formatDateInput(value)}
        onChange={(event) => onChange(formatDateInput(event.target.value))}
        type="text"
        placeholder=""
        inputMode="numeric"
        inputProps={{ maxLength: 10 }}
        autoComplete="off"
        fullWidth
        size="small"
        helperText={helperText || undefined}
        disabled={disabled}
        required={required}
        error={error}
        sx={formInputSx}
      />
    )
  }

  if (field.tipo === 'number' && !field.mascara) {
    return (
      <TextField
        label={fieldLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="number"
        inputProps={{ min: field.min ?? 0 }}
        fullWidth
        size="small"
        helperText={helperText || undefined}
        disabled={disabled}
        required={required}
        error={error}
        sx={formInputSx}
      />
    )
  }

  return (
    <TextField
      label={fieldLabel}
      value={formatFieldValue(field, value)}
      onChange={(event) => {
        const nextValue = formatFieldValue(field, event.target.value)
        onChange(nextValue)
        if (rhfSetValue) rhfSetValue(field.id, nextValue)
      }}
      type={field.tipo === 'tel' ? 'tel' : 'text'}
      placeholder={field.label ? field.placeholder : ''}
      fullWidth
      size="small"
      helperText={helperText || undefined}
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
  const columns = (section.colunas ?? section.campos_por_item ?? []).filter(isVisibleField)
  const rowLimit = section.max_linhas ?? section.max_itens ?? 1
  const description = section.description || section.descricao

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
    <FormSection title={section.titulo}>
      {description && (
        <InlineFeedback severity="info" message={description} compact />
      )}
      <Stack spacing={1}>
        {fields.map((fieldObj, rowIndex) => (
          <RepeatableFormItem
            key={`${section.id}-${fieldObj.id ?? rowIndex}`}
            label={getRepeatableItemLabel(section, rowIndex)}
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
            {getRepeatableAddLabel(section)}
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
    <FormSection title={section.titulo}>
      <InlineFeedback
        severity="info"
        message={`Registre os itens na ordem de prioridade. Limite de linhas: ${rowLimit}.`}
        compact
      />
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
  const columns = (section.colunas ?? []).filter(isVisibleField)

  return (
    <FormSection title={section.titulo}>
      <InlineFeedback
        severity="info"
        message="Preencha as quantidades para cada indicador do quadro situacional."
        compact
      />
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

export function FormRenderer({
  form,
  onBack,
  flowForms = [],
  onSelectFlowForm,
  onSave,
  initialDraft,
  onDraftChange,
  notice,
  successMessage = 'Dados salvos com sucesso.',
  errorMessage = 'Erro ao salvar. Verifique sua conexão e tente novamente.',
  stepperTitle = ' ',
  stepperSubtitle = ' ',
  stepperShowsCompleted = true,
}) {
  const [draft, setDraft] = useState(() => createInitialFormDraft(form, initialDraft))
  const [saved, setSaved] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const { lookup: lookupCep, loading: cepLoading, error: cepError } = useCepLookup()
  const { setValue: rhfSetValue, control } = useForm()
  const lastCepLookupRef = useRef(0)
  const flowSteps = flowForms.length ? flowForms : [form]
  const currentFlowIndex = Math.max(0, flowSteps.findIndex((flowForm) => flowForm.id === form.id))
  const previousFlowForm = currentFlowIndex > 0 ? flowSteps[currentFlowIndex - 1] : undefined
  const nextFlowForm = currentFlowIndex >= 0 && currentFlowIndex < flowSteps.length - 1 ? flowSteps[currentFlowIndex + 1] : undefined
  const nextFlowLabel = isNextSheet(form, nextFlowForm) ? 'Próxima folha' : 'Próxima etapa'

  useEffect(() => {
    let active = true
    apiClient
      .get('/dados')
      .then((res) => {
        const serviceData = res?.content?.[0]
        if (active && serviceData) {
          setDraft((current) => {
            const next = { ...current }

            if (next.identificacao_servico) {
              next.identificacao_servico = {
                ...next.identificacao_servico,
                nome_servico_sasf: serviceData.nomeServicoSasf,
                cas: serviceData.cas,
                cras: serviceData.cras,
                numero_matricula: serviceData.numeroMatricula,
              }
            }

            Object.keys(next).forEach((sectionId) => {
              const section = next[sectionId]
              if (section && typeof section === 'object' && !Array.isArray(section)) {
                if ('numero_matricula' in section) {
                  section.numero_matricula = serviceData.numeroMatricula
                }
              }
            })

            return next
          })
        }
      })
      .catch((err) => console.warn('Falha ao carregar dados do serviço:', err))

    return () => {
      active = false
    }
  }, [])

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
            setSubmitError(err?.message || errorMessage)
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

    try {
      if (rhfSetValue) {
        rhfSetValue('uf', normalizedAddressData.uf ?? '')
        rhfSetValue('cidade', normalizedCidade)
        rhfSetValue('bairro', normalizedBairro)
        rhfSetValue('endereco', normalizedEndereco)
        rhfSetValue('complemento', normalizedComplemento)
      }
    } catch {
      // RHF sync is best-effort when address fields are not registered.
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

  useEffect(() => {
    onDraftChange?.(form.id, draft)
  }, [draft, form.id, onDraftChange])

  const renderSection = (section) => {
    if (section.id === 'identificacao_servico' && Array.isArray(section.campos)) {
      return (
        <ReadOnlyFieldsSection
          key={section.id}
          section={section}
          values={draft[section.id] ?? {}}
        />
      )
    }

    if (Array.isArray(section.campos)) {
      const description = section.description || section.descricao

      return (
        <FormSection
          key={section.id}
          title={section.titulo}
        >
          {description && (
            <InlineFeedback severity="info" message={description} compact />
          )}
          <FormGrid>
            {section.campos.filter(isVisibleField).map((field) => {
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
    <FormFlowLayout>
      <Box component="form" onSubmit={handleSubmit} sx={formFlowFormSx}>
        <PageSection
          top={
            <Box sx={formPageHeaderTopSx}>
              <PageToolbar justifyContent="flex-start">
                <ActionButton
                  type="button"
                  variant="text"
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => requestAction('leave')}
              >
                Voltar ao catálogo
              </ActionButton>
            </PageToolbar>

            <FormStepper
              forms={flowSteps}
              activeFormId={form.id}
              onSelectForm={onSelectFlowForm}
              title={stepperTitle}
              subtitle={stepperSubtitle}
              showCompleted={stepperShowsCompleted}
            />
          </Box>
        }
          eyebrow={form.orgao}
          title={form.titulo}
          description={"Preencha os campos abaixo para registrar as informações solicitadas. Campos obrigatórios estão destacados com asterisco."}
          childrenSx={{ mt: 2 }}
        >
          <FormCard
            variant="plain"
            sx={formCardPlainSx}
            footer={
              <FormActionsFooter
                leading={
                  <ActionButton
                    type="button"
                    variant="outlined"
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => previousFlowForm && onSelectFlowForm?.(previousFlowForm.id)}
                    disabled={!previousFlowForm || !onSelectFlowForm}
                  >
                    Etapa anterior
                  </ActionButton>
                }
                actions={
                  <PageToolbar
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    justifyContent="flex-end"
                  >
                    <ActionButton
                      type="button"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => requestAction('clear')}
                    >
                      Limpar tudo
                    </ActionButton>
                    <ButtonLoading
                      type="submit"
                      variant={nextFlowForm ? 'outlined' : 'contained'}
                      startIcon={<SaveOutlinedIcon />}
                      loading={submitting}
                      loadingLabel="Salvando..."
                    >
                      Salvar
                    </ButtonLoading>
                    <ActionButton
                      type="button"
                      variant="contained"
                      endIcon={<ArrowForwardRoundedIcon />}
                      onClick={() => nextFlowForm && onSelectFlowForm?.(nextFlowForm.id)}
                      disabled={!nextFlowForm || !onSelectFlowForm}
                    >
                      {nextFlowLabel}
                    </ActionButton>
                  </PageToolbar>
                }
              />
            }
          >
            {submitting && (
              <SavingState message="Salvando dados..." />
            )}

            {submitError && !submitting && (
              <InlineFeedback severity="error" message={submitError} />
            )}

            {notice && !submitting && !submitError && (
              notice.severity === 'success'
                ? <SuccessState message={notice.message} compact />
                : <InlineFeedback severity={notice.severity} message={notice.message} />
            )}

            {saved && !submitting && !submitError && (
              <SuccessState message={successMessage} compact />
            )}

            {validationErrorCount > 0 && (
              <InlineFeedback severity="error" message="Revise os campos obrigatórios destacados antes de salvar." />
            )}

            {form.secoes.map((section) => renderSection(section))}
          </FormCard>
        </PageSection>
      </Box>

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
    </FormFlowLayout>
  )
}

export default FormRenderer
