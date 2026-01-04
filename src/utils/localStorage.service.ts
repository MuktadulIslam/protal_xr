import { useCallback } from "react";
import { debounce } from 'lodash';
import { config as appConfig } from '@/config'
import { newSimulationStorageName } from '@/utils/constants'

export const readFromLocalStorage = (key: string): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
    }
    return null;
}

// Debounced function to save to localStorage
export const saveToLocalStorage = debounce((key: string, value: string) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, value);
        }
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}, appConfig.localStorageSavingDuration);   // Debounced save function - will only execute a duration after the user stops typing


export const saveToLocalStorageAsync = async (key: string, value: string): Promise<void> => {
    return new Promise<void>((resolve) => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem(key, value);
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
            resolve();
        }
    });
}


export const deleteFromLocalStorage = async (key: string): Promise<void> => {
    return new Promise<void>((resolve) => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.removeItem(key);
            }
            resolve();
        } catch (error) {
            console.error(`Error deleting ${key} from localStorage:`, error);
            resolve();
        }
    });
}


export const deleteNewSimulationStoredData = (): boolean => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(newSimulationStorageName.simulation_access)
        localStorage.removeItem(newSimulationStorageName.simulation_additional_details)
        localStorage.removeItem(newSimulationStorageName.simulation_allow_duplication)
        localStorage.removeItem(newSimulationStorageName.simulation_description)
        localStorage.removeItem(newSimulationStorageName.simulation_name)
        localStorage.removeItem(newSimulationStorageName.simulation_scenario_background)
        return true;
    }
    return false;
}

