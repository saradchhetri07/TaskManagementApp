import { Knex } from "knex";

const TABLE_NAME = "todos"; // Replace with your actual table name

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.renameColumn("timeStamp", "created_at"); // Rename the column
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.renameColumn("created_at", "timeStamp"); // Revert back if needed
  });
}
