// src/utils/schemaParser.ts
var extractMetadata = (schema) => {
  return {
    formId: schema.formId,
    formTitle: schema.formTitle,
    totalSteps: schema.totalSteps,
    submitStrategy: schema.submitStrategy,
    autoSaveEnabled: schema.autoSaveEnabled,
    autoSaveInterval: schema.autoSaveInterval
  };
};
var parseStep = (step) => {
  return {
    stepId: step.stepId,
    stepTitle: step.stepTitle,
    fields: step.fields.map((field) => ({
      ...field,
      required: field.required ?? false,
      disabled: field.disabled ?? false
    })),
    repeatableSections: step.repeatableSections
  };
};
var buildValidationRules = (schema) => {
  const rules = {};
  schema.steps.forEach((step) => {
    step.fields.forEach((field) => {
      const fieldKey = `step${step.stepId}.${field.fieldId}`;
      rules[fieldKey] = {
        required: field.required,
        validation: field.validation
      };
    });
  });
  return rules;
};
var parseFormSchema = (schema) => {
  return {
    metadata: extractMetadata(schema),
    steps: schema.steps.map(parseStep),
    validationRules: buildValidationRules(schema)
  };
};
var validateSchema = (schema) => {
  if (!schema || typeof schema !== "object") {
    return false;
  }
  const required = ["formId", "formTitle", "totalSteps", "steps"];
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
var getFieldConfig = (schema, stepId, fieldId) => {
  const step = schema.steps.find((s) => s.stepId === stepId);
  if (!step) return null;
  return step.fields.find((f) => f.fieldId === fieldId) || null;
};
var getStepFields = (schema, stepId) => {
  const step = schema.steps.find((s) => s.stepId === stepId);
  return step?.fields || [];
};

// src/utils/dependencyResolver.ts
var evaluateDependency = (dependency, fieldValue) => {
  const { operator, value } = dependency;
  switch (operator) {
    case "equals":
      return fieldValue === value;
    case "notEquals":
      return fieldValue !== value;
    case "contains":
      return Array.isArray(fieldValue) ? fieldValue.includes(value) : String(fieldValue).includes(String(value));
    case "greaterThan":
      return Number(fieldValue) > Number(value);
    case "lessThan":
      return Number(fieldValue) < Number(value);
    case "isEmpty":
      return !fieldValue || fieldValue === "" || Array.isArray(fieldValue) && fieldValue.length === 0;
    case "isNotEmpty":
      return !!fieldValue && fieldValue !== "" && (!Array.isArray(fieldValue) || fieldValue.length > 0);
    default:
      return false;
  }
};
var evaluateDependencies = (dependencies, formData) => {
  if (!dependencies || dependencies.length === 0) {
    return true;
  }
  const logicType = dependencies[0]?.logicType || "AND";
  if (logicType === "OR") {
    return dependencies.some((dep) => {
      const fieldValue = formData[dep.fieldId];
      return evaluateDependency(dep, fieldValue);
    });
  }
  return dependencies.every((dep) => {
    const fieldValue = formData[dep.fieldId];
    return evaluateDependency(dep, fieldValue);
  });
};
var evaluateConditionalRule = (rule, formData) => {
  if (!rule || !rule.dependencies) {
    return true;
  }
  return evaluateDependencies(rule.dependencies, formData);
};
var isFieldVisible = (conditionalVisibility, formData) => {
  if (!conditionalVisibility) {
    return true;
  }
  const conditionMet = evaluateConditionalRule(conditionalVisibility, formData);
  return conditionalVisibility.action === "show" ? conditionMet : !conditionMet;
};
var isFieldRequired = (baseRequired, conditionalRequired, formData) => {
  if (!conditionalRequired) {
    return baseRequired;
  }
  const conditionMet = evaluateConditionalRule(conditionalRequired, formData);
  if (conditionalRequired.action === "require") {
    return conditionMet;
  } else if (conditionalRequired.action === "optional") {
    return !conditionMet;
  }
  return baseRequired;
};
var isFieldDisabled = (baseDisabled, conditionalDisabled, formData) => {
  if (!conditionalDisabled) {
    return baseDisabled;
  }
  const conditionMet = evaluateConditionalRule(conditionalDisabled, formData);
  if (conditionalDisabled.action === "disable") {
    return conditionMet;
  } else if (conditionalDisabled.action === "enable") {
    return !conditionMet;
  }
  return baseDisabled;
};
var getDependentFieldIds = (rule) => {
  if (!rule || !rule.dependencies) {
    return [];
  }
  return rule.dependencies.map((dep) => dep.fieldId);
};
var hasDependencies = (conditionalVisibility, conditionalRequired, conditionalDisabled) => {
  return !!(conditionalVisibility && conditionalVisibility.dependencies.length > 0 || conditionalRequired && conditionalRequired.dependencies.length > 0 || conditionalDisabled && conditionalDisabled.dependencies.length > 0);
};

// src/utils/permissionChecker.ts
var hasRequiredRoles = (userRoles, requiredRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  return requiredRoles.some((role) => userRoles.includes(role));
};
var hasRequiredPermissions = (userPermissions, requiredPermissions) => {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  return requiredPermissions.every((permission) => userPermissions[permission] === true);
};
var getFieldAccessMode = (fieldPermissions, userPermissions) => {
  if (!fieldPermissions) {
    return "edit";
  }
  const hasRoles = hasRequiredRoles(userPermissions.roles, fieldPermissions.roles);
  const hasPerms = hasRequiredPermissions(
    userPermissions.permissions,
    fieldPermissions.permissions
  );
  if (!hasRoles || !hasPerms) {
    return fieldPermissions.mode || "hidden";
  }
  return fieldPermissions.mode || "edit";
};
var isFieldAccessible = (fieldPermissions, userPermissions) => {
  const accessMode = getFieldAccessMode(fieldPermissions, userPermissions);
  return accessMode !== "hidden";
};
var isFieldReadOnly = (fieldPermissions, userPermissions) => {
  const accessMode = getFieldAccessMode(fieldPermissions, userPermissions);
  return accessMode === "view";
};
var canEditForm = (formPermissions, userPermissions) => {
  const hasRoles = hasRequiredRoles(userPermissions.roles, formPermissions.requiredRoles);
  const hasPerms = hasRequiredPermissions(
    userPermissions.permissions,
    formPermissions.requiredPermissions
  );
  return hasRoles && hasPerms;
};

// src/constants/index.ts
var FIELD_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
  TEL: "tel"
};
var VALIDATION_RULES = {
  REQUIRED: "required",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  PATTERN: "pattern",
  EMAIL: "email",
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom"
};
var DEPENDENCY_OPERATORS = {
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  CONTAINS: "contains",
  GREATER_THAN: "greaterThan",
  LESS_THAN: "lessThan",
  IS_EMPTY: "isEmpty",
  IS_NOT_EMPTY: "isNotEmpty"
};
var CONDITIONAL_ACTIONS = {
  SHOW: "show",
  HIDE: "hide",
  ENABLE: "enable",
  DISABLE: "disable",
  REQUIRE: "require",
  OPTIONAL: "optional"
};
var PERMISSION_MODES = {
  VIEW: "view",
  EDIT: "edit",
  HIDDEN: "hidden"
};
var SUBMIT_STRATEGIES = {
  FINAL_ONLY: "final-only",
  PER_STEP: "per-step"
};
var DEFAULT_AUTO_SAVE_INTERVAL = 5e3;
var DEFAULT_ASYNC_VALIDATION_DEBOUNCE = 300;

// src/index.ts
var VERSION = "0.1.0";

export { CONDITIONAL_ACTIONS, DEFAULT_ASYNC_VALIDATION_DEBOUNCE, DEFAULT_AUTO_SAVE_INTERVAL, DEPENDENCY_OPERATORS, FIELD_TYPES, PERMISSION_MODES, SUBMIT_STRATEGIES, VALIDATION_RULES, VERSION, buildValidationRules, canEditForm, evaluateConditionalRule, evaluateDependencies, evaluateDependency, extractMetadata, getDependentFieldIds, getFieldAccessMode, getFieldConfig, getStepFields, hasDependencies, hasRequiredPermissions, hasRequiredRoles, isFieldAccessible, isFieldDisabled, isFieldReadOnly, isFieldRequired, isFieldVisible, parseFormSchema, parseStep, validateSchema };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map