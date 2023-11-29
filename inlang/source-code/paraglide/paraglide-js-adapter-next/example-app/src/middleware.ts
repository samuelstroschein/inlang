import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AvailableLanguageTag, availableLanguageTags, sourceLanguageTag } from "./paraglide/runtime"

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const headers = new Headers(request.headers)

	//If the path already contains a locale, do nothing
	const [_, maybeLocale] = pathname.split("/")
	if (availableLanguageTags.includes(maybeLocale as AvailableLanguageTag)) {
		headers.set("x-language-tag", maybeLocale)
		return NextResponse.next()
	}

	//If the path does not contain a locale, redirect to the default locale
	headers.set("x-language-tag", sourceLanguageTag)
	request.nextUrl.pathname = `/${sourceLanguageTag}${pathname}`
	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
}
