import { SqlEntityManager, MySqlDriver } from "@mikro-orm/mysql";

export interface EmContext {
    em: SqlEntityManager<MySqlDriver>
}
export interface NewPostResolver {
    title: string, 
    subtitle: string
}