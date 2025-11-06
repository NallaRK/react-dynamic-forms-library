/**
 * Form State Type Definitions
 * Defines the structure of form state
 */

export interface FieldState {
  touched: boolean;
  dirty: boolean;
  errors: string[];
  validating: boolean;
  visible: boolean;
  readOnly: boolean;
  asyncValidating?: boolean;
  asyncError?: string;
  options?: Array<{ value: string; label: string }>;
  optionsLoading?: boolean;
}

export interface StepState {
  isValid: boolean;
  isDirty: boolean;
  visited: boolean;
  showErrorSummary: boolean;
}

export interface AutoSaveState {
  lastSaved: number | null;
  isSaving: boolean;
  error: string | null;
  enabled: boolean;
  interval: number; // milliseconds
}

export interface DraftState {
  hasDraft: boolean;
  draftId: string | null;
  draftTimestamp: number | null;
  isRestoring: boolean;
}

export interface AsyncValidationState {
  validatingFields: string[]; // fieldIds currently being validated
  validationResults: Record<string, AsyncValidationResult>;
}

export interface AsyncValidationResult {
  isValid: boolean;
  errorMessage?: string;
  timestamp: number;
}

export interface UserPermissions {
  roles: string[];
  permissions: Record<string, boolean>;
  userId?: string;
}

export interface CurrentFormMetadata {
  formId: string;
  taskType: string;
  totalSteps: number;
  currentStep: number;
  submitStrategy: 'final-only' | 'per-step';
  autoSaveEnabled: boolean;
}

export interface FormData {
  [stepKey: string]: {
    [fieldId: string]: any;
  };
}

export interface FieldStates {
  [fieldKey: string]: FieldState;
}

export interface StepStates {
  [stepId: number]: StepState;
}

export interface DynamicFormsState {
  currentForm: CurrentFormMetadata | null;
  formData: FormData;
  fieldStates: FieldStates;
  stepStates: StepStates;
  autoSave: AutoSaveState;
  draft: DraftState;
  asyncValidation: AsyncValidationState;
  userPermissions: UserPermissions;
  schema: any | null;
  isLoading: boolean;
  error: string | null;
}