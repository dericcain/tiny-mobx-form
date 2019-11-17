import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Form, Field, useForm, useField, ErrorField } from '../src';
import { IFormSchema, Form as TinyMobxForm } from 'tiny-mobx-form';

describe('React Bindings', () => {
  const mockSubmit = jest.fn();
  const onSubmit = () =>  {
    mockSubmit();
  };
  const renderForm = (
    fields: IFormSchema[],
    el: React.ReactNode | null = null,
    submit: () => void = onSubmit,
  ) =>
    render(
      <Form fields={fields} submit={submit} data-testid="form">
        <Field name="name">
          {({ input, label }) => (
            <div>
              <label>{label}</label>
              <input {...input} data-testid="name" />
              <ErrorField name="name" data-testid="name-errors" />
            </div>
          )}
        </Field>
        <Field name="email">
          {({ input, label }) => (
            <div>
              <label>{label}</label>
              <input {...input} data-testid="email" />
              <ErrorField name="email" data-testid="email-errors" />
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
      const Button = () => <button type="submit">Submit</button>;
      const { getByTestId } = renderForm(schema, <Button />);
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

      userEvent.type(name, 'John David');
      userEvent.type(email, 'john@email.com');

      const form = getByTestId('form');

      fireEvent.submit(form);
      expect(mockSubmit).toHaveBeenCalled;
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
