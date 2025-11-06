/**
 * Core constants
 * @packageDocumentation
 */

export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  DATE: 'date',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
  TEL: 'tel',
} as const;

export const VALIDATION_RULES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  EMAIL: 'email',
  MIN: 'min',
  MAX: 'max',
  CUSTOM: 'custom',
} as const;

export const DEPENDENCY_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  CONTAINS: 'contains',
  GREATER_THAN: 'greaterThan',
  LESS_THAN: 'lessThan',
  IS_EMPTY: 'isEmpty',
  IS_NOT_EMPTY: 'isNotEmpty',
} as const;

export const CONDITIONAL_ACTIONS = {
  SHOW: 'show',
  HIDE: 'hide',
  ENABLE: 'enable',
  DISABLE: 'disable',
  REQUIRE: 'require',
  OPTIONAL: 'optional',
} as const;

export const PERMISSION_MODES = {
  VIEW: 'view',
  EDIT: 'edit',
  HIDDEN: 'hidden',
} as const;

export const SUBMIT_STRATEGIES = {
  FINAL_ONLY: 'final-only',
  PER_STEP: 'per-step',
} as const;

export const DEFAULT_AUTO_SAVE_INTERVAL = 5000; // 5 seconds
export const DEFAULT_ASYNC_VALIDATION_DEBOUNCE = 300; // 300ms