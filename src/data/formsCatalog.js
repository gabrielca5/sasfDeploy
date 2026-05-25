import formsCatalog from '@forms-catalog'

export const forms = formsCatalog.formularios ?? []

export function getFormById(formId) {
  return forms.find((form) => form.id === formId)
}

export default forms