import Hapi from "@hapi/hapi";
import { bookRoutes } from "./books";

export const routes: Hapi.ServerRoute[] = [...bookRoutes];
