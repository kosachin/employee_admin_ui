import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployeeSuccess } from "../context/actions";
import { ReqFieldError } from "../utils/ReqFieldError";
import stateWiseCities from "../utils/stateWiseCity";

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const lengthEquals = (len) => (value) =>
  len === value.length ? undefined : "Enter 10 digit phone number";
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
const setCity = (args, state, utils) => {
  console.log(state);
  utils.changeValue(state, "cityDropDown", () => args[0]);
  console.log(state.cityDropDown);
};
export const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store.data);
  console.log(store);
  const onSubmit = (value) => {
    console.log(value);
    const { name, email, age, role } = value;
    const payload = { name, email, age, role };
    dispatch(addEmployeeSuccess(payload));
    navigate(-1);
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        mutators={{ setCity }}
        initialValues={{
          cityDropDown: [],
        }}
      >
        {({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Full name:</label>
              <TextField name="name" component={"input"} validate={required} />
            </div>
            <div>
              <label>Email:</label>
              <TextField
                name="email"
                component={"input"}
                type={"email"}
                validate={required}
              />
            </div>
            <div>
              <label>Role:</label>
              <RoleField
                name="role"
                component={"input"}
                type={"radio"}
                options={["member", "admin"]}
                validate={required}
              />
            </div>
            <div>
              <label>Age:</label>
              <AgeField
                name="age"
                placeholder="Enter your age"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  minValue(18)
                )}
              />
            </div>
            <div>
              <label>Mobile Number: </label>
              <MobileNumberField
                type="number"
                name="pnum"
                placeholder="Enter your mobile number"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  lengthEquals(10)
                )}
                component="input"
              />
            </div>
            <div>
              <label>Address:</label>
              <div>
                <div>
                  <Field
                    name="address"
                    component={"input"}
                    validate={required}
                    onChange={form.mutators.setCity}
                  >
                    {({ input, meta }) => (
                      <>
                        <label>address:</label>
                        <input {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div>
                  <label>state:</label>
                  <Field name="state" component="select" validate={required}>
                    {({ input: { onChange, value } }) => (
                      <select
                        name="state"
                        value={value}
                        onChange={(data) => {
                          console.log(data);
                          onChange(data.target.value);
                          form.mutators.setCity(
                            stateWiseCities[data.target.value]
                          );
                        }}
                      >
                        <option value={null}></option>
                        {Object.keys(stateWiseCities).map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>
                <div>
                  <label>city:</label>
                  <Field name="city" component={"select"} validate={required}>
                    <option value={null}></option>
                    {values.cityDropDown.map((e) => (
                      <option key={e.city} value={e.city}>
                        {e.city}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      </Form>
    </div>
  );
};
const TextField = ({ ...prop }) => (
  <Field {...prop}>
    {({ input, meta }) => (
      <>
        <input {...input} />
        {meta.error && meta.touched && <ReqFieldError />}
      </>
    )}
  </Field>
);
const RoleField = ({ options, ...prop }) => {
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
const AgeField = ({ ...prop }) => (
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

const MobileNumberField = ({ ...prop }) => (
  <div>
    <Field
      type="number"
      name="pnum"
      placeholder="Enter your mobile number"
      validate={composeValidators(required, mustBeNumber, lengthEquals(10))}
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

// const Address = ({ ...prop }) => (
//   <div>
//     <Field></Field>
//   </div>
// );

function state(params) {
  console.log(params);
}

state(["a", "v"]);
