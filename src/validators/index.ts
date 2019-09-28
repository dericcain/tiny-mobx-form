import { IField, IValidators } from '../types';
import {
  alpha,
  letters,
  email,
  length,
  match,
  number,
  oneOf,
  phone,
  postal,
  required,
  requiredIf,
  size,
} from './validations';

export function validate(field: IField, validators: IValidators): string[] | any[] {
  const validations = field.validation.split('|');
  return validations
    .map((validation: string) => {
      // @ts-ignore
      const [validator, argument = '']: [keyof typeof validators, string] = validation.split(':');
      let args: any[] = [];
      if (argument) {
        // Handle the arguments passed in
        args = argument.split(',');
      }
      if (!(validator in validators)) {
        throw new Error(`There is no validator with the name of ${validator}`);
      }
      return validators[validator](field, ...args);
    })
    .filter(Boolean);
}

export const validators = (additionalValidators: IValidators = {}) => ({
  required,
  'required-if': requiredIf,
  length,
  letters,
  email,
  match,
  number,
  phone,
  postal,
  alpha,
  size,
  'one-of': oneOf,
  ...additionalValidators,
});
