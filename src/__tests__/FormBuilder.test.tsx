import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormBuilder } from '../components/FormBuilder';
import { FormPreview } from '../components/FormPreview';
import { FormSchema } from '../types/form';

describe('FormBuilder', () => {
  it('renders component palette', () => {
    render(<FormBuilder />);
    const componentsHeading = screen.getByRole('heading', { name: /components/i });
    expect(componentsHeading).toBeInTheDocument();
    
    const textButton = screen.getByRole('button', { name: /text/i });
    const selectButton = screen.getByRole('button', { name: /select/i });
    const radioButton = screen.getByRole('button', { name: /radio/i });
    
    expect(textButton).toBeInTheDocument();
    expect(selectButton).toBeInTheDocument();
    expect(radioButton).toBeInTheDocument();
  });

  it('adds new components when clicked', async () => {
    const user = userEvent.setup();
    render(<FormBuilder />);
    
    const textButton = screen.getByRole('button', { name: /text/i });
    await user.click(textButton);
    
    const newField = screen.getByText('New text field');
    expect(newField).toBeInTheDocument();
  });
});

describe('FormPreview', () => {
  const mockSchema: FormSchema = {
    id: 'test-form',
    title: 'Test Form',
    components: [
      {
        id: 'text-1',
        type: 'text',
        label: 'Name',
        required: true,
      },
    ],
  };

  it('renders form components', () => {
    render(<FormPreview schema={mockSchema} />);
    const nameLabel = screen.getByText('Name');
    expect(nameLabel).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<FormPreview schema={mockSchema} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
  });
});