import { useEffect } from "react";
import { useToken } from "@/redux/auth/loader.ts";
import type { AchievementWithCount } from "@/api/schema/achievement.ts";
import { toast } from "sonner";
import strings from "@/constants/strings.ts";
import config from "@/config/config.ts";
import useWebSocket from "react-use-websocket";

const AchievementsSocketListener = () => {
	const token = useToken();

	const { lastMessage } = useWebSocket(`${config.WS_URL}ws/achievements?token=${token}`, {
		shouldReconnect: () => true,
	});
	useEffect(() => {
		if (lastMessage?.data) {
			const parsed_message: { data: AchievementWithCount } = JSON.parse(lastMessage.data);
			toast.info(strings.achievement_unlocked, {
				description: parsed_message.data.title,
				icon: null,
				duration: 5000,
			});
		}
	}, [lastMessage]);

	return null;
};

export default AchievementsSocketListener;
