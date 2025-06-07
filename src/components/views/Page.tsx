import React, { type PropsWithChildren } from "react";
import Header from "@/components/Header.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { clsx } from "clsx";

export interface PageProps {
	centrify?: boolean;
}
const Page: React.FC<PropsWithChildren<PageProps>> = ({ children, centrify = false }) => {
	return (
		<div className="flex flex-col min-h-svh w-full ">
			<Header></Header>
			<Separator></Separator>
			<main
				className={clsx("flex flex-grow  justify-center p-6 md:p-10 overflow-hidden", {
					"items-center": centrify,
				})}
			>
				<div className="w-full max-w-lg">{children}</div>
			</main>
		</div>
	);
};

export default Page;
