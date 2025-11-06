/**
 * Schema Type Definitions
 * Defines the structure of form schemas loaded from JSON
 */
interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'email' | 'pattern' | 'min' | 'max';
    value?: any;
    message: string;
}
interface FieldValidation {
    rules?: ValidationRule[];
}
interface SelectOption {
    value: string;
    label: string;
}
interface FieldDependency {
    fieldId: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'isEmpty' | 'isNotEmpty';
    value?: any;
    logicType?: 'AND' | 'OR';
}
interface ConditionalRule {
    dependencies: FieldDependency[];
    action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}
interface FieldPermissions {
    roles?: string[];
    permissions?: string[];
    mode?: 'view' | 'edit' | 'hidden';
}
interface AsyncValidationConfig {
    endpoint: string;
    method?: 'GET' | 'POST';
    debounceMs?: number;
    errorMessage?: string;
}
interface DynamicOptionsConfig {
    endpoint: string;
    dependsOn?: string[];
    cacheKey?: string;
}
interface FileUploadConfig {
    accept?: string[];
    maxSize?: number;
    multiple?: boolean;
    uploadEndpoint?: string;
}
interface FieldConfig {
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
interface RepeatableSection {
    sectionId: string;
    label: string;
    minItems?: number;
    maxItems?: number;
    fields: FieldConfig[];
    addButtonText?: string;
    removeButtonText?: string;
}
interface StepConfig {
    stepId: number;
    stepTitle: string;
    fields: FieldConfig[];
    repeatableSections?: RepeatableSection[];
}
interface FormSchema {
    formId: string;
    formTitle: string;
    totalSteps: number;
    submitStrategy: 'final-only' | 'per-step';
    autoSaveEnabled: boolean;
    autoSaveInterval?: number;
    requiredRoles?: string[];
    requiredPermissions?: string[];
    steps: StepConfig[];
}
interface ParsedSchema {
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

/**
 * Form State Type Definitions
 * Defines the structure of form state
 */
interface FieldState {
    touched: boolean;
    dirty: boolean;
    errors: string[];
    validating: boolean;
    visible: boolean;
    readOnly: boolean;
    asyncValidating?: boolean;
    asyncError?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    optionsLoading?: boolean;
}
interface StepState {
    isValid: boolean;
    isDirty: boolean;
    visited: boolean;
    showErrorSummary: boolean;
}
interface AutoSaveState {
    lastSaved: number | null;
    isSaving: boolean;
    error: string | null;
    enabled: boolean;
    interval: number;
}
interface DraftState {
    hasDraft: boolean;
    draftId: string | null;
    draftTimestamp: number | null;
    isRestoring: boolean;
}
interface AsyncValidationState {
    validatingFields: string[];
    validationResults: Record<string, AsyncValidationResult>;
}
interface AsyncValidationResult {
    isValid: boolean;
    errorMessage?: string;
    timestamp: number;
}
interface UserPermissions {
    roles: string[];
    permissions: Record<string, boolean>;
    userId?: string;
}
interface CurrentFormMetadata {
    formId: string;
    taskType: string;
    totalSteps: number;
    currentStep: number;
    submitStrategy: 'final-only' | 'per-step';
    autoSaveEnabled: boolean;
}
interface FormData {
    [stepKey: string]: {
        [fieldId: string]: any;
    };
}
interface FieldStates {
    [fieldKey: string]: FieldState;
}
interface StepStates {
    [stepId: number]: StepState;
}
interface DynamicFormsState {
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

/**
 * Validation Type Definitions
 * Defines validation-related types
 */

interface ValidationError {
    field: string;
    message: string;
}
interface StepValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}
interface FormValidationResult {
    isValid: boolean;
    stepErrors: Record<number, ValidationError[]>;
    allErrors: ValidationError[];
}
interface ValidatorFunction {
    (value: any, fieldConfig: FieldConfig): string | null;
}
interface ValidationSchema {
    [fieldId: string]: any;
}
interface AsyncValidationRule {
    type: 'async';
    endpoint: string;
    method?: 'GET' | 'POST';
    debounceMs?: number;
    errorMessage?: string;
}
interface AsyncValidationRequest {
    fieldId: string;
    value: any;
    formData?: Record<string, any>;
}
interface AsyncValidationResponse {
    valid: boolean;
    errorMessage?: string;
}

/**
 * Navigation Type Definitions
 * Defines types for step navigation
 */
interface NavigationState {
    canGoNext: boolean;
    canGoPrevious: boolean;
    canSubmit: boolean;
    currentStep: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
}
interface NavigationActions {
    goToStep: (stepId: number) => void;
    goToNext: () => void;
    goToPrevious: () => void;
    submit: () => void;
}
type StepNavigationCallback = (stepId: number) => boolean | Promise<boolean>;

/**
 * Schema Parser Utility
 * Parses and validates JSON form schemas
 */

/**
 * Extract metadata from form schema
 */
declare const extractMetadata: (schema: FormSchema) => {
    formId: string;
    formTitle: string;
    totalSteps: number;
    submitStrategy: "final-only" | "per-step";
    autoSaveEnabled: boolean;
    autoSaveInterval: number | undefined;
};
/**
 * Parse a single step configuration
 */
declare const parseStep: (step: StepConfig) => StepConfig;
/**
 * Build validation rules from schema
 */
declare const buildValidationRules: (schema: FormSchema) => Record<string, any>;
/**
 * Main schema parsing function
 */
declare const parseFormSchema: (schema: FormSchema) => ParsedSchema;
/**
 * Validate schema structure
 */
declare const validateSchema: (schema: any) => schema is FormSchema;
/**
 * Get field configuration by ID and step
 */
declare const getFieldConfig: (schema: FormSchema, stepId: number, fieldId: string) => FieldConfig | null;
/**
 * Get all fields for a specific step
 */
declare const getStepFields: (schema: FormSchema, stepId: number) => FieldConfig[];

/**
 * Dependency Resolver Utility
 * Resolves field dependencies and conditional logic
 */

/**
 * Evaluate a single field dependency
 */
declare const evaluateDependency: (dependency: FieldDependency, fieldValue: any) => boolean;
/**
 * Evaluate multiple dependencies with AND/OR logic
 */
declare const evaluateDependencies: (dependencies: FieldDependency[], formData: Record<string, any>) => boolean;
/**
 * Evaluate a conditional rule
 */
declare const evaluateConditionalRule: (rule: ConditionalRule | undefined, formData: Record<string, any>) => boolean;
/**
 * Determine if a field should be visible based on its conditional visibility rule
 */
declare const isFieldVisible: (conditionalVisibility: ConditionalRule | undefined, formData: Record<string, any>) => boolean;
/**
 * Determine if a field should be required based on its conditional required rule
 */
declare const isFieldRequired: (baseRequired: boolean, conditionalRequired: ConditionalRule | undefined, formData: Record<string, any>) => boolean;
/**
 * Determine if a field should be disabled based on its conditional disabled rule
 */
declare const isFieldDisabled: (baseDisabled: boolean, conditionalDisabled: ConditionalRule | undefined, formData: Record<string, any>) => boolean;
/**
 * Get all dependent field IDs from a conditional rule
 */
declare const getDependentFieldIds: (rule: ConditionalRule | undefined) => string[];
/**
 * Check if a field has any dependencies
 */
declare const hasDependencies: (conditionalVisibility?: ConditionalRule, conditionalRequired?: ConditionalRule, conditionalDisabled?: ConditionalRule) => boolean;

/**
 * Permission Checker Utility
 * Checks user permissions and roles for field access
 */

/**
 * Check if user has required roles
 */
declare const hasRequiredRoles: (userRoles: string[], requiredRoles?: string[]) => boolean;
/**
 * Check if user has required permissions
 */
declare const hasRequiredPermissions: (userPermissions: Record<string, boolean>, requiredPermissions?: string[]) => boolean;
/**
 * Determine field access mode based on permissions
 */
declare const getFieldAccessMode: (fieldPermissions: FieldPermissions | undefined, userPermissions: UserPermissions) => "hidden" | "view" | "edit";
/**
 * Check if field should be visible to user
 */
declare const isFieldAccessible: (fieldPermissions: FieldPermissions | undefined, userPermissions: UserPermissions) => boolean;
/**
 * Check if field should be read-only for user
 */
declare const isFieldReadOnly: (fieldPermissions: FieldPermissions | undefined, userPermissions: UserPermissions) => boolean;
/**
 * Check if user can edit the form
 */
declare const canEditForm: (formPermissions: {
    requiredRoles?: string[];
    requiredPermissions?: string[];
}, userPermissions: UserPermissions) => boolean;

/**
 * Core constants
 * @packageDocumentation
 */
declare const FIELD_TYPES: {
    readonly TEXT: "text";
    readonly EMAIL: "email";
    readonly NUMBER: "number";
    readonly DATE: "date";
    readonly SELECT: "select";
    readonly TEXTAREA: "textarea";
    readonly CHECKBOX: "checkbox";
    readonly RADIO: "radio";
    readonly FILE: "file";
    readonly TEL: "tel";
};
declare const VALIDATION_RULES: {
    readonly REQUIRED: "required";
    readonly MIN_LENGTH: "minLength";
    readonly MAX_LENGTH: "maxLength";
    readonly PATTERN: "pattern";
    readonly EMAIL: "email";
    readonly MIN: "min";
    readonly MAX: "max";
    readonly CUSTOM: "custom";
};
declare const DEPENDENCY_OPERATORS: {
    readonly EQUALS: "equals";
    readonly NOT_EQUALS: "notEquals";
    readonly CONTAINS: "contains";
    readonly GREATER_THAN: "greaterThan";
    readonly LESS_THAN: "lessThan";
    readonly IS_EMPTY: "isEmpty";
    readonly IS_NOT_EMPTY: "isNotEmpty";
};
declare const CONDITIONAL_ACTIONS: {
    readonly SHOW: "show";
    readonly HIDE: "hide";
    readonly ENABLE: "enable";
    readonly DISABLE: "disable";
    readonly REQUIRE: "require";
    readonly OPTIONAL: "optional";
};
declare const PERMISSION_MODES: {
    readonly VIEW: "view";
    readonly EDIT: "edit";
    readonly HIDDEN: "hidden";
};
declare const SUBMIT_STRATEGIES: {
    readonly FINAL_ONLY: "final-only";
    readonly PER_STEP: "per-step";
};
declare const DEFAULT_AUTO_SAVE_INTERVAL = 5000;
declare const DEFAULT_ASYNC_VALIDATION_DEBOUNCE = 300;

/**
 * @react-dynamic-forms/core
 * Core types and utilities for React Dynamic Forms
 * @packageDocumentation
 */

declare const VERSION = "0.1.0";

export { type AsyncValidationConfig, type AsyncValidationRequest, type AsyncValidationResponse, type AsyncValidationResult, type AsyncValidationRule, type AsyncValidationState, type AutoSaveState, CONDITIONAL_ACTIONS, type ConditionalRule, type CurrentFormMetadata, DEFAULT_ASYNC_VALIDATION_DEBOUNCE, DEFAULT_AUTO_SAVE_INTERVAL, DEPENDENCY_OPERATORS, type DraftState, type DynamicFormsState, type DynamicOptionsConfig, FIELD_TYPES, type FieldConfig, type FieldDependency, type FieldPermissions, type FieldState, type FieldStates, type FieldValidation, type FileUploadConfig, type FormData, type FormSchema, type FormValidationResult, type NavigationActions, type NavigationState, PERMISSION_MODES, type ParsedSchema, type RepeatableSection, SUBMIT_STRATEGIES, type SelectOption, type StepConfig, type StepNavigationCallback, type StepState, type StepStates, type StepValidationResult, type UserPermissions, VALIDATION_RULES, VERSION, type ValidationError, type ValidationRule, type ValidationSchema, type ValidatorFunction, buildValidationRules, canEditForm, evaluateConditionalRule, evaluateDependencies, evaluateDependency, extractMetadata, getDependentFieldIds, getFieldAccessMode, getFieldConfig, getStepFields, hasDependencies, hasRequiredPermissions, hasRequiredRoles, isFieldAccessible, isFieldDisabled, isFieldReadOnly, isFieldRequired, isFieldVisible, parseFormSchema, parseStep, validateSchema };
