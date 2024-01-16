import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "qCompiler",
	description: "qCompiler API tester",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="bg-[#02092C]">
			<body className={inter.className + " flex w-screen flex-col"}>
				<div className="bg-[#010517] w-screen text-white font-bold text-2xl min-h-12 flex justify-center items-center">
					qCompiler
				</div>
				<div className="w-screen px-2 py-1 flex items-center justify-center">
					{children}
				</div>
			</body>
		</html>
	);
}
