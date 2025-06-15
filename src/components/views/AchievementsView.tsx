import { useAchievementsLoader } from "@/redux/game/loader.ts";
import Page from "@/components/views/Page.tsx";
import strings from "@/constants/strings.ts";
import Typer from "@/components/ui/Typer/typer.tsx";

const AchievementsView = () => {
	const [isAchievementsLoading, achievements] = useAchievementsLoader();
	return (
		<Page centrify={isAchievementsLoading}>
			<div className="min-h-full flex">
				<div className={"w-full flex flex-col"}>
					<div className="flex gap-2 grid-cols-2">
						{achievements.map((achievement) => {
							return (
								<div key={achievement.id} className={"border rounded-sm p-2 "}>
									<img src={achievement.image_url} alt="" />
									<div className={"mt-2 text-xs"}>{achievement.title}</div>
								</div>
							);
						})}
					</div>

					{isAchievementsLoading && (
						<div className={"my-auto flex justify-center"}>
							<Typer dataText={[strings.games_loading_]} />
						</div>
					)}
				</div>
			</div>
		</Page>
	);
};

export default AchievementsView;
