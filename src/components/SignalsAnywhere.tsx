import { Input } from "./ValidatorInput";

let $test = ["Jack", "Jill", "John", "Jane"];

export function SignalsAnywhere() {
  return (
    <form class=" m-4 rounded bg-zinc-800 p-8">
      {$test.map(($name, $idx) => {
        const $checked = $idx % 2 === 0 ? false : true;
        const $checkedText = $checked
          ? $name.toUpperCase()
          : $name.toLowerCase();

        const chkLbl = `chk${$idx}`;

        return (
          <div class="flex items-center gap-4">
            <Input name="test" value={$name} class="w-1/2 flex-1" />
            <label for={chkLbl} sr-only>
              Check {$idx}
            </label>
            <input id={chkLbl} type="checkbox" value={$checked} />
            <p class="w-1/2 flex-1">{$checkedText}</p>
          </div>
        );
      })}
    </form>
  );
}
