import type { TransformConfig } from "../../config.js"
import { deepmerge } from "deepmerge-ts"

type DeepPartial<T> = T extends Record<PropertyKey, unknown>
	? {
			[Key in keyof T]?: DeepPartial<T[Key]>
	  }
	: T

export const getTransformConfig = (overrides: DeepPartial<TransformConfig> = {}): TransformConfig =>
	deepmerge(
		{
			isStatic: false,
			languageInUrl: false,
			cwdFolderPath: "",
			srcFolder: "",
			rootRoutesFolder: "",
			sourceFileName: "",
			sourceMapName: "",
			inlang: {
				referenceLanguage: "en",
				languages: ["en", "de"],
				readResources: async () => [],
				writeResources: async () => undefined,
				sdk: {
					debug: false,
					languageNegotiation: {
						strict: false,
						strategies: [{ type: "localStorage", key: "language" }],
					},
					resources: {
						cache: "build-time",
					},
				},
			},
			svelteKit: {
				svelteConfig: {},
				usesTypeScript: false,
				version: undefined,
			},
		} satisfies TransformConfig,
		overrides as any,
	)
