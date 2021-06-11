import Hapi from "@hapi/hapi";
import { routes } from "./routes";

const server: Hapi.Server = Hapi.server({
  port: 5000,
  host: "localhost",
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

async function createServer(): Promise<Hapi.Server> {
  server.route(routes);

  await server.initialize();

  return server;
}

async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  server.log(`info`, `Server running on ${server.info.uri}`);
  return server;
}

createServer()
  .then(startServer)
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
