/* eslint-disable react/prop-types */
import { useState } from 'react';

const TabsRender = ({ problem }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
//   console.log(problem)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Tabs Header */}
      <div className="flex gap-2">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 1 ? 'w-1/3 text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'
          }`}
          onClick={() => handleTabClick(1)}
        >
          Case 1
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 2 ? 'w-1/3 text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'
          }`}
          onClick={() => handleTabClick(2)}
        >
          Case 2
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 3 ? 'w-1/3 text-gray-700 bg-[#f2f3f4] rounded-lg' : 'text-white rounded-lg'        
          }`}
          onClick={() => handleTabClick(3)}
        >
          Case 3
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-4">
        {
            activeTab === 1 && 
                <div className="p-4 bg-gray-100 rounded-lg text-black">
                    <h1>Input: { problem.examples[0].inputText }</h1>
                    <h1>Expected Output: { problem.examples[0].outputText }</h1>
                </div>
        }

        {
            activeTab === 2 && 
                <div className="p-4 bg-gray-100 rounded-lg text-black">
                    <h1>Input: { problem.examples[1].inputText }</h1>
                    <h1>Expected Output: { problem.examples[1].outputText }</h1>
                </div>
        }

        {
            activeTab === 3 && 
                <div className="p-4 bg-gray-100 rounded-lg text-black">
                    <h1>Input: { problem.examples[2].inputText }</h1>
                    <h1>Expected Output: { problem.examples[2].outputText }</h1>
                </div>
        }
      </div>
    </div>
  );
};

export default TabsRender;
