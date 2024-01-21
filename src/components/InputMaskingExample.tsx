import { Btn } from "./Buttons";
import { Form } from "./Form";
import { Input } from "./ValidatorInput";

export function InputMaskingExample() {
  const submit = (data) => {
    console.log(data);
  };

  return (
    <div class="m-4 rounded-lg bg-zinc-800 p-10">
      <Form onSubmit={submit}>
        <Input required type="email" name="email" placeholder="Email" />
        <Input
          exactLength={10}
          mask="(___) ___ ____"
          dataAccept={/[\d]/}
          showFullMaskWhileTyping
          validateUnMaskedValue
          name="telephone"
          placeholder="Phone"
          class="mt-4"
        />
        <Input
          minLength={15}
          maxLength={16}
          customValidator={luhnCheck}
          unmaskInputValueProp
          mask=".... .... .... ...."
          maskSlots="."
          dataAccept={/[\d]/}
          name="credit-card"
          placeholder="Credit Card"
          class="mt-4"
        />
        <Btn class="mt-4 w-full" type="submit">
          Submit
        </Btn>
      </Form>
    </div>
  );
}

function luhnCheck(ccNumWithSpaces) {
  const ccNum = ccNumWithSpaces.replaceAll(" ", "");
  const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let bit = 1;
  let len = ccNum.length;
  let sum = 0;
  let val;

  while (len) {
    val = parseInt(ccNum.charAt(--len), 10);
    sum += (bit ^= 1) ? arr[val] : val;
  }

  return (sum && sum % 10 === 0) as boolean;
}
