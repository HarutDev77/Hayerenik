import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
export const getAuthToken = (): string | undefined =>
   getCookie('token', {
      path: '/',
      sameSite: 'none',
      secure: true,
   })

export const deleteAuthToken = (): void => deleteCookie('token')

export const setAuthToken = (token: string) => {
   setCookie('token', token, {
      path: '/',
      maxAge: 860400, // 9 days 23 hours
      sameSite: 'none',
      secure: true,
   })
}
