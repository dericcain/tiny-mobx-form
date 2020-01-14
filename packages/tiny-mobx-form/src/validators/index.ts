import { IField, IValidatorMessage, IValidators } from '../types';
import {
  alpha,
  letters,
  email,
  length,
  match,
  numbers,
  oneOf,
  phone,
  postal,
  required,
  requiredIf,
  size,
} from './validations';

export function validate(
  field: IField,
  validatorMessages: IValidatorMessage | undefined = undefined,
  validators: IValidators,
): string[] | any[] {
  if (!field.validation) return [];
  const validations = field.validation.split('|');
  return validations
    .map((validation: string) => {
      const [validator, argument] = validation.split(':') as [keyof typeof validators, string];
      let args: string[] = [];
      if (argument) {
        // Handle the arguments passed in
        args = argument.split(',');
      }
      if (!(validator in validators)) {
        throw new Error(`There is no validator with the name of ${validator}`);
      }
      const message =
        validatorMessages && validator in validatorMessages ? validatorMessages[validator] : '';
      return validators[validator](field, message, ...args);
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
  numbers,
  phone,
  postal,
  alpha,
  size,
  'one-of': oneOf,
  ...additionalValidators,
});
