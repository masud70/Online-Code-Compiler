"use client";
import { ButtonComponent } from "@/components/Button";
import { DropdownComponent } from "@/components/Dropdown";
import { Textarea } from "keep-react";
import { useEffect, useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

export default function Home() {
	const [language, setLanguage] = useState(null);
	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");

	const extensions = [
		language == "JAVA" ? java() : language == "PYTHON" ? python() : cpp(),
	];

	const config = {
		C: { OS: "windows", cmd: "gcc" },
		CPP: { OS: "windows", cmd: "g++" },
		JAVA: { OS: "windows", cmdCompile: "javac", cmdExecute: "java" },
		PYTHON: { OS: "windows", cmd: "python" },
	};

	const onClickRun = async () => {
		try {
			if (!language) {
				setError("Error: Select any language.");
				return;
			}
			setError();
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
			setError(error.message);
		}
	};

	return (
		<div className="w-11/12 lg:w-3/4 rounded-md flex flex-col mt-2 border overflow-hidden">
			<div className="flex flex-row bg-slate-400 h-[555px]">
				<div className="w-4/6 h-full border rounded-tl-md flex flex-col items-center overflow-hidden">
					<div className="font-bold flex w-full flex-row h-[10%] items-center justify-between p-2 bg-slate-600">
						<div>
							<DropdownComponent
								label={"Select Language"}
								action={setLanguage}
							/>
						</div>
						<ButtonComponent label={"Run"} action={onClickRun} />
					</div>
					<CodeMirror
						height="500px"
						theme="dark"
						value={code}
						placeholder="Write your code here..."
						className="w-full h-[90%] rounded-t text-lg"
						extensions={extensions}
						onChange={(d) => setCode(d)}
					/>
				</div>
				<div className="w-2/6 h-full border rounded-tr-md overflow-hidden">
					<div className="w-full h-1/2 rounded-tr-md overflow-hidden">
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
					<div className="w-full h-1/2 overflow-hidden">
						<div className="w-full h-[20%] bg-slate-600 font-bold flex items-center justify-center">
							Output
						</div>
						<div className="font-bold w-full p-2 h-[80%] bg-[#0d0425] text-white overflow-auto">
							{output}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full rounded-b flex text-red-400 items-center bg-slate-900">
				<CodeMirror
					value={error}
					minHeight="50px"
					maxHeight="150px"
					theme="dark"
					className="w-full"
				/>
			</div>
		</div>
	);
}
