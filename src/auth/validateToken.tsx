/**
 * Validate token using the api, returns true or false
 *
 * @param {any} token
 *  token to be validated
 */
export async function validateToken(token: any) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const response = await fetch('http://localhost:3000/api/me', {
    method: 'GET',
    headers
  })

  const data = await response.json();

  return data.status === 'success';
}