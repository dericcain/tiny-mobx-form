import React from 'react';
import { Syntax } from './syntax';

export function SimpleCode() {
  return (
    <div style={{ flex: 5 }}>
      <Syntax
        code={`
const schema: IFormSchema[] = [
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
    validation: 'required|length:2,20',
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

const { fields } = new Form(schema);

export function Simple() {
  return useObserver(() => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Input
          required
          label={fields.firstName.label}
          type="text"
          name="firstName"
          value={fields.firstName.value}
          placeholder={fields.firstName.placeholder}
          onChange={e => (fields.firstName.value = e.currentTarget.value)}
          error={
            fields.firstName.isDirty &&
            fields.firstName.hasErrors &&
            fields.firstName.errors.join(' ')
          }
        />
      </div>
      <div style={{ marginBottom: 32 }}>
        <Input
          required
          label={fields.lastName.label}
          type="text"
          name="lastName"
          value={fields.lastName.value}
          placeholder={fields.lastName.placeholder}
          onChange={e => (fields.lastName.value = e.currentTarget.value)}
          error={
            fields.lastName.isDirty &&
            fields.lastName.hasErrors &&
            fields.lastName.errors.join(' ')
          }
        />
      </div>
      <div style={{ marginBottom: 32 }}>
        <Input
          required
          label={fields.email.label}
          type="text"
          name="email"
          value={fields.email.value}
          placeholder={fields.email.placeholder}
          onChange={e => (fields.email.value = e.currentTarget.value)}
          error={fields.email.isDirty && fields.email.hasErrors && fields.email.errors.join(' ')}
        />
      </div>
      <div style={{ marginBottom: 32 }}>
        <Input
          required
          label={fields.age.label}
          type="text"
          name="age"
          value={fields.age.value}
          placeholder={fields.age.placeholder}
          onChange={e => (fields.age.value = e.currentTarget.value)}
          error={fields.age.isDirty && fields.age.hasErrors && fields.age.errors.join(' ')}
        />
      </div>
    </div>
  ));
}`}
      />
    </div>
  );
}
