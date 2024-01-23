import { Input } from "./ValidatorInput";

////////////////////////////////////////////
// DECLARE SIGNALS OUTSIDE OF COMPONENTS! //
////////////////////////////////////////////
let $test = ["Jack", "Jill", "John", "Jane"];

export function SignalsAnywhere() {
  return (
    <>
      <h1>Simple String List</h1>

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
    </>
  );
}
