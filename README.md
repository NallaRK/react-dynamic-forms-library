# React Dynamic Forms Library

<div align="center">

A modular, UI-agnostic dynamic form system with powerful validation and state management.

[![CI](https://github.com/yourusername/react-dynamic-forms-library/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/react-dynamic-forms-library/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

[Documentation](#documentation) • [Features](#features) • [Quick Start](#quick-start) • [Packages](#packages)

</div>

---

## 🌟 Features

- 🎯 **UI Framework Agnostic** - Core logic independent of any UI library
- 🧩 **Modular Architecture** - Import only what you need
- 🎨 **Multiple UI Implementations** - Material-UI, Ant Design, Headless, and more
- 🔒 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 📦 **Tree-Shakeable** - Optimized bundle size with proper tree-shaking
- 🔄 **Flexible State Management** - Support for Redux, Context API, or custom solutions
- ✅ **Powerful Validation** - Built-in validation engine with custom rules
- 🎭 **Conditional Logic** - Dynamic field visibility and requirements
- 👥 **Role-Based Permissions** - Field-level access control
- 💾 **Auto-Save & Drafts** - Built-in draft management
- 📱 **Multi-Step Forms** - Complete step navigation system
- 🔁 **Repeatable Sections** - Dynamic field arrays
- 📤 **File Uploads** - File handling support
- ⚡ **Performance Optimized** - Efficient rendering and validation

## 📦 Packages

This monorepo contains multiple packages for different use cases:

### Core Packages

| Package                                                    | Version | Description                                   |
| ---------------------------------------------------------- | ------- | --------------------------------------------- |
| [`@react-dynamic-forms/core`](./packages/core)             | `0.1.0` | Core types and utilities (no UI dependencies) |
| [`@react-dynamic-forms/validators`](./packages/validators) | `0.1.0` | Validation engine and rules                   |

### UI Packages (Coming Soon)

| Package                         | Status     | Description                     |
| ------------------------------- | ---------- | ------------------------------- |
| `@react-dynamic-forms/mui`      | 🔄 Planned | Material-UI components          |
| `@react-dynamic-forms/antd`     | 🔄 Planned | Ant Design components           |
| `@react-dynamic-forms/headless` | 🔄 Planned | Unstyled, accessible components |

### Integration Packages (Coming Soon)

| Package                                | Status     | Description               |
| -------------------------------------- | ---------- | ------------------------- |
| `@react-dynamic-forms/rtk-integration` | 🔄 Planned | Redux Toolkit integration |
| `@react-dynamic-forms/server`          | 🔄 Planned | Server-side utilities     |
| `@react-dynamic-forms/devtools`        | 🔄 Planned | Development tools         |

## 🚀 Quick Start

### Installation

```bash
# Install core packages
npm install @react-dynamic-forms/core @react-dynamic-forms/validators

# Or with pnpm
pnpm add @react-dynamic-forms/core @react-dynamic-forms/validators

# Or with yarn
yarn add @react-dynamic-forms/core @react-dynamic-forms/validators
```

### Basic Usage

```typescript
import { parseFormSchema, type FormSchema } from '@react-dynamic-forms/core';
import { validateField } from '@react-dynamic-forms/validators';

// Define your form schema
const schema: FormSchema = {
  formId: 'contact-form',
  formTitle: 'Contact Form',
  totalSteps: 1,
  submitStrategy: 'final-only',
  autoSaveEnabled: false,
  steps: [
    {
      stepId: 1,
      stepTitle: 'Contact Information',
      fields: [
        {
          fieldId: 'name',
          fieldType: 'text',
          label: 'Full Name',
          required: true,
          validation: {
            rules: [
              { type: 'required', message: 'Name is required' },
              { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
            ],
          },
        },
        {
          fieldId: 'email',
          fieldType: 'email',
          label: 'Email Address',
          required: true,
          validation: {
            rules: [
              { type: 'required', message: 'Email is required' },
              { type: 'email', message: 'Please enter a valid email' },
            ],
          },
        },
      ],
    },
  ],
};

// Parse and validate
const parsedSchema = parseFormSchema(schema);

// Validate a field
const nameField = schema.steps[0].fields[0];
const result = validateField('John Doe', nameField);

if (result.isValid) {
  console.log('✅ Valid!');
} else {
  console.log('❌ Errors:', result.errors);
}
```

## 📖 Documentation

### Core Concepts

#### 1. Form Schema

Define your forms using JSON schemas:

```typescript
const schema: FormSchema = {
  formId: 'user-registration',
  formTitle: 'User Registration',
  totalSteps: 3,
  submitStrategy: 'final-only',
  autoSaveEnabled: true,
  autoSaveInterval: 5000,
  steps: [
    // Step configurations
  ],
};
```

#### 2. Field Configuration

Each field supports comprehensive configuration:

```typescript
{
  fieldId: 'email',
  fieldType: 'email',
  label: 'Email Address',
  required: true,
  placeholder: 'john@example.com',
  helperText: 'We will never share your email',
  validation: {
    rules: [
      { type: 'required', message: 'Required' },
      { type: 'email', message: 'Invalid email' }
    ]
  },
  // Conditional visibility
  conditionalVisibility: {
    dependencies: [
      { fieldId: 'hasEmail', operator: 'equals', value: true }
    ],
    action: 'show'
  }
}
```

#### 3. Validation

Built-in validation with custom rules:

```typescript
import { validateField, validateStep } from '@react-dynamic-forms/validators';

// Validate single field
const result = validateField(value, fieldConfig);

// Validate entire step
const stepResult = validateStep(stepData, stepFields);
```

#### 4. Conditional Logic

Dynamic field behavior based on other fields:

```typescript
{
  fieldId: 'details',
  // ... other config
  conditionalVisibility: {
    dependencies: [
      { fieldId: 'type', operator: 'equals', value: 'custom' }
    ],
    action: 'show'
  },
  conditionalRequired: {
    dependencies: [
      { fieldId: 'mandatory', operator: 'equals', value: true }
    ],
    action: 'require'
  }
}
```

#### 5. Permissions

Role-based field access control:

```typescript
{
  fieldId: 'adminNote',
  // ... other config
  permissions: {
    roles: ['admin', 'manager'],
    mode: 'edit' // or 'view' or 'hidden'
  }
}
```

## 🏗️ Architecture

### Monorepo Structure

```
react-dynamic-forms-library/
├── packages/
│   ├── core/              # Core types & utilities
│   ├── validators/        # Validation engine
│   ├── mui/              # Material-UI components (planned)
│   ├── antd/             # Ant Design components (planned)
│   ├── headless/         # Unstyled components (planned)
│   ├── rtk-integration/  # Redux integration (planned)
│   ├── server/           # Server utilities (planned)
│   └── devtools/         # Dev tools (planned)
├── examples/
│   ├── basic/            # Basic examples (planned)
│   ├── multi-step/       # Multi-step forms (planned)
│   └── custom-ui/        # Custom UI examples (planned)
└── docs/                 # Documentation
```

### Package Dependencies

```
@react-dynamic-forms/core (no dependencies)
  ↓
@react-dynamic-forms/validators
  ↓
@react-dynamic-forms/mui (planned)
@react-dynamic-forms/antd (planned)
@react-dynamic-forms/headless (planned)
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/react-dynamic-forms-library.git
cd react-dynamic-forms-library

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Working with Packages

```bash
# Build specific package
pnpm --filter @react-dynamic-forms/core build

# Watch mode for development
pnpm --filter @react-dynamic-forms/core dev

# Run tests for specific package
pnpm --filter @react-dynamic-forms/validators test
```

## 📝 Examples

### Simple Contact Form

```typescript
const contactSchema: FormSchema = {
  formId: 'contact',
  formTitle: 'Contact Us',
  totalSteps: 1,
  submitStrategy: 'final-only',
  autoSaveEnabled: false,
  steps: [
    {
      stepId: 1,
      stepTitle: 'Your Information',
      fields: [
        { fieldId: 'name', fieldType: 'text', label: 'Name', required: true },
        { fieldId: 'email', fieldType: 'email', label: 'Email', required: true },
        { fieldId: 'message', fieldType: 'textarea', label: 'Message', required: true },
      ],
    },
  ],
};
```

### Multi-Step Registration

```typescript
const registrationSchema: FormSchema = {
  formId: 'registration',
  formTitle: 'User Registration',
  totalSteps: 3,
  submitStrategy: 'final-only',
  autoSaveEnabled: true,
  steps: [
    {
      stepId: 1,
      stepTitle: 'Account',
      fields: [
        /* account fields */
      ],
    },
    {
      stepId: 2,
      stepTitle: 'Profile',
      fields: [
        /* profile fields */
      ],
    },
    {
      stepId: 3,
      stepTitle: 'Preferences',
      fields: [
        /* preference fields */
      ],
    },
  ],
};
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## 📜 License

MIT © [Your Name]

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`pnpm test`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 🗺️ Roadmap

### Phase 1: Foundation ✅

- [x] Core package with types and utilities
- [x] Validators package with validation engine
- [x] Monorepo infrastructure
- [x] CI/CD pipeline

### Phase 2: React Integration (In Progress)

- [ ] React hooks package
- [ ] Redux Toolkit integration
- [ ] Context API integration

### Phase 3: UI Implementations (Planned)

- [ ] Material-UI components
- [ ] Ant Design components
- [ ] Headless components
- [ ] Chakra UI components

### Phase 4: Advanced Features (Planned)

- [ ] File upload handling
- [ ] Async validation
- [ ] Dynamic options loading
- [ ] Server-side rendering support

### Phase 5: Developer Experience (Planned)

- [ ] Visual form builder
- [ ] DevTools extension
- [ ] Code generation
- [ ] Documentation site

## 📞 Support

- 📧 Email: support@example.com
- 💬 GitHub Discussions: [Discussions](https://github.com/yourusername/react-dynamic-forms-library/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/react-dynamic-forms-library/issues)

## 🙏 Acknowledgments

- Inspired by various form libraries in the React ecosystem
- Built with modern tools: TypeScript, Vitest, tsup, Changesets

---

<div align="center">

Made with ❤️ by [Your Name]

[⬆ back to top](#react-dynamic-forms-library)

</div>
