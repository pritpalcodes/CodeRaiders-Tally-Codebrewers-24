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

function CodeEditorFrame({ problem }) {
	const completeCode = 
	
`#include<bits/stdc++.h>
using namespace std;

` 
+ problem.starterCode +
`

int main() {
	int t;
	cin >> t;
	while(t--) {
		int n;
		cin >> n;
		vector<int> nums(n);
		for(int i = 0 ; i < n ; i++){
			cin >> nums[i];
		}
		int target;
		cin >> target;
		vector<int> ans = twoSum(nums, target);
		for(auto i : ans) {
			cout << i << " ";
		}
		
	}
		
	return 0;
}
`;

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

	useEffect(() => {
		console.log("expectedOutput" + expectedOutput); // This will log the current state value after the component has rendered
		console.log("actualOutput" + actualOutput); // This will log the current state value after the component has rendered
		if(expectedOutput==actualOutput) {
			alert("correct");
		}
	}, [expectedOutput, actualOutput]);

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
					<CodeOutput output={output} toggled={toggled} status={status} />
					<TabsRender problem={problem} color='#000' output={output} />
				</div>
			</div>
		</div>
	);
}

export default CodeEditorFrame;