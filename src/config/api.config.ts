const backendBaseURL = 'https://api.craftxr.io/api/v1';

export const apiConfig = {
    backendBaseURL: backendBaseURL,
    timeout: 120000,     // the frontend system will wait maximum to 120 second for the response
    endpoints: {
        login: `${backendBaseURL}/auth/pair`,
        refreshToken: `${backendBaseURL}/auth/refresh`,
        blacklistToken: `${backendBaseURL}/auth/blacklist`,
        getUserProfile: `${backendBaseURL}/auth/me`,
        createSimulation: `${backendBaseURL}/simulations`,
        getSimulation: (id: string) => `${backendBaseURL}/simulations/${id}`,
        updateSimulation: (id: string) => `${backendBaseURL}/simulations/${id}`,
        getAllSimulations: `${backendBaseURL}/simulations`,
        // Objectives endpoints
        getObjectives: (simulationId: string | number) => `${backendBaseURL}/simulations/${simulationId}/objectives`,
        createObjective: (simulationId: string | number) => `${backendBaseURL}/simulations/${simulationId}/objectives`,
        updateObjective: (objectiveId: string | number) => `${backendBaseURL}/simulations/objectives/${objectiveId}`,
        deleteObjective: (objectiveId: string | number) => `${backendBaseURL}/simulations/objectives/${objectiveId}`,
        // EPAs endpoints
        getEPAs: (objectiveId: string | number) => `${backendBaseURL}/simulations/objectives/${objectiveId}/epas`,
        createEPA: (objectiveId: string | number) => `${backendBaseURL}/simulations/objectives/${objectiveId}/epas`,
        updateEPA: (epaId: string | number) => `${backendBaseURL}/simulations/objectives/epas/${epaId}`,
        deleteEPA: (epaId: string | number) => `${backendBaseURL}/simulations/objectives/epas/${epaId}`,
    },
};