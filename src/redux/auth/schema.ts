import { CurrentUser } from "../../api/schema/users";
import { AuthResponse } from "../../api/schema/auth";

export interface AuthState {
	loggedIn: boolean;
	user: CurrentUser;
	token: AuthResponse;
}
