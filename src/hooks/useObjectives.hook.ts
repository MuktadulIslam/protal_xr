import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Objective, CreateObjectiveRequest, UpdateObjectiveRequest } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';
import { showErrorToast, showSuccessToast } from '@/utils';

// Fetch objectives for a simulation
export const useFetchObjectives = (simulationId: string | number | null) => {
    return useQuery<Objective[], AxiosError>({
        queryKey: ['objectives', simulationId],
        queryFn: async () => {
            if (!simulationId) throw new Error('Simulation ID is required');
            const { data } = await axiosInstance.get<Objective[]>(
                apiConfig.endpoints.getObjectives(simulationId)
            );
            return data;
        },
        enabled: !!simulationId,
    });
};

// Create objective
export const useCreateObjective = () => {
    const queryClient = useQueryClient();

    return useMutation<Objective, AxiosError, { simulationId: string | number; data: CreateObjectiveRequest }>({
        mutationFn: async ({ simulationId, data }) => {
            const response = await axiosInstance.post<Objective>(
                apiConfig.endpoints.createObjective(simulationId),
                data
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['objectives', variables.simulationId] });
            showSuccessToast('Objective created successfully');
        },
        onError: (error) => {
            console.error('Failed to create objective:', error);
            showErrorToast('Failed to create objective. Please try again.');
        }
    });
};

// Update objective
export const useUpdateObjective = () => {
    const queryClient = useQueryClient();

    return useMutation<Objective, AxiosError, { objectiveId: string | number; simulationId: string | number; data: UpdateObjectiveRequest }>({
        mutationFn: async ({ objectiveId, data }) => {
            const response = await axiosInstance.put<Objective>(
                apiConfig.endpoints.updateObjective(objectiveId),
                data
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['objectives', variables.simulationId] });
            showSuccessToast('Objective updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update objective:', error);
            showErrorToast('Failed to update objective. Please try again.');
        }
    });
};

// Delete objective
export const useDeleteObjective = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { objectiveId: string | number; simulationId: string | number }>({
        mutationFn: async ({ objectiveId }) => {
            await axiosInstance.delete(
                apiConfig.endpoints.deleteObjective(objectiveId)
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['objectives', variables.simulationId] });
            showSuccessToast('Objective deleted successfully');
        },
        onError: (error) => {
            console.error('Failed to delete objective:', error);
            showErrorToast('Failed to delete objective. Please try again.');
        }
    });
};
