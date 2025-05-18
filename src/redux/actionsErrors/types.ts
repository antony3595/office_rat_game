import { AxiosResponse } from "axios";

export type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

export enum ResponseStatus {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	FAIL = "FAIL",
}

export interface BaseResponse<Data> {
	status: ResponseStatus;
	error: string | null;
	data: Data;
	errors: PartialRecord<string, never> | null;
}

export interface SuccessResponse<Data> {
	status: ResponseStatus.SUCCESS;
	error: string | null;
	data: Data;
	errors: PartialRecord<string, never>;
}

export interface APIErrors<E = object> {
	error?: string;
	errors?: E | null;
}

export const isSuccessResponse = (response: AxiosResponse<BaseResponse<any>>): response is AxiosResponse<SuccessResponse<any>> =>
	response?.data.status === ResponseStatus.SUCCESS;
