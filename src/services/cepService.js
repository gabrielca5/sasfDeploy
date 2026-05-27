import apiClient from '../lib/apiClient';

// Expects base URL to point to the API root that contains /consulta/cep/{cep}
export async function lookupCep(cep) {
  // cep should be digits only, length 8
  if (!/^[0-9]{8}$/.test(cep)) {
    const err = new Error('CEP inválido');
    err.status = 400;
    throw err;
  }
  // path: /consulta/cep/{cep}
  const path = `/consulta/cep/${cep}`;
  return apiClient.get(path);
}

export default { lookupCep };
