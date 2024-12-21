import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "./Sidebar.tsx";
import { useAtom } from "jotai";
import { withPollingAtom } from "@/state.ts";
import { posthog } from "posthog-js";
export function App({ children }: { children: React.ReactNode }) {
	const [, setPolling] = useAtom(withPollingAtom);

	useEffect(() => {
		const interval = setInterval(() => {
			setPolling(Date.now());
		}, 100);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (import.meta.env.PUBLIC_LIX_POSTHOG_TOKEN) {
			posthog.init(import.meta.env.PUBLIC_LIX_POSTHOG_TOKEN, {
				api_host: "https://eu.i.posthog.com",
				capture_performance: false,
				autocapture: {
					capture_copied_text: true,
				},
			});
			posthog.capture("$pageview");
		} else {
			console.info("No posthog token found");
		}
		return () => posthog.reset();
	}, []);

	return (
		<SidebarProvider>
			<div className="w-full h-screen flex flex-col">
				<Banner />
				<div className="flex flex-1">
					<AppSidebar />
					<main className="flex-1 overflow-hidden">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

function Banner() {
	return (
		<div className="bg-slate-500 text-white text-center p-1.5">
			<span className="font-medium">
				This is a public preview. Report bugs on{" "}
				<a
					className="underline"
					href="https://github.com/opral/lix-sdk/issues"
					target="__blank"
				>
					GitHub
				</a>{" "}
				and join{" "}
				<a
					href="https://discord.gg/xjQA897RyK"
					target="__blank"
					className="underline"
				>
					Discord
				</a>{" "}
				for questions.
			</span>
		</div>
	);
}