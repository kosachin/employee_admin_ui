import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployeeSuccess, editEmp } from "../context/actions";
// import { ReqFieldError } from "../utils/ReqFieldError";
import stateWiseCities from "../utils/stateWiseCity";
import { TextField } from "../Form/textField";
import { RoleField } from "../Form/roleField";
import { AgeField } from "../Form/ageField";
import { MobileNumberField } from "../Form/mobileField";
import { DOBField } from "../Form/dobField";
const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min} `;
const lengthEquals = (len) => (value) =>
  len === value.length ? undefined : "Enter 10 digit phone number";
const checkStartsWith = (value) =>
  value.startsWith("0") ? "Should not start with 0" : undefined;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
const setCity = (args, state, utils) => {
  utils.changeValue(state, "cityDropDown", () => args[0]);
};

export const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [selected, setSelected] = useState(null);
  const store = useSelector((store) => store.data);
  useEffect(() => {
    setSelected(store.find((e) => Number(e.id) === Number(id)));
  }, [id]);

  const onSubmit = (value) => {
    if (id) {
      // const { name, email, age, role, id } = value;
      // const payload = { name, email, age, role, id };
      dispatch(editEmp(value));
    } else {
      const payload = { id: store.length + 1, ...value };
      dispatch(addEmployeeSuccess(payload));
    }
    navigate(-1);
  };

  return (
    <div>
      <h4 onClick={() => navigate("/")}>Home</h4>
      <Form
        onSubmit={onSubmit}
        mutators={{ setCity }}
        initialValues={{
          cityDropDown: [],
          ...selected,
        }}
      >
        {({ handleSubmit, form, values, submitting, pristine }) => (
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
              <label>DOB:</label>
              <DOBField
                name="dob"
                component={"input"}
                type={"date"}
                validate={required}
              />
              {/* <Field
                name="dob"
                component={"input"}
                type={"date"}
                validate={required}
              >
                {({ input, meta }) => (
                  <>
                    <input {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </>
                )}
              </Field> */}
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
                name="pnum"
                placeholder="Enter your mobile number"
                validate={(required, mustBeNumber, lengthEquals(10))}
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
                  <Field
                    name="city"
                    component={"select"}
                    validate={required}
                    style={{
                      display:
                        values.cityDropDown.length > 1 ? "block" : "none",
                    }}
                  >
                    <option value={[]}></option>
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

// const TextField = ({ ...prop }) => (
//   <Field {...prop}>
//     {({ input, meta }) => (
//       <>
//         <input {...input} />
//         {meta.error && meta.touched && <ReqFieldError />}
//       </>
//     )}
//   </Field>
// );
// const RoleField = ({ options, ...prop }) => {
//   return (
//     <div>
//       {options.map((value) => (
//         <>
//           <label>{value}</label>
//           <Field {...prop} value={value}>
//             {({ input, meta }) => (
//               <>
//                 <input {...input} />
//               </>
//             )}
//           </Field>
//         </>
//       ))}
//     </div>
//   );
// };
// const AgeField = ({ ...prop }) => (
//   <div>
//     <Field
//       name="age"
//       placeholder="Enter your age"
//       validate={composeValidators(required, mustBeNumber, minValue(18))}
//     >
//       {({ input, meta, placeholder }) => (
//         <div>
//           <input {...input} placeholder={placeholder} />
//           {meta.error && meta.touched && <span> {meta.error}</span>}
//         </div>
//       )}
//     </Field>
//   </div>
// );

// const MobileNumberField = ({ ...prop }) => (
//   <div>
//     <Field
//       name="pnum"
//       placeholder="Enter your mobile number"
//       validate={composeValidators(
//         required,
//         mustBeNumber,
//         checkStartsWith,
//         lengthEquals(10)
//       )}
//       component="input"
//     >
//       {({ input, meta, placeholder }) => (
//         <div>
//           <input {...input} placeholder={placeholder} />
//           {meta.error && meta.touched && <span> {meta.error}</span>}
//         </div>
//       )}
//     </Field>
//   </div>
// );
