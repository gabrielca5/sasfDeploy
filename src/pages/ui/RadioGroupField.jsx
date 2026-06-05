import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import {
  formControlSx,
  formHelperTextSx,
  formLabelSx,
  formOptionControlSx,
  formOptionGroupSx,
} from './uiStyles'

function RadioGroupField({ label, value, options = [], onChange, helperText, required = false, error = false }) {
  return (
    <FormControl fullWidth required={required} error={error} sx={formControlSx}>
      <FormLabel required={required} sx={formLabelSx}>{label}</FormLabel>
      <RadioGroup row value={value} onChange={(event) => onChange(event.target.value)} sx={formOptionGroupSx}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio size="small" />}
            label={option}
            sx={formOptionControlSx}
          />
        ))}
      </RadioGroup>
      {helperText ? <FormHelperText sx={formHelperTextSx}>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default RadioGroupField
