
import { FastifyInstance } from "fastify";
import { UserType, RequestBodyType } from "../../lib/Type";

import { User } from "../../db/entity/User.entity";
import { UserDetail } from "../../db/entity/UserDetail.entity";

import { ResponseUserType } from '../Type'


export const prepareResult = (savedUser:User, savedUserDetail:UserDetail) => {
  return {
    user_id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    password: savedUser.password,
    u_created_at: savedUser.created_at,
    u_updated_at: savedUser.updated_at,
    udetail_id: savedUserDetail.id,
    nick: savedUserDetail.nick,
    fullName: savedUserDetail.fullName,
    ud_created_at: savedUserDetail.created_at,
    ud_updated_at: savedUserDetail.updated_at,
  };
}

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
      return prepareResult(savedUser, savedUserDetail);
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
    return prepareResult(savedUser, savedUserDetail);
  } catch (error) {
    throw new Error(error as string);
  }
}  