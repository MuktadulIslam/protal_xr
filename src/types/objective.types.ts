export interface Objective {
  objective_id: number;
  simulation: number;
  objective_text: string;
  weightage: number;
}

export interface CreateObjectiveRequest {
  objective_text: string;
  weightage: number;
}

export interface UpdateObjectiveRequest {
  objective_text?: string;
  weightage?: number;
}