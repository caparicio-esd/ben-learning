import "reflect-metadata";
import { MikroORM, RequiredEntityData } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import { MySqlDriver } from "@mikro-orm/mysql";

const main = async () => {
  const orm = await MikroORM.init<MySqlDriver>(mikroORMConfig);
  await orm.getMigrator().up();

  const post = orm.em.create<Post>(Post, {
    title: "hola...",
  } as RequiredEntityData<Post>);
  orm.em.persistAndFlush(post);
};

main().catch((err) => {
  console.error(err);
});

