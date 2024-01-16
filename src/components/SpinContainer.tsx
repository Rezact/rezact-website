import { elmRef, getVal } from "src/lib/utils";
import { Spinner } from "./Spinner";

export function SpinContainer(props) {
  const spinner = new elmRef();
  const { $showSpinner } = props;
  $: {
    const showSpinner = getVal($showSpinner);
    if (showSpinner) {
      spinner.show(0, "flex");
      spinner.transition("opacity-0", "opacity-100", 100);
    } else {
      spinner.transition("opacity-100", "opacity-0");
      spinner.hide(310, "flex");
    }
  }
  return (
    <div class="relative overflow-hidden rounded-xl pb-2">
      <div
        ref={spinner}
        class={`absolute bottom-0 left-0 right-0 top-0 z-50 hidden items-center justify-center opacity-0 transition-all duration-500 ${props.class}`}
      >
        <Spinner />
        <span class="sr-only">Loading...</span>
      </div>
      {props.children}
    </div>
  );
}
