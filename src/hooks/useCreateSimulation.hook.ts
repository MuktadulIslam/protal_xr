import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateSimulationRequest, CreateSimulationResponse } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';
import { showErrorToast, showSuccessToast } from '@/utils';
import { deleteNewSimulationStoredData } from '@/utils/localStorage.service';

export const useCreateSimulation = () => {
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
            deleteNewSimulationStoredData();
            showSuccessToast("Simulaiton creation successfully done! Now create objectives of this simulations");
        },
        onError: (error) => {
            console.error("Failed to create simulation:", error);
            showErrorToast("Failed to create simulation. Please try again.");
        }
    });
};
