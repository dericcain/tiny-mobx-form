import { useContext } from 'react';
import { Form, IField, IForm, IFormOptions, IFormSchema, IInitialValues } from 'tiny-mobx-form';

import { FormContext } from './form-context';

interface UseForm {
  fields: IFormSchema[];
  initialValues?: IInitialValues;
  options?: IFormOptions;
}

export function useForm({ fields, initialValues = {}, options = {} }: UseForm): IForm {
  // TODO: Should this be a ref?
  return new Form(fields, initialValues, options);
}

export function useField(fieldName: string): IField {
  const { form } = useContext(FormContext);
  if (!(fieldName in form.fields)) {
    throw Error(`There is no field named ${fieldName}`);
  }
  return form.fields[fieldName];
}
