import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UpdateSimulationRequest, CreateSimulationResponse } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';
import { showErrorToast, showSuccessToast } from '@/utils';
import { deleteNewSimulationStoredData } from '@/utils/localStorage.service';

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
