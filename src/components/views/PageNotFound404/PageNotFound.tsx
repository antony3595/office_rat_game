import "./page_not_found.css";
import strings from "../../../constants/strings";
import Typer from "@/components/ui/Typer/typer.tsx";

const PageNotFound = () => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 overflow-hidden">
			<div className="page-not-found centrify">
				<div className="fof">
					<Typer dataText={[strings.page_not_found]} heading={"404:"} />
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
