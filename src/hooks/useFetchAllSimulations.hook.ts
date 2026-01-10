import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SimulationListItem } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';

export const useFetchAllSimulations = () => {
    return useQuery<SimulationListItem[], AxiosError>({
        queryKey: ['simulations'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<SimulationListItem[]>(
                apiConfig.endpoints.getAllSimulations
            );
            return data;
        },
    });
};
