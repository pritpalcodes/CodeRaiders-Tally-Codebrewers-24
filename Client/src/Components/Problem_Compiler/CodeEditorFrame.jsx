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

// import Problem from '../../../../Server/model/problem';
import mongoose from 'mongoose'

const exampleSchema = new mongoose.Schema({
	id: {
	  type: Number,
	  required: true,
	},
	inputText: {
	  type: String,
	  required: true,
	},
	outputText: {
	  type: String,
	  required: true,
	},
	explanation: {
	  type: String,
	},
  });
  
  const problemSchema = new mongoose.Schema({
	id: {
	  type: String,
	  required: true,
	  unique: true,
	},
	title: {
	  type: String,
	  required: true,
	},
	difficulty: {
	  type: String,
	  required: true,
	  enum: ['Easy', 'Medium', 'Hard'], // to enforce difficulty levels
	},
	category: {
	  type: String,
	  required: true,
	},
	problemStatement: {
	  type: String,
	  required: true,
	},
	toInputData: {
	  type: String,
	  required: true,
	},
	expectedOutput: {
	  type: String,
	  required: true,
	},
	examples: [exampleSchema], 
	constraints: {
	  type: String,
	  required: true,
	},
	starterCode: {
	  type: String,
	  required: true,
	},
	starterFunctionName: {
	  type: String,
	  required: true,
	},
	order: {
	  type: Number,
	  required: true,
	},
	submittedBy: {
	  type: [String], // Array of user UUIDs
	  default: [],
	},
  });
  
const Problem = mongoose.model('Problem', problemSchema);


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

	// const [allProblems, setAllProblems] = useState([]);

	// useEffect(() => {
	// 	const fetchProblems = async () => {
	// 	  try {
	// 		const response = await axios.get('http://localhost:5000/getProblems') 
	// 		const data = response.data
	// 		// console.log("simplifiedProblems", data )
	// 		setAllProblems(data);
	// 	  } catch (error) {
	// 		console.error('There was a problem with the fetch operation:', error);
	// 	  }
	// 	};
	// 	fetchProblems();
	// }, []);
  

	useEffect(() => {
		const setProblemStatus = async () => {
			try {
			  const loggedinuserid = sessionStorage.getItem('userUUID');
			  const response = await axios.get(`http://localhost:5000/checkSubmission/${loggedinuserid}`) 
			  console.log(response);
			  
			} catch (error) {
			  console.error('There was a problem with the fetch operation:', error);
			}
		  };
		  setProblemStatus();
	}, []);

	useEffect(() => {
		const funtt = async()=>{
			console.log("expectedOutput" + expectedOutput); 
			console.log("actualOutput" + actualOutput);
			if (comparisonTriggered && expectedOutput && actualOutput) {
				if (expectedOutput === actualOutput) {
					const userUUID = sessionStorage.getItem('userUUID');
					const problemId = problem.id;
					// const problems = await Problem.find();
					toast.success('All test cases pass!');
					await Problem.findOneAndUpdate(
						{ id: problemId },
						{
							$setOnInsert: { submittedBy: [] }, // Initialize submittedBy if not present
							$addToSet: { submittedBy: userUUID } // Add userUUID to the array, avoiding duplicates
						},
						{ 
							new: true, // Return the updated document
							upsert: true // Create the document if it does not exist
						}
					);

					
				} else {
					toast.error('One or more test cases failed!');
				}
				setComparisonTriggered(false);
			}
		};
		funtt();

	}, [expectedOutput, actualOutput, comparisonTriggered, problem.id]);


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