import { FastifyInstance } from "fastify";
import { UserType } from "../lib/Type";
import { User } from "../db/entity/User.entity";
import { UserDetail } from "../db/entity/UserDetail.entity";
import { IQuerystring, IReply, IdeleteReply } from "../lib/interfaces";

export function configureRoutes(server: FastifyInstance) {
  server.get<{ Reply: IReply }>("/", async (request, reply) => {
    const userRepository = server.orm["typeorm"].getRepository(User);
    const users = await userRepository.find();
    reply.code(200).send({ success: true, data: { users } });
  });
  server.post<{ Body: UserType; Reply: IReply }>(
    "/api/users",
    {
      preValidation: (request, reply, done) => {
        const { name, email, password, nick, fullName } = request.body;
        done(
          name.length < 2
            ? new Error("User's name must be more than 2 characters")
            : undefined
        );
      },
    },

    async (request, reply) => {
      // The `name` and `mail` types are automatically inferred
      const { name, email, password, nick, fullName } = request.body;
      try {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        const userDetail = new UserDetail();
        userDetail.nick = nick;
        userDetail.fullName = fullName;

        const userRepository = server.orm["typeorm"].getRepository(User);
        const result = await userRepository.save(user);
        reply.status(201).send({
          success: true,
          data: {
            users: [result],
          },
        });
      } catch (error) {
        reply.code(400).send({ error: error as string });
      }
    }
  );
  server.get<{ Querystring: IQuerystring; Reply: IReply }>(
    "/api/users",
    {
      preValidation: (request, reply, done) => {
        const { id } = request.query;
        done(
          id === "" || undefined
            ? new Error("please provide The id")
            : undefined
        );
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.query;
        const userRepository = server.orm["typeorm"].getRepository(User);
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
          reply.code(404).send({ error: "User not found" });
        } else {
          reply.code(200).send({
            success: true,
            data: {
              users: [user],
            },
          });
        }
      } catch (error) {
        console.log(error);
        reply.code(400).send({ error: error as string });
      }
    }
  );
  server.delete<{ Querystring: IQuerystring; Reply: IdeleteReply }>(
    "/api/users",
    async (request, reply) => {
      const { id } = request.query;
      const userRepository = server.orm["typeorm"].getRepository(User);
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        reply.code(404).send({ error: "User not found" });
      } else {
        await userRepository.remove(user);
        reply.code(200).send({ success: true });
      }
    }
  );
  server.put<{ Querystring: IQuerystring; Body: UserType; Reply: IReply }>(
    "/api/users",
    async (request, reply) => {
      const { id } = request.query;
      const { name, email, password } = request.body;
      const userRepository = server.orm["typeorm"].getRepository(User);
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        reply.code(404).send({ error: "User not found" });
      } else {
        user.name = name;
        user.password = password;
        user.email = email;
        await userRepository.save(user);
        reply.code(200).send({
          success: true,
          data: {
            users: [user],
          },
        });
      }
    }
  );
}