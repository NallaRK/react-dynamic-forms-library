# @react-dynamic-forms/validators

Validation engine and rules for React Dynamic Forms.

## Installation

```bash
npm install @react-dynamic-forms/validators @react-dynamic-forms/core
# or
pnpm add @react-dynamic-forms/validators @react-dynamic-forms/core
# or
yarn add @react-dynamic-forms/validators @react-dynamic-forms/core
```

## Features

- 🎯 **Built-in Validation Rules**: Required, min/max length, email, pattern, number ranges
- 🔧 **Validation Engine**: Core validation logic for form fields
- 🎨 **Field-specific Validators**: Convenience validators for common field types
- 📦 **Type-safe**: Full TypeScript support
- 🌳 **Tree-shakeable**: Import only what you need

## Usage

### Basic Validation

```typescript
import { validateField } from '@react-dynamic-forms/validators';
import type { FieldConfig } from '@react-dynamic-forms/core';

const emailField: FieldConfig = {
  fieldId: 'email',
  fieldType: 'email',
  label: 'Email Address',
  validation: {
    rules: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email' },
    ],
  },
};

const result = validateField('user@example.com', emailField);

if (!result.isValid) {
  console.log(result.errors); // Array of error messages
}
```

### Built-in Validation Rules

```typescript
import { baseValidationRules } from '@react-dynamic-forms/validators';

// Available rules:
// - required: Field must have a value
// - minLength: Minimum string length
// - maxLength: Maximum string length
// - email: Valid email format
// - pattern: Custom regex pattern
// - min: Minimum numeric value
// - max: Maximum numeric value
```

### Convenience Validators

```typescript
import {
  validateEmailField,
  validatePhoneField,
  validatePasswordField,
  validateNumberRange,
  validateRequiredText,
} from '@react-dynamic-forms/validators';

// Validate email
const emailResult = validateEmailField('user@example.com');

// Validate phone
const phoneResult = validatePhoneField('(555) 123-4567');

// Validate password (min 8 chars)
const passwordResult = validatePasswordField('myPassword123');

// Validate number in range
const numberResult = validateNumberRange(42, 1, 100);

// Validate required text
const textResult = validateRequiredText('Some text', 'First Name');
```

### Validating Multiple Fields

```typescript
import { validateFields, validateStep } from '@react-dynamic-forms/validators';

// Validate multiple fields
const results = validateFields({ email: 'test@example.com', phone: '5551234567' }, [
  emailFieldConfig,
  phoneFieldConfig,
]);

// Validate all fields in a step
const stepResult = validateStep({ email: 'test@example.com', name: 'John' }, stepFieldConfigs);

console.log(stepResult.isValid);
console.log(stepResult.errors);
```

### Custom Validation Rules

You can create custom validation rules:

```typescript
import type { ValidationRule } from '@react-dynamic-forms/core';

const customRule = (value: any, rule: ValidationRule): string | null => {
  // Your validation logic
  if (/* validation fails */) {
    return rule.message || 'Validation failed';
  }
  return null;
};
```

## API Reference

### Validation Engine

#### `validateField(value: any, fieldConfig: FieldConfig): ValidationResult`

Validates a single field value against its configuration.

**Returns:**

```typescript
{
  isValid: boolean;
  errors: string[];
}
```

#### `validateFields(fieldValues: Record<string, any>, fieldConfigs: FieldConfig[]): FieldValidationResult[]`

Validates multiple fields at once.

#### `validateStep(stepData: Record<string, any>, fieldConfigs: FieldConfig[]): ValidationResult`

Validates all fields in a step.

#### `isFieldValid(value: any, fieldConfig: FieldConfig): boolean`

Checks if a field value is valid.

#### `getFieldError(value: any, fieldConfig: FieldConfig): string | null`

Gets the first error message for a field, or null if valid.

#### `isFieldRequired(fieldConfig: FieldConfig): boolean`

Checks if a field is required.

### Validation Rules

All validation rules follow this signature:

```typescript
(value: any, rule: ValidationRule) => string | null;
```

Returns `null` if validation passes, or an error message string if it fails.

#### Available Rules

- `requiredRule`: Checks if field has a value
- `minLengthRule`: Checks minimum string length
- `maxLengthRule`: Checks maximum string length
- `emailRule`: Validates email format
- `patternRule`: Validates against regex pattern
- `minRule`: Validates minimum numeric value
- `maxRule`: Validates maximum numeric value

## TypeScript Support

This package is written in TypeScript and provides full type definitions:

```typescript
import type { ValidationResult, FieldValidationResult } from '@react-dynamic-forms/validators';

import type { FieldConfig, ValidationRule } from '@react-dynamic-forms/core';
```

## Examples

### Form Field with Multiple Rules

```typescript
const passwordField: FieldConfig = {
  fieldId: 'password',
  fieldType: 'text',
  label: 'Password',
  validation: {
    rules: [
      {
        type: 'required',
        message: 'Password is required',
      },
      {
        type: 'minLength',
        value: 8,
        message: 'Password must be at least 8 characters',
      },
      {
        type: 'pattern',
        value: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])',
        message: 'Password must contain uppercase, lowercase, and numbers',
      },
    ],
  },
};

const result = validateField('MyPass123', passwordField);
```

### Async Form Validation

```typescript
async function validateForm(formData: Record<string, any>, schema: FormSchema) {
  const allErrors: string[] = [];

  for (const step of schema.steps) {
    const stepResult = validateStep(formData[step.stepId], step.fields);

    if (!stepResult.isValid) {
      allErrors.push(...stepResult.errors);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}
```

## License

MIT

## See Also

- [@react-dynamic-forms/core](../core) - Core types and utilities
- [Main Documentation](../../README.md) - Full library documentation
