import { isAxiosError } from "axios";
import strings from "../constants/strings";
export const isError = function (e: any): e is Error {
	return e && e.stack && e.message;
};

export const getApiError = <E>(e: any, defaultMessage = strings.unknown_error): string => {
	if (isAxiosError(e)) {
		return e.response?.data.error || defaultMessage;
	} else if (isError(e)) return e.message;
	return strings.unknown_error;
};
