import "./CodeEditorFrame.css";
import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import CodeOutput from "./CodeOutput";
import CodeInput from "./CodeInput";
import Navbar from "./Navbar";
import { cppBoiler } from "./boilerPlate";

function CodeEditorFrame() {
	const [code, setCode] = useState(cppBoiler);
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState({
		label: "C++",
		value: "cpp",
	});
	const [toggled, setToggled] = useState(true);
	const [testInput, setTestInput] = useState("");
	const [theme, setTheme] = useState("vs-dark");
	const [status, setStatus] = useState(null);
	const handleSubmit = async () => {
		const payload = {
			language: language.value,
			code,
			testInput,
		};
		const url = "http://localhost:5000/run";
		try {
			const { data } = await axios.post(url, payload);
			setOutput(data.output);
			console.log(data.output);
			setStatus("Finished");
		} catch ({ response }) {
			if (response) {
				let error = response.data.err.stderr;			
				const errorIndex = error.indexOf("error");
				const warningIndex = error.indexOf("warning");			
				if (errorIndex !== -1 && warningIndex !== -1) {
					error = errorIndex < warningIndex ? error.substring(errorIndex) : error.substring(warningIndex);
				} else if (errorIndex !== -1) {
					error = error.substring(errorIndex);
				} else if (warningIndex !== -1) {
					error = error.substring(warningIndex);
				}
			
				setOutput(error);
			} else {
				setOutput("Error connecting with the Server!");
			}
		}
	};
	return (
		<div className="h-full w-full flex flex-col gap-5">
			{/* <div className="w-full flex flex-row gap-3">
					<div className="w-5 h-5 rounded-full bg-red-500 flex justify-center items-center"></div>
					<div className="w-5 h-5 rounded-full bg-amber-300 flex justify-center items-center"></div>
					<div className="w-5 h-5 rounded-full bg-emerald-500 flex justify-center items-center"></div>
			</div> */}
			<div className="flex md:flex-row flex-col h-full w-full gap-5">
				<div className="flex h-full flex-col md:w-2/3 w-full ">
					<Navbar
						setLanguage={setLanguage}
						language={language}
						setCode={setCode}
						setTheme={setTheme}
						theme={theme}
						handleSubmit={handleSubmit}
						setStatus={setStatus}
					/>

					<CodeEditor
						theme={theme}
						code={code}
						setCode={setCode}
						language={language}
					/>
				</div>
				<div className="md:w-1/3 flex w-full flex-col gap-5 h-full">
					<CodeOutput output={output} toggled={toggled} status={status} />
					<CodeInput
						testInput={testInput}
						setTestInput={setTestInput}
						setToggled={setToggled}
					/>
				</div>
			</div>
		</div>
	);
}

export default CodeEditorFrame;