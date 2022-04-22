import { Field } from "react-final-form";
export const RoleField = ({ options, ...prop }) => {
  return (
    <div>
      {options.map((value) => (
        <>
          <label>{value}</label>
          <Field {...prop} value={value}>
            {({ input, meta }) => (
              <>
                <input {...input} />
              </>
            )}
          </Field>
        </>
      ))}
    </div>
  );
};
