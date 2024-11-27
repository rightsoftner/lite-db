
import { FastifyInstance } from "fastify";
import { UserType, RequestBodyType } from "../../lib/Type";

import { User } from "../../db/entity/User.entity";
import { UserDetail } from "../../db/entity/UserDetail.entity";

import { ResponseUserType } from '../Type'

export const saveUserWithDetailsByTransaction = async <ResponseUserType>(server: FastifyInstance, { name, email, password, nick, fullName }: RequestBodyType)  =>
{
  try {
    const result = await server.orm["typeorm"].transaction(async (manager) => {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      const savedUser = await manager.save(user);
    
      const userDetail = new UserDetail();
      userDetail.nick = nick;
      userDetail.fullName = fullName;
      userDetail.user = savedUser;
      const savedUserDetail = await manager.save(userDetail);
      const result = {
        ...savedUser,
        ...savedUserDetail,
      };
      return result;
    });
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
}

export const saveUserWithDetailsSeparately = async <ResponseUserType>(server: FastifyInstance, { name, email, password, nick, fullName }: RequestBodyType) =>
{
  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    const userRepository = server.orm["typeorm"].getRepository(User);
    const savedUser = await userRepository.save(user)
  
    const userDetail = new UserDetail();
    userDetail.nick = nick;
    userDetail.fullName = fullName;
    userDetail.user = user;
    const userDetailRepository = server.orm["typeorm"].getRepository(UserDetail);
    const savedUserDetail = await userDetailRepository.save(userDetail);
    const result = {
      ...savedUser,
      ...savedUserDetail,
    };
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
}  