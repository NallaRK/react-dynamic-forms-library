// src/rules/baseRules.ts
var requiredRule = (value, rule) => {
  if (value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0) {
    return rule.message || "This field is required";
  }
  return null;
};
var minLengthRule = (value, rule) => {
  if (!value) return null;
  const length = String(value).length;
  const minLength = Number(rule.value);
  if (length < minLength) {
    return rule.message || `Must be at least ${minLength} characters`;
  }
  return null;
};
var maxLengthRule = (value, rule) => {
  if (!value) return null;
  const length = String(value).length;
  const maxLength = Number(rule.value);
  if (length > maxLength) {
    return rule.message || `Must be no more than ${maxLength} characters`;
  }
  return null;
};
var emailRule = (value, rule) => {
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(value))) {
    return rule.message || "Please enter a valid email address";
  }
  return null;
};
var patternRule = (value, rule) => {
  if (!value) return null;
  const pattern = new RegExp(rule.value);
  if (!pattern.test(String(value))) {
    return rule.message || "Invalid format";
  }
  return null;
};
var minRule = (value, rule) => {
  if (value === void 0 || value === null || value === "") return null;
  const numValue = Number(value);
  const minValue = Number(rule.value);
  if (isNaN(numValue)) {
    return "Please enter a valid number";
  }
  if (numValue < minValue) {
    return rule.message || `Must be at least ${minValue}`;
  }
  return null;
};
var maxRule = (value, rule) => {
  if (value === void 0 || value === null || value === "") return null;
  const numValue = Number(value);
  const maxValue = Number(rule.value);
  if (isNaN(numValue)) {
    return "Please enter a valid number";
  }
  if (numValue > maxValue) {
    return rule.message || `Must be no more than ${maxValue}`;
  }
  return null;
};
var baseValidationRules = {
  required: requiredRule,
  minLength: minLengthRule,
  maxLength: maxLengthRule,
  email: emailRule,
  pattern: patternRule,
  min: minRule,
  max: maxRule
};

// src/engine/validationEngine.ts
var validateField = (value, fieldConfig) => {
  const errors = [];
  if (!fieldConfig.validation?.rules || fieldConfig.validation.rules.length === 0) {
    return { isValid: true, errors: [] };
  }
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
    errors
  };
};
var validateFields = (fieldValues, fieldConfigs) => {
  return fieldConfigs.map((config) => {
    const value = fieldValues[config.fieldId];
    const result = validateField(value, config);
    return {
      fieldId: config.fieldId,
      isValid: result.isValid,
      errors: result.errors
    };
  });
};
var validateStep = (stepData, fieldConfigs) => {
  const allErrors = [];
  for (const config of fieldConfigs) {
    const value = stepData[config.fieldId];
    const result = validateField(value, config);
    if (!result.isValid) {
      allErrors.push(...result.errors);
    }
  }
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};
var isFieldValid = (value, fieldConfig) => {
  const result = validateField(value, fieldConfig);
  return result.isValid;
};
var getFieldError = (value, fieldConfig) => {
  const result = validateField(value, fieldConfig);
  return result.errors[0] || null;
};
var isFieldRequired = (fieldConfig) => {
  if (fieldConfig.required) return true;
  return fieldConfig.validation?.rules?.some((rule) => rule.type === "required") ?? false;
};

// src/validators/fieldValidators.ts
var validateEmailField = (email) => {
  const emailConfig = {
    validation: {
      rules: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email" }
      ]
    }
  };
  return validateField(email, emailConfig);
};
var validatePhoneField = (phone) => {
  const phoneConfig = {
    validation: {
      rules: [
        {
          type: "pattern",
          value: "^[0-9]{10}$|^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$",
          message: "Please enter a valid phone number"
        }
      ]
    }
  };
  return validateField(phone, phoneConfig);
};
var validatePasswordField = (password) => {
  const passwordConfig = {
    validation: {
      rules: [
        { type: "required", message: "Password is required" },
        { type: "minLength", value: 8, message: "Password must be at least 8 characters" }
      ]
    }
  };
  return validateField(password, passwordConfig);
};
var validateNumberRange = (value, min, max) => {
  const numberConfig = {
    validation: {
      rules: [
        { type: "min", value: min, message: `Must be at least ${min}` },
        { type: "max", value: max, message: `Must be no more than ${max}` }
      ]
    }
  };
  return validateField(value, numberConfig);
};
var validateRequiredText = (text, fieldName = "Field") => {
  const textConfig = {
    validation: {
      rules: [
        { type: "required", message: `${fieldName} is required` }
      ]
    }
  };
  return validateField(text, textConfig);
};

// src/index.ts
var VERSION = "0.1.0";

export { VERSION, baseValidationRules, emailRule, getFieldError, isFieldRequired, isFieldValid, maxLengthRule, maxRule, minLengthRule, minRule, patternRule, requiredRule, validateEmailField, validateField, validateFields, validateNumberRange, validatePasswordField, validatePhoneField, validateRequiredText, validateStep };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map