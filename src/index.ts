import "reflect-metadata";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { configureRoutes } from "./routes/users.routes";
import { configureDatabase } from "./db.config";
dotenv.config();
async function startServer() {
  const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();
 
  configureDatabase(server);

  configureRoutes(server);
  const { PORT = "19200" } = process.env;
  await server.listen({ port: parseInt(PORT) });
}
startServer()
  .then(() => {
    console.log(`Server started successfully at: ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });