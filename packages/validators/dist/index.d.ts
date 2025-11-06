import { FieldConfig, ValidationRule } from '@react-dynamic-forms/core';

/**
 * Validation Engine
 * Core validation logic for form fields
 */

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}
interface FieldValidationResult {
    fieldId: string;
    isValid: boolean;
    errors: string[];
}
/**
 * Validate a single field value against its validation rules
 */
declare const validateField: (value: any, fieldConfig: FieldConfig) => ValidationResult;
/**
 * Validate multiple fields at once
 */
declare const validateFields: (fieldValues: Record<string, any>, fieldConfigs: FieldConfig[]) => FieldValidationResult[];
/**
 * Validate all fields in a step
 */
declare const validateStep: (stepData: Record<string, any>, fieldConfigs: FieldConfig[]) => ValidationResult;
/**
 * Check if a specific field is valid
 */
declare const isFieldValid: (value: any, fieldConfig: FieldConfig) => boolean;
/**
 * Get first error message for a field
 */
declare const getFieldError: (value: any, fieldConfig: FieldConfig) => string | null;
/**
 * Check if a field value is required
 */
declare const isFieldRequired: (fieldConfig: FieldConfig) => boolean;

/**
 * Field-specific Validators
 * Convenience validators for common field types
 */

/**
 * Validate email field
 */
declare const validateEmailField: (email: string) => ValidationResult;
/**
 * Validate phone number field
 */
declare const validatePhoneField: (phone: string) => ValidationResult;
/**
 * Validate password field
 */
declare const validatePasswordField: (password: string) => ValidationResult;
/**
 * Validate number within range
 */
declare const validateNumberRange: (value: number, min: number, max: number) => ValidationResult;
/**
 * Validate required text field
 */
declare const validateRequiredText: (text: string, fieldName?: string) => ValidationResult;

/**
 * Base Validation Rules
 * Core validation rule implementations
 */

/**
 * Required field validation
 */
declare const requiredRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Minimum length validation
 */
declare const minLengthRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Maximum length validation
 */
declare const maxLengthRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Email validation
 */
declare const emailRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Pattern validation (regex)
 */
declare const patternRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Minimum value validation (for numbers)
 */
declare const minRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Maximum value validation (for numbers)
 */
declare const maxRule: (value: any, rule: ValidationRule) => string | null;
/**
 * Map of all base validation rules
 */
declare const baseValidationRules: {
    readonly required: (value: any, rule: ValidationRule) => string | null;
    readonly minLength: (value: any, rule: ValidationRule) => string | null;
    readonly maxLength: (value: any, rule: ValidationRule) => string | null;
    readonly email: (value: any, rule: ValidationRule) => string | null;
    readonly pattern: (value: any, rule: ValidationRule) => string | null;
    readonly min: (value: any, rule: ValidationRule) => string | null;
    readonly max: (value: any, rule: ValidationRule) => string | null;
};

/**
 * @react-dynamic-forms/validators
 * Validation engine and rules for React Dynamic Forms
 * @packageDocumentation
 */

declare const VERSION = "0.1.0";

export { type FieldValidationResult, VERSION, type ValidationResult, baseValidationRules, emailRule, getFieldError, isFieldRequired, isFieldValid, maxLengthRule, maxRule, minLengthRule, minRule, patternRule, requiredRule, validateEmailField, validateField, validateFields, validateNumberRange, validatePasswordField, validatePhoneField, validateRequiredText, validateStep };
