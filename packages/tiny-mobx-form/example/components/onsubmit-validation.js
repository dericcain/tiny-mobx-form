import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { Form } from '../../dist';
import { TextInputField } from 'evergreen-ui';

const schema = [
  {
    name: 'firstName',
    placeholder: 'John',
    label: 'First Name',
    validation: 'required|letters|length:2,20',
    initialValue: '',
  },
  {
    name: 'lastName',
    placeholder: 'Appleseed',
    label: 'Last Name',
    validation: 'required|letters|length:2,20',
    initialValue: '',
  },
  {
    name: 'email',
    placeholder: 'jon@gmail.com',
    label: 'Email',
    validation: 'required|email',
    initialValue: '',
  },
  {
    name: 'age',
    placeholder: '22',
    label: 'Age',
    validation: 'required|number|size:18,100',
    initialValue: '',
  },
];

const form = new Form(schema);
const { fields } = form;

function Field({ name, showErrors }) {
  console.log(fields[name]);
  function update(e) {
    fields[name].value = e.currentTarget.value;
  }
  return (
    <div>
      <TextInputField
        type="text"
        name={fields[name].name}
        value={fields[name].value}
        placeholder={fields[name].placeholder}
        label={fields[name].label}
        validationMessage={ showErrors && fields[name].hasErrors && fields[name].errors.join(' ')}
        isInvalid={showErrors && fields[name].hasErrors}
        onChange={update}
        autoFocus={fields[name].isFocused ? "true": "false"}
        key={`${fields[name].name}-${fields[name].isFocused}`}
      />
    </div>
  );
}

const ObservedField = observer(Field);

function OnSubmit() {
  const [showErrors, setShowErrors] = useState(false);

  function submit(e) {
    e.preventDefault();
    setShowErrors(true);
    form.showErrors();
    if (form.isValid) {
      alert(JSON.stringify(form.values));
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <ObservedField name="firstName" showErrors={showErrors} />
        <ObservedField name="lastName" showErrors={showErrors} />
        <ObservedField name="email" showErrors={showErrors} />
        <ObservedField name="age" showErrors={showErrors} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default observer(OnSubmit);
