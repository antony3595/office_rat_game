import {BuildType, BuildTypesScheme, Config} from "./types";

const defaultConfig: Config = {
	SITE_NAME: process.env.REACT_APP_SITE_NAME || "Site Name",
	stateVersion: 0.8, // saved redux state reloads if config version not equal state
	BUILD_TYPE: BuildType.LOCALHOST,
	isProduction: () => process.env.REACT_APP_BUILD_TYPE === BuildType.PRODUCTION,
	API_URL: "http://fakeapi.mock/",
	localStorageKey: process.env.REACT_APP_LOCAL_STORAGE_KEY || "office_rat_storage",
	tgBotLink: "https://t.me/desk_jockey_bot",
};

const buildTypeConfigs: BuildTypesScheme = {
	[BuildType.DEVELOPMENT]: {
		BUILD_TYPE: BuildType.DEVELOPMENT,
		API_URL: "https://unknown.kg/",
	},
	[BuildType.LOCALHOST]: {
		BUILD_TYPE: BuildType.LOCALHOST,
		API_URL: "http://127.0.0.1:8000/",
	},
	[BuildType.PRODUCTION]: {
		API_URL: "https://unknown.kg/",
		BUILD_TYPE: BuildType.PRODUCTION,
	},
	[BuildType.MOCK]: {
		BUILD_TYPE: BuildType.MOCK,
	},
};

const buildType: BuildType = (process.env["REACT_APP_BUILD_TYPE"] as BuildType) || BuildType.LOCALHOST;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
