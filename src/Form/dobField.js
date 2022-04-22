import { Field } from "react-final-form";
const required = (value) => (value ? undefined : "Required");
export const DOBField = () => {
  return (
    <Field name="dob" component={"input"} type={"date"} validate={required}>
      {({ input, meta }) => (
        <>
          <input {...input} />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </>
      )}
    </Field>
  );
};
