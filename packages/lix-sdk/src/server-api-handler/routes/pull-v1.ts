import type * as LixServerApi from "@lix-js/server-api-schema";
import type { LixServerApiHandlerRoute } from "../create-server-api-handler.js";
import { getDiffingRows } from "../../sync/get-diffing-rows.js";

type RequestBody =
	LixServerApi.paths["/lsa/pull-v1"]["post"]["requestBody"]["content"]["application/json"];

type ResponseBody = LixServerApi.paths["/lsa/pull-v1"]["post"]["responses"];

export const route: LixServerApiHandlerRoute = async (context) => {
	const body = (await context.request.json()) as RequestBody;
	const exists = await context.environment.hasLix({ id: body.lix_id });

	if (!exists) {
		return new Response(null, { status: 404 });
	}

	const open = await context.environment.openLix({ id: body.lix_id });

	try {
		// console.log("----------- PROCESSING PULL FROM CLIENT  -------------");
		const { upsertedRows: tableRowsToReturn, state: sessionStatesServer } =
			await getDiffingRows({
				lix: open.lix,
				targetVectorClock: body.vector_clock,
			});

		// console.log("----------- DONE PROCESSING PULL FROM CLIENT  -------------");
		return new Response(
			JSON.stringify({
				vector_clock: sessionStatesServer,
				data: tableRowsToReturn,
			} satisfies ResponseBody["200"]["content"]["application/json"]),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				code: "FAILED_TO_FETCH_DATA",
				message: (error as any)?.message,
			} satisfies ResponseBody["500"]["content"]["application/json"]),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} finally {
		await context.environment.closeLix(open);
	}
};