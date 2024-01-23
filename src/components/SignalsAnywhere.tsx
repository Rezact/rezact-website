import { Input } from "./ValidatorInput";

////////////////////////////////////////////
// DECLARE SIGNALS OUTSIDE OF COMPONENTS! //
////////////////////////////////////////////
let $test = ["Jack", "Jill", "John", "Jane"];

export function SignalsAnywhere() {
  return (
    <form class=" m-4 rounded bg-zinc-800 p-8">
      {$test.map(($name) => {
        ////////////////////////////////
        // DECLARE SIGNALS IN A LOOP! //
        ////////////////////////////////
        const $upperName = $name.toUpperCase();

        return (
          <div class="flex items-center gap-4">
            <Input name="test" value={$name} class="w-1/2 flex-1" />
            <p class="w-1/2 flex-1">{$upperName}</p>
          </div>
        );
      })}
    </form>
  );
}
