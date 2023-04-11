import { getInlangInformationFromLocals } from "../inlang.server.js"
import type { LayoutServerLoad } from "./$types.js"

export const load = (async ({ locals, url }) => {
	const inlang = getInlangInformationFromLocals(locals)

	url.pathname // just to trigger invalidation on url change

	return {
		"+layout.server.ts": Math.random(),
		language: inlang.language, // TODO: only pass this if `language` get's detected on server
		referenceLanguage: inlang.referenceLanguage, // TODO: only pass this if `referenceLanguage` get used somewhere or detection strategy is on client
		languages: inlang.languages, // TODO: only pass this if `languages` get used somewhere
	}
}) satisfies LayoutServerLoad
