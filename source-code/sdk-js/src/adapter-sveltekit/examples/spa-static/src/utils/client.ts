import { get } from "svelte/store"
import { getInlangContext } from "@inlang/sdk-js/adapter-sveltekit/client"

export const clientFn = () => {
	const { i } = getInlangContext()
	console.info("utils/client.ts", get(i)("welcome"))
}
