import { Field } from "react-final-form";
const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min} `;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
export const AgeField = ({ ...prop }) => (
  <div>
    <Field
      name="age"
      placeholder="Enter your age"
      validate={composeValidators(required, mustBeNumber, minValue(18))}
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
