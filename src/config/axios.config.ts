import axios from 'axios';
import { getAccessToken, getRefreshToken, storeAccessToken, storeRefreshToken } from '@/utils';
import { apiConfig, routePaths, config as appConfig } from '@/config';
import { RefreshTokenResponse } from '@/types';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: apiConfig.backendBaseURL,
    timeout: apiConfig.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create unprotected axios instance - uses same config as axiosInstance but without interceptors
export const unprotectedAxiosInstance = axios.create(axiosInstance.defaults);

// Add request interceptor to check token on every request
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();
        if (!token) {
            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    console.warn('No refresh token available to fetch access token');
                    alert('Your session has expired. Please login again.');

                    // Create URL object with login path and current location as callback
                    const url = new URL(routePaths.login, window.location.origin);
                    url.searchParams.set(appConfig.callbackUrlName, window.location.pathname + window.location.search);

                    // Redirect to login with callback URL
                    window.location.href = url.toString();
                    return Promise.reject('Authentication required');
                }

                const form = new FormData();
                form.append("refresh", refreshToken);
                const { data } = await axios.post<RefreshTokenResponse>(
                    apiConfig.endpoints.refreshToken,
                    form
                );

                storeAccessToken(data.access);
                console.log('Successfully refreshed new access token');
            } catch (error) {
                console.error('Failed to fetch token:', error);
                return Promise.reject('Authentication failed');
            }
        }

        // Add token to request if we have one
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle 401 unauthorized errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if error is due to unauthorized access (401)
        if (error.response && error.response.status === 401) {
            // Clear any existing tokens
            storeAccessToken('');
            storeRefreshToken('');

            alert('Your session has expired. Please login again.');

            const url = new URL(routePaths.login, window.location.origin);
            url.searchParams.set(appConfig.callbackUrlName, window.location.pathname + window.location.search);

            // Redirect to login with callback URL
            window.location.href = url.toString();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;