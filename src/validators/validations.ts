import { IField, IValidator } from '../types';

interface IsError {
  (isError: boolean, message: string): string | undefined;
}
type Label = string | undefined;

const error: IsError = (isError, message = '') => (isError ? message : undefined);

export const MESSAGES = {
  required: () => `This field is required.`,
  requiredIf: (dependentLabel: Label, label: Label) =>
    `The ${dependentLabel} field is required since the ${label} field is filled out.`,
  length: (min: string, max: string) =>
    `Must be at least ${min} and no more than ${max} characters`,
  match: (label: Label, matchingLabel: Label) => `The ${label} and ${matchingLabel} do not match.`,
  letters: () => `Please enter letters only.`,
  email: () => `Please enter a valid email address.`,
  phone: () => `Please enter a valid phone number.`,
  postal: () => `Please enter a valid postal number.`,
  number: () => `Please enter a valid number.`,
  alpha: () => `Please do not use special characters.`,
  size: (min: string, max: string) => `Please enter a number between ${min} and ${max}.`,
  oneOf: (pool: string[]) => `Please choose one of these choices: ${pool.join(', ')}`,
};

export const required: IValidator = (field, message) =>
  error(!field.value, message || MESSAGES.required());

export const requiredIf: IValidator = (field, message, dependentFieldName) => {
  return error(
    !(!!field.value && !!field.form.fields[dependentFieldName]),
    message || MESSAGES.requiredIf(field.form.fields[dependentFieldName].label, field.label),
  );
};

export const length: IValidator = (
  field: IField,
  message,
  min: number = 0,
  max: number = Infinity,
) =>
  error(
    !(!!field.value && field.value.length >= Number(min) && field.value.length <= Number(max)),
    message || MESSAGES.length(min.toString(10), max.toString(10)),
  );

export const match: IValidator = (field, message, matchingFieldName: string) =>
  error(
    field.value !== field.form.fields[matchingFieldName].value,
    message || MESSAGES.match(field.label, field.form.fields[matchingFieldName].label),
  );

const LETTERS: RegExp = /^[a-zA-Z\s]*$/;
export const letters: IValidator = ({ value }, message) =>
  error(!!value && !LETTERS.test(value), message || MESSAGES.letters());

const EMAIL: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const email: IValidator = ({ value }, message) =>
  error(!!value && !EMAIL.test(value), message || MESSAGES.email());

const PHONE_NUMBER: RegExp = /^(\()?[2-9]\d{2}(-|.|\))?\d{3}(-|.)?\d{4}$/;
export const phone: IValidator = ({ value }, message) =>
  error(!!value && !PHONE_NUMBER.test(value), message || MESSAGES.phone());

const POSTAL: RegExp = /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/;
export const postal: IValidator = ({ value }, message) =>
  error(!!value && !POSTAL.test(value), message || MESSAGES.postal());

const NUMBER: RegExp = /^\d+$/;
export const numbers: IValidator = ({ value }, message) =>
  error(!!value && !NUMBER.test(value), message || MESSAGES.number());

const ALPHA: RegExp = /^\w+$/;
export const alpha: IValidator = ({ value }, message) =>
  error(!!value && !ALPHA.test(value), message || MESSAGES.alpha());

export const size: IValidator = ({ value }, message, min: number = 0, max: number = Infinity) =>
  error(
    !!value && !(Number(value) >= min && Number(value) <= max),
    message || MESSAGES.size(min.toString(10), max.toString(10)),
  );

export const oneOf: IValidator = ({ value }, message, ...pool: string[]) =>
  error(!!value && !pool.includes(value), message || MESSAGES.oneOf(pool));
