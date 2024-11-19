import plugin from "typeorm-fastify-plugin";
import { User } from "./db/entity/User.entity";
import { Profile } from "./db/entity/Profile.entity";
import { FastifyInstance } from "fastify";

export function configureDatabase(server: FastifyInstance) {
  server.register(plugin, {
    namespace: "typeorm",
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === "dev" ? true : false,
    logging: process.env.NODE_ENV === "dev" ? true : false,
    //migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    migrationsRun: process.env.NODE_ENV === "dev" ? false : false,
    entities: [User, Profile],
  });
}