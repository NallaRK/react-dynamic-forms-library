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
import { FIELD_TYPES, VALIDATION_RULES, DEPENDENCY_OPERATORS } from '@react-dynamic-forms/core';

console.log(FIELD_TYPES.TEXT); // 'text'
console.log(VALIDATION_RULES.REQUIRED); // 'required'
console.log(DEPENDENCY_OPERATORS.EQUALS); // 'equals'
```

## Features

- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Pure TypeScript with no external dependencies
- **Tree-Shakeable**: Import only what you need
- **Well-Documented**: Extensive JSDoc comments for all APIs

## Detailed Examples

### Conditional Field Visibility

```typescript
import { isFieldVisible } from '@react-dynamic-forms/core/utils';
import type { FieldConfig } from '@react-dynamic-forms/core';

const conditionalField: FieldConfig = {
  fieldId: 'companyName',
  fieldType: 'text',
  label: 'Company Name',
  conditionalVisibility: {
    dependencies: [{ fieldId: 'employmentStatus', operator: 'equals', value: 'employed' }],
    action: 'show',
  },
};

const formData = { employmentStatus: 'employed' };
const visible = isFieldVisible(conditionalField.conditionalVisibility, formData);
```

### Permission-Based Access Control

```typescript
import { getFieldAccessMode, canEditForm } from '@react-dynamic-forms/core/utils';
import type { UserPermissions } from '@react-dynamic-forms/core';

const userPermissions: UserPermissions = {
  roles: ['editor'],
  permissions: { 'form:edit': true },
};

const fieldPermissions = {
  roles: ['admin', 'editor'],
  mode: 'edit' as const,
};

const accessMode = getFieldAccessMode(fieldPermissions, userPermissions); // 'edit'
const canEdit = canEditForm({ requiredRoles: ['editor'] }, userPermissions); // true
```

### Multi-Level Dependencies

```typescript
// Field shown only if: employed AND hasManager
const advancedField: FieldConfig = {
  fieldId: 'managerEmail',
  fieldType: 'email',
  label: 'Manager Email',
  conditionalVisibility: {
    dependencies: [
      { fieldId: 'employmentStatus', operator: 'equals', value: 'employed' },
      { fieldId: 'hasManager', operator: 'equals', value: true, logicType: 'AND' },
    ],
    action: 'show',
  },
};
```

## API Reference

See the [main documentation](../../docs) for detailed API reference.

## License

MIT
