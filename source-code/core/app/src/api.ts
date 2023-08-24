import type { InlangConfig } from "@inlang/config"
import type {
	InvalidLintRuleError,
	LintRuleThrowedError,
	LintReport,
	LintRule,
	LintLevel,
} from "@inlang/lint"
import type { Message } from "@inlang/messages"
import type { Result } from "@inlang/result"
import type {
	InvalidConfigError,
	NoMessagesPluginError,
	PluginSaveMessagesError,
} from "./errors.js"
import type {
	Plugin,
	PluginReturnedInvalidAppSpecificApiError,
	PluginFunctionDetectLanguageTagsAlreadyDefinedError,
	PluginFunctionLoadMessagesAlreadyDefinedError,
	PluginFunctionSaveMessagesAlreadyDefinedError,
	PluginUsesInvalidIdError,
	PluginUsesInvalidSchemaError,
	PluginUsesReservedNamespaceError,
	RuntimePluginApi,
} from "@inlang/plugin"
import type { ModuleImportError, ModuleError } from "@inlang/module"

export type InstalledPlugin = {
	meta: Plugin["meta"]
	/**
	 * The module which the plugin is installed from.
	 */
	module: string
	// disabled: boolean
}

export type InstalledLintRule = {
	meta: LintRule["meta"]
	/**
	 * The module which the lint rule is installed from.
	 */
	module: string
	lintLevel: LintLevel
	disabled: boolean
}

export type InlangProject = {
	installed: {
		plugins: Subscribable<() => InstalledPlugin[]>
		lintRules: Subscribable<() => InstalledLintRule[]>
	}
	errors: Subscribable<
		() => (
			| ModuleImportError
			| ModuleError
			| PluginReturnedInvalidAppSpecificApiError
			| PluginFunctionDetectLanguageTagsAlreadyDefinedError
			| PluginFunctionLoadMessagesAlreadyDefinedError
			| PluginFunctionSaveMessagesAlreadyDefinedError
			| PluginUsesInvalidIdError
			| PluginUsesInvalidSchemaError
			| PluginUsesReservedNamespaceError
			| InvalidLintRuleError
			| LintRuleThrowedError
			| PluginSaveMessagesError
			| NoMessagesPluginError
			| Error
		)[]
	>
	appSpecificApi: Subscribable<() => RuntimePluginApi["appSpecificApi"]>
	config: Subscribable<() => InlangConfig>
	setConfig: (config: InlangConfig) => Result<void, InvalidConfigError>
	query: {
		messages: MessageQueryApi
	}
	lint: {
		/**
		 * Initialize lint.
		 */
		init: () => Promise<void>
		// for now, only simply array that can be improved in the future
		// see https://github.com/inlang/inlang/issues/1098
		reports: Subscribable<() => LintReport[]>
	}
}

export type Subscribable<Value extends (...args: any[]) => unknown> = {
	(...args: Parameters<Value>): ReturnType<Value>
	subscribe: (callback: (value: ReturnType<Value>) => void) => void
}

export type MessageQueryApi = {
	create: (args: { data: Message }) => boolean
	get: Subscribable<(args: { where: { id: Message["id"] } }) => Message | undefined>
	getAll: Subscribable<() => { [id: string]: Message }>
	update: (args: { where: { id: Message["id"] }; data: Partial<Message> }) => boolean
	upsert: (args: { where: { id: Message["id"] }; data: Message }) => void
	delete: (args: { where: { id: Message["id"] } }) => boolean
}
