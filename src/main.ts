import { router } from "./appRouter";

// router.beforeEach(async (to) => {
//   console.log("beforeEach", to);
//   return to.path;
//   // location.assign(import.meta.env.VITE_SIGN_IN_URL);
// });

router.routeChanged();
