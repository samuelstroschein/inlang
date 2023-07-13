import { dedent } from 'ts-dedent'
import { assertNoImportsFromSdkJs } from '../../ast-transforms/assertions.js'
import { findExport } from '../../ast-transforms/utils/exports.js'
import { addImport, isOptOutImportPresent } from '../../ast-transforms/utils/imports.js'
import { codeToSourceFile, nodeToCode } from '../../ast-transforms/utils/js.util.js'
import type { TransformConfig } from '../vite-plugin/config.js'
import { InlangSdkException } from '../vite-plugin/exceptions.js'
import { filePathForOutput } from '../vite-plugin/fileInformation.js'

const exportPrerenderNode = codeToSourceFile(`
	export const prerender = true
`).getStatements()[0]!

const exportGetNode = codeToSourceFile(`
	export const GET = async ({ params: { language } }) => {
		await reloadResources()
		return json(getResource(language) || null)
	}
`).getStatements()[0]!

// TODO: check if relative path is correct
const exportEntriesNode = codeToSourceFile(`
	export const entries = async () => {
		const { languages } = await initState(await import('../../../../inlang.config.js'))

		return languages.map(language => ({ language }))
	}
`).getStatements()[0]!

// ------------------------------------------------------------------------------------------------

export const transformLanguageJson = (filePath: string, config: TransformConfig, code: string) => {
	const sourceFile = codeToSourceFile(code, filePath)

	if (isOptOutImportPresent(sourceFile)) return code

	assertNoImportsFromSdkJs(sourceFile, filePath.replace(config.cwdFolderPath, '')) // TODO: implement functionality

	if (findExport(sourceFile, 'GET'))
		throw new InlangSdkException(dedent`
			The file (${filePathForOutput(config, filePath)}) already contains a 'GET' export.
			Please remove it as 'inlang' needs to inject it's own magic here.
		`)

	let codeToInsert = ''
	if (config.isStatic && config.inlang.sdk.resources.cache === "build-time")
		// TODO: find out how to insert it correctly
		codeToInsert += exportPrerenderNode.getText()

	// TODO: find out how to insert it correctly
	codeToInsert += exportGetNode.getText()

	if (config.svelteKit.version || "" >= "1.16.3") {
		// TODO: find out how to insert it correctly
		codeToInsert += exportEntriesNode.getText()

		addImport(sourceFile, "@inlang/sdk-js/adapter-sveltekit/server", "initState")
	}

	addImport(sourceFile, "@inlang/sdk-js/adapter-sveltekit/server", "getResource", "reloadResources")
	addImport(sourceFile, "@sveltejs/kit", "json")

	sourceFile.insertText(sourceFile.getText().length, codeToInsert)

	return nodeToCode(sourceFile)
}
