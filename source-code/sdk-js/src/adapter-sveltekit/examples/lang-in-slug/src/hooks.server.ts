import { redirect, type Handle } from "@sveltejs/kit"
import { initRuntime } from "@inlang/sdk-js/runtime"
import {
	getResource,
	languages,
	referenceLanguage,
	setInlangInformationToLocals,
} from "./inlang.server.js"
import { serverFn } from "./utils/server.js"

export const handle = (async ({ event, resolve }) => {
	console.info("--- new request", event.url.toString())

	const pathname = event.url.pathname
	if (pathname.startsWith("/inlang")) return resolve(event)

	const language = pathname.split("/")[1]
	if (!language || !languages.includes(language)) {
		const detectedLanguage = referenceLanguage // TODO: detect preferred language
		throw redirect(307, detectedLanguage) // TODO: replace slug instead of redirecting to homepage
	}

	const runtime = initRuntime({
		readResource: (language: string) => getResource(language),
	})

	await runtime.loadResource(language)
	runtime.switchLanguage(language)
	const i = runtime.getInlangFunction()

	setInlangInformationToLocals(event.locals, {
		referenceLanguage,
		languages,
		language,
		i,
	})

	console.info("hooks.server.ts", i("welcome"))

	serverFn(i)

	return resolve(event, { transformPageChunk: ({ html }) => html.replace("%lang%", language) })
}) satisfies Handle
