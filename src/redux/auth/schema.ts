import type { CurrentUser } from "../../api/schema/users";
import type { AuthResponse } from "../../api/schema/auth";

export interface AuthState {
	loggedIn: boolean;
	user: CurrentUser;
	token: AuthResponse;
}
