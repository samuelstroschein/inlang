import { humanIdHash } from "../../bundle-id/bundle-id.js";
import type { MessageV1, PatternV1 } from "../../schema/schemaV1.js";
import type {
	BundleNested,
	Declaration,
	Expression,
	MessageNested,
	Pattern,
	Variant,
} from "../../schema/schemaV2.js";

/**
 * Converts a MessageV1 into a BundleNested
 *
 * @throws If the message cannot be represented in the v1 format
 */
export function fromMessageV1(messageV1: MessageV1): BundleNested {
	const bundleId = humanIdHash(messageV1.id);

	const languages = [
		...new Set(messageV1.variants.map((variant) => variant.languageTag)),
	];

	const messages: MessageNested[] = languages.map((language): MessageNested => {
		const messageId = bundleId + "_" + language;
		//All variants that will be part of this message
		const v1Variants = messageV1.variants.filter(
			(variant) => variant.languageTag === language
		);

		//find all selector names
		const selectorNames = new Set<string>();
		for (const v1Selector of messageV1.selectors) {
			selectorNames.add(v1Selector.name);
		}
		const selectors: Expression[] = [...selectorNames].map((name) => ({
			type: "expression",
			annotation: undefined,
			arg: {
				type: "variable",
				name: name,
			},
		}));

		//The set of variables that need to be defined - Certainly includes the selectors
		const variableNames = new Set<string>(selectorNames);
		const variants: Variant[] = [];
		let variantIndex = 1;
		for (const v1Variant of v1Variants) {
			for (const element of v1Variant.pattern) {
				if (element.type === "VariableReference") {
					variableNames.add(element.name);
				}
			}

			variants.push({
				match: v1Variant.match,
				pattern: fromPatternV1(v1Variant.pattern),
				id: messageId + "_" + variantIndex,
				messageId: messageId,
			});
			variantIndex += 1;
		}

		//Create an input declaration for each variable and selector we need
		const declarations: Declaration[] = [...variableNames].map((name) => ({
			type: "input",
			name,
			value: {
				type: "expression",
				annotation: undefined,
				arg: {
					type: "variable",
					name,
				},
			},
		}));

		return {
			id: messageId,
			bundleId: bundleId,
			locale: language,
			declarations,
			selectors,
			variants,
		};
	});

	return {
		id: bundleId,
		alias: {
			default: messageV1.id,
		},
		messages,
	};
}
function fromPatternV1(pattern: PatternV1): Pattern {
	return pattern.map((element) => {
		switch (element.type) {
			case "Text": {
				return {
					type: "text",
					value: element.value,
				};
			}
			case "VariableReference":
				return {
					type: "expression",
					arg: {
						type: "variable",
						name: element.name,
					},
				};
		}
	});
}