# React Tiny MobX Form
[![Coverage Status](https://coveralls.io/repos/github/dericgw/tiny-mobx-form/badge.svg?branch=master)](https://coveralls.io/github/dericgw/tiny-mobx-form?branch=master)
---

✌️Tiny (~2KB) tree-shakable MobX form library

## Features
- Small, less than 2KB and tree-shakable
- Written in TypeScript using MobX
- Includes popular validations
- Can add your own custom validations if needed

## Installation
`npm i tiny-mobx-form` or `yarn add tiny-mobx-form`

## Validation
Tiny MobX Form has the most common validations built in and also allows custom validations to be
added.

### Validators
- required - `required`
- required if - `required-if:<name of field>` | `required-if:last-name`
- length (string length) - `length:<min>,<max>` | `length:4,30`
- match - `match:<name of field>` | `match:password`
- letters - `letters`
- email - `email`
- phone number - `phone`
- postal - `postal`
- number - `number`
- alphanumeric - `alpha`
- size (number between) - `size:<min>,<max>` | `size:50,100`
- one of (array list) - `one-of:<comma separated list>` | `one-of:red,blue,green`

### Custom Validators
If you would like to add your own custom validators, then you can pass those to the `options` argument
of the `Form` constructor. You would pass them in as an object. The object key is the name of the
validator and the value is the validator:
```js
const additionalValidators = {
  'file-size': fileSizeValidator,
};
```

As an example, say we want to get the file size of a value and we want our validation to look like
this: `file-size:2` (that is 2KB). The validator would look like this:
```js
// The field is passed in so you can get any of its properties. 
// The other arguments are spread into the validator
const fileSizeValidator = (field, max) => {
  if (!!field.value && field.value.size > max * 1024 /* 1,024 bytes in a KB */) {
    return `The file size is too larger than ${max}KB`;
  }
  return undefined;
}
```

Or, say we wanted a range for our file size that would look like this `file-size:1,4`. Then our 
validator would look like this:
```js
const fileSizeValidator = (field, min, max) => {
  if (!!field.value && (field.value.size < min * 1024 || field.value.size > max * 1024)) {
    return `The file size must be between ${min}KB and ${max}KB`;
  }
  return undefined;
}
```
