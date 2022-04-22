import { Field } from "react-final-form";
const required = (value) => (value ? undefined : "Required");
export const DOBField = ({ disabled }) => {
  return (
    <Field name="dob" component={"input"} type={"date"} validate={required}>
      {({ input, meta }) => (
        <>
          <input {...input} disabled={disabled} />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </>
      )}
    </Field>
  );
};
