import { action, computed, observable } from 'mobx';

import { Field } from './field';
import { Fields, IForm, IFormSchema, InitialValues, Validators } from './types';
import { validators } from './validators';

export class Form implements IForm {
  @observable public fieldNames: string[] = [];

  @observable.struct public fields: Fields = {};

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
    initialValues: InitialValues = {},
    additionalValidators: Validators = {},
  ) {
    fields.forEach((props: IFormSchema) => {
      this.fieldNames.push(props.name);
      const initialValue = initialValues[props.name] || props.initialValue;
      const newProps = { ...props, initialValue };
      this.fields[newProps.name] = new Field(this, newProps, validators(additionalValidators));
    });
  }

  @action('TinyMobxForm | showErrors')
  public showErrors() {
    this.fieldNames.forEach(name => {
      this.fields[name].isTouched = true;
    });
  }

  @action('TinyMobxForm | reset')
  public reset() {
    this.fieldNames.forEach(name => this.fields[name].reset());
  }
}
