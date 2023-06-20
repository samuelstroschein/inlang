import type { SourceFile } from 'ts-morph'
import { findImportDeclarations } from './imports.js'
import { dedent } from 'ts-dedent'

// TODO: test
export const assertNoImportsFromSdkJs = (sourceFile: SourceFile) => {
	if (findImportDeclarations(sourceFile, "@inlang/sdk-js").length) {
		throw Error(
			dedent`
				It is currently not supported to import something from '@inlang/sdk-js' in this file.
				Please read the docs for more information on how to workaround this temporary limitation: https://inlang.com/documentation/sdk/sveltekit-advanced
			`,
		)
	}
}