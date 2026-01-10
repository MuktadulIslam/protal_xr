export interface EPA {
  epa_id: number;
  objective: number;
  epa_name: string;
  epa_description: string;
  proficiency_level: string;
  assessment_criteria: string;
  weightage: number;
  is_mandatory: boolean;
}

export interface CreateEPARequest {
  epa_name: string;
  epa_description: string;
  proficiency_level: string;
  assessment_criteria: string;
  weightage: number;
  is_mandatory: boolean;
}

export interface UpdateEPARequest {
  epa_name?: string;
  epa_description?: string;
  proficiency_level?: string;
  assessment_criteria?: string;
  weightage?: number;
  is_mandatory?: boolean;
}