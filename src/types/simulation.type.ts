// Request type for creating a simulation
export interface CreateSimulationRequest {
  simulation_name: string;
  simulation_description: string;
  scenario_background: string;
  scenario_additional_details: string;
  allow_duplication: boolean;
  access_restriction: 'internal' | 'public';
}

// Request type for updating a simulation
export interface UpdateSimulationRequest {
  simulation_id: string | number;
  simulation_name: string;
  simulation_description: string;
  scenario_background: string;
  scenario_additional_details: string;
  allow_duplication: boolean;
  access_restriction: 'internal' | 'public';
}

// Response type for created simulation
export interface CreateSimulationResponse {
  simulation_id: number;
  simulation_name: string;
  simulation_description: string;
  scenario_background: string;
  scenario_additional_details: string;
  allow_duplication: boolean;
  access_restriction: 'internal' | 'public';
  created_at: string;
  updated_at: string;
  start_state: number | null;
  scene: number | null;
  creator_profile: number;
  affiliation: number | null;
  avatar_persona: number | null;
}

// Response type for fetching a single simulation
export interface GetSimulationResponse {
  simulation_id: number;
  simulation_name: string;
  simulation_description: string;
  scenario_background: string;
  scenario_additional_details: string;
  allow_duplication: boolean;
  access_restriction: 'internal' | 'public';
}
