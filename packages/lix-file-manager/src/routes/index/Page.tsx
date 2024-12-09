import IconUpload from "@/components/icons/IconUpload.tsx";
import SectionHeader from "@/components/SectionHeader.tsx";
import ListItems from "@/components/ListItems.tsx";
import { discussionSearchParamsAtom, fileIdSearchParamsAtom, filesAtom, lixAtom } from "@/state.ts";
import { useAtom } from "jotai";
import { saveLixToOpfs } from "@/helper/saveLixToOpfs.ts";
import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { activeFileAtom, allChangesDynamicGroupingAtom, changesCurrentVersionAtom } from "@/state-active-file.ts";
import { Link, useNavigate } from "react-router-dom";
import { ChangeComponent } from "@/components/ChangeComponent.tsx";
import { DynamicChangeGroup } from "@/components/DynamicChangeGroup.tsx";
import FilterSelect from "@/components/FilterSelect.tsx";
import ChatInput from "@/components/ChatInput.tsx";
import ConnectedChanges from "@/components/ConnectedChanges.tsx";
import DiscussionThread from "@/components/DiscussionThread.tsx";
import { VersionDropdown } from "@/components/VersionDropdown.tsx";
// import { useEffect } from "react";

export default function Page() {
	// state atoms
	const [lix] = useAtom(lixAtom);
	const [files] = useAtom(filesAtom);
	const [changesCurrentVersion] = useAtom(changesCurrentVersionAtom);
	const [allChangesDynamicGrouping] = useAtom(allChangesDynamicGroupingAtom);
	const [activeFile] = useAtom(activeFileAtom);
	const [fileIdSearchParams] = useAtom(fileIdSearchParamsAtom);
	const [discussionSearchParams] = useAtom(discussionSearchParamsAtom);

	//hooks
	const navigate = useNavigate();

	// handlers
	const handleUpload = async () => {
		const input = document.createElement("input");
		input.type = "file";
		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				await lix.db
					.insertInto("file")
					.values({
						path: "/" + file.name,
						data: await file.arrayBuffer(),
					})
					.execute();
				await saveLixToOpfs({ lix });
			}
		};
		input.click();
	};

	// useEffect(() => {
	// 	console.log({ changesCurrentVersion })
	// })

	return (
		<div className="flex bg-white h-full">
			<div className="max-w-[340px] flex-1 flex flex-col h-full">
				<SectionHeader title="Files">
					<Button
						variant="ghost"
						onClick={async () => {
							// @ts-expect-error - globally defined
							await window.deleteLix();
							window.location.reload();
						}}
					>
						Reset
					</Button>
					<Button variant="secondary" onClick={() => handleUpload()}>
						<IconUpload />
						Upload
					</Button>
				</SectionHeader>
				<div className="max-h-[calc(100%_-_60px)] overflow-y-auto">
					{files.map((file) => {
						return (
							<ListItems
								key={file.id}
								id={file.id}
								type="file"
								name={file.path.replace("/", "")}
								appLink={file.path.endsWith(".csv") ? `/app/csv/editor?f=${file.id}` : ""}
							/>
						);
					})}
				</div>
				<Link to="/" className="flex-grow" />
			</div>
			<Separator orientation="vertical" className="h-screen" />

			{fileIdSearchParams && discussionSearchParams && (
				<div className="flex-1 h-full">
					<SectionHeader
						backaction={() => navigate(`/?f=${fileIdSearchParams}`)}
						title={`Discussion`}
					/>
					<div className="flex flex-col px-2.5 h-[calc(100%_-_60px)] overflow-y-auto flex-shrink-0">
						<ConnectedChanges />
						<div className="flex-1 mt-6">
							<DiscussionThread />
						</div>
						<ChatInput />
					</div>
				</div>
			)}
			{fileIdSearchParams && !discussionSearchParams && (
				<div className="flex-1 h-full">
					<SectionHeader
						backaction={() => navigate("/")}
						title={
							activeFile?.path.replace("/", "")
								? `/ ${activeFile?.path.replace("/", "")}`
								: "Graph"
						}
						fileActions={[<VersionDropdown />]}
					/>
					<div className="px-2.5 h-[calc(100%_-_60px)] overflow-y-auto flex-shrink-0">
						<FilterSelect />
						{changesCurrentVersion.map((change, i) => (
							<ChangeComponent
								key={change.id}
								change={{
									...change,
									snapshot_content: change.snapshot_content as Record<
										string,
										any
									> | null,
									parent_snapshot_content:
										change.parent_snapshot_content as Record<
											string,
											any
										> | null,
									discussion_count: Number(change.discussion_count),
									discussion_ids: String(change.discussion_ids),
								}}
								showTopLine={i !== 0}
								showBottomLine={i !== changesCurrentVersion.length - 1}
							/>
						))}
					</div>
				</div>
			)}
			{!fileIdSearchParams && !discussionSearchParams && (
				<div className="flex-1 h-full">
					<SectionHeader title="Overview" />
					<div className="px-[10px] h-[calc(100%_-_60px)] overflow-y-auto">
						{Object.entries(allChangesDynamicGrouping).map(
							([date, changes], i) => {
								return (
									<DynamicChangeGroup
										key={date}
										changes={changes}
										showTopLine={i !== 0}
										showBottomLine={
											i !== Object.keys(allChangesDynamicGrouping).length - 1
										}
									/>
								);
							}
						)}
					</div>
				</div>
			)}
		</div>
	);
}