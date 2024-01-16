"use client";
import { ButtonComponent } from "@/components/Button";
import { DropdownComponent } from "@/components/Dropdown";
import { Textarea } from "keep-react";
import { useState } from "react";

export default function Home() {
	const [language, setLanguage] = useState(null);
	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");

	const config = {
		C: { OS: "windows", cmd: "gcc" },
		CPP: { OS: "windows", cmd: "g++" },
		JAVA: { OS: "windows", cmdCompile: "javac", cmdExecute: "java" },
		PYTHON: { OS: "windows", cmd: "python" },
	};

	const onClickRun = async () => {
		try {
			setError("");
			setOutput("");
			const response = await fetch("http://localhost:5000/compile", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: code,
					language: language,
					input: input,
					config: config[language],
				}),
			});

			const data = await response.json();
			if (data.output) setOutput(data.output);
			if (data.error) setError(data.error);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-11/12 lg:w-3/4 rounded-md flex flex-col mt-2 border">
			<div className="flex flex-row bg-slate-400 h-[600px]">
				<div className="w-4/6 h-full border rounded-md rounded-b-none flex flex-col items-center overflow-hidden">
					<div className="font-bold flex w-full flex-row h-[10%] items-center justify-between p-2 bg-slate-600">
						<div>
							<DropdownComponent
								label={"Select Language"}
								action={setLanguage}
							/>
						</div>
						<ButtonComponent label={"Run"} action={onClickRun} />
					</div>
					<Textarea
						className="font-bold rounded-t w-full h-[90%] bg-[#0d0425] text-white p-2"
						id="comment"
						placeholder="Write your code here..."
						withBg={true}
						border={false}
						color="info"
						rows={4}
						value={code}
						onChange={(d) => setCode(d.target.value)}
					/>
				</div>
				<div className="w-2/6 h-full border rounded-md rounded-b-none overflow-hidden">
					<div className="w-full h-1/2 rounded-md overflow-hidden">
						<div className="w-full bg-slate-600 font-bold h-[20%] flex items-center justify-center">
							Input
						</div>
						<Textarea
							className="font-bold w-full p-2 h-[80%] bg-[#0d0425] text-white overflow-auto"
							withBg={true}
							border={false}
							color="info"
							rows={4}
							value={input}
							onChange={(d) => setInput(d.target.value)}
						/>
					</div>
					<div className="w-full h-1/2 rounded-md rounded-b-none overflow-hidden">
						<div className="w-full h-[20%] bg-slate-600 font-bold flex items-center justify-center">
							Output
						</div>
						<div className="font-bold w-full p-2 h-[80%] bg-[#0d0425] text-white overflow-auto">
							{output}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full rounded-b min-h-20 flex px-2 text-red-400 items-center bg-slate-900">
				{error}
			</div>
		</div>
	);
}
