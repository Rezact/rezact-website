import { Btn } from "./Buttons";

export default function Counter() {
  let $counter = 0;

  return (
    <div class=" rounded bg-zinc-800 p-8">
      <h1>Hello World</h1>
      <h2 id="test-value" class=" text-center">
        {$counter}
      </h2>

      <div class="flex items-stretch gap-12">
        <Btn onClick={() => $counter--} class="flex-1">
          Dec
        </Btn>
        <Btn id="test-inc" onClick={() => $counter++} class="flex-1">
          Inc
        </Btn>
      </div>
    </div>
  );
}
