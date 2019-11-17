import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form, Field, useForm, useField } from '../src';
import { Form as TinyMobxForm, IFormSchema } from 'tiny-mobx-form';

describe('React Bindings', () => {
  const renderForm = (fields: IFormSchema[], el: React.ReactNode | null = null) =>
    render(
      <Form fields={fields}>
        <Field name="name">
          {({ input, label, errors, hasErrors }) => (
            <div>
              <label>{label}</label>
              <input {...input} data-testid="name" />
              <span data-testid="name-errors">{hasErrors && errors.join(' ')}</span>
            </div>
          )}
        </Field>
        <Field name="email">
          {({ input, label, errors, hasErrors }) => (
            <div>
              <label>{label}</label>
              <input {...input} data-testid="email" />
              <span data-testid="email-errors">{hasErrors && errors.join(' ')}</span>
            </div>
          )}
        </Field>
        {el}
      </Form>,
    );

  describe('Form', () => {
    const schema: IFormSchema[] = [
      {
        name: 'name',
        label: 'name',
        placeholder: 'name',
        initialValue: '',
        validation: 'required|letters',
      },
      {
        name: 'email',
        label: 'email',
        placeholder: 'email',
        initialValue: '',
        validation: 'required|email',
      },
    ];

    it('should render a form and update field values', () => {
      const { getByTestId } = renderForm(schema);
      const name = getByTestId('name');
      const email = getByTestId('email');

      expect(name).toHaveAttribute('id', 'name');
      expect(email).toHaveAttribute('id', 'email');
      expect(email).toHaveAttribute('name', 'email');
      expect(name).toHaveAttribute('name', 'name');
      expect(name).toHaveAttribute('value', '');
      expect(email).toHaveAttribute('value', '');

      const typedName = 'jon';
      const typedEmail = 'jon@email.com';
      userEvent.type(name, typedName);
      userEvent.type(email, typedEmail);

      expect(name).toHaveAttribute('value', typedName);
      expect(email).toHaveAttribute('value', typedEmail);

      userEvent.type(name, '1');
      userEvent.type(email, '1');

      const nameErrors = getByTestId('name-errors');
      const emailErrors = getByTestId('email-errors');
      expect(nameErrors).toHaveTextContent(/letters/i);
      expect(emailErrors).toHaveTextContent(/email/i);
    });
  });

  describe('hooks', () => {
    const schema: IFormSchema[] = [
      {
        name: 'name',
        label: 'name',
        placeholder: 'name',
        initialValue: '',
        validation: 'required',
      },
      {
        name: 'email',
        label: 'email',
        placeholder: 'email',
        initialValue: '',
        validation: 'required',
      },
    ];

    it('should return the form', () => {
      const form = useForm({ fields: schema });
      expect(form).toBeInstanceOf(TinyMobxForm);
    });

    it('should return the field', () => {
      function TestForm() {
        const field = useField('name');
        return <div data-testid={field.name}>here</div>;
      }
      const { getByText } = renderForm(schema, <TestForm />);
      getByText(/here/i);
    });
  });
});
