import { getRuntimeFromLocals } from "@inlang/sdk-js/adapter-sveltekit/server"
import type { LayoutServerLoad } from "./$types.js"

export const prerender = true

export const load = (async ({ locals }) => {
	const runtime = getRuntimeFromLocals(locals)

	console.info("+layout.server.ts", runtime.getInlangFunction()("welcome"))

	return {
		"+layout.server.ts": Math.random(),
		referenceLanguage: runtime.getReferenceLanguage(), // TODO: only pass this if `referenceLanguage` gets used somewhere or detection strategy is on client
		languages: runtime.getLanguages(), // TODO: only pass this if `languages` get used somewhere
		language: runtime.getLanguage(), // TODO: only pass this if `language` gets detected on server
	}
}) satisfies LayoutServerLoad
