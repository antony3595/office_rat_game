import { useEffect, useRef } from "react";
import { useToken } from "@/redux/auth/loader.ts";
import type { AchievementWithCount } from "@/api/schema/achievement.ts";
import { toast } from "sonner";
import strings from "@/constants/strings.ts";
import config from "@/config/config.ts";

const AchievementsSocketListener = () => {
	const socket = useRef<WebSocket | null>(null);
	const token = useToken();

	useEffect(() => {
		socket.current = new WebSocket(`${config.WS_URL}ws/achievements?token=${token}`);

		socket.current.onopen = () => {
			console.log("connected");
		};
		socket.current.onclose = () => {
			console.log("close");
		};
		socket.current.onmessage = (event: MessageEvent<string>) => {
			const parsed_message: { data: AchievementWithCount } = JSON.parse(event.data);
			toast.info(strings.achievement_unlocked, {
				description: parsed_message.data.title,
				icon: null,
				duration: 5000,
			});
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

	return null;
};

export default AchievementsSocketListener;
