import { createInlang } from "../app/createInlang.js"
import type { LanguageTag } from "../languageTag.js"
import type { Message } from "./schema.js"

type UniqueFilterType = {
	id: Message["id"]
	languageTag: LanguageTag
	//variant: string -> in the future
}
type FilterType = {
	id?: Message["id"]
	languageTag?: LanguageTag
	//variant?: string -> in the future
}

// inspiration: Prisma CRUD https://www.prisma.io/docs/concepts/components/prisma-client/crud
export type MessagesQueryApi_1 = {
	get: (args: { where: UniqueFilterType }) => [Message, Error]
	getMany: (args: { where: FilterType }) => [Message[], Error]
	upsert: (args: Message) => [Message, Error]
	upsertMany: (args: Message[]) => [Message[], Error]
	delete: (args: { where: UniqueFilterType }) => [Message, Error]
	deleteMany: (args: { where: FilterType }) => [Message[], Error]
}

const inlang = createInlang({
	configPath: "/hello/inlang.config.json",
	env: { fs: undefined as any, import: undefined as any },
})

// create
const message1 = inlang.messages.query.upsert({
	id: "myMessageId",
	languageTag: "en",
	pattern: [{ type: "Text", value: "Hello World" }],
})

const message2 = inlang.messages.query.get({ where: { id: "myMessageId", languageTag: "en" } })
const messages = inlang.messages.query.getMany({ where: { id: "myMessageId" } })

const message4 = inlang.messages.query.upsertMany([
	{
		id: "myMessageId",
		languageTag: "en",
		pattern: [{ type: "Text", value: "Hello World" }],
	},
	{
		id: "otherMessageId",
		languageTag: "en",
		pattern: [{ type: "Text", value: "Hello World" }],
	},
])

const message5 = inlang.messages.query.delete({ where: { id: "myMessageId", languageTag: "en" } })
