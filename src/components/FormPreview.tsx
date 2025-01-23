import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { FormSchema } from '../types/form';
import { FormComponentRenderer } from './FormComponents';

interface FormPreviewProps {
  schema: FormSchema;
}

export const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const validationSchema = z.object(
      schema.components.reduce((acc, component) => {
        let fieldSchema = z.string();
        if (component.required) {
          fieldSchema = fieldSchema.min(1, 'This field is required');
        }
        return { ...acc, [component.id]: fieldSchema };
      }, {})
    );

    try {
      validationSchema.parse(formData);
      setErrors({});
      console.log('Form submitted:', formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0].toString();
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  }, [schema, formData]);

  const handleChange = useCallback((id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{schema.title}</h2>
      <form onSubmit={handleSubmit}>
        {schema.components.map((component) => (
          <FormComponentRenderer
            key={component.id}
            component={component}
            value={formData[component.id]}
            onChange={(value) => handleChange(component.id, value)}
            error={errors[component.id]}
          />
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};