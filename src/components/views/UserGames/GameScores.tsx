import { type UserGameScoresWithOnline, UserGameStatusEnum } from "@/api/schema/game.ts";
import React from "react";
import { Crown, Handshake, Loader, Trophy } from "lucide-react";
import {clsx} from "clsx";

export interface GameScoresProps {
	gameScores: UserGameScoresWithOnline[];
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
					{game.status == UserGameStatusEnum.WIN && index == 1 && (
						<div className={"mr-2"}>
							<Trophy size={20} color={"#C0C0C0"} />
						</div>
					)}
					{game.status == UserGameStatusEnum.WIN && index == 2 && (
						<div className={"mr-2"}>
							<Trophy size={20} color={"#CD7F32"} />
						</div>
					)}
					{game.status == UserGameStatusEnum.WIN && index > 2 && (
						<div className={"mr-2"}>
							<Trophy size={20} />
						</div>
					)}
					{game.status == UserGameStatusEnum.WIN && index == 0 && (
						<div className={"mr-2"}>
							<Crown size={20} color={"#FFD700"} />
						</div>
					)}
					<div className={clsx("text-sm inline-flex", {"text-muted-foreground": !game.is_online})}>
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
