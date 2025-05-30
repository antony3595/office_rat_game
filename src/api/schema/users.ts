export interface UserMin {
	id: number;
	username: string;
}

export interface CurrentUser extends UserMin {
	tg_id: number;
	username: string;
	first_name: string;
	last_name: string;
	language_code: string;
	allows_write_to_pm: boolean;
	photo_url: string;
}
