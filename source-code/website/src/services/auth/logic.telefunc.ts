import type { LocalStorageSchema } from "@src/services/local-storage/schema.js";
import { getContext } from "telefunc";

/**
 * Get the user info from the GitHub API.
 *
 * Read https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
 *
 * @throws
 */
export async function getUserInfo(): Promise<
	LocalStorageSchema["user"] | undefined | string
> {
	try {
		const context = getContext();
		if (context.githubAccessToken === undefined) {
			return undefined;
		}
		console.log("context.githubAccessToken", context.githubAccessToken);
		const request = await fetch("https://api.github.com/user", {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${context.githubAccessToken}`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});
		console.log("request ", request.statusText);
		if (request.status !== 200) {
			return "Failed to get user info " + request.statusText;
		}
		const requestBody = await request.json();
		return {
			username: requestBody.login,
			avatarUrl: requestBody.avatar_url,
		};
	} catch (error) {
		console.error(error);
		return "CATCH: Failed to get user info " + error;
	}
}
