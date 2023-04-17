import type { Language } from "@inlang/core/ast"
import type * as Kit from "@sveltejs/kit"
import { detectLanguage, Detector } from "../../../detectors/index.js"
import { initSvelteKitClientRuntime, SvelteKitClientRuntime } from "../client/runtime.js"
import {
	addRuntimePromiseToEvent,
	addRuntimeToData,
	DataWithRuntime,
	EventWithRuntimePromise,
	getRuntimePromiseFromEvent,
} from "../shared/utils.js"

// ------------------------------------------------------------------------------------------------

const initRuntime = async <Load extends Kit.Load<any, any, any, any, any>>(
	event: Parameters<Load>[0],
	options?: {
		initDetectors?: (event: Parameters<Load>[0]) => Detector[]
	},
): Promise<SvelteKitClientRuntime> => {
	const existingPromise = getRuntimePromiseFromEvent(event)
	if (existingPromise) return await existingPromise

	if (!options) {
		await new Promise((resolve) => setTimeout(resolve, 0))
		return initRuntime(event, options)
	}

	let resolveRuntimePromise: (runtime: SvelteKitClientRuntime) => void = undefined as unknown as (
		runtime: SvelteKitClientRuntime,
	) => void

	addRuntimePromiseToEvent(event, new Promise((resolve) => (resolveRuntimePromise = resolve)))

	const data = (event.data || {}) as DataPayload

	const { referenceLanguage = undefined as unknown as Language, languages = [] } = data

	// TODO: only add this conditional logic if client detection strategies get used
	const language =
		data.language || !options.initDetectors
			? data.language
			: await detectLanguage({ referenceLanguage, languages }, ...options.initDetectors(event))

	const runtime = await initSvelteKitClientRuntime({
		fetch: event.fetch,
		language: language!,
		referenceLanguage,
		languages,
	})

	resolveRuntimePromise(runtime)

	return runtime
}

// ------------------------------------------------------------------------------------------------

export type DataPayload = {
	referenceLanguage: Language
	languages: Language[]
	language: Language | undefined
}

export const initRootLayoutLoadWrapper = <
	LayoutLoad extends Kit.Load<any, any, any, any, any>,
>(options: {
	initDetectors?: (event: Parameters<LayoutLoad>[0]) => Detector[]
}) => ({
	wrap:
		<Data extends Record<string, any> | void>(
			load: (
				event: EventWithRuntimePromise<Parameters<LayoutLoad>[0]>,
				runtime: SvelteKitClientRuntime,
			) => Promise<Data> | Data,
		) =>
		async (event: Parameters<LayoutLoad>[0]): Promise<DataWithRuntime<Data>> => {
			const runtime = await initRuntime(event, options)

			return addRuntimeToData(
				{
					...(await load(event, runtime)),
					referenceLanguage: runtime.referenceLanguage, // TODO: only pass this if `referenceLanguage` gets used somewhere or detection strategy is on client
					languages: runtime.languages, // TODO: only pass this if `languages` get used somewhere
					language: runtime.language, // TODO: only pass this if `language` gets detected on server}
				},
				runtime,
			)
		},
})

// ------------------------------------------------------------------------------------------------

export const initRootPageLoadWrapper = <
	PageLoad extends Kit.Load<any, any, any, any, any>,
>(options: {
	browser: boolean
	initDetectors?: (event: Parameters<PageLoad>[0]) => Detector[]
	redirect?: {
		throwable: typeof Kit.redirect
		getPath: (event: Parameters<PageLoad>[0], language: Language) => URL | string
	}
}) => ({
	wrap:
		<Data extends Record<string, any> | void>(
			load: (
				event: EventWithRuntimePromise<Parameters<PageLoad>[0]>,
				runtime: SvelteKitClientRuntime,
			) => Promise<Data> | Data,
		) =>
		async (event: Parameters<PageLoad>[0]): Promise<Data> => {
			if (options.browser) {
				const data = await event.parent()

				const { referenceLanguage, languages } = data
				let language: Language | undefined = data.language

				if (!language || !languages.includes(language)) {
					if (options.redirect) {
						const detectedLanguage = await detectLanguage(
							{ referenceLanguage, languages },
							...(options.initDetectors ? options.initDetectors(event) : []),
						)

						throw options.redirect.throwable(
							307,
							options.redirect.getPath(event, detectedLanguage).toString(),
						)
					}

					language = undefined
				}
			}

			const runtime = await initRuntime(event)

			return load(event, runtime)
		},
})

// ------------------------------------------------------------------------------------------------

export const initLoadWrapper = <Load extends Kit.Load<any, any, any, any, any>>() => ({
	wrap:
		<Data extends Record<string, any> | void>(
			load: (
				event: EventWithRuntimePromise<Parameters<Load>[0]>,
				runtime: SvelteKitClientRuntime,
			) => Promise<Data> | Data,
		) =>
		async (event: Parameters<Load>[0]): Promise<Data> => {
			const runtime = await initRuntime(event)

			return load(event, runtime)
		},
})
