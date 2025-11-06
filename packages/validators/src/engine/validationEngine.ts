/**
 * Validation Engine
 * Core validation logic for form fields
 */

import type { FieldConfig } from '@react-dynamic-forms/core';
import { baseValidationRules } from '../rules/baseRules';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidationResult {
  fieldId: string;
  isValid: boolean;
  errors: string[];
}

/**
 * Validate a single field value against its validation rules
 */
export const validateField = (
  value: any,
  fieldConfig: FieldConfig
): ValidationResult => {
  const errors: string[] = [];

  // Check if field has validation rules
  if (!fieldConfig.validation?.rules || fieldConfig.validation.rules.length === 0) {
    return { isValid: true, errors: [] };
  }

  // Run each validation rule
  for (const rule of fieldConfig.validation.rules) {
    const validator = baseValidationRules[rule.type];

    if (!validator) {
      console.warn(`Unknown validation rule type: ${rule.type}`);
      continue;
    }

    const error = validator(value, rule);
    if (error) {
      errors.push(error);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate multiple fields at once
 */
export const validateFields = (
  fieldValues: Record<string, any>,
  fieldConfigs: FieldConfig[]
): FieldValidationResult[] => {
  return fieldConfigs.map(config => {
    const value = fieldValues[config.fieldId];
    const result = validateField(value, config);

    return {
      fieldId: config.fieldId,
      isValid: result.isValid,
      errors: result.errors,
    };
  });
};

/**
 * Validate all fields in a step
 */
export const validateStep = (
  stepData: Record<string, any>,
  fieldConfigs: FieldConfig[]
): ValidationResult => {
  const allErrors: string[] = [];

  for (const config of fieldConfigs) {
    const value = stepData[config.fieldId];
    const result = validateField(value, config);

    if (!result.isValid) {
      allErrors.push(...result.errors);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};

/**
 * Check if a specific field is valid
 */
export const isFieldValid = (
  value: any,
  fieldConfig: FieldConfig
): boolean => {
  const result = validateField(value, fieldConfig);
  return result.isValid;
};

/**
 * Get first error message for a field
 */
export const getFieldError = (
  value: any,
  fieldConfig: FieldConfig
): string | null => {
  const result = validateField(value, fieldConfig);
  return result.errors[0] || null;
};

/**
 * Check if a field value is required
 */
export const isFieldRequired = (fieldConfig: FieldConfig): boolean => {
  if (fieldConfig.required) return true;

  // Check if any validation rule is 'required'
  return fieldConfig.validation?.rules?.some(rule => rule.type === 'required') ?? false;
};