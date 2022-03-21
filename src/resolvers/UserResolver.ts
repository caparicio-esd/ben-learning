import {
  EmContext,
  UserLoginResponse,
  UserRegisterObject,
  UserRegisterResolverObject,
  UserRegisterResponse,
} from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { RequiredEntityData } from "@mikro-orm/core";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  /**
   *
   */
  @Query(() => [User])
  async getUsers(@Ctx() { em }: EmContext): Promise<User[]> {
    return await em.find(User, {});
  }

  /**
   *
   */
  @Mutation(() => UserRegisterResponse)
  async register(
    @Ctx() { em }: EmContext,
    @Arg("registerData", () => UserRegisterResolverObject) registerData: UserRegisterObject,
  ): Promise<UserRegisterResponse> {
    const userAlready = await em.findOne(User, { userName: registerData.userName });
    if (userAlready) {
      const error = new UserRegisterResponse();
      error.errors = [{ name: "user exists", message: "user already exists" }];
      return error;
    }
    const hashedPassword = await argon2.hash(registerData.password);
    const user = em.create(User, {
      userName: registerData.userName,
      password: hashedPassword,
    } as RequiredEntityData<User>);
    em.persistAndFlush(user);
    const userResponse = new UserRegisterResponse();
    userResponse.user = user;
    return userResponse;
  }

  /**
   *
   */
  @Mutation(() => UserLoginResponse)
  async login(
    @Ctx() { em }: EmContext,
    @Arg("loginData", () => UserRegisterResolverObject) registerData: UserRegisterObject,
  ): Promise<UserLoginResponse> {
    const user = await em.findOne(User, { userName: registerData.userName });
    if (!user) {
      const error = new UserLoginResponse();
      error.errors = [{ name: "username", message: "username does not exist..." }];
      return error;
    }
    const isValidPassword = await argon2.verify(user.password, registerData.password);
    if (!isValidPassword) {
      const error = new UserLoginResponse();
      error.errors = [{ name: "password", message: "pass incorrect" }];
      return error;
    }
    const userResponse = new UserLoginResponse();
    userResponse.user = user;
    return userResponse;
  }
}
