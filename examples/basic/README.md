# Basic Example

A simple contact form demonstrating the core features of React Dynamic Forms library.

## Features Demonstrated

- ✅ Schema-based form definition
- ✅ Real-time validation
- ✅ Field-level error handling
- ✅ Multiple field types (text, email, tel, select, textarea)
- ✅ Required field validation
- ✅ Custom validation rules (minLength, email format)
- ✅ Form submission handling

## Running the Example

```bash
# From the example directory
pnpm install
pnpm dev

# Or from the root directory
pnpm --filter basic-example dev
```

The example will open at [http://localhost:3000](http://localhost:3000)

## Code Structure

- `src/App.tsx` - Main application with form implementation
- `src/main.tsx` - Application entry point
- `index.html` - HTML template
- `src/App.css` - Styling
- `src/index.css` - Global styles

## What This Example Shows

### 1. Form Schema Definition

The form is defined using a JSON schema:

```typescript
const contactFormSchema: FormSchema = {
  formId: 'contact-form',
  formTitle: 'Contact Us',
  totalSteps: 1,
  submitStrategy: 'final-only',
  autoSaveEnabled: false,
  steps: [
    /* step configurations */
  ],
};
```

### 2. Field Validation

Each field can have multiple validation rules:

```typescript
{
  fieldId: 'email',
  fieldType: 'email',
  label: 'Email Address',
  required: true,
  validation: {
    rules: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ]
  }
}
```

### 3. Real-time Validation

Validation happens on field change:

```typescript
const handleFieldChange = (fieldId: string, value: any) => {
  setFormData((prev) => ({ ...prev, [fieldId]: value }));

  const field = currentStep.fields.find((f) => f.fieldId === fieldId);
  if (field) {
    const result = validateField(value, field);
    setErrors((prev) => ({ ...prev, [fieldId]: result.errors }));
  }
};
```

### 4. Form Submission

Complete form validation on submit:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const stepResult = validateStep(formData, currentStep.fields);

  if (stepResult.isValid) {
    // Process form submission
  } else {
    // Display errors
  }
};
```

## Next Steps

- Check out the [multi-step example](../multi-step) for advanced navigation
- See the [custom-ui example](../custom-ui) for custom component styling
- Read the [documentation](../../README.md) for more features

## Dependencies

- `@react-dynamic-forms/core` - Core types and utilities
- `@react-dynamic-forms/validators` - Validation engine
- `react` & `react-dom` - React framework
- `vite` - Development server and build tool
