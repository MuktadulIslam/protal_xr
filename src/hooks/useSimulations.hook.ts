import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { simulation_id } from '@/utils/constants'
import { AxiosError } from 'axios';
import { CreateSimulationRequest, CreateSimulationResponse, GetSimulationResponse, SimulationListItem, UpdateSimulationRequest } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';
import { showErrorToast, showSuccessToast } from '@/utils';
import { deleteNewSimulationStoredData } from '@/utils/localStorage.service';


export const useCreateSimulation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return useMutation<CreateSimulationResponse, AxiosError, CreateSimulationRequest>({
        mutationFn: async (simulationData: CreateSimulationRequest) => {
            const { data } = await axiosInstance.post<CreateSimulationResponse>(
                apiConfig.endpoints.createSimulation,
                simulationData
            );
            return data;
        },
        onSuccess: (data) => {
            console.log("Simulation created successfully with ID:", data.simulation_id);
            const params = new URLSearchParams(searchParams.toString());
            params.set(simulation_id, data.simulation_id.toString());
            router.push(`?${params.toString()}`);
            deleteNewSimulationStoredData();
            showSuccessToast("Simulaiton creation successfully done! Now create objectives of this simulations");
        },
        onError: (error) => {
            console.error("Failed to create simulation:", error);
            showErrorToast("Failed to create simulation. Please try again.");
        }
    });
};

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

export const useUpdateSimulation = () => {
    return useMutation<CreateSimulationResponse, AxiosError, UpdateSimulationRequest>({
        mutationFn: async (simulationData: UpdateSimulationRequest) => {
            const { simulation_id, ...updateData } = simulationData;
            const { data } = await axiosInstance.put<CreateSimulationResponse>(
                apiConfig.endpoints.updateSimulation(String(simulation_id)),
                updateData
            );
            return data;
        },
        onSuccess: (data) => {
            console.log("Simulation updated successfully with ID:", data.simulation_id);
            deleteNewSimulationStoredData();
            showSuccessToast("Simulation updated successfully!");
        },
        onError: (error) => {
            console.error("Failed to update simulation:", error);
            showErrorToast("Failed to update simulation. Please try again.");
        }
    });
};