import type { PageContextRenderer } from "./types.js"
import { generateHydrationScript, renderToString } from "solid-js/web"
import { escapeInject, dangerouslySkipEscape } from "vike/server"
import { setCurrentPageContext } from "./state.js"
import { Root } from "./_default.root.jsx"

// import the css
import "./app.css"
import { MetaProvider, renderTags } from "@solidjs/meta"
import { sourceLanguageTag, availableLanguageTags, languageTag } from "@inlang/paraglide-js/website"

// See https://vike.dev/data-fetching
export const passToClient = ["pageProps", "routeParams", "languageTag"] as const

export async function render(pageContext: PageContextRenderer): Promise<unknown> {
	//! TODO most likely cross request state pollution
	//! Need to look into this in the future
	setCurrentPageContext(pageContext)
	// generating the html from the server:
	// 1. the server sends a hydration script for the client.
	//    the client uses the hydration script to hydrate the page.
	//    without hydration, no interactivity.
	// 2. the page is pre-rendered via `renderedPage`.
	//    pre-rendering the page makes the page immediately "visible"
	//    to the user. Afterwards, the client hydrates the page and thereby
	//    makes the page interactive.
	// ! important: renderToString is used instead of
	// ! renderToStringAsync some async resources should
	// ! not be loaded on the server (the editor for example).
	// ! see https://github.com/inlang/monorepo/issues/247

	// from solidjs meta
	// mutated during render so you can include in server-rendered template later
	const tags: any[] = []

	const renderedPage = renderToString(() => (
		<MetaProvider tags={tags}>
			<Root page={pageContext.Page} pageProps={pageContext.pageProps} />
		</MetaProvider>
	))

	const alternateLinks = () => {
		const alternateLinks = []
		for (const locale of availableLanguageTags) {
			if (locale !== languageTag()) {
				alternateLinks.push(
					`<link rel="alternate" hreflang="${locale}" href="https://inlang.com/${
						locale !== sourceLanguageTag ? locale : ""
					}${
						// remove the last "/" if it exists
						pageContext.urlOriginal.endsWith("/")
							? pageContext.urlOriginal.slice(0, -1)
							: pageContext.urlOriginal
					}">`
				)
			}
		}
		return alternateLinks.join("\n")
	}

	return escapeInject`<!DOCTYPE html>
    <html lang="${languageTag()}" class="min-h-screen min-w-screen overflow-x-hidden">
      <head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- theme-color means the background color of the iOS status bar -->
			<meta name="theme-color" content="#000000" />
		<!-- START import inter font -->
			<link rel="preconnect" href="https://rsms.me/">
			<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
		<!-- END import inter font -->
			${dangerouslySkipEscape(alternateLinks())}
			${dangerouslySkipEscape(import.meta.env.PROD ? analytics : "")}
			${dangerouslySkipEscape(favicons)}
			${dangerouslySkipEscape(generateHydrationScript())}
			${dangerouslySkipEscape(renderTags(tags))}
      </head>
	  <!-- setting min-h/w-screen to allow child elements to span to the entire screen  -->
      <body class="website min-h-screen min-w-screen bg-background text-on-background" id="root">
		    ${dangerouslySkipEscape(renderedPage!)}
      </body>
    </html>`
}

const favicons = `
<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
<link rel="manifest" href="/favicon/site.webmanifest">
<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
`

const analytics = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5H3SDF7TVZ"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-5H3SDF7TVZ');
</script>
`

export function onBeforePrerender(prerenderContext: any) {
	const pageContexts = []
	for (const pageContext of prerenderContext.pageContexts) {
		// Duplicate pageContext for each locale
		for (const locale of availableLanguageTags) {
			// Localize URL
			let { urlOriginal } = pageContext
			if (locale !== sourceLanguageTag) {
				urlOriginal = `/${locale}${pageContext.urlOriginal}`
			}
			pageContexts.push({
				...pageContext,
				urlOriginal,
				// Set pageContext.locale
				languageTag: languageTag(),
			})
		}
	}
	return {
		prerenderContext: {
			pageContexts,
		},
	}
}
