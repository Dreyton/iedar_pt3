export const checkUserAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const accessToken = localStorage.getItem('@app:token')
  return !!accessToken;
}