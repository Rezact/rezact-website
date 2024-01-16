import { SettingsIcon } from "./components/icons";
import { elmRef } from "./lib/utils";
// import "boxicons";

import "./styles.css";
let $userImageUrl = "";
let $userFirstName = "";

const nav = [
  { title: "Intro", icon: () => {}, href: "/docs", route: "/docs" },
  {
    title: "Getting Started",
    icon: () => {},
    href: "/docs/getting-started",
    route: "/docs/getting-started",
  },
];

export function MainLayout({ router }) {
  const { $route } = router;
  const mobileSidebarParentRef = new elmRef();
  const mobileSideBarRef = new elmRef();
  const mobileCloseButtonRef = new elmRef();
  const sidebarBackdropRef = new elmRef();
  const userMenuRef = new elmRef();

  const mobileSidebarClick = () => {
    mobileSidebarParentRef.show();

    sidebarBackdropRef.transition("opacity-0", "opacity-100", 100);
    mobileSideBarRef.transition("-translate-x-full", "translate-x-0", 100);
    mobileCloseButtonRef.transition("opacity-0", "opacity-100", 100);
    mobileSidebarParentRef.addClick(closeMobileSidebar);
  };
  const closeMobileSidebar = () => {
    sidebarBackdropRef.transition("opacity-100", "opacity-0");
    mobileSideBarRef.transition("translate-x-0", "-translate-x-full");
    mobileCloseButtonRef.transition("opacity-100", "opacity-0");
    mobileSidebarParentRef.hide(310);
    mobileSidebarParentRef.removeClick(closeMobileSidebar);
  };
  return (
    <>
      <div
        onMount={() =>
          (document.head.parentElement!.className = "h-full bg-zinc-200")
        }
      >
        {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
        <div
          class="relative z-50 hidden"
          ref={mobileSidebarParentRef}
          role="dialog"
          aria-modal="true"
        >
          {/* <!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
          <div
            class="fixed inset-0 bg-gray-900/80 opacity-0 transition-opacity duration-300 ease-linear"
            ref={sidebarBackdropRef}
          ></div>

          <div class="fixed inset-0 flex">
            {/* <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      --> */}
            <div
              ref={mobileSideBarRef}
              class=" relative mr-16 flex w-full max-w-xs flex-1 -translate-x-full transition duration-300 ease-in-out"
            >
              {/* <!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
              <div
                ref={mobileCloseButtonRef}
                class=" absolute left-full top-0 flex w-16 justify-center pt-5 opacity-0 transition duration-300 ease-in-out"
              >
                <button
                  onClick={closeMobileSidebar}
                  type="button"
                  class="-m-2.5 p-2.5"
                >
                  <span class="sr-only">Close sidebar</span>
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
              <div class="z-10 flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <a href="/" class="flex h-16 shrink-0 items-center text-white">
                  <img
                    class="h-8 w-auto"
                    src="/rezact-logo.svg"
                    alt="Rezact Logo"
                  />
                  Rezact
                </a>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        {/* <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" --> */}
                        {nav.map((Item) => {
                          const baseClass =
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6";
                          const activeClass = `${baseClass} text-white bg-gray-800`;
                          const inactiveClass = `${baseClass} text-gray-400 hover:bg-gray-800`;

                          return (
                            <li>
                              <a
                                href={Item.href}
                                class={
                                  $route === Item.route
                                    ? activeClass
                                    : inactiveClass
                                }
                              >
                                <Item.icon class="h-6 w-6 shrink-0" />
                                {Item.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li class="mt-auto">
                      <a
                        href="/page1"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <SettingsIcon class="h-6 w-6 shrink-0" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Static sidebar for desktop --> */}
        <div
          id="test"
          class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col"
        >
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <a href="/" class="flex h-16 shrink-0 items-center text-white">
              <img
                class="h-8 w-auto"
                src="/rezact-logo.svg"
                alt="Rezact Logo"
              />
              Rezact
            </a>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    {/* <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" --> */}
                    {nav.map((Item) => {
                      const baseClass =
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6";
                      const activeClass = `${baseClass} text-white bg-gray-800`;
                      const inactiveClass = `${baseClass} text-gray-400 hover:bg-gray-800`;

                      return (
                        <li>
                          <a
                            href={Item.href}
                            class={
                              $route === Item.route
                                ? activeClass
                                : inactiveClass
                            }
                          >
                            <Item.icon class="h-6 w-6 shrink-0" />
                            {Item.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li class="mt-auto">
                  <a
                    href="/page1"
                    class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <SettingsIcon class="h-6 w-6 shrink-0" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="lg:pl-72">
          <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              onClick={mobileSidebarClick}
              type="button"
              class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span class="sr-only">Open sidebar</span>
              <img
                class="h-8 w-auto"
                src="/rezact-logo.svg"
                alt="Rezact Logo"
              />
            </button>

            {/* <!-- Separator --> */}
            <div
              class="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            ></div>

            <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div class="relative flex flex-1"></div>
              <div class="flex items-center gap-x-4 lg:gap-x-6"></div>
            </div>
          </div>

          <main class="py-10">
            <div class="px-4 sm:px-6 lg:px-8">{router.outlet}</div>
          </main>
        </div>
      </div>
    </>
  );
}
