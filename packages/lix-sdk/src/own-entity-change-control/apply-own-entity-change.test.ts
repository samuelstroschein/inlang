import { test, expect } from "vitest";
import { openLixInMemory } from "../lix/open-lix-in-memory.js";
import type { Change } from "../database/schema.js";
import { applyOwnEntityChange } from "./apply-own-entity-change.js";
import { mockJsonSnapshot } from "../snapshot/mock-json-snapshot.js";

test("it should apply insert changes correctly", async () => {
	const lix = await openLixInMemory({});

	const snapshot = mockJsonSnapshot({
		key: "key1",
		value: "value1",
	});

	const change: Change = {
		id: "change1",
		entity_id: "key1",
		schema_key: "lix_key_value",
		plugin_key: "lix_own_entity",
		file_id: "null",
		snapshot_id: snapshot.id,
		created_at: "2021-01-01T00:00:00.000Z",
	};

	await lix.db
		.insertInto("snapshot")
		.values({ content: snapshot.content })
		.execute();

	await applyOwnEntityChange({ lix, change });

	const result = await lix.db
		.selectFrom("key_value")
		.where("key", "=", "key1")
		.selectAll()
		.executeTakeFirst();

	expect(result).toEqual({ key: "key1", value: "value1" });
});

test("it should apply update changes correctly", async () => {
	const lix = await openLixInMemory({});

	await lix.db
		.insertInto("key_value")
		.values({ key: "key1", value: "old_value" })
		.execute();

	const snapshot = mockJsonSnapshot({
		key: "key1",
		value: "new_value",
	});

	const change: Change = {
		id: "change1",
		schema_key: "lix_key_value",
		entity_id: "key1",
		file_id: "null",
		created_at: "2021-01-01T00:00:00.000Z",
		plugin_key: "lix_own_entity",
		snapshot_id: snapshot.id,
	};

	await lix.db
		.insertInto("snapshot")
		.values({
			content: snapshot.content,
		})
		.execute();

	await applyOwnEntityChange({ lix, change });

	const result = await lix.db
		.selectFrom("key_value")
		.where("key", "=", "key1")
		.selectAll()
		.executeTakeFirst();

	expect(result).toEqual({ key: "key1", value: "new_value" });
});

test("it should apply delete changes correctly", async () => {
	const lix = await openLixInMemory({});

	await lix.db
		.insertInto("key_value")
		.values({ key: "key1", value: "value1" })
		.execute();

	const change: Change = {
		id: "change1",
		schema_key: "lix_key_value",
		file_id: "null",
		created_at: "2021-01-01T00:00:00.000Z",
		entity_id: "key1",
		plugin_key: "lix_own_entity",
		snapshot_id: "no-content",
	};

	await applyOwnEntityChange({ lix, change });

	const result = await lix.db
		.selectFrom("key_value")
		.where("key", "=", "key1")
		.selectAll()
		.executeTakeFirst();

	expect(result).toBeUndefined();
});

test("it should throw an error for invalid plugin key", async () => {
	const lix = await openLixInMemory({});

	const change: Change = {
		id: "change1",
		schema_key: "lix_key_value",
		entity_id: "key1",
		file_id: "null",
		created_at: "2021-01-01T00:00:00.000Z",
		plugin_key: "invalid-plugin",
		snapshot_id: "snapshot1",
	};

	const snapshot = mockJsonSnapshot({
		key: "key1",
		value: "value1",
	});

	await lix.db
		.insertInto("snapshot")
		.values({
			content: snapshot.content,
		})
		.execute();

	await expect(applyOwnEntityChange({ lix, change })).rejects.toThrow(
		"Expected 'lix_own_entity' as plugin key but received invalid-plugin"
	);
});
