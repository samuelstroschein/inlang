import type { TransformConfig } from "../config.js"
import { transformSvelte } from "./_.svelte.js"

export const transformPageSvelte = (filePath: string, config: TransformConfig, code: string, root: boolean) => {
	return transformSvelte(filePath, config, code)
}
