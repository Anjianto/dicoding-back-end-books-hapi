import Hapi from "@hapi/hapi";
import bookRoutes from "./books";

const routes: Hapi.ServerRoute[] = [...bookRoutes];

export default routes;
