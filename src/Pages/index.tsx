import { MainLayout } from "../Layout/Main";

export function Page() {
  return (
    <>
      <h1 className="text-3xl ">Coming Soon!</h1>
      <p class="mt-5">
        Embrace a modern UI framework that encourages direct data mutations,
        offers module-level reactivity, and simplifies component design. With
        Rezact, you get the power of reactivity without the boilerplate. Dive
        into a seamless development experience tailored for today's web.
      </p>
      <p class="mt-5">
        Check it out on gitub:{" "}
        <a href="https://github.com/Rezact/Rezact">
          https://github.com/Rezact/Rezact
        </a>
      </p>
    </>
  );
}

export const Layout = MainLayout;
