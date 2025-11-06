/**
 * Validation Type Definitions
 * Defines validation-related types
 */

import type { FieldConfig } from './schema.types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface FormValidationResult {
  isValid: boolean;
  stepErrors: Record<number, ValidationError[]>;
  allErrors: ValidationError[];
}

export interface ValidatorFunction {
  (value: any, fieldConfig: FieldConfig): string | null;
}

export interface ValidationSchema {
  [fieldId: string]: any; // Validation schema (e.g., Yup, Zod)
}

export interface AsyncValidationRule {
  type: 'async';
  endpoint: string;
  method?: 'GET' | 'POST';
  debounceMs?: number;
  errorMessage?: string;
}

export interface AsyncValidationRequest {
  fieldId: string;
  value: any;
  formData?: Record<string, any>;
}

export interface AsyncValidationResponse {
  valid: boolean;
  errorMessage?: string;
}