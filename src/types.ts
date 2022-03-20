import { SqlEntityManager, MySqlDriver } from "@mikro-orm/mysql";
import { Field, InputType } from "type-graphql";

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
