import {deleteCookie, getCookie, hasCookie, setCookie} from 'cookies-next';
export const getAuthToken = (): string | undefined => getCookie("token", {
    path: '/',
    sameSite: 'none',
    secure: true,
});

export const deleteAuthToken = (): void => deleteCookie('token');

export const  setAuthToken =  (token: string) => {

    setCookie('token', token, {
        path: '/',
        // maxAge: 10 * 60 * 60,
        sameSite: 'none',
        secure: true,
    })
}
