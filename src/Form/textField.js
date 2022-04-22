import { ReqFieldError } from "../utils/ReqFieldError";
import { Field } from "react-final-form";
export const TextField = ({ ...prop }) => (
  <Field {...prop}>
    {({ input, meta }) => (
      <>
        <input {...input} />
        {meta.error && meta.touched && <ReqFieldError />}
      </>
    )}
  </Field>
);
