import { useRouter } from "@rezact/rezact/router";

const router = useRouter();

router.addRoute("/404", () => import("./Pages/test"));
router.addRoute("/", () => import("./Pages"));

export { router };
