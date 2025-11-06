# @react-dynamic-forms/core

Core types, interfaces, and utilities for React Dynamic Forms.

## Installation

```bash
npm install @react-dynamic-forms/core
# or
pnpm add @react-dynamic-forms/core
# or
yarn add @react-dynamic-forms/core
```

## Usage

### Types

```typescript
import type { FormSchema, FieldConfig, StepConfig } from '@react-dynamic-forms/core';

const schema: FormSchema = {
  formId: 'employee-onboarding',
  formTitle: 'Employee Onboarding',
  totalSteps: 3,
  submitStrategy: 'final-only',
  autoSaveEnabled: true,
  steps: [
    // ... step configurations
  ],
};
```

### Utilities

```typescript
import {
  parseFormSchema,
  evaluateDependencies,
  isFieldVisible,
  getFieldAccessMode,
} from '@react-dynamic-forms/core/utils';

// Parse a form schema
const parsedSchema = parseFormSchema(schema);

// Evaluate field dependencies
const isVisible = isFieldVisible(field.conditionalVisibility, formData);

// Check permissions
const accessMode = getFieldAccessMode(field.permissions, userPermissions);
```

### Constants

```typescript
import {
  FIELD_TYPES,
  VALIDATION_RULES,
  DEPENDENCY_OPERATORS,
} from '@react-dynamic-forms/core';

console.log(FIELD_TYPES.TEXT); // 'text'
console.log(VALIDATION_RULES.REQUIRED); // 'required'
console.log(DEPENDENCY_OPERATORS.EQUALS); // 'equals'
```

## Features

- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Pure TypeScript with no external dependencies
- **Tree-Shakeable**: Import only what you need
- **Well-Documented**: Extensive JSDoc comments for all APIs

## API Reference

See the [main documentation](../../docs) for detailed API reference.

## License

MIT