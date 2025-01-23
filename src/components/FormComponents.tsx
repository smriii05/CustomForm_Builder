import React, { memo } from 'react';
import { FormComponent } from '../types/form';

interface FormComponentProps {
  component: FormComponent;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const TextInput = memo(({ component, value, onChange, error }: FormComponentProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{component.label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={component.placeholder}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));

const SelectInput = memo(({ component, value, onChange, error }: FormComponentProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{component.label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        error ? 'border-red-500' : ''
      }`}
    >
      <option value="">Select an option</option>
      {component.options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));

const RadioInput = memo(({ component, value, onChange, error }: FormComponentProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{component.label}</label>
    <div className="mt-2 space-y-2">
      {component.options?.map((option) => (
        <div key={option} className="flex items-center">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">{option}</label>
        </div>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));

export const FormComponentRenderer = memo(({ component, ...props }: FormComponentProps) => {
  switch (component.type) {
    case 'text':
      return <TextInput component={component} {...props} />;
    case 'select':
      return <SelectInput component={component} {...props} />;
    case 'radio':
      return <RadioInput component={component} {...props} />;
    default:
      return null;
  }
});