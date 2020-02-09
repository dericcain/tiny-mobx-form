export interface IField {
  form: IForm;
  name: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  value?: string;
  isFocused: boolean;
  isTouched: boolean;
  validation: string;
  isValid: boolean;
  isDirty: boolean;
  hasErrors: boolean;
  errors: string[];
  reset(): void;
}

export interface IFormSchema {
  name: string;
  label?: string;
  placeholder?: string;
  validation?: string;
  validationMessages?: IValidatorMessage;
  initialValue?: string;
}

export interface IForm {
  fields: IFields;
  isValid: boolean;
  errors: string[];
  isDirty: boolean;
  values: IValues;
  showErrors(): void;
  reset(): void;
}

export interface IFields {
  [key: string]: IField;
}

export interface IValues {
  [key: string]: string;
}

export interface IInitialValues {
  [key: string]: string;
}

export interface IValidators {
  [name: string]: IValidator;
}

export interface IValidator {
  (field: IField, message: string, ...args: any[]): undefined | string;
}

// FIXME: This creates a compilation error of:
//  Type '{ name: string; label: string; placeholder: string; validation: string; validationMessages:
//  { email?: undefined; }; }' is not assignable to type 'IFormSchema'. Types of property
//  'validationMessages' are incompatible. Type '{ email?: undefined; }' is not assignable to
//  type 'IValidatorMessage'. Property 'email' is incompatible with index signature. Type
//  'undefined' is not assignable to type 'string'.
export type IValidatorMessage = {
  [key: string]: string;
} | any;

export interface IFormOptions {
  additionalValidators?: IValidators;
}

export interface IFieldOptions extends Required<IFormOptions> {}
