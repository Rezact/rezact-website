import { router } from "./appRouter";
import { restoreScroll } from "./lib/utils";

// router.beforeEach(async (to) => {
//   console.log("beforeEach", to);
//   return to.path;
//   // location.assign(import.meta.env.VITE_SIGN_IN_URL);
// });

router.afterEach(() => {
  restoreScroll();
});

router.routeChanged();
