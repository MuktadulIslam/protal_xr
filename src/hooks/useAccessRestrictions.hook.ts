import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from '@/config/axios.config';
import { apiConfig } from '@/config';

export const useFetchAccessRestrictions = () => {
    return useQuery<string[], AxiosError>({
        queryKey: ['accessRestrictions'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<string[]>(
                apiConfig.endpoints.getAccessRestrictions
            );
            return data;
        },
    });
};
