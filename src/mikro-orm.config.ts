import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import path from "path";
import { MySqlDriver } from "@mikro-orm/mysql";
import { User } from "./entities/User";

export default {
  entities: [Post, User],
  dbName: "lilredit",
  type: "mysql",
  debug: true,
  user: "root",
  password: "root",
  host: "127.0.0.1",
  port: 3306,
  metadataProvider: ReflectMetadataProvider,
  allowGlobalContext: true,
  migrations: {
    path: path.resolve(__dirname, "migrations"),
    glob: "!(*.d).{js,ts}",
    emit: "ts",
  },
} as Options<MySqlDriver>;
