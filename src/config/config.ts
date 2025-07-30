import { type BuildType, BuildTypeEnum, type BuildTypesScheme, type Config } from "./types";

const defaultConfig: Config = {
	SITE_NAME: import.meta.env.REACT_APP_SITE_NAME || "Site Name",
	stateVersion: 0.11, // saved redux state reloads if config version not equal state
	BUILD_TYPE: BuildTypeEnum.LOCALHOST,
	API_URL: "http://fakeapi.mock/",
	WS_URL: "ws://127.0.0.1:8000/",
	localStorageKey: import.meta.env.REACT_APP_LOCAL_STORAGE_KEY || "office_rat_storage",
	tgBotLink: "https://t.me/desk_jockey_bot",
};

const buildTypeConfigs: BuildTypesScheme = {
	[BuildTypeEnum.DEVELOPMENT]: {
		BUILD_TYPE: BuildTypeEnum.DEVELOPMENT,
		WS_URL: "wss://3c5d-92-62-69-224.ngrok-free.app/",
		API_URL: "https://3c5d-92-62-69-224.ngrok-free.app/",
	},
	[BuildTypeEnum.LOCALHOST]: {
		BUILD_TYPE: BuildTypeEnum.LOCALHOST,
		API_URL: "http://127.0.0.1:8000/",
	},
	[BuildTypeEnum.PRODUCTION]: {
		API_URL: "https://office-rat-game.kyrgyzstan.kg/api/",
		WS_URL: "wss://office-rat-game.kyrgyzstan.kg/",
		BUILD_TYPE: BuildTypeEnum.PRODUCTION,
	},
	[BuildTypeEnum.MOCK]: {
		BUILD_TYPE: BuildTypeEnum.MOCK,
	},
};

const buildType: BuildType = (import.meta.env["VITE_APP_BUILD_TYPE"] as BuildType) || BuildTypeEnum.LOCALHOST;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
