import { Field } from "react-final-form";
const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const checkStartsWith = (value) =>
  value.startsWith("0") ? "Should not start with 0" : undefined;
const lengthEquals = (len) => (value) =>
  len === value.length ? undefined : "Enter 10 digit phone number";
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
export const MobileNumberField = ({ ...prop }) => (
  <div>
    <Field
      name="pnum"
      placeholder="Enter your mobile number"
      validate={composeValidators(
        required,
        mustBeNumber,
        checkStartsWith,
        lengthEquals(10)
      )}
      component="input"
    >
      {({ input, meta, placeholder }) => (
        <div>
          <input {...input} placeholder={placeholder} />
          {meta.error && meta.touched && <span> {meta.error}</span>}
        </div>
      )}
    </Field>
  </div>
);
