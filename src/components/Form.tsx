import { getFormData } from "@rezact/rezact/formHelper";

interface FormProps {
  onSubmit: (data: any) => void;
  class?: string;
  children?: any;
}

export function Form(props: FormProps) {
  const submitFunc = (ev: SubmitEvent) => {
    ev.preventDefault();
    const frm = ev.target as any;
    if (!frm) return;
    if (frm.checkValidity() === false) return;
    const data = getFormData(ev.target);
    props.onSubmit(data);
    frm.reset();
  };
  return (
    <form onSubmit={submitFunc} class={props.class}>
      {props.children}
    </form>
  );
}
