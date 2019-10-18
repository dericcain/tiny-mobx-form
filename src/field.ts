import { action, computed, observable } from 'mobx';

import { validate } from './validators';
import {
  IField,
  IFieldOptions,
  IForm,
  IFormSchema,
  IValidatorMessage,
  IValidators
} from './types';

export class Field implements IField {
  public name: string;

  public label: string;

  public placeholder: string;

  @observable public initialValue: string;

  @observable public isTouched = false;

  @observable public isFocused = false;

  @observable public validation: string;

  @observable private _value: string;

  private readonly validators: IValidators;

  private readonly validatorMessages: IValidatorMessage;

  @computed
  public get value() {
    return this._value;
  }

  @computed
  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  @computed
  public get isDirty(): boolean {
    return this.initialValue !== this.value;
  }

  @computed
  public get errors(): string[] {
    return validate(this, this.validatorMessages, this.validators);
  }

  @computed
  public get hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public constructor(
    public form: IForm,
    { name, label = '', placeholder = '', validation = '', initialValue = '' }: IFormSchema,
    {
      additionalValidators,
      validatorMessages,
    }: IFieldOptions,
  ) {
    this.name = name;
    this.label = label;
    this.placeholder = placeholder;
    this.initialValue = initialValue;
    this._value = initialValue;
    this.validation = validation;
    this.validators = additionalValidators;
    this.validatorMessages = validatorMessages;
  }

  public set value(value: string) {
    this._value = value;
    this.isTouched = true;
  }

  @action('TinyMobxForm | Field | reset')
  public reset() {
    this._value = this.initialValue;
    this.isTouched = false;
    this.isFocused = false;
  }
}
