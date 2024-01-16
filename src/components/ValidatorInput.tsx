import { setupValidatorInput } from "@rezact/rezact/validator";
import type { ValidatorOptions } from "@rezact/rezact/validator";

interface InputProps extends Omit<ValidatorOptions, "inputElm"> {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  value?: any;
  readonly?: boolean;
}

export function Input(props: InputProps) {
  const inputRef: any = { elm: null };
  const errorRef: any = { elm: null };
  const setupValidator = () => {
    inputRef.elm.readOnly = props.readonly || false;
    setupValidatorInput({
      inputElm: inputRef.elm,
      errorElm: errorRef.elm,
      ...props,
    });
  };

  return (
    <>
      <label for={props.name} class="sr-only">
        {props.label}
      </label>
      <input
        value={props.value || ""}
        onMount={setupValidator}
        ref={inputRef}
        name={props.name}
        id={props.name}
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={props.placeholder || ""}
        type={props.type || "text"}
      />
      <div
        ref={errorRef}
        style="height: 0px;"
        class=" overflow-hidden text-xs text-red-600 transition-all"
      ></div>
    </>
  );
}
