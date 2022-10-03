import plugin from "tailwindcss/plugin";

/**
 * Use this plugin if you want styled components.
 *
 * Nothing can be configured for now. The function exists for future-proofing of the
 * plugin.
 */
export function configure() {
	return plugin(({ addComponents }) => {
		for (const component of []) {
			addComponents(component.style);
		}
	});
}
