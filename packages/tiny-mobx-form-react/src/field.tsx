import React, { useContext } from 'react';
import { IField } from 'tiny-mobx-form';
import { observer } from 'mobx-react-lite';

import { FormContext } from './form-context';

type EventType = React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

interface Input extends Pick<IField, 'name' | 'placeholder' | 'value'> {
  autoFocus: boolean;
  key: string;
  id: string;
  onChange: (e: EventType) => void;
}

interface FieldValue {
  input: Input;
  label: string;
  errors: string[];
  hasErrors: boolean;
}

interface FieldProps {
  name: string;
  children: (field: FieldValue) => React.ReactNode | React.ReactElement | any;
}

function Field({ name, children }: FieldProps) {
  const { form } = useContext(FormContext);
  if (!(name in form.fields)) {
    throw Error(`There is no field named ${name}`);
  }
  const field = form.fields[name];
  const {
    placeholder,
    value,
    isFocused,
    label = '',
    errors,
    isTouched,
    hasErrors: fieldHasErrors,
  } = field;
  function change(e: EventType) {
    field.value = e.currentTarget.value;
  }
  const input = {
    name,
    placeholder,
    value,
    id: name,
    key: `${name}-${isFocused}`,
    autoFocus: isFocused,
    onChange: change,
  };
  const hasErrors = isTouched && fieldHasErrors;

  return children({ input, errors, hasErrors, label });
}

export const ObservedField = observer(Field);
