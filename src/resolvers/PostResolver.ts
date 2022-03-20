import { Post } from "../entities/Post";
import { EmContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { QueryOrder } from "@mikro-orm/core";

@Resolver()
export class PostResolver {
  /**
   *
   */
  @Query(() => [Post])
  async getPosts(@Ctx() { em }: EmContext): Promise<Post[]> {
    return await em.find(Post, {});
  }

  /**
   *
   */
  @Query(() => Post)
  async getPost(
    @Ctx() { em }: EmContext,
    @Arg("id", () => Int) id: number
  ): Promise<Post | null> {
    return await em.findOne(Post, {
      id,
    });
  }

  /**
   *
   */
  @Query(() => [Post])
  async getLatestPost(
    @Ctx() { em }: EmContext,
    @Arg("num", () => Int, {
      defaultValue: 1,
    })
    num: number
  ): Promise<Post[]> {
    const qb = em.createQueryBuilder(Post);
    const post = await qb
      .select("*")
      .orderBy({ createdAt: QueryOrder.DESC })
      .limit(num);
    return post;
  }
}
