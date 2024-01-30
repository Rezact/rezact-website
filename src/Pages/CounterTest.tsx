import Counter from "src/components/Counter";

export function Page() {
  return (
    <div id="features" class="relative isolate pt-14">
      <div class="py-24 sm:py-32 lg:pb-40">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mdx mx-auto max-w-2xl text-white">
            <Counter />
          </div>
        </div>
      </div>
    </div>
  );
}
