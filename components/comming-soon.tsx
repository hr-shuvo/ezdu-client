import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pageData } from "@/utils/pageData";
import Head from "next/head";


type ComingSoonProps = {
	slug: string;
	backHref?: string;
};

export const ComingSoon = ({ slug, backHref = "/" }: ComingSoonProps) => {
	const data = pageData[slug] ?? {
		title: "Coming Soon",
		description: "Something awesome is on its way. Stay tuned!",
	};

	return (<>
		<Head>
			<title>{data.title}</title>
			<meta
				name="description"
				content={data.description}
			/>
		</Head>
		
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
			<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
				Coming Soon
			</h1>
			<h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4 mt-5">
				{data.title}
			</h2>
			<p className="text-lg text-gray-600 mb-8">{data.description}</p>
			<Link href={backHref}>
				<Button>Back to Home</Button>
			</Link>
		</div>
	</>
	);
}
