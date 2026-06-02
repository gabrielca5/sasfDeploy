import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import {
  formControlSx,
  formHelperTextSx,
  formLabelSx,
  formYesNoGroupSx,
  formYesNoOptionSx,
} from './uiStyles'

function YesNoField({ label, value, options = ['Sim', 'Não'], onChange, helperText, required = false, error = false }) {
  return (
    <FormControl fullWidth required={required} error={error} sx={formControlSx}>
      <FormLabel required={required} sx={formLabelSx}>{label}</FormLabel>
      <RadioGroup row value={value} onChange={(event) => onChange(event.target.value)} sx={formYesNoGroupSx}>
        {options.map((option) => {
          const checked = value === option

          return (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio size="small" />}
              label={option}
              sx={formYesNoOptionSx({ checked })}
            />
          )
        })}
      </RadioGroup>
      {helperText ? <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default YesNoField
