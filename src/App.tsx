import PageRouter from "./components/router/PageRouter";
import "@/stylesheets/main.css";
import { ThemeProvider } from "@/components/theming/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import AchievementsSocketListener from "@/components/common/AchievementsSocketListener/AchievementsSocketListener.tsx";

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster position="top-center" toastOptions={{ className: "pixel-font" }} richColors  />
			<AchievementsSocketListener/>
			<div>
				<PageRouter />
			</div>
		</ThemeProvider>
	);
};

export default App;
