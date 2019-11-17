import React from 'react';
import { Form as FormModel, IFormOptions, IFormSchema, IInitialValues } from 'tiny-mobx-form';
import { FormContext } from './form-context';

interface Submit {
  (values: any, errors: string[]): void;
}

export interface FormProps {
  fields: IFormSchema[];
  initialValues?: IInitialValues;
  options?: IFormOptions;
  children: React.ReactNode;
  submit: Submit;
}

export const Form: React.FC<FormProps> = ({
  fields,
  initialValues = {},
  options = {},
  submit,
  children,
  ...props
}) => {
  const form = new FormModel(fields, initialValues, options);
  const value = { form };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.isValid) {
      submit(form.values, form.errors);
    } else {
      form.showErrors();
    }
  }
  return (
    <FormContext.Provider value={value}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
