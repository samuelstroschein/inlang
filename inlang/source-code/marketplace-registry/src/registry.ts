//! Do not edit this file manually. It is automatically generated based on the contents of the registry.json file.

import type { MarketplaceManifest } from "@inlang/marketplace-manifest"
export const registry: MarketplaceManifest[] = [
	{
		id: "app.inlang.badge",
		icon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/badge-marketplace-cover.jpg",
		],
		displayName: {
			en: "Translation status badge",
		},
		description: {
			en: "Badge showing missing messages in your codebase. Perfect for your README.md file.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/badge/README.md",
		},
		keywords: ["application", "badge"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
	},
	{
		id: "app.inlang.cli",
		icon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/cli-marketplace-cover.jpg",
		],
		displayName: {
			en: "CLI",
		},
		description: {
			en: "Command line interface for inlang projects. Many commands and the possibility to do automation.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/cli/README.md",
		},
		keywords: ["cli", "commands"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
	},
	{
		id: "app.inlang.editor",
		icon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/editor-marketplace-cover.jpg",
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/editor-gallery/editor-gallery-image-1.jpg",
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/editor-gallery/editor-gallery-image-2.jpg",
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/editor-gallery/editor-gallery-image-3.jpg",
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/editor-gallery/editor-gallery-image-4.jpg",
		],
		displayName: {
			en: "Web Editor",
		},
		description: {
			en: "The inlang Web Editor enables you to work with globalized codebases in your browser, without having to touch code but still being able to have a git-based workflow.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/editor/README.md",
		},
		keywords: ["application", "editor", "web"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		website: "/editor",
		license: "Apache-2.0",
	},
	{
		id: "library.inlang.languageTag",
		icon: "https://images.emojiterra.com/google/android-12l/512px/1f4db.png",
		displayName: {
			en: "Language Tag",
		},
		description: {
			en: "A library containing BCP-47 language tags types and validators, used by inlang.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/versioned-interfaces/language-tag/README.md",
		},
		keywords: ["lang", "language tag"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
	},
	{
		id: "library.inlang.paraglideJsSveltekit",
		icon: "https://emojis.wiki/thumbs/emojis/parachute.webp",
		displayName: {
			en: "paraglideJS (former SDK-JS)",
		},
		description: {
			en: "A fully configurable JavaScript library that integrates within your framework.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/paraglide-js-sveltekit/README.md",
		},
		keywords: ["application", "sdk", "paraglide", "sdk-js", "sveltekit", "svelte"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
	},
	{
		id: "library.inlang.translatable",
		icon: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/svg/1f310.svg",
		displayName: {
			en: "Translatable",
		},
		description: {
			en: "This library allows you to add translation logic to your application without having to rewrite large parts.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/versioned-interfaces/translatable/README.md",
		},
		keywords: ["translatable", "adoptable"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "messageLintRule.inlang.emptyPattern",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/emptyPattern/assets/icon.png",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/empty_pattern-marketplace-cover.jpg",
		],
		displayName: {
			en: "Empty pattern",
		},
		description: {
			en: "Checks for empty pattern in a language tag. If a message exists in the reference resource but the pattern in a target resource is empty, it is likely that the message has not been translated yet.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/emptyPattern/README.md",
		},
		keywords: ["application", "lint rule", "empty pattern"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module:
			"https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "messageLintRule.inlang.emptyPattern",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/emptyPattern/assets/icon.png",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/empty_pattern-marketplace-cover.jpg",
		],
		displayName: {
			en: "Empty pattern",
		},
		description: {
			en: "Checks for empty pattern in a language tag. If a message exists in the reference resource but the pattern in a target resource is empty, it is likely that the message has not been translated yet.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/emptyPattern/README.md",
		},
		categories: ["application"],
		keywords: ["lint rule", "empty pattern"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module:
			"https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "messageLintRule.inlang.identicalPattern",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/identicalPattern/assets/icon.png",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/identical_pattern-marketplace-cover.jpg",
		],
		displayName: {
			en: "Identical pattern",
		},
		description: {
			en: "Checks for identical patterns in different languages.  A message with identical wording in multiple languages can indicate that the translations are redundant or can be combined into a single message to reduce translation effort.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/identicalPattern/README.md",
		},
		keywords: ["application", "lint rule", "itentical pattern"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module:
			"https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-identical-pattern@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "messageLintRule.inlang.messageWithoutSource",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/messageWithoutSource/assets/icon.png",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/without_source-marketplace-cover.jpg",
		],
		displayName: {
			en: "Message without source",
		},
		description: {
			en: "Checks for likely outdated messages.  A message with a missing source is usually an indication that the message (id) is no longer used in source code, but messages have not been updated accordingly.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/messageWithoutSource/README.md",
		},
		keywords: ["application", "lint rule", "source"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module:
			"https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "messageLintRule.inlang.missingTranslation",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/missingTranslation/assets/icon.png",
		gallery: [
			"https://cdn.jsdelivr.net/gh/inlang/monorepo@latest/inlang/assets/marketplace/missing_translation-marketplace-cover.jpg",
		],
		displayName: {
			en: "Missing translation",
		},
		description: {
			en: "Checks for missing variants for a specific languageTag.  If a variant exists for the sourceLanguageTag but is missing for a listed languageTag, it is likely that the message has not been translated for this languageTag yet.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/message-lint-rules/missingTranslation/README.md",
		},
		keywords: ["application", "lint rule", "missing"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module:
			"https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "plugin.inlang.i18next",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/plugins/i18next/assets/icon.png",
		displayName: {
			en: "i18next",
		},
		description: {
			en: "A plugin for inlang projects that works with i18next and reads + writes resources.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/plugins/i18next/README.md",
		},
		keywords: ["application", "i18next", "react", "nextjs"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module: "https://cdn.jsdelivr.net/npm/@inlang/plugin-i18next@latest/dist/index.js",
	},
	{
		$schema: "https://inlang.com/schema/marketplace-manifest",
		id: "plugin.inlang.json",
		icon: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/plugins/json/assets/icon.png",
		displayName: {
			en: "JSON translation files",
		},
		description: {
			en: "This plugin enables using JSON files for messages. It is not library specific and can be used with any framework.",
		},
		readme: {
			en: "https://cdn.jsdelivr.net/gh/inlang/monorepo@main/inlang/source-code/plugins/json/README.md",
		},
		keywords: ["json", "generic"],
		publisherName: "inlang",
		publisherIcon: "https://inlang.com/favicon/safari-pinned-tab.svg",
		license: "Apache-2.0",
		module: "https://cdn.jsdelivr.net/npm/@inlang/plugin-json@latest/dist/index.js",
	},
]
