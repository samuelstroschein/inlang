// @ts-ignore
import { v4 as uuid } from "uuid";
import type {
	Bundle,
	BundleNested,
	Expression,
	MessageNested,
	Text,
	Variant,
} from "./schema/schemaV2.js";
import type { ProjectSettings } from "./schema/settings.js";
import { generateBundleId } from "./bundle-id/bundle-id.js";

/**
 * create v2 Bundle with a random human ID
 * @example createBundle({
 *   messages: [
 * 		 createMessage({locale: "en", text: "Hello world!"})
 * 		 createMessage({locale: "de", text: "Hallo Welt!"})
 *   ]
 * })
 */
export function createBundle(args: {
	id?: string;
	messages: MessageNested[];
	alias?: Bundle["alias"];
}): BundleNested {
	return {
		id: args.id ?? generateBundleId(),
		alias: args.alias ?? {},
		messages: args.messages,
	};
}

/**
 * create v2 Messsage AST with a randomId, and text-only pattern
 * @example createMessage({locale: "en", text: "Hello world"})
 */
export function createMessage(args: {
	bundleId: string;
	locale: ProjectSettings["locales"][number];
	text: string;
	match?: Record<Expression["arg"]["name"], string>;
}): MessageNested {
	const messageId = uuid();
	return {
		bundleId: args.bundleId,
		id: messageId,
		locale: args.locale,
		declarations: [],
		selectors: [],
		variants: [
			createVariant({
				messageId: messageId,
				text: args.text,
				match: args.match,
			}),
		],
	};
}

/**
 * create v2 Variant AST with text-only pattern
 * @example createVariant({match: ["*"], text: "Hello world"})
 */
export function createVariant(args: {
	messageId: string;
	id?: string;
	text?: string;
	match?: Record<Expression["arg"]["name"], string>;
}): Variant {
	return {
		messageId: args.messageId,
		id: args.id ? args.id : uuid(),
		match: args.match ? args.match : {},
		pattern: [toTextElement(args.text ?? "")],
	};
}

export function toTextElement(text: string): Text {
	return {
		type: "text",
		value: text,
	};
}