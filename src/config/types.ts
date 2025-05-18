export enum BuildType {
	PRODUCTION = "production",
	DEVELOPMENT = "development",
	LOCALHOST = "localhost",
	MOCK = "mock",
}

export interface Config {
	SITE_NAME: string;
	BUILD_TYPE: BuildType;
	stateVersion: number;
	isProduction: () => boolean;
	API_URL: string;
	localStorageKey: string;
}

interface OverridableConfig extends Partial<Config> {
	BUILD_TYPE: BuildType;
}

export type BuildTypesScheme = {
	[key in BuildType]?: OverridableConfig;
};
