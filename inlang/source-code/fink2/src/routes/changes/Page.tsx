import {
	commitsAtom,
	pendingChangesAtom,
	projectAtom,
	bundlesNestedAtom,
} from "../../state.ts";
import { atom, useAtom } from "jotai";
import Layout from "../../layout.tsx";
import { useEffect, useState } from "react";
import {
	SlButton,
	SlDialog,
	SlInput,
} from "@shoelace-style/shoelace/dist/react";
import DiffBundleView from "../../components/DiffBundleView.tsx";
import { BundleNested } from "@inlang/sdk2";
import timeAgo from "../../helper/timeAgo.ts";

const bundleIdsWithPendingChangesAtom = atom(async (get) => {
	const bundlesNested = await get(bundlesNestedAtom);
	const pendingChanges = await get(pendingChangesAtom);
	const pendingChangesVariantIds = pendingChanges.map((c) => c.value!.id);
	const bundleNestedWithChanges = bundlesNested.filter((bundle) =>
		bundle.messages.some((message) =>
			message.variants.some((variant) =>
				pendingChangesVariantIds.includes(variant.id)
			)
		)
	);
	return bundleNestedWithChanges;
});

export default function App() {
	const [project] = useAtom(projectAtom);
	const [pendingChanges] = useAtom(pendingChangesAtom);
	const [commits] = useAtom(commitsAtom);
	const [bundlesWithChanges] = useAtom(bundleIdsWithPendingChangesAtom);
	const [commitAuthor, setCommitAuthor] = useState<string>("");
	const [commitDescription, setCommitDescription] = useState<string>("");
	const [showDialog, setShowDialog] = useState(false);

	const handleCommit = async () => {
		//console.log("executing commit");
		await project?.lix.commit({
			userId: commitAuthor,
			description: commitDescription,
		});
	};

	useEffect(() => {
		// close dialog after commit
		if (pendingChanges.length === 0) {
			setShowDialog(false);
		}
	});

	const getScopedChangesByBundle = (bundle: BundleNested) => {
		const pendingChangesForBundle = pendingChanges.filter((change) => {
			const variantId = change.value?.id;
			if (!variantId) return false;
			return bundle.messages.some((message) =>
				message.variants.some((variant) => variant.id === variantId)
			);
		});
		return pendingChangesForBundle;
	};

	return (
		<>
			<Layout>
				<div className="flex gap-4 items-center bg-zinc-100 rounded px-4 py-2 justify-between mb-4">
					<div className="flex items-center gap-2">
						<p className="text-sm font-medium">
							{pendingChanges.length} Pending change[s]
						</p>
						{/* <p>{numCommittedChanges} Committed changes </p>
						<p>{numCommits} Commits</p> */}
					</div>
					<SlButton
						size="small"
						variant="primary"
						disabled={pendingChanges.length === 0}
						onClick={() => {
							setShowDialog(true);
						}}
					>
						Commit changes
					</SlButton>
					<SlDialog
						label="Add commit details"
						open={showDialog}
						onSlRequestClose={() => setShowDialog(false)}
					>
						<div className="flex flex-col gap-4">
							<SlInput
								label="Author"
								helpText="Enter your name"
								placeholder="Max Mustermann"
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								onInput={(e: any) => setCommitAuthor(e.target.value)}
							></SlInput>
							<SlInput
								label="Description"
								helpText="Add a description of the changes"
								placeholder="I updated the german translations"
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								onInput={(e: any) => setCommitDescription(e.target.value)}
							></SlInput>
						</div>
						<SlButton variant="primary" slot="footer" onClick={handleCommit}>
							Commit changes
						</SlButton>
					</SlDialog>
				</div>
				{bundlesWithChanges.map((bundle) => (
					<DiffBundleView
						changes={getScopedChangesByBundle(bundle)}
						bundleId={bundle.id}
						key={bundle.id}
					/>
				))}
				<div className="flex gap-4 items-center bg-zinc-100 rounded px-4 py-2 justify-between mt-8 h-[46px]">
					<div className="flex items-center gap-2 justify-between w-full">
						<p className="text-sm font-medium">Commit history</p>
						<div className="text-xs! text-zinc-700 bg-zinc-300 h-5 rounded flex items-center px-2 font-medium">
							{commits.length} commits
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 py-4">
					{commits.map((commit) => (
						<div
							key={commit.id + Math.random()}
							className="flex gap-2 items-center justify-between bg-zinc-50 px-4 py-3 rounded h-[46px]"
						>
							<div className="flex gap-2 items-center">
								<p className="text-zinc-950 text-sm! font-semibold">
									By {commit.user_id}
								</p>
								<p className="text-sm! text-zinc-600">{commit.description}</p>
							</div>
							<p className="text-sm!">{timeAgo(commit.created!)}</p>
						</div>
					))}
				</div>
			</Layout>
		</>
	);
}