import { MainLayout } from "../Layout/Main";

export function Page() {
  return (
    <div class=" container max-w-lg border-2 rounded-3xl mt-16 p-8">
      <div class=" flex items-center">
        <div class="flex-1">
          <h1 class="text-3xl font-bold">Rezact</h1>
          <h1 className="text-3xl ">Coming Soon!</h1>
        </div>
        <div class="flex-1">
          <img
            src="/rezact-logo.svg"
            alt="Rezact Logo"
            class="w-32 h-32 float-right"
          />
        </div>
      </div>
      <p class="mt-5">
        Embrace a modern UI framework that encourages direct data mutations,
        offers module-level reactivity, and simplifies component design. With
        Rezact, you get the power of reactivity without the boilerplate. Dive
        into a seamless development experience tailored for today's web.
      </p>
      <p class="mt-5">
        <a
          class=" text-center w-full block bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          href="https://github.com/Rezact/Rezact"
        >
          Check it out on GitHub
        </a>
      </p>
      <p class="mt-5">
        Want to chat about Rezact? Hit me up on Twitter:{" "}
        <a href="https://twitter.com/zachwritescode">
          https://twitter.com/zachwritescode
        </a>
      </p>
      <div class=" h-[800px]">
        <blockquote class="twitter-tweet h-[800px]">
          <p lang="en" dir="ltr">
            In the labyrinthine halls of the Library of Babel, a whisper of a
            prophecy was found, etched in the language of the codes: &#39;Behold
            Rezact, the harbinger of unshackled reactivity! It shall rise from
            the ashes of complexity, bringing forth a realm where hooks are but
            a distant…{" "}
            <a href="https://t.co/VjAri2ARO1">pic.twitter.com/VjAri2ARO1</a>
          </p>
          &mdash; Zach Lankton (@zachwritescode){" "}
          <a href="https://twitter.com/zachwritescode/status/1707380797295010253?ref_src=twsrc%5Etfw">
            September 28, 2023
          </a>
        </blockquote>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </div>
    </div>
  );
}

export const Layout = MainLayout;
