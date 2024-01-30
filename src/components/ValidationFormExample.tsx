import { Btn } from "./Buttons";
import { Form } from "./Form";
import { Input } from "./ValidatorInput";

export function ValidationFormExample() {
  const submit = (data) => {
    console.log(data);
  };

  return (
    <div class="m-4 rounded-lg bg-zinc-800 p-10">
      <Form onSubmit={submit}>
        <Input required type="email" name="email" placeholder="Email" />
        <Btn class="mt-4 w-full" type="submit">
          Submit
        </Btn>
      </Form>
    </div>
  );
}
