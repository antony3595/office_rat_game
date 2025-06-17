import { Outlet } from "react-router-dom";
import TelegramErrorBoundary from "@/components/auth/telegram/TelegramErrorBoundary.tsx";
import TelegramAuth from "@/components/auth/telegram/TelegramAuth.tsx";
import ErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary.tsx";
import AchievementsSocketListener from "@/components/common/AchievementsSocketListener/AchievementsSocketListener.tsx";

const RootRouteProvider = () => {
	return (
		<div>
			<ErrorBoundary title={"ErrorBoundary"}>
				<TelegramErrorBoundary>
					<TelegramAuth
						outlet={
							<>
								<Outlet />
								<AchievementsSocketListener />
							</>
						}
					></TelegramAuth>
				</TelegramErrorBoundary>
			</ErrorBoundary>
		</div>
	);
};

export default RootRouteProvider;
