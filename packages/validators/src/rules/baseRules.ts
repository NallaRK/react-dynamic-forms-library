/**
 * Base Validation Rules
 * Core validation rule implementations
 */

import type { ValidationRule } from '@react-dynamic-forms/core';

/**
 * Required field validation
 */
export const requiredRule = (value: any, rule: ValidationRule): string | null => {
  if (value === undefined || value === null || value === '' ||
      (Array.isArray(value) && value.length === 0)) {
    return rule.message || 'This field is required';
  }
  return null;
};

/**
 * Minimum length validation
 */
export const minLengthRule = (value: any, rule: ValidationRule): string | null => {
  if (!value) return null; // Skip if empty (use required rule for that)

  const length = String(value).length;
  const minLength = Number(rule.value);

  if (length < minLength) {
    return rule.message || `Must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Maximum length validation
 */
export const maxLengthRule = (value: any, rule: ValidationRule): string | null => {
  if (!value) return null;

  const length = String(value).length;
  const maxLength = Number(rule.value);

  if (length > maxLength) {
    return rule.message || `Must be no more than ${maxLength} characters`;
  }
  return null;
};

/**
 * Email validation
 */
export const emailRule = (value: any, rule: ValidationRule): string | null => {
  if (!value) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(String(value))) {
    return rule.message || 'Please enter a valid email address';
  }
  return null;
};

/**
 * Pattern validation (regex)
 */
export const patternRule = (value: any, rule: ValidationRule): string | null => {
  if (!value) return null;

  const pattern = new RegExp(rule.value);

  if (!pattern.test(String(value))) {
    return rule.message || 'Invalid format';
  }
  return null;
};

/**
 * Minimum value validation (for numbers)
 */
export const minRule = (value: any, rule: ValidationRule): string | null => {
  if (value === undefined || value === null || value === '') return null;

  const numValue = Number(value);
  const minValue = Number(rule.value);

  if (isNaN(numValue)) {
    return 'Please enter a valid number';
  }

  if (numValue < minValue) {
    return rule.message || `Must be at least ${minValue}`;
  }
  return null;
};

/**
 * Maximum value validation (for numbers)
 */
export const maxRule = (value: any, rule: ValidationRule): string | null => {
  if (value === undefined || value === null || value === '') return null;

  const numValue = Number(value);
  const maxValue = Number(rule.value);

  if (isNaN(numValue)) {
    return 'Please enter a valid number';
  }

  if (numValue > maxValue) {
    return rule.message || `Must be no more than ${maxValue}`;
  }
  return null;
};

/**
 * Map of all base validation rules
 */
export const baseValidationRules = {
  required: requiredRule,
  minLength: minLengthRule,
  maxLength: maxLengthRule,
  email: emailRule,
  pattern: patternRule,
  min: minRule,
  max: maxRule,
} as const;