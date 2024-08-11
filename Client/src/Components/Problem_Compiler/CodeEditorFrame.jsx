/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./CodeEditorFrame.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import CodeOutput from "./CodeOutput";
// import CodeInput from "./CodeInput";
import Navbar from "./Navbar";
import TabsRender from "./Tabs";
// import { cppBoiler } from "./boilerPlate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sanitizeHtml from 'sanitize-html';


function CodeEditorFrame({ problem }) {
	const completeCode = problem.starterCode;

	const [code, setCode] = useState(completeCode);
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState({
		label: "C++",
		value: "cpp",
	});
	const [toggled, setToggled] = useState(true);
	// console.log(problem.toInputData);
	const [testInput, setTestInput] = useState(problem.toInputData);
	const [theme, setTheme] = useState("vs-dark");
	const [status, setStatus] = useState(null);

	const [expectedOutput, setExpectedOutput] = useState(problem.expectedOutput)
	const [actualOutput, setActualOutput] = useState("")
	const [comparisonTriggered, setComparisonTriggered] = useState(false); // New state

	useEffect(() => {
		console.log("expectedOutput" + expectedOutput); 
		console.log("actualOutput" + actualOutput);
		if (comparisonTriggered && expectedOutput && actualOutput) {
			if (expectedOutput === actualOutput) {
				toast.success('All test cases pass!');
			} else {
				toast.error('One or more test cases failed!');
			}
			setComparisonTriggered(false);
		}
	}, [expectedOutput, actualOutput, comparisonTriggered]);


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

			let actualOutput = data.output.split("Execution")[0];
			
			setExpectedOutput(expectedOutput.trim());
			setActualOutput(actualOutput.trim());
			setComparisonTriggered(true); 
			
			
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
		<div className="h-screen w-full">
			<div className="overflow-hidden flex flex-col h-full w-full gap-5">
				<div className="overflow-hidden flex h-full flex-col w-full ">
					<Navbar
						setLanguage={setLanguage}
						language={language}
						setCode={setCode}
						setTheme={setTheme}
						theme={theme}
						handleSubmit={handleSubmit}
						setStatus={setStatus}
						problem={completeCode}
					/>

					<CodeEditor
						theme={theme}
						code={code}
						setCode={setCode}
						language={language}
					/>
				</div>
				<div className="flex flex-row w-full gap-5 h-full">
					{/* <CodeOutput output={output} toggled={toggled} status={status} /> */}
					<TabsRender problem={problem} color='#000' output={output} status={status} />
				</div>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					transition: Bounce
					theme="dark"
				/>

			</div>
		</div>
	);
}

export default CodeEditorFrame;