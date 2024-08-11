/* eslint-disable react/prop-types */
import { useState } from 'react';
import MoonLoader from "react-spinners/ClipLoader";
import { FaCheckCircle } from "react-icons/fa";

const TabsRender = ({ problem, status }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
//   console.log(problem)

  return (
    <div className="w-full p-4">
      {/* Tabs Header */}
      <div className="flex gap-2">
        <button
          className={`flex flex-row gap-2 w-[30%] items-center p-2 justify-center text-center ${
            activeTab === 1 ? ' text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'
          }`}
          onClick={() => handleTabClick(1)}
        >
          <strong>Case 1</strong>
          {" "}
          {status && (
            <span
              className={`flex flex-row items-center gap-2 p-1 font-bold text-base text-center rounded-full text-white ${
                status === "Running" ? "bg-[#0088cc]" : "bg-[#5cb85c]"
              } `}>
              {status === "Running" ? <MoonLoader size={20}/> : <FaCheckCircle />}
              {/* {status === "Running" ? "Executing" : "Finished"} */}
            </span>
          )}
        </button>
        <button
          className={`flex flex-row gap-2 w-[30%] items-center p-2 justify-center text-center ${
            activeTab === 2 ? ' text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'
          }`}
          onClick={() => handleTabClick(2)}
        >
          <strong>Case 2</strong>
          {" "}
          {status && (
            <span
              className={`flex flex-row items-center gap-2 p-1 font-bold text-base text-center rounded-full text-white ${
                status === "Running" ? "bg-[#0088cc]" : "bg-[#5cb85c]"
              } `}>
              {status === "Running" ? <MoonLoader size={20}/> : <FaCheckCircle />}
              {/* {status === "Running" ? "Executing" : "Finished"} */}
            </span>
          )}
        </button>
        <button
          className={`flex flex-row gap-2 w-[30%] items-center p-2 justify-center text-center ${
            activeTab === 3 ? ' text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'
          }`}
          onClick={() => handleTabClick(3)}
        >
          <strong>Case 3</strong>
          {" "}
          {status && (
            <span
              className={`flex flex-row items-center gap-2 p-1 font-bold text-base text-center rounded-full text-white ${
                status === "Running" ? "bg-[#0088cc]" : "bg-[#5cb85c]"
              } `}>
              {status === "Running" ? <MoonLoader size={20}/> : <FaCheckCircle />}
              {/* {status === "Running" ? "Executing" : "Finished"} */}
            </span>
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-4">
        {
            activeTab === 1 && 
                <div className="font-mono p-4 bg-gray-100 rounded-lg text-black">
                    <h1><strong>Input:</strong> { problem.examples[0].inputText }</h1>
                    <h1><strong>Expected Output: </strong> { problem.examples[0].outputText }</h1>
                    {/* {
                        isCorrect ? `Correct: ${output}` : `Wrong: ${output}`
                    } */}
                </div>
        }

        {
            activeTab === 2 && 
                <div className="font-mono p-4 bg-gray-100 rounded-lg text-black">
                    <h1>Input: { problem.examples[1].inputText }</h1>
                    <h1>Expected Output: { problem.examples[1].outputText }</h1>
                    {/* {
                        isCorrect ? `Correct: ${output}` : `Wrong: ${output}`
                    } */}
                </div>
        }

        {
            activeTab === 3 && 
                <div className="font-mono p-4 bg-gray-100 rounded-lg text-black">
                    <h1>Input: { problem.examples[2].inputText }</h1>
                    <h1>Expected Output: { problem.examples[2].outputText }</h1>
                    {/* {
                        isCorrect ? `Correct: ${output}` : `Wrong: ${output}`
                    } */}
                </div>
        }
      </div>
    </div>
  );
};

export default TabsRender;
