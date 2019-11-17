import React from 'react';
import { Form as FormModel, IFormOptions, IFormSchema, IInitialValues } from 'tiny-mobx-form';
import { FormContext } from './form-context';

export interface FormProps {
  fields: IFormSchema[];
  initialValues?: IInitialValues;
  options?: IFormOptions;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
  fields,
  initialValues = {},
  options = {},
  children,
}) => {
  const form = new FormModel(fields, initialValues, options);
  const value = { form };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
