import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserLoginRequest, UserLoginResponse } from '@/types';
import { config, apiConfig  } from '@/config';
import { storeTokens } from '@/utils/authToken';
import { useRouter } from 'next/navigation';
import { unprotectedAxiosInstance } from '@/config/axios.config';

export const useLogin = () => {
    const router = useRouter();
    let callbackUrl = '/';

    // Only use searchParams in the browser environment
    if (typeof window !== 'undefined') {
        // Get the URL search params directly from the window object
        const urlSearchParams = new URLSearchParams(window.location.search);
        const paramCallbackUrl = urlSearchParams.get(config.callbackUrlName);
        if (paramCallbackUrl) {
            callbackUrl = paramCallbackUrl;
        }
    }

    return useMutation<UserLoginResponse, AxiosError, UserLoginRequest>({
        mutationFn: async (credentials: UserLoginRequest) => {
            const form = new FormData();
            form.append("username", credentials.username);
            form.append("password", credentials.password);

            const { data, status } = await unprotectedAxiosInstance.post<UserLoginResponse>(
                apiConfig.endpoints.login,
                form
            );
            console.log("Login response status:", status);
            console.log("Login response data:", data);
            return data;
        },
        onSuccess: (data) => {
            storeTokens({accessToken: data.access, refreshToken: data.refresh});
            console.log("Login successful, redirecting to:", callbackUrl);
            router.replace(callbackUrl);
            router.refresh();
        },
        onError: () => {
            alert("Incorrect username or password")
        }
    });
};