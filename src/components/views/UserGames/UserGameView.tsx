import Page from "@/components/views/Page.tsx";
import { useActiveGameQuestionLoader, useActiveJoinedGameLoader } from "@/redux/game/loader.ts";
import {Handshake, Loader, Lock, Trophy} from "lucide-react";
import "./user_games.css";
import Typer from "@/components/ui/Typer/typer.tsx";
import strings from "@/constants/strings.ts";
import { useParams } from "react-router-dom";
import { type AnswerResponse, ResponseStatusEnum, type UserGameScores, UserGameStatusEnum } from "@/api/schema/game.ts";
import { Button } from "@/components/ui/button.tsx";
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks.ts";
import { createErrorSelector } from "@/redux/actionsErrors/selectors.ts";
import { Input } from "@/components/ui/input.tsx";
import { sendAnswer } from "@/api/api.ts";
import type { AxiosResponse } from "axios";
import { getApiError } from "@/api/utils.ts";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator.tsx";
import { formatSeconds } from "@/redux/utils/datetimeUtils.ts";
import ratImg from "@/assets/rat.jpg";
import { useToken } from "@/redux/auth/loader.ts";

const UserGameView = () => {
	const { game_uuid } = useParams();
	const [isGameLoading, game, updateGame] = useActiveJoinedGameLoader(game_uuid!);
	const [isQuestionLoading, question, loadQuestion] = useActiveGameQuestionLoader(game_uuid!);
	const gameLoadingError = useAppSelector(createErrorSelector("activeJoinedGame"));
	const token = useToken();
	const [answerInput, setAnswerInput] = useState<string>("");
	const [isAnswerLoading, setAnswerLoading] = useState<boolean>(false);

	const [gameDurationCounter, setGameDurationCounter] = useState(game?.game_duration || null);
	const interval = useRef<NodeJS.Timeout | null>(null);
	const socket = useRef<WebSocket | null>(null);
	const [gameScores, setGameScores] = useState<UserGameScores[]>([]);
	const [isSocketConnected, setSocketConnected] = useState<boolean>(false);

	const clearGameDurationInterval = () => {
		if (interval.current) {
			clearInterval(interval.current);
		}
	};

	useEffect(() => {
		console.log(isSocketConnected);
		socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/${game_uuid}/scores?token=${token}`);

		socket.current.onopen = () => {
			setSocketConnected(true);
			console.log("connected");
		};
		socket.current.onclose = () => {
			setSocketConnected(false);
			console.log("close");
		};
		socket.current.onmessage = (event: MessageEvent<string>) => {
			const parsed_message: { data: UserGameScores[] } = JSON.parse(event.data);
			setGameScores(parsed_message.data);
		};
		socket.current.onerror = (e) => {
			console.log(e);
		};

		return () => {
			if (socket.current) {
				socket.current.close();
			}
		};
	}, []);

	useEffect(() => {
		setGameDurationCounter(game?.game_duration || null);
	}, [game?.game_duration]);

	useEffect(() => {
		if (gameDurationCounter !== null && game?.status == UserGameStatusEnum.IN_PROGRESS && game?.game_duration) {
			clearGameDurationInterval();

			interval.current = setInterval(() => {
				setGameDurationCounter((gameDurationCounter || 0) + 1);
			}, 1000);
		} else if (game?.status == UserGameStatusEnum.WIN && game?.game_duration) {
			clearGameDurationInterval();
			setGameDurationCounter(game?.game_duration);
		}

		return clearGameDurationInterval;
	}, [game?.status, game?.game_duration, gameDurationCounter]);

	const nextQuestion = useCallback(async () => {
		await loadQuestion();
		updateGame();
	}, [loadQuestion, updateGame]);

	const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setAnswerInput(e.target.value);
	}, []);

	const onSubmit = useCallback(async () => {
		setAnswerLoading(true);
		try {
			const response: AxiosResponse<AnswerResponse> = await sendAnswer(game_uuid!, answerInput);
			if (response.data.status === ResponseStatusEnum.FAIL || response.data.status === ResponseStatusEnum.FAIL) {
				toast.error(response.data.message);
			} else {
				toast.success(response.data.message);
				await nextQuestion();
			}

			return response.data;
		} catch (e) {
			const error = getApiError(e);
			if (error) {
				toast.error(error);
			}
		} finally {
			setAnswerInput("");
			setAnswerLoading(false);
		}
	}, [answerInput, game_uuid, nextQuestion]);

	useEffect(() => {
		if (game?.status === UserGameStatusEnum.IN_PROGRESS && question == null && !isQuestionLoading) {
			loadQuestion();
		}
	}, [game?.status]);

	if (gameLoadingError) {
		return (
			<Page centrify>
				<div className="flex centrify">
					<Typer dataText={[gameLoadingError]} />
				</div>
			</Page>
		);
	}

	if (isGameLoading && !game) {
		return (
			<Page centrify>
				<Typer dataText={[strings.game_loading_]} />
			</Page>
		);
	}

	return (
		<Page>
			<div className={"h-full flex flex-col"}>
				<div className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
					{gameScores.map((game, index) => (
						<div key={game.id} className="flex [&:not(:first-child)]:mt-4">
							{game.status == UserGameStatusEnum.JOINED && <div className={"mr-2"}><Handshake size={20} color={"oklch(70.4% .04 256.788)"} /></div>}
								{game.status == UserGameStatusEnum.IN_PROGRESS && <div className={"mr-2"}><Loader size={20} color={"oklch(50.8% .118 165.612)"} /></div>}
								{game.status == UserGameStatusEnum.WIN && <div className={"mr-2"}><Trophy size={20} color={"oklch(85.2% .199 91.936)"} /></div>}
							<div className="text-sm inline-flex">
								{index + 1}. {game.user_first_name}
							</div>
							<div className="flex-grow border border-dashed border-t-0 border-l-0 border-r-0"></div>
							<div
								key={game.user_first_name+game.answered_questions_count}
								style={{ animationDelay: `${index * 100}ms` }}
								className={"slide-in-right text-sm inline-flex"}
							>
								{`${game.answered_questions_count}/${game.total_questions_count}`}

							</div>
						</div>
					))}
				</div>
				{game && (
					<div className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
						<div className="flex place-content-between gap-2">
							<div className={"flex-grow-2"}>{game.game.name || game.game.uuid}</div>
							<div className={"flex-grow-1 flex justify-end"}>
								{!game.game.is_public && (
									<div>
										<Lock />
									</div>
								)}
							</div>
						</div>
						<Separator className={"my-2"}></Separator>
						<div>
							<div className="flex mt-4">
								<div className="text-sm">{strings.progress}</div>
								<div className="flex-grow border border-dashed border-t-0 border-l-0 border-r-0"></div>
								<div
									key={game.answered_questions_count}
									style={{ animationDelay: "500ms" }}
									className={"slide-in-right text-sm"}
								>
									{`${game.answered_questions_count}/${game.game.total_questions_count}`}
								</div>
							</div>
							<div className="flex mt-4">
								<div className="text-sm">{strings.status}</div>
								<div className="flex-grow border border-dashed border-t-0 border-l-0 border-r-0"></div>
								<div key={game.status} style={{ animationDelay: "750ms" }} className={"slide-in-right text-sm"}>
									{strings[game.status]}
								</div>
							</div>
							<div className="flex mt-4">
								<div className="text-sm">{strings.game_duration}</div>
								<div className="flex-grow border border-dashed border-t-0 border-l-0 border-r-0"></div>
								<div key={game.status} style={{ animationDelay: "1000ms" }} className={"slide-in-right text-xs"}>
									{gameDurationCounter ? formatSeconds(gameDurationCounter) : "..."}
								</div>
							</div>
						</div>

						<div className="flex justify-end mt-6">
							{game?.status === UserGameStatusEnum.JOINED && (
								<Button className={"animate-bounce"} onClick={nextQuestion} disabled={isQuestionLoading}>
									{strings.go_game}
								</Button>
							)}
						</div>
					</div>
				)}
				{question && (
					<div
						key={question.id}
						className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted h-full min-h-30 flex flex-col"}
					>
						<div>
							<Typer dataText={[question.question]} permanent typingSpeed={50} />
						</div>
						<div className="mt-auto">
							<div className="flex w-full items-center gap-2">
								<Input
									className={"flex-grow"}
									placeholder={strings.answer}
									value={answerInput}
									onChange={handleInputChange}
								/>
								<Button
									disabled={answerInput.length === 0 || isAnswerLoading || isQuestionLoading}
									type="submit"
									variant="outline"
									onClick={onSubmit}
								>
									{strings.press}
								</Button>
							</div>
						</div>
					</div>
				)}
				{game?.status === UserGameStatusEnum.WIN && (
					<div
						className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}
						style={{ animationDelay: "500ms" }}
					>
						<div className="transform rounded-full overflow-hidden justify-self-center w-75 border bg-background scale-75">
							<img className={"rounded-full"} src={ratImg} alt="avatar" />
						</div>
						<div>
							<div className="w-full">
								<Typer timeout={2000} dataText={[strings.congratulations_text]} permanent />
							</div>
						</div>
					</div>
				)}
			</div>
		</Page>
	);
};

export default UserGameView;
