import { Post } from "../entities/Post";
import {
  EmContext,
  NewPost,
  NewPostResolverObject,
  UpdatePostResolverObject,
} from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { QueryOrder, RequiredEntityData } from "@mikro-orm/core";

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

  /**
   *
   */
  @Mutation(() => Post)
  async createPost(
    @Ctx() { em }: EmContext,
    @Arg("postData", () => NewPostResolverObject) postData: NewPost
  ): Promise<Post> {
    const post = em.create(Post, {
      title: postData.title,
      subtitle: postData.subtitle,
    } as RequiredEntityData<Post>);
    await em.persistAndFlush(post);
    return post;
  }

  /**
   *
   */
  @Mutation(() => Post)
  async updatePost(
    @Ctx() { em }: EmContext,
    @Arg("postData", () => UpdatePostResolverObject) postData: NewPost,
    @Arg("id", () => Int) id: number
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (post) {
      post.title = postData.title!;
      post.subtitle = postData.subtitle || "";
      return post;
    } else {
      return null;
    }
  }

  /**
   *
   */
  @Mutation(() => Boolean)
  async deletePost(
    @Ctx() { em }: EmContext,
    @Arg("id", () => Int) id: number
  ): Promise<Boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
