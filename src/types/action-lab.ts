export interface ActionPlanResult {
  success: boolean;
  protocol: string;
  steps: string[];
  raw: string;
}

export interface TransmuteError {
  error: string;
}
