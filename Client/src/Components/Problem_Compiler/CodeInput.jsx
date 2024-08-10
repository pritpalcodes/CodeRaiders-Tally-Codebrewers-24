/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const CodeInput = ({ problem, testInput, setTestInput }) => {
	const [toggleInputBar, setToggleInputBar] = useState(true);

	return (
		<div
			className={`z-20 sm:border flex flex-col justify-center w-1/2 md:w-full border rounded-2xl h-64 ${
				toggleInputBar ? "md:h-16" : "md:h-1/3"
			}`}>
			<button
				className="flex ml-0 items-center pt-2 text-xl rounded-md justify-center w-32"
				onClick={() => {
					setToggleInputBar(!toggleInputBar);
				}}>
				Input:{" "}
				{ toggleInputBar ? <IoIosArrowDown /> : 	<IoIosArrowUp /> }
				
			</button>
			<textarea
				name=""
				id=""
				className={`p-2 text-white bg-transparent ${
					toggleInputBar ? "hidden" : ""
				}`}
				cols="30"
				rows="15"
				placeholder=""
				value={problem.toInputData}
				onChange={(e) => setTestInput(e.target.value)}></textarea>
		</div>
	);
};

export default CodeInput;