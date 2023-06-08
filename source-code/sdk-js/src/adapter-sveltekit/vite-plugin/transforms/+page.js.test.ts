import { describe, expect, test } from "vitest"
import { getTransformConfig } from "./test-helpers/config.js"
import { dedent } from "ts-dedent"
import { transformPageJs } from './+page.js.js'

// TODO: create test matrix for all possible combinations

describe("transformPageJs", () => {
	describe("root", () => {
		describe("empty file", () => {
			describe("lang-in-slug", () => {
				test("non-static", () => {
					const code = ""
					const config = {
						...getTransformConfig(),
						languageInUrl: true,
					}
					const transformed = transformPageJs(config, code, true)

					expect(transformed).toMatchInlineSnapshot(`
				"import { initLocalStorageDetector, navigatorDetector } from '@inlang/sdk-js/detectors/client';
				import { initRootPageLoadWrapper, replaceLanguageInUrl } from '@inlang/sdk-js/adapter-sveltekit/shared';
				import { browser } from '$app/environment';

				export const load = initRootPageLoadWrapper({
				   browser
				}).wrap(() => {});"
			`)
				})

				test("static", () => {
					const code = ""
					const config = {
						...getTransformConfig(),
						languageInUrl: true,
						isStatic: true,
					}
					const transformed = transformPageJs(config, code, true)

					expect(transformed).toMatchInlineSnapshot(`
				"import { redirect } from '@sveltejs/kit';
				import { initLocalStorageDetector, navigatorDetector } from '@inlang/sdk-js/detectors/client';
				import { initRootPageLoadWrapper, replaceLanguageInUrl } from '@inlang/sdk-js/adapter-sveltekit/shared';
				import { browser } from '$app/environment';

				export const load = initRootPageLoadWrapper({
				   browser,
				   initDetectors: () => [navigatorDetector],

				   redirect: {
					   throwable: redirect,

					   getPath: (
						   {
							   url
							},
							language
						) => replaceLanguageInUrl(new URL(url), language)
					}
				}).wrap(() => {});"
			`)
				})
			})
		})

		test("basic load function", () => {
			const code = dedent`
				export const load = async () => {};
			`
			const config = {
				...getTransformConfig(),
				languageInUrl: true,
			}
			const transformed = transformPageJs(config, code, true)

			expect(transformed).toMatchInlineSnapshot(`
				"import { initLocalStorageDetector, navigatorDetector } from '@inlang/sdk-js/detectors/client';
				import { initRootPageLoadWrapper, replaceLanguageInUrl } from '@inlang/sdk-js/adapter-sveltekit/shared';
				import { browser } from '$app/environment';

				export const load = initRootPageLoadWrapper({
				   browser
				}).wrap(async () => {});"
			`)
		})
	})

	describe("non-root", () => {
		test("should not do anything", () => {
			const code = ""
			const config = getTransformConfig()
			const transformed = transformPageJs(config, code, false)
			expect(transformed).toEqual(code)
		})
	})

	describe("'@inlang/sdk-js' imports", () => {
		test("should throw an error if an import from '@inlang/sdk-js' gets detected", () => {
			const code = "import { i } from '@inlang/sdk-js'"
			const config = getTransformConfig()
			expect(() => transformPageJs(config, code, true)).toThrow()
		})

		test("should not thorw an error if an import from a suppath of '@inlang/sdk-js' gets detected", () => {
			const code = "import { initServerLoadWrapper } from '@inlang/sdk-js/adapter-sveltekit/server';"
			const config = getTransformConfig()
			expect(() => transformPageJs(config, code, true)).not.toThrow()
		})
	})
})

// NOTES
// - Allows merging of already present and required imports
// - adds an empty exported arrow function named load if not present
// - Wraps this load function (whether present or not) with initRootLayoutLoadWrapper().wrap()
// - Adds options to initRootLayoutLoadWrapper if necessary
