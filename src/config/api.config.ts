const backendBaseURL = 'https://api.craftxr.io/api/v1';

export const apiConfig = {
    backendBaseURL: backendBaseURL,
    timeout: 120000,     // the frontend system will wait maximum to 120 second for the response
    endpoints: {
        login: `${backendBaseURL}/auth/pair`,
        refreshToken: `${backendBaseURL}/auth/refresh`,
        blacklistToken: `${backendBaseURL}/auth/blacklist`,
        getUserProfile: `${backendBaseURL}/auth/me`,
    },
};