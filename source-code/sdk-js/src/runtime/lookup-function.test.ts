import { createLookupFunction } from "./lookup-function.js"
import { test, describe, expect } from "vitest"
import type { Resource } from "@inlang/core/ast"

const resource = {
	type: "Resource",
	languageTag: {
		type: "LanguageTag",
		name: "en",
	},
	body: [
		{
			type: "Message",
			id: {
				type: "Identifier",
				name: "hello",
			},
			pattern: {
				type: "Pattern",
				elements: [{ type: "Text", value: "world" }],
			},
		},
		{
			type: "Message",
			id: {
				type: "Identifier",
				name: "welcome",
			},
			pattern: {
				type: "Pattern",
				elements: [
					{ type: "Text", value: "Welcome, " },
					// { type: 'Placeholder', name: 'name' },
					{ type: "Text", value: "!" },
				],
			},
		},
	],
} satisfies Resource

describe("createLookupFunction", () => {
	test("it should resolve the message", () => {
		const fn = createLookupFunction(resource)

		const result = fn("hello")

		expect(result).toBe("world")
	})

	test("it should resolve the message with placeholder", () => {
		const fn = createLookupFunction(resource)

		const result = fn("welcome", { name: "Inlang" })

		expect(result).toBe("Welcome, !")
	})

	test("it should return an empty string if key does not exist in resource", () => {
		const fn = createLookupFunction(resource)

		const result = fn("missing-key")

		expect(result).toBe("")
	})
})
