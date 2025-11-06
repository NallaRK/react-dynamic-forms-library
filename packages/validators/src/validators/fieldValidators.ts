/**
 * Field-specific Validators
 * Convenience validators for common field types
 */

import type { FieldConfig } from '@react-dynamic-forms/core';
import { validateField, type ValidationResult } from '../engine/validationEngine';

/**
 * Validate email field
 */
export const validateEmailField = (email: string): ValidationResult => {
  const emailConfig: FieldConfig = {
    fieldId: 'email',
    fieldType: 'email',
    label: 'Email',
    validation: {
      rules: [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Please enter a valid email' },
      ],
    },
  };

  return validateField(email, emailConfig);
};

/**
 * Validate phone number field
 */
export const validatePhoneField = (phone: string): ValidationResult => {
  const phoneConfig: FieldConfig = {
    fieldId: 'phone',
    fieldType: 'tel',
    label: 'Phone',
    validation: {
      rules: [
        {
          type: 'pattern',
          value: '^[0-9]{10}$|^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$',
          message: 'Please enter a valid phone number',
        },
      ],
    },
  };

  return validateField(phone, phoneConfig);
};

/**
 * Validate password field
 */
export const validatePasswordField = (password: string): ValidationResult => {
  const passwordConfig: FieldConfig = {
    fieldId: 'password',
    fieldType: 'text',
    label: 'Password',
    validation: {
      rules: [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
      ],
    },
  };

  return validateField(password, passwordConfig);
};

/**
 * Validate number within range
 */
export const validateNumberRange = (
  value: number,
  min: number,
  max: number
): ValidationResult => {
  const numberConfig: FieldConfig = {
    fieldId: 'number',
    fieldType: 'number',
    label: 'Number',
    validation: {
      rules: [
        { type: 'min', value: min, message: `Must be at least ${min}` },
        { type: 'max', value: max, message: `Must be no more than ${max}` },
      ],
    },
  };

  return validateField(value, numberConfig);
};

/**
 * Validate required text field
 */
export const validateRequiredText = (text: string, fieldName: string = 'Field'): ValidationResult => {
  const textConfig: FieldConfig = {
    fieldId: 'text',
    fieldType: 'text',
    label: fieldName,
    validation: {
      rules: [
        { type: 'required', message: `${fieldName} is required` },
      ],
    },
  };

  return validateField(text, textConfig);
};