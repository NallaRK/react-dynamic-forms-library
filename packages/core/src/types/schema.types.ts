/**
 * Schema Type Definitions
 * Defines the structure of form schemas loaded from JSON
 */

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'pattern' | 'min' | 'max';
  value?: any;
  message: string;
}

export interface FieldValidation {
  rules?: ValidationRule[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldDependency {
  fieldId: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty';
  value?: any;
  logicType?: 'AND' | 'OR';
}

export interface ConditionalRule {
  dependencies: FieldDependency[];
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

export interface FieldPermissions {
  roles?: string[];
  permissions?: string[];
  mode?: 'view' | 'edit' | 'hidden';
}

export interface AsyncValidationConfig {
  endpoint: string;
  method?: 'GET' | 'POST';
  debounceMs?: number;
  errorMessage?: string;
}

export interface DynamicOptionsConfig {
  endpoint: string;
  dependsOn?: string[];
  cacheKey?: string;
}

export interface FileUploadConfig {
  accept?: string[];
  maxSize?: number; // in bytes
  multiple?: boolean;
  uploadEndpoint?: string;
}

export interface FieldConfig {
  fieldId: string;
  fieldType: 'text' | 'email' | 'select' | 'date' | 'number' | 'textarea' | 'tel' | 'file' | 'checkbox' | 'radio';
  label: string;
  required?: boolean;
  validation?: FieldValidation;
  options?: SelectOption[];
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  defaultValue?: any;
  dependencies?: FieldDependency[];
  conditionalVisibility?: ConditionalRule;
  conditionalRequired?: ConditionalRule;
  conditionalDisabled?: ConditionalRule;
  permissions?: FieldPermissions;
  asyncValidation?: AsyncValidationConfig;
  dynamicOptions?: DynamicOptionsConfig;
  fileUpload?: FileUploadConfig;
}

export interface RepeatableSection {
  sectionId: string;
  label: string;
  minItems?: number;
  maxItems?: number;
  fields: FieldConfig[];
  addButtonText?: string;
  removeButtonText?: string;
}

export interface StepConfig {
  stepId: number;
  stepTitle: string;
  fields: FieldConfig[];
  repeatableSections?: RepeatableSection[];
}

export interface FormSchema {
  formId: string;
  formTitle: string;
  totalSteps: number;
  submitStrategy: 'final-only' | 'per-step';
  autoSaveEnabled: boolean;
  autoSaveInterval?: number; // in milliseconds
  requiredRoles?: string[];
  requiredPermissions?: string[];
  steps: StepConfig[];
}

export interface ParsedSchema {
  metadata: {
    formId: string;
    formTitle: string;
    totalSteps: number;
    submitStrategy: string;
    autoSaveEnabled: boolean;
    autoSaveInterval?: number;
  };
  steps: StepConfig[];
  validationRules: Record<string, any>;
}