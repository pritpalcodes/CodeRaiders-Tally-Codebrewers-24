/* eslint-disable react/prop-types */

const CodeOutput = ({ output, toggled, status }) => {
	return (
		<div
			className={`flex flex-col overflow-hidden bg-black-800 p-4 h-64 w-1/2 border rounded-2xl md:w-full ${
				toggled ? "md:h-1/3" : "md:h-4/6"
			}`}>
			<label className="flex text-xl border-gray-200 pb-4 font-semibold text-white">
				Output:{" "}
				{status && (
					<span
						className={`ml-2 block w-28 font-bold text-base text-center rounded-full text-white p-1 ${
							status === "Running" ? "bg-[#0088cc]" : "bg-[#5cb85c]"
						} `}>
						{status}
					</span>
				)}
			</label>
			<div className="w-full h-full flex flex-col p-2 overflow-y-auto">
				{output.split("\r\n").map((line, index) => (
					<samp key={index}>{line}</samp>
				))}
			</div>
		</div>
	);
};

export default CodeOutput;