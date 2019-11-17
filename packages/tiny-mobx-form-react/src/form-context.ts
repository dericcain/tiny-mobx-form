import { createContext } from 'react';
import { IForm } from 'tiny-mobx-form';

interface FormContextValue {
  form: IForm;
}

export const FormContext = createContext({} as FormContextValue);
