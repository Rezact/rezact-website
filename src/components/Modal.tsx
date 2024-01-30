import { elmRef } from "src/lib/utils";
import { Btn } from "./Buttons";
import { getFormData } from "@rezact/rezact/formHelper";

interface AlertOpts {
  buttons?: any;
  disableBackDropClick?: boolean;
}

interface AlertResults {
  ok: boolean;
  cancel: boolean;
  backdropClick: boolean;
  data?: any;
}

export function closeModal(ev) {
  const event = new CustomEvent("closemodaldialog", {
    detail: { ok: true },
    bubbles: true,
  });
  ev.target.dispatchEvent(event);
}

export async function Alert(
  content,
  opts: AlertOpts = {},
): Promise<AlertResults> {
  const buttons = opts.buttons || (
    <Btn size="lg" class=" w-full sm:ml-3 sm:w-auto" type="submit">
      Ok
    </Btn>
  );
  const { disableBackDropClick } = opts;
  return new Promise((resolve) => {
    const hideHook = (data) => {
      setTimeout(() => {
        modal.remove();
        resolve(data);
      }, 310);
    };
    const [show, modal] = Modal({
      hideHook,
      buttons,
      content,
      disableBackDropClick,
    });
    document.body.appendChild(modal);
    show();
  });
}

export const Prompt = Confirm;
export async function Confirm(
  content,
  opts: AlertOpts = {},
): Promise<AlertResults> {
  const buttons = opts.buttons || (
    <>
      <Btn size="lg" class=" w-full sm:ml-3 sm:w-auto" type="submit">
        Ok
      </Btn>
      <Btn
        size="lg"
        class=" mt-2 w-full sm:ml-3 sm:mt-0 sm:w-auto"
        color="secondary"
        onClick={closeModal}
      >
        Cancel
      </Btn>
    </>
  );
  const { disableBackDropClick } = opts;
  return new Promise((resolve) => {
    const hideHook = (data) => {
      setTimeout(() => {
        modal.remove();
        resolve(data);
      }, 310);
    };
    const [show, modal] = Modal({
      hideHook,
      buttons,
      content,
      disableBackDropClick,
    });
    document.body.appendChild(modal);
    show();
  });
}

export function Modal(opts: any) {
  const overlay = new elmRef();
  const backdrop = new elmRef();
  const modal = new elmRef();

  const show = () => {
    overlay.show();
    overlay.transition("opacity-0", "opacity-100", 100);
    modal.show();
    modal.transition(
      "opacity-0 translate-y-4 sm:scale-95",
      "opacity-100 translate-y-0 sm:scale-100",
      100,
    );
  };

  const hide = (data) => {
    if (data.type === "closemodaldialog")
      data = { ok: false, cancel: true, backdropClick: false };
    overlay.transition("opacity-100", "opacity-0");
    overlay.hide(310);
    modal.transition(
      "opacity-100 translate-y-0 sm:scale-100",
      "opacity-0 translate-y-4 sm:scale-95",
    );
    modal.hide(310);
    if (opts.hideHook) opts.hideHook(data);
  };

  const backdropClick = (ev) => {
    if (opts.disableBackDropClick) return;
    if (ev.target === backdrop.elm)
      hide({ ok: false, cancel: true, backdropClick: true });
  };

  const modalSubmit = (ev) => {
    ev.preventDefault();
    if (ev.target.checkValidity() === false) return;
    const data = getFormData(ev.target);
    hide({ ok: true, cancel: false, backdropClick: false, data });
  };

  const markup = (
    <div
      class="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onCloseModalDialog={hide}
    >
      <div
        ref={overlay}
        class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 opacity-0 transition-opacity duration-300 ease-in-out"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          onClick={backdropClick}
          ref={backdrop}
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            ref={modal}
            class="relative hidden translate-y-4 scale-95 transform overflow-hidden rounded-lg bg-white text-left opacity-0 shadow-xl transition-all duration-300 ease-in-out sm:my-8 sm:w-full sm:max-w-lg sm:translate-y-0 sm:scale-95"
          >
            <form onsubmit={modalSubmit}>
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>{opts.content}</div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {opts.buttons}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return [show, markup];
}
