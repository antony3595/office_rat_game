import { useAchievementsLoader } from "@/redux/game/loader.ts";
import Page from "@/components/views/Page.tsx";
import strings from "@/constants/strings.ts";
import Typer from "@/components/ui/Typer/typer.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const AchievementsView = () => {
	const [isAchievementsLoading, achievements] = useAchievementsLoader();
	return (
		<Page centrify={isAchievementsLoading}>
			<div className="min-h-full flex">
				<div className={"w-full flex flex-col"}>
					<div className={"flex flex-col gap-2"}>
						{achievements.map((achievement) => (
							<div className={"border rounded-sm  flex flex-row relative"}>
								<Badge
									key={achievement.id}
									className="h-5 min-w-5 rounded-full px-1 absolute"
									style={{
										right: -6,
										top: -6,
									}}
								>
									{achievement.count}
								</Badge>
								<div className={"overflow-hidden rounded-sm border-sm w-40 min-w-40"}>
									<img src={achievement.image_url} alt="" />
								</div>
								<div className={"mt-2 p-2 flex-grow-1 text-sm"}>{achievement.title}</div>
							</div>
						))}
					</div>
					{!isAchievementsLoading && !achievements.length && (
						<div className="my-auto w-full">
							<div className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
								<div>
									<Typer dataText={[strings.no_achievements]} typingSpeed={40} permanent />
								</div>
							</div>
						</div>
					)}

					{isAchievementsLoading && (
						<div className={"my-auto flex justify-center"}>
							<Typer dataText={[strings.achievements_loading]} />
						</div>
					)}
				</div>
			</div>
		</Page>
	);
};

export default AchievementsView;
