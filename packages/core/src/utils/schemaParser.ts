/**
 * Schema Parser Utility
 * Parses and validates JSON form schemas
 */

import type { FormSchema, ParsedSchema, StepConfig, FieldConfig } from '../types/schema.types';

/**
 * Extract metadata from form schema
 */
export const extractMetadata = (schema: FormSchema) => {
  return {
    formId: schema.formId,
    formTitle: schema.formTitle,
    totalSteps: schema.totalSteps,
    submitStrategy: schema.submitStrategy,
    autoSaveEnabled: schema.autoSaveEnabled,
    autoSaveInterval: schema.autoSaveInterval,
  };
};

/**
 * Parse a single step configuration
 */
export const parseStep = (step: StepConfig): StepConfig => {
  return {
    stepId: step.stepId,
    stepTitle: step.stepTitle,
    fields: step.fields.map(field => ({
      ...field,
      required: field.required ?? false,
      disabled: field.disabled ?? false,
    })),
    repeatableSections: step.repeatableSections,
  };
};

/**
 * Build validation rules from schema
 */
export const buildValidationRules = (schema: FormSchema): Record<string, any> => {
  const rules: Record<string, any> = {};

  schema.steps.forEach(step => {
    step.fields.forEach(field => {
      const fieldKey = `step${step.stepId}.${field.fieldId}`;
      rules[fieldKey] = {
        required: field.required,
        validation: field.validation,
      };
    });
  });

  return rules;
};

/**
 * Main schema parsing function
 */
export const parseFormSchema = (schema: FormSchema): ParsedSchema => {
  return {
    metadata: extractMetadata(schema),
    steps: schema.steps.map(parseStep),
    validationRules: buildValidationRules(schema),
  };
};

/**
 * Validate schema structure
 */
export const validateSchema = (schema: any): schema is FormSchema => {
  if (!schema || typeof schema !== 'object') {
    return false;
  }

  const required = ['formId', 'formTitle', 'totalSteps', 'steps'];
  for (const field of required) {
    if (!(field in schema)) {
      return false;
    }
  }

  if (!Array.isArray(schema.steps) || schema.steps.length === 0) {
    return false;
  }

  return true;
};

/**
 * Get field configuration by ID and step
 */
export const getFieldConfig = (
  schema: FormSchema,
  stepId: number,
  fieldId: string
): FieldConfig | null => {
  const step = schema.steps.find(s => s.stepId === stepId);
  if (!step) return null;

  return step.fields.find(f => f.fieldId === fieldId) || null;
};

/**
 * Get all fields for a specific step
 */
export const getStepFields = (schema: FormSchema, stepId: number): FieldConfig[] => {
  const step = schema.steps.find(s => s.stepId === stepId);
  return step?.fields || [];
};