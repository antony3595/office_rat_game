import Page from "@/components/views/Page.tsx";
import { useActiveGameQuestionLoader, useActiveJoinedGameLoader } from "@/redux/game/loader.ts";
import { Lock } from "lucide-react";
import "./user_games.css";
import Typer from "@/components/ui/Typer/typer.tsx";
import strings from "@/constants/strings.ts";
import { useParams } from "react-router-dom";
import { type AnswerResponse, ResponseStatusEnum, UserGameStatusEnum } from "@/api/schema/game.ts";
import { Button } from "@/components/ui/button.tsx";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks.ts";
import { createErrorSelector } from "@/redux/actionsErrors/selectors.ts";
import { Input } from "@/components/ui/input.tsx";
import { sendAnswer } from "@/api/api.ts";
import type { AxiosResponse } from "axios";
import { getApiError } from "@/api/utils.ts";
import { toast } from "sonner";

const UserGameView = () => {
	const { game_uuid } = useParams();
	const [isGameLoading, game, updateGame] = useActiveJoinedGameLoader(game_uuid!);
	const [isQuestionLoading, question, loadQuestion] = useActiveGameQuestionLoader(game_uuid!);
	const gameLoadingError = useAppSelector(createErrorSelector("activeJoinedGame"));

	const [answerInput, setAnswerInput] = useState<string>("");
	const [isAnswerLoading, setAnswerLoading] = useState<boolean>(false);

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
				{game && (
					<div className={"user_game_card_animation rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
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
						<div>{game.status}</div>
						<div className="flex justify-end mt-2">
							{game?.status === UserGameStatusEnum.JOINED && (
								<Button className={"animate-bounce"} onClick={nextQuestion}>
									{strings.go_game}
								</Button>
							)}
						</div>
					</div>
				)}
				{question && (
					<div
						key={question.id}
						className={"user_game_card_animation rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted h-full flex flex-col"}
					>
						<div>
							<Typer dataText={[question.question]} permanent />
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
									disabled={answerInput.length === 0 || isAnswerLoading}
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
					<div className={"user_game_card_animation rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
						<div>
							<div className="w-full">
								<Typer dataText={[strings.congratulations_text]} permanent />
							</div>
							<div className="w-full">
								<Typer timeout={5000} dataText={[strings.watch_game_results]} permanent />
							</div>
						</div>
					</div>
				)}
			</div>
		</Page>
	);
};

export default UserGameView;
