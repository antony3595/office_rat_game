import PageRouter from "./components/router/PageRouter";
import "@/stylesheets/main.css";
import { ThemeProvider } from "@/components/theming/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster position="bottom-left" />

			<div>
				<PageRouter />
			</div>
		</ThemeProvider>
	);
};

export default App;
