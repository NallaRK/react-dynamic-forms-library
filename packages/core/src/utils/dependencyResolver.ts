/**
 * Dependency Resolver Utility
 * Resolves field dependencies and conditional logic
 */

import type { FieldDependency, ConditionalRule } from '../types/schema.types';

/**
 * Evaluate a single field dependency
 */
export const evaluateDependency = (
  dependency: FieldDependency,
  fieldValue: any
): boolean => {
  const { operator, value } = dependency;

  switch (operator) {
    case 'equals':
      return fieldValue === value;
    case 'notEquals':
      return fieldValue !== value;
    case 'contains':
      return Array.isArray(fieldValue)
        ? fieldValue.includes(value)
        : String(fieldValue).includes(String(value));
    case 'greaterThan':
      return Number(fieldValue) > Number(value);
    case 'lessThan':
      return Number(fieldValue) < Number(value);
    case 'isEmpty':
      return !fieldValue || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0);
    case 'isNotEmpty':
      return !!fieldValue && fieldValue !== '' && (!Array.isArray(fieldValue) || fieldValue.length > 0);
    default:
      return false;
  }
};

/**
 * Evaluate multiple dependencies with AND/OR logic
 */
export const evaluateDependencies = (
  dependencies: FieldDependency[],
  formData: Record<string, any>
): boolean => {
  if (!dependencies || dependencies.length === 0) {
    return true;
  }

  // Get the logic type from the first dependency (default to AND)
  const logicType = dependencies[0]?.logicType || 'AND';

  if (logicType === 'OR') {
    return dependencies.some(dep => {
      const fieldValue = formData[dep.fieldId];
      return evaluateDependency(dep, fieldValue);
    });
  }

  // AND logic (default)
  return dependencies.every(dep => {
    const fieldValue = formData[dep.fieldId];
    return evaluateDependency(dep, fieldValue);
  });
};

/**
 * Evaluate a conditional rule
 */
export const evaluateConditionalRule = (
  rule: ConditionalRule | undefined,
  formData: Record<string, any>
): boolean => {
  if (!rule || !rule.dependencies) {
    return true;
  }

  return evaluateDependencies(rule.dependencies, formData);
};

/**
 * Determine if a field should be visible based on its conditional visibility rule
 */
export const isFieldVisible = (
  conditionalVisibility: ConditionalRule | undefined,
  formData: Record<string, any>
): boolean => {
  if (!conditionalVisibility) {
    return true; // No rule means always visible
  }

  const conditionMet = evaluateConditionalRule(conditionalVisibility, formData);

  // If action is 'show', return true when condition is met
  // If action is 'hide', return false when condition is met
  return conditionalVisibility.action === 'show' ? conditionMet : !conditionMet;
};

/**
 * Determine if a field should be required based on its conditional required rule
 */
export const isFieldRequired = (
  baseRequired: boolean,
  conditionalRequired: ConditionalRule | undefined,
  formData: Record<string, any>
): boolean => {
  if (!conditionalRequired) {
    return baseRequired; // Use base required value if no conditional rule
  }

  const conditionMet = evaluateConditionalRule(conditionalRequired, formData);

  // If action is 'require', return true when condition is met
  // If action is 'optional', return false when condition is met
  if (conditionalRequired.action === 'require') {
    return conditionMet;
  } else if (conditionalRequired.action === 'optional') {
    return !conditionMet;
  }

  return baseRequired;
};

/**
 * Determine if a field should be disabled based on its conditional disabled rule
 */
export const isFieldDisabled = (
  baseDisabled: boolean,
  conditionalDisabled: ConditionalRule | undefined,
  formData: Record<string, any>
): boolean => {
  if (!conditionalDisabled) {
    return baseDisabled; // Use base disabled value if no conditional rule
  }

  const conditionMet = evaluateConditionalRule(conditionalDisabled, formData);

  // If action is 'disable', return true when condition is met
  // If action is 'enable', return false when condition is met
  if (conditionalDisabled.action === 'disable') {
    return conditionMet;
  } else if (conditionalDisabled.action === 'enable') {
    return !conditionMet;
  }

  return baseDisabled;
};

/**
 * Get all dependent field IDs from a conditional rule
 */
export const getDependentFieldIds = (rule: ConditionalRule | undefined): string[] => {
  if (!rule || !rule.dependencies) {
    return [];
  }

  return rule.dependencies.map(dep => dep.fieldId);
};

/**
 * Check if a field has any dependencies
 */
export const hasDependencies = (
  conditionalVisibility?: ConditionalRule,
  conditionalRequired?: ConditionalRule,
  conditionalDisabled?: ConditionalRule
): boolean => {
  return !!(
    (conditionalVisibility && conditionalVisibility.dependencies.length > 0) ||
    (conditionalRequired && conditionalRequired.dependencies.length > 0) ||
    (conditionalDisabled && conditionalDisabled.dependencies.length > 0)
  );
};