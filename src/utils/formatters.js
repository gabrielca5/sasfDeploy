export function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

export function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11)
  const part1 = digits.slice(0, 3)
  const part2 = digits.slice(3, 6)
  const part3 = digits.slice(6, 9)
  const part4 = digits.slice(9, 11)
  return [part1, part2, part3].filter(Boolean).join('.') + (part4 ? `-${part4}` : '')
}

function calculateCpfCheckDigit(digits, factor) {
  const total = digits.reduce((sum, digit, index) => sum + Number(digit) * (factor - index), 0)
  const remainder = (total * 10) % 11
  return remainder === 10 ? 0 : remainder
}

export function isValidCpf(value) {
  const digits = onlyDigits(value)

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false
  }

  const cpfDigits = digits.split('')
  const firstCheckDigit = calculateCpfCheckDigit(cpfDigits.slice(0, 9), 10)
  const secondCheckDigit = calculateCpfCheckDigit(cpfDigits.slice(0, 10), 11)

  return firstCheckDigit === Number(cpfDigits[9]) && secondCheckDigit === Number(cpfDigits[10])
}
