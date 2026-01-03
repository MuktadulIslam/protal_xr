import { config } from '@/config';
import Cookies from 'js-cookie';

// Client-side functions (using js-cookie)
export const storeAccessToken = (accessToken: string): void => {
    Cookies.set(config.token.accessTokenName, accessToken, {
        expires: new Date(new Date().getTime() + config.token.accessTokenExpiry),
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
};

export const storeRefreshToken = (refreshToken: string): void => {
    Cookies.set(config.token.refreshTokenName, refreshToken, {
        expires: new Date(new Date().getTime() + config.token.refreshTokenExpiry),
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
};

export const storeTokens = ({accessToken, refreshToken}: {accessToken: string, refreshToken: string}): void => {
    storeAccessToken(accessToken);
    storeRefreshToken(refreshToken);
};

export const getAccessToken = (): string | undefined => {
    const token = Cookies.get(config.token.accessTokenName);
    if (!token) return undefined;
    return token;
};

export const getRefreshToken = (): string | undefined => {
    const token = Cookies.get(config.token.refreshTokenName);
    if (!token) return undefined;
    return token;
};


export const removeTokens = (): void => {
    Cookies.remove(config.token.accessTokenName, { path: '/' });
    Cookies.remove(config.token.refreshTokenName, { path: '/' });
};