import { initLayoutServerLoadWrapper } from "@inlang/sdk-js/adapter-sveltekit/server"
import type { LayoutServerLoad } from "./$types.js"

export const load = initLayoutServerLoadWrapper<LayoutServerLoad>().wrap(async (_, { i }) => {
	console.info("[lang]/+layout.server.ts", i("welcome"))
})
