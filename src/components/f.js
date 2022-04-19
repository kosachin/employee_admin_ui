import { Field, Form } from "react-final-form";
const onSubmit = (value) => alert(JSON.stringify(value));
export const F = () => {
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        mutators={{
          setMin: (args, state, utils) => {
            utils.changeValue(state, "apples", () => 1);
          },
          setMax: (args, state, utils) => {
            utils.changeValue(state, "apples", () => 100);
          },
          setLast: (args, state, utils) => {
            utils.changeValue(state, "apples", () => 6);
          },
        }}
        render={({ form, ...rest }) => (
          <>
            <button onClick={form.mutators.setMin}>minimum apples</button>
            <button onClick={form.mutators.setMax}>maximum apples</button>
            <button onClick={form.mutators.setLast}>
              what I bought last time
            </button>
          </>
        )}
      />
    </div>
  );
};
