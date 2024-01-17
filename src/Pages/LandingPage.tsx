import { elmRef } from "src/lib/utils";
import Intro from "src/LandingSections/100_Intro.mdx";
import Signals from "src/LandingSections/200_Signals.mdx";
import Router from "src/LandingSections/300_Routing.mdx";
import Counter from "src/components/Counter";

const nav = [
  { title: "Intro", href: "#top" },
  { title: "Features", href: "#features" },
  { title: "Docs", href: "/docs" },
];

const topSection: any = {};
const introSectionRef: any = {};
const signalsSectionRef: any = {};
const routerSectionRef: any = {};

const sectionRefs = [
  topSection,
  introSectionRef,
  signalsSectionRef,
  routerSectionRef,
];

let scrollDebounce: any = null;
let prevScrollY = window.scrollY;

function LandingScroll() {
  if (scrollDebounce) return;
  prevScrollY = window.scrollY;

  scrollDebounce = setTimeout(() => {
    scrollDebounce = null;
    if (prevScrollY !== window.scrollY) return LandingScroll();
    let currentSection = "";

    sectionRefs.forEach((section, idx) => {
      if (!section.elm) return;
      if (location.pathname !== "/") return;
      const sectionTop = section.elm.offsetTop;
      const sectionHeight = section.elm.clientHeight;

      if (idx === 0 && window.scrollY < sectionTop - sectionHeight / 3) {
        currentSection = section.elm.getAttribute("id");
      } else if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.elm.getAttribute("id");
      } else if (
        idx === sectionRefs.length - 1 &&
        window.scrollY > sectionTop + sectionHeight / 3
      ) {
        currentSection = section.elm.getAttribute("id");
      }
    });

    if (currentSection !== "" && "#" + currentSection !== location.hash) {
      window.history.pushState(null, "", "#" + currentSection);
    }
  }, 250);
}

export function Page() {
  const mobileSidebarParentRef = new elmRef();
  const mobileSideBarRef = new elmRef();
  const sidebarBackdropRef = new elmRef();

  const mobileSidebarClick = () => {
    mobileSidebarParentRef.show();

    sidebarBackdropRef.transition("opacity-0", "opacity-100", 50);
    mobileSideBarRef.transition("translate-x-full", "translate-x-0", 50);
    mobileSidebarParentRef.addClick(closeMobileSidebar);
  };

  const closeMobileSidebar = () => {
    sidebarBackdropRef.transition("opacity-100", "opacity-0");
    mobileSideBarRef.transition("translate-x-0", "translate-x-full");
    mobileSidebarParentRef.hide(310);
    mobileSidebarParentRef.removeClick(closeMobileSidebar);
  };
  return (
    <div
      class="bg-zinc-900"
      onMount={() => {
        document.head.parentElement!.className = "h-full bg-zinc-900";
        setTimeout(() => {
          window.addEventListener("scroll", LandingScroll);
        }, 1000);
      }}
      onUnmount={() => {
        window.removeEventListener("scroll", LandingScroll);
      }}
    >
      <div ref={topSection} id="top"></div>
      <header class="sticky inset-x-0 top-0 z-10 backdrop-blur-sm backdrop-filter">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5 text-white">
              <span class="sr-only">Rezact</span>
              <img
                class="h-8 w-auto"
                src="/rezact-logo.svg"
                alt="Rezact Logo"
              />
              Rezact
            </a>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              onClick={mobileSidebarClick}
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            {nav.map((item) => (
              <a
                href={item.href}
                class="text-sm font-semibold leading-6 text-white"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </header>
      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      <div
        ref={mobileSidebarParentRef}
        class="hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
        <div
          ref={sidebarBackdropRef}
          class="fixed inset-0 z-50 bg-zinc-900/80 opacity-0 transition-opacity duration-300 ease-linear"
        ></div>
        <div
          ref={mobileSideBarRef}
          class="fixed inset-y-0 right-0 z-50 w-full translate-x-full overflow-y-auto bg-gray-900 px-6 py-6 transition duration-300 ease-in-out sm:max-w-sm sm:ring-1 sm:ring-white/10"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5 text-white">
              <span class="sr-only">Rezact</span>
              <img
                class="h-8 w-auto"
                src="/rezact-logo.svg"
                alt="Rezact Logo"
              />
              Rezact
            </a>
            <button
              type="button"
              onClick={closeMobileSidebar}
              class="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
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
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/25">
              <div class="space-y-2 py-6">
                {nav.map((item) => (
                  <a
                    href={item.href}
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative isolate pt-14">
        <div class="py-6 sm:py-6 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class=" text-center">
              <img src="/rezact-logo.svg" alt="Rezact Logo" class="m-auto" />
              <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Rezact
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-300">
                Because its time for a better client side only framework
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/docs/getting-started"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Get started
                </a>
                <a
                  href="/docs"
                  class="text-sm font-semibold leading-6 text-white"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" class="relative isolate pt-14" ref={introSectionRef}>
        <div class="py-24 sm:py-32 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mdx mx-auto max-w-2xl text-white">
              <Intro />
            </div>
          </div>
        </div>
      </div>

      <div id="signals" class="relative isolate pt-14" ref={signalsSectionRef}>
        <div class="py-24 sm:py-32 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mdx mx-auto max-w-2xl text-white">
              <Signals />
              <Counter />
            </div>
          </div>
        </div>
      </div>

      <div id="router" class="relative isolate pt-14" ref={routerSectionRef}>
        <div class="py-24 sm:py-32 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mdx mx-auto max-w-2xl text-white">
              <Router />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}