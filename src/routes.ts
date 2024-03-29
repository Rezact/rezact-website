export const routes = [
  {
    path: "/",
    component: () => import("src/Pages/LandingPage"),
    title: "Rezact",
  },
  {
    path: "/playground",
    component: () => import("src/Pages/Playground"),
    title: "Rezact - Playground",
  },
  {
    path: "/counter-test",
    component: () => import("src/Pages/CounterTest"),
    title: "Rezact - Counter Test",
  },
  {
    path: "/docs",
    component: () => import("src/Docs/100_Intro.mdx"),
    title: "Rezact - Intro",
  },
  {
    path: "/docs/getting-started",
    component: () => import("src/Docs/200_GettingStarted.mdx"),
    title: "Rezact - Getting Started",
  },
  {
    path: "/docs/signals",
    component: () => import("src/Docs/300_Signals.mdx"),
    title: "Rezact - Signals",
  },
  {
    path: "/docs/effects",
    component: () => import("src/Docs/400_Effects.mdx"),
    title: "Rezact - Effects",
  },
  {
    path: "/docs/stores",
    component: () => import("src/Docs/500_Stores.mdx"),
    title: "Rezact - Stores",
  },
  {
    path: "/docs/gotchas",
    component: () => import("src/Docs/2600_Gotchas.mdx"),
    title: "Rezact - Effects",
  },
  // {
  //   path: "/page1",
  //   component: () => import("src/Pages/PageOne"),
  //   title: "Rezact",
  // },
  // {
  //   path: "/new-account",
  //   component: () => import("src/Pages/NewAccount"),
  //   title: "Rezact",
  // },

  // {
  //   path: "/invite",
  //   component: () => import("src/Pages/Invite"),
  //   title: "Rezact Invite",
  // },
  // {
  //   path: "/db/:dbID",
  //   component: () => import("src/Pages/Database"),
  //   title: "Rezact DB",
  // },

  // {
  //   path: "/users",
  //   component: () => import("src/Pages/Users"),
  //   title: "Rezact Users",
  // },
];
