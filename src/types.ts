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

export interface IValidatorMessage {
  [validatorName: string]: string;
}

export interface IFormOptions {
  additionalValidators?: IValidators;
  validatorMessages?: IValidatorMessage;
}

export interface IFieldOptions extends Required<IFormOptions> {}
