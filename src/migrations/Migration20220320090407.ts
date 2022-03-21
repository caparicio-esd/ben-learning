import { Migration } from "@mikro-orm/migrations";

export class Migration20220320090407 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `post` add `subtitle` text not null;");
  }

  async down(): Promise<void> {
    this.addSql("alter table `post` drop `subtitle`;");
  }
}
