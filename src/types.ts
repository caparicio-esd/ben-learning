import { SqlEntityManager, MySqlDriver } from "@mikro-orm/mysql";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./entities/User";

export interface EmContext {
  em: SqlEntityManager<MySqlDriver>;
}
export interface NewPost {
  title?: string;
  subtitle?: string;
}
@InputType()
export class NewPostResolverObject implements NewPost {
  @Field()
  title: string;
  @Field()
  subtitle: string;
}

@InputType()
export class UpdatePostResolverObject implements NewPost {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  subtitle?: string;
}

export interface UserRegisterObject {
  userName: string;
  password: string;
}

@InputType()
export class UserRegisterResolverObject implements UserRegisterObject {
  @Field()
  userName!: string;
  @Field()
  password!: string;
}

@ObjectType()
export class FieldError {
  @Field()
  name: string;
  @Field()
  message: string;
}

export class UserResponse {
  user?: User;
  errors?: FieldError[];
}
@ObjectType()
export class UserLoginResponse extends UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class UserRegisterResponse extends UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}
