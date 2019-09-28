import { validate, validators } from '../src/validators';
import { Form } from '../src';
import { MESSAGES } from '../src/validators/validations';

describe('MobX Tiny Form', () => {
  describe('Form', () => {
    const schema = [
      {
        name: 'name',
        label: 'name',
        placeholder: 'name',
        validation: 'required',
      },
      {
        name: 'email',
        label: 'email',
        placeholder: 'email',
        validation: 'required|email',
      }
    ];

    it('should not be valid', () => {
      const form = new Form(schema, { name: 'jon', email: 'jon@email.com' }, validators());
      expect(form.isValid).toBe(true);
      form.fields.email.value = '';
      expect(form.isValid).toBe(false);
    });

    it('should return the errors', () => {
      const form = new Form(schema, { name: 'jon', email: '' }, validators());
      expect(form.errors).toHaveLength(1);
      expect(form.errors[0]).toMatch(MESSAGES.required());
      form.fields.email.value = 'not an email';
      expect(form.errors[0]).toMatch(MESSAGES.email());
    });

    it('should be dirty once data is entered', () => {
      const form = new Form(schema, { name: 'jon', email: '' }, validators());
      expect(form.isDirty).toBe(false);
      form.fields.name.value = 'david';
      expect(form.isDirty).toBe(true);
    });

    it('should return the values as an object', () => {
      const initialValues = { name: 'jon', email: '' };
      const form = new Form(schema, initialValues, validators());
      expect(form.values).toMatchObject(initialValues);
      form.fields.name.value = 'david';
      expect(form.values).toMatchObject({ ...initialValues, name: 'david' });
    });

    it('should reset the form to the initial values', () => {
      const initialValues = { name: 'jon', email: 'jon@email.com' };
      const form = new Form(schema, initialValues, validators());
      form.fields.name.value = 'david';
      form.fields.email.value = 'david@email.com';
      expect(form.values).toMatchObject({ name: 'david', email: 'david@email.com' });
      form.reset();
      expect(form.values).toMatchObject(initialValues);
    });

    it('should show errors by marking the fields as "dirty"', () => {
      const initialValues = { name: 'jon', email: 'jon@email.com' };
      const form = new Form(schema, initialValues, validators());
      const dirtyFields = () => Object.keys(form.fields).filter((key) => form.fields[key].isTouched);
      expect(dirtyFields()).toHaveLength(0);
      form.showErrors();
      expect(dirtyFields()).toHaveLength(2);
    });
  });

  describe('Field', () => {
    const schema = [
      {
        name: 'name',
        label: 'name',
        placeholder: 'name',
        validation: 'required',
      },
      {
        name: 'email',
        label: 'email',
        placeholder: 'email',
        validation: 'required|email',
      }
    ];
    const form = new Form(schema, {}, validators());

    it('should return whether there are errors or not', () => {
      expect(form.fields.name.hasErrors).toBe(true);
      form.fields.name.value = 'jon';
      expect(form.fields.name.hasErrors).toBe(false);
    });

    it('can be created with default values', () => {
      const schema = [{ name: 'test' }];
      const form = new Form(schema);
      expect(form.fields.test.value).toBe('');
      expect(form.fields.test.placeholder).toBe('');
      expect(form.fields.test.validation).toBe('');
      expect(form.fields.test.initialValue).toBe('');
    });
  });

  describe('validate', () => {
    const schema = [
      {
        name: 'required-fail',
        label: 'Required Fail',
        placeholder: 'Required Fail',
        validation: 'required',
        initialValue: '',
        failMessage: MESSAGES.required(),
      },
      {
        name: 'required-pass',
        label: 'Required Pass',
        placeholder: 'Required Pass',
        validation: 'required',
        initialValue: 'pass',
        failMessage: '',
      },
      {
        name: 'required-if-fail',
        label: 'Required If Fail',
        placeholder: 'Required If Fail',
        validation: 'required-if:required-pass',
        initialValue: '',
        failMessage: MESSAGES.requiredIf('Required Pass', 'Required If Fail'),
      },
      {
        name: 'required-if-pass',
        label: 'Required If Pass',
        placeholder: 'Required If Pass',
        validation: 'required-if:required-pass',
        initialValue: 'pass',
        failMessage: '',
      },
      {
        name: 'length-fail',
        label: 'Length Fail',
        placeholder: 'Length Fail',
        validation: 'length:5,10',
        initialValue: 'nope',
        failMessage: MESSAGES.length('5', '10'),
      },
      {
        name: 'length-pass',
        label: 'Length Pass',
        placeholder: 'Length Pass',
        validation: 'length:5,10',
        initialValue: 'nope yes',
        failMessage: '',
      },
      {
        name: 'email-fail',
        label: 'Email Fail',
        placeholder: 'Email Fail',
        validation: 'email',
        initialValue: 'nope',
        failMessage: MESSAGES.email(),
      },
      {
        name: 'email-pass',
        label: 'Email Pass',
        placeholder: 'Email Pass',
        validation: 'email',
        initialValue: 'nope@google.com',
        failMessage: '',
      },
      {
        name: 'match-fail',
        label: 'Match Fail',
        placeholder: 'Match Fail',
        validation: 'match:email-pass',
        initialValue: '',
        failMessage: MESSAGES.match('Match Fail', 'Email Pass'),
      },
      {
        name: 'match-pass',
        label: 'Match Pass',
        placeholder: 'Match Pass',
        validation: 'match:email-pass',
        initialValue: 'nope@google.com',
        failMessage: '',
      },
      {
        name: 'number-fail',
        label: 'Number Fail',
        placeholder: 'Number Fail',
        validation: 'number',
        initialValue: '1a2',
        failMessage: MESSAGES.number(),
      },
      {
        name: 'number-pass',
        label: 'Number Pass',
        placeholder: 'Number Pass',
        validation: 'number',
        initialValue: '12345',
        failMessage: '',
      },
      {
        name: 'phone-fail',
        label: 'Phone Fail',
        placeholder: 'Phone Fail',
        validation: 'phone',
        initialValue: '900',
        failMessage: MESSAGES.phone(),
      },
      {
        name: 'phone-pass',
        label: 'Phone Pass',
        placeholder: 'Phone Pass',
        validation: 'phone',
        initialValue: '800.321.5555',
        failMessage: '',
      },
      {
        name: 'postal-fail',
        label: 'Postal Fail',
        placeholder: 'Postal Fail',
        validation: 'postal',
        initialValue: 'nah',
        failMessage: MESSAGES.postal(),
      },
      {
        name: 'postal-pass',
        label: 'Postal Pass',
        placeholder: 'Postal Pass',
        validation: 'postal',
        initialValue: '90210',
        failMessage: '',
      },
      {
        name: 'size-fail',
        label: 'Size Fail',
        placeholder: 'Size Fail',
        validation: 'size:99,1000',
        initialValue: '50',
        failMessage: MESSAGES.size('99', '1000'),
      },
      {
        name: 'size-pass',
        label: 'Size Pass',
        placeholder: 'Size Pass',
        validation: 'size:99,1000',
        initialValue: '500',
        failMessage: '',
      },
      {
        name: 'one-of-fail',
        label: 'One Of Fail',
        placeholder: 'One Of Fail',
        validation: 'one-of:one,two,three',
        initialValue: 'four',
        failMessage: MESSAGES.oneOf(['one', 'two', 'three']),
      },
      {
        name: 'one-of-pass',
        label: 'One Of Pass',
        placeholder: 'One Of Pass',
        validation: 'one-of:one,two,three',
        initialValue: 'one',
        failMessage: '',
      },
      {
        name: 'alpha-fail',
        label: 'Alpha Fail',
        placeholder: 'Alpha Fail',
        validation: 'alpha',
        initialValue: '123abc,',
        failMessage: MESSAGES.alpha(),
      },
      {
        name: 'alpha-pass',
        label: 'Alpha Pass',
        placeholder: 'Alpha Pass',
        validation: 'alpha',
        initialValue: '123abc',
        failMessage: '',
      },
      {
        name: 'should-throw',
        label: 'Should Throw',
        placeholder: 'Should Throw',
        validation: 'foobar',
        initialValue: 'one',
        failMessage: '',
      },
    ];
    const form = new Form(schema, {}, validators());

    it.each`
      result                                 | name               | expected
      ${form.fields[schema[0].name].errors}  | ${schema[0].name}  | ${schema[0].failMessage}
      ${form.fields[schema[1].name].errors}  | ${schema[1].name}  | ${schema[1].failMessage}
      ${form.fields[schema[2].name].errors}  | ${schema[2].name}  | ${schema[2].failMessage}
      ${form.fields[schema[3].name].errors}  | ${schema[3].name}  | ${schema[3].failMessage}
      ${form.fields[schema[4].name].errors}  | ${schema[4].name}  | ${schema[4].failMessage}
      ${form.fields[schema[5].name].errors}  | ${schema[5].name}  | ${schema[5].failMessage}
      ${form.fields[schema[6].name].errors}  | ${schema[6].name}  | ${schema[6].failMessage}
      ${form.fields[schema[7].name].errors}  | ${schema[7].name}  | ${schema[7].failMessage}
      ${form.fields[schema[8].name].errors}  | ${schema[8].name}  | ${schema[8].failMessage}
      ${form.fields[schema[9].name].errors}  | ${schema[9].name}  | ${schema[9].failMessage}
      ${form.fields[schema[10].name].errors} | ${schema[10].name} | ${schema[10].failMessage}
      ${form.fields[schema[11].name].errors} | ${schema[11].name} | ${schema[11].failMessage}
      ${form.fields[schema[12].name].errors} | ${schema[12].name} | ${schema[12].failMessage}
      ${form.fields[schema[13].name].errors} | ${schema[13].name} | ${schema[13].failMessage}
      ${form.fields[schema[14].name].errors} | ${schema[14].name} | ${schema[14].failMessage}
      ${form.fields[schema[15].name].errors} | ${schema[15].name} | ${schema[15].failMessage}
      ${form.fields[schema[16].name].errors} | ${schema[16].name} | ${schema[16].failMessage}
      ${form.fields[schema[17].name].errors} | ${schema[17].name} | ${schema[17].failMessage}
      ${form.fields[schema[18].name].errors} | ${schema[18].name} | ${schema[18].failMessage}
      ${form.fields[schema[19].name].errors} | ${schema[19].name} | ${schema[19].failMessage}
      ${form.fields[schema[20].name].errors} | ${schema[20].name} | ${schema[20].failMessage}
      ${form.fields[schema[21].name].errors} | ${schema[21].name} | ${schema[21].failMessage}
    `('validation for $name', ({ result, name, expected }) => {
      if (name.includes('fail')) {
        expect(result).toHaveLength(1);
        expect(result[0]).toMatch(expected);
      } else {
        expect(result).toHaveLength(0);
      }
    });

    it('should throw if the validator is not found', () => {
      expect(() => {
        validate(form.fields['should-throw'], validators());
      }).toThrow();
    });
  });
});
