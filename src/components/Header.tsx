import { useCurrentUserLoader } from "@/redux/auth/loader.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useNavigate } from "react-router-dom";
import {GAMES, HOME} from "@/urls.ts";
import strings from "@/constants/strings.ts";

const Header = () => {
	const [, currentUser] = useCurrentUserLoader();
	const navigate = useNavigate();
	return (
		<div className="min-h-full">
			<nav className="bg-muted">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-end">
						<div>
							<div className="ml-4 flex items-center md:ml-6">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Avatar>
											<AvatarImage src={currentUser?.photo_url ? currentUser.photo_url : ""} alt="avatar" />
											<AvatarFallback>{currentUser.username.slice(0, 2)}</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>
											{currentUser.username ? `@${currentUser.username}` : "My Account"}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => {
												navigate(HOME);
											}}
										>
											{strings.home_page}
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												navigate(GAMES);
											}}
										>
											{strings.games}
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												navigate("/404");
											}}
										>
											404
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
