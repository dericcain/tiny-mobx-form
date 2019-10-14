import { action, computed, observable } from 'mobx';

import { Field } from './field';
import { IFields, IForm, IFormOptions, IFormSchema, IInitialValues } from './types';
import { validators } from './validators';

export class Form implements IForm {
  @observable.struct public fields: IFields = {};

  public autofocusOnError: boolean | undefined;

  @computed
  private get fieldNames(): string[] {
    return Object.keys(this.fields);
  }

  @computed
  public get isValid() {
    return this.fieldNames.filter((name: string) => !this.fields[name].isValid).length === 0;
  }

  @computed
  public get errors() {
    return this.fieldNames.flatMap(name => this.fields[name].errors);
  }

  @computed
  public get isDirty() {
    return this.fieldNames.some(name => this.fields[name].isDirty);
  }

  @computed
  public get values() {
    return this.fieldNames.reduce(
      (dataset, name) => ({ ...dataset, [name]: this.fields[name].value }),
      {},
    );
  }

  public constructor(
    fields: IFormSchema[],
    initialValues: IInitialValues = {},
    options: IFormOptions = { additionalValidators: {}, autofocusOnError: false },
  ) {
    fields.forEach((props: IFormSchema) => {
      this.fieldNames.push(props.name);
      const initialValue = initialValues[props.name] || props.initialValue;
      const newProps = { ...props, initialValue };
      this.fields[newProps.name] = new Field(
        this,
        newProps,
        validators(options.additionalValidators),
      );
      this.autofocusOnError = options.autofocusOnError;
    });
  }

  @action('TinyMobxForm | showErrors')
  public showErrors() {
    let hasSetFocus = false;
    this.fieldNames.forEach(name => {
      this.fields[name].isTouched = true;
      // Set the first invalid field we find to isFocused so we can focus on that field
      if (!this.fields[name].isValid && !hasSetFocus) {
        this.fields[name].isFocused = true;
        hasSetFocus = true;
      }
    });
  }

  @action('TinyMobxForm | reset')
  public reset() {
    this.fieldNames.forEach(name => this.fields[name].reset());
  }
}
