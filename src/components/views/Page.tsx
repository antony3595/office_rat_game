import React, { type PropsWithChildren } from "react";
import Header from "@/components/Header.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const Page: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-svh w-full ">
			<Header></Header>
			<Separator></Separator>
			<main className="flex flex-grow items-center justify-center p-6 md:p-10 overflow-hidden">
				<div className="w-full max-w-lg">{children}</div>
			</main>
		</div>
	);
};

export default Page;
