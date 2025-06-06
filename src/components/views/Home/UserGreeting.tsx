import React from 'react';
import {useCurrentUserLoader} from "@/redux/auth/loader.ts";
import {useAppSelector} from "@/redux/hooks.ts";
import {createErrorSelector} from "@/redux/actionsErrors/selectors.ts";
import {createStatusSelector} from "@/redux/actionsStatuses/selectors.ts";
import {Button} from "@/components/ui/button.tsx";

const UserGreeting: React.FC = () => {
    const [isCurrentUserLoading, currentUser] = useCurrentUserLoader();
	const error = useAppSelector(createErrorSelector("currentUser"));
	const status = useAppSelector(createStatusSelector("currentUser"));


    
    return (
		<div>
			<h1>Мое Telegram Web App (с Hooks)</h1>
			{error && <p>{error}</p>}
			{currentUser && (
				<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
					<div>{currentUser.id}</div>
					<div>{currentUser.tg_id}</div>
					<div>{currentUser.first_name}</div>
					<div className="transform scale-100 md:scale-75">
						{currentUser.photo_url && <img src={currentUser.photo_url} alt="avatar" />}
					</div>
					<div>
						<span className="flex h-3 w-3 relative">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
						</span>
					</div>
				</div>
			)}
			{isCurrentUserLoading && <p>Загрузка пользователя...</p>}
			<div>
				<button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
					Click me
				</button>
			</div>
			<Button>{status}</Button>
		</div>
	);
};

export default UserGreeting;