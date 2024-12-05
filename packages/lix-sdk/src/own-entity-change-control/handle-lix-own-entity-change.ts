import type { Kysely } from "kysely";
import type { LixDatabaseSchema, Snapshot } from "../database/schema.js";
import { createChange } from "../change/create-change.js";
import {
	changeControlledTables,
	entityIdForRow,
} from "./change-controlled-tables.js";

export async function handleLixOwnEntityChange(
	db: Kysely<LixDatabaseSchema>,
	tableName: keyof LixDatabaseSchema,
	operation: "insert" | "update" | "delete",
	...values: any[]
): Promise<void> {
	const executeInTransaction = async (trx: Kysely<LixDatabaseSchema>) => {
		// need to break the loop if own changes are detected
		const change = await trx
			.selectFrom("change")
			.where("id", "=", values[0])
			.select("plugin_key")
			.executeTakeFirst();

		if (change?.plugin_key === "lix_own_entity") {
			return;
		}
		const currentVersion = await trx
			.selectFrom("current_version")
			.innerJoin("version", "current_version.id", "version.id")
			.selectAll("version")
			.executeTakeFirstOrThrow();

		const authors = await trx
			.selectFrom("active_account")
			.selectAll()
			.execute();

		if (authors.length === 0) {
			console.error(tableName, change);
			throw new Error("At least one author is required");
		}

		let snapshotContent: Snapshot["content"] | null;

		if (operation === "delete") {
			snapshotContent = null;
		} else {
			snapshotContent = {};
			// construct the values as json for the snapshot
			for (const [index, column] of changeControlledTables[
				tableName
			]!.entries()) {
				snapshotContent[column] = values[index];
			}
		}

		const entityId = entityIdForRow(tableName, values);

		await createChange({
			lix: { db: trx },
			authors: authors,
			version: currentVersion,
			entityId,
			fileId: "null",
			pluginKey: "lix_own_entity",
			schemaKey: `lix_${tableName}`,
			snapshotContent,
		});
	};
	if (db.isTransaction) {
		await executeInTransaction(db);
	} else {
		await db.transaction().execute(executeInTransaction);
	}
}
