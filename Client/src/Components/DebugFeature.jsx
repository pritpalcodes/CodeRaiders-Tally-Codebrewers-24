/* eslint-disable no-unused-vars */
import React from "react";

const DebugFeature = () => {
  return (
    <div className="flex flex-col w-[40%] h-[600px] bg-[#242424] rounded-lg shadow-lg p-8 poppins-medium">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Instantly debug code to get the required output
          </h2>
          <p className="text-gray-400">
            The Debug code feature analyse your code on multiple test cases
            based on your approach and generate detailed fixes along with
            description of the error that you may have otherwise missed to
            achieve the desired output.
          </p>
        </div>
        <div className="w-full">
          <img
            className="w-full h-auto rounded-lg"
            src="/images/debugFeature.png"
            alt="Debug feature"
          />
        </div>
      </div>
    </div>
  );
};

export default DebugFeature;
