export function checkAuth(): boolean {
  const token = localStorage.getItem('token');

  if(!token) return false;

  return true;
}