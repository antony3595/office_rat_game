import { type UserGameScores, UserGameStatusEnum } from "@/api/schema/game.ts";
import React from "react";
import { Handshake, Loader, Trophy } from "lucide-react";

export interface GameScoresProps {
	gameScores: UserGameScores[];
}
const GameScores: React.FC<GameScoresProps> = ({ gameScores }) => {
	return (
		<div className={"p-2 overflow-y-auto overflow-x-hidden"}>
			{gameScores.map((game, index) => (
				<div key={game.id} className="flex [&:not(:first-child)]:mt-4">
					{game.status == UserGameStatusEnum.JOINED && (
						<div className={"mr-2"}>
							<Handshake size={20} color={"oklch(70.4% .04 256.788)"} />
						</div>
					)}
					{game.status == UserGameStatusEnum.IN_PROGRESS && (
						<div className={"mr-2"}>
							<Loader size={20} color={"oklch(50.8% .118 165.612)"} />
						</div>
					)}
					{game.status == UserGameStatusEnum.WIN && (
						<div className={"mr-2"}>
							<Trophy size={20} color={"oklch(85.2% .199 91.936)"} />
						</div>
					)}
					<div className="text-sm inline-flex">
						{index + 1}. {game.user_first_name}
					</div>
					<div className="flex-grow border border-dashed border-t-0 border-l-0 border-r-0"></div>
					<div
						key={game.user_first_name + game.answered_questions_count}
						style={{ animationDelay: `${index * 100}ms` }}
						className={"slide-in-right text-sm inline-flex"}
					>
						{`${game.answered_questions_count}/${game.total_questions_count}`}
					</div>
				</div>
			))}
		</div>
	);
};

export default GameScores;
