import { useRouter } from "@rezact/rezact/router";
import { Page as FourOhFour } from "./Pages/404";
import { routes } from "./routes";

const router = useRouter();

router.addRoute("/404", FourOhFour);

router.addRoutesFromConfig(routes);

console.log("router", routes[0].component.toString().split(/["'`]/)[1]);

export { router };
