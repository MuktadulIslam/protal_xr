import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetSimulationResponse } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';

export const useFetchSimulation = (simulationId: string | null) => {
    return useQuery<GetSimulationResponse | null, AxiosError>({
        queryKey: ['simulation', simulationId],
        queryFn: async () => {
            if (!simulationId) {
                return null;
            }

            const { data } = await axiosInstance.get<GetSimulationResponse>(
                apiConfig.endpoints.getSimulation(simulationId)
            );

            return data;
        },
        enabled: !!simulationId, // Only run query if simulationId exists
    });
};