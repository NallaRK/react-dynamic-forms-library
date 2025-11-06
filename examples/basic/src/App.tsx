import React, { useState } from 'react';
import type { FormSchema } from '@react-dynamic-forms/core';
import { parseFormSchema } from '@react-dynamic-forms/core';
import { validateField, validateStep } from '@react-dynamic-forms/validators';
import './App.css';

// Define a simple contact form schema
const contactFormSchema: FormSchema = {
  formId: 'contact-form',
  formTitle: 'Contact Us',
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
          placeholder: 'John Doe',
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
          placeholder: 'john@example.com',
          validation: {
            rules: [
              { type: 'required', message: 'Email is required' },
              { type: 'email', message: 'Please enter a valid email address' },
            ],
          },
        },
        {
          fieldId: 'phone',
          fieldType: 'tel',
          label: 'Phone Number',
          placeholder: '(555) 123-4567',
          helperText: 'Optional',
        },
        {
          fieldId: 'subject',
          fieldType: 'select',
          label: 'Subject',
          required: true,
          options: [
            { value: '', label: 'Select a subject' },
            { value: 'general', label: 'General Inquiry' },
            { value: 'support', label: 'Technical Support' },
            { value: 'sales', label: 'Sales Question' },
          ],
          validation: {
            rules: [{ type: 'required', message: 'Please select a subject' }],
          },
        },
        {
          fieldId: 'message',
          fieldType: 'textarea',
          label: 'Message',
          required: true,
          placeholder: 'Tell us what you need...',
          validation: {
            rules: [
              { type: 'required', message: 'Message is required' },
              { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' },
            ],
          },
        },
      ],
    },
  ],
};

function App() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const parsedSchema = parseFormSchema(contactFormSchema);
  const currentStep = parsedSchema.steps[0];

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // Validate field on change
    const field = currentStep.fields.find((f) => f.fieldId === fieldId);
    if (field) {
      const result = validateField(value, field);
      setErrors((prev) => ({
        ...prev,
        [fieldId]: result.errors,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const stepResult = validateStep(formData, currentStep.fields);

    if (stepResult.isValid) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    } else {
      // Set errors for all fields
      const newErrors: Record<string, string[]> = {};
      currentStep.fields.forEach((field) => {
        const result = validateField(formData[field.fieldId], field);
        if (!result.isValid) {
          newErrors[field.fieldId] = result.errors;
        }
      });
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="success-message">
          <h2>✅ Thank You!</h2>
          <p>Your message has been received. We&apos;ll get back to you soon!</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({});
              setErrors({});
            }}
          >
            Submit Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{parsedSchema.metadata.formTitle}</h1>
        <p className="subtitle">Basic example using @react-dynamic-forms</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <h2>{currentStep.stepTitle}</h2>

        {currentStep.fields.map((field) => {
          const fieldError = errors[field.fieldId]?.[0];
          const value = formData[field.fieldId] || '';

          return (
            <div key={field.fieldId} className="field-group">
              <label htmlFor={field.fieldId}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>

              {field.fieldType === 'textarea' ? (
                <textarea
                  id={field.fieldId}
                  value={value}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={fieldError ? 'error' : ''}
                />
              ) : field.fieldType === 'select' ? (
                <select
                  id={field.fieldId}
                  value={value}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  className={fieldError ? 'error' : ''}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.fieldId}
                  type={field.fieldType}
                  value={value}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder}
                  className={fieldError ? 'error' : ''}
                />
              )}

              {field.helperText && !fieldError && <p className="helper-text">{field.helperText}</p>}

              {fieldError && <p className="error-text">{fieldError}</p>}
            </div>
          );
        })}

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      <div className="info">
        <h3>About This Example</h3>
        <p>
          This basic example demonstrates the core functionality of the React Dynamic Forms library:
        </p>
        <ul>
          <li>✅ Schema-based form definition</li>
          <li>✅ Real-time validation</li>
          <li>✅ Field-level error handling</li>
          <li>✅ Multiple field types (text, email, select, textarea)</li>
          <li>✅ Required field validation</li>
          <li>✅ Custom validation rules (minLength, email format)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
