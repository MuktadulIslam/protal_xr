import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EPA, CreateEPARequest, UpdateEPARequest } from '@/types';
import { apiConfig } from '@/config';
import axiosInstance from '@/config/axios.config';
import { showErrorToast, showSuccessToast } from '@/utils';

// Fetch EPAs for an objective
export const useFetchEPAs = (objectiveId: string | number | null) => {
    return useQuery<EPA[], AxiosError>({
        queryKey: ['epas', objectiveId],
        queryFn: async () => {
            if (!objectiveId) throw new Error('Objective ID is required');
            const { data } = await axiosInstance.get<EPA[]>(
                apiConfig.endpoints.getEPAs(objectiveId)
            );
            return data;
        },
        enabled: !!objectiveId,
    });
};

// Create EPA
export const useCreateEPA = () => {
    const queryClient = useQueryClient();

    return useMutation<EPA, AxiosError, { objectiveId: string | number; data: CreateEPARequest }>({
        mutationFn: async ({ objectiveId, data }) => {
            const response = await axiosInstance.post<EPA>(
                apiConfig.endpoints.createEPA(objectiveId),
                data
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['epas', variables.objectiveId] });
            showSuccessToast('EPA created successfully');
        },
        onError: (error) => {
            console.error('Failed to create EPA:', error);
            showErrorToast('Failed to create EPA. Please try again.');
        }
    });
};

// Update EPA
export const useUpdateEPA = () => {
    const queryClient = useQueryClient();

    return useMutation<EPA, AxiosError, { epaId: string | number; objectiveId: string | number; data: UpdateEPARequest }>({
        mutationFn: async ({ epaId, data }) => {
            const response = await axiosInstance.put<EPA>(
                apiConfig.endpoints.updateEPA(epaId),
                data
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['epas', variables.objectiveId] });
            showSuccessToast('EPA updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update EPA:', error);
            showErrorToast('Failed to update EPA. Please try again.');
        }
    });
};

// Delete EPA
export const useDeleteEPA = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { epaId: string | number; objectiveId: string | number }>({
        mutationFn: async ({ epaId }) => {
            await axiosInstance.delete(
                apiConfig.endpoints.deleteEPA(epaId)
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['epas', variables.objectiveId] });
            showSuccessToast('EPA deleted successfully');
        },
        onError: (error) => {
            console.error('Failed to delete EPA:', error);
            showErrorToast('Failed to delete EPA. Please try again.');
        }
    });
};
