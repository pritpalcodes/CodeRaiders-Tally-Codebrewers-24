/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";

const CodeEditor = ({ theme, code, setCode, language }) => {
	function handleEditorDidMount(editor, monaco) {
		editor.updateOptions({
			// lineNumbers: "off",
			fontSize: "16px",
			mouseWheelZoom: true,
		});
		console.log(monaco.editor.EditorOption);
	}
	return (
		<Editor
			height="50vh"
			width={`100%`}
			language={
				(language === "py"
					? "python"
					: language === "js"
					? "javascript"
					: "cpp") || "cpp"
			}
			value={code}
			theme={theme}
			className="text-xl"
			defaultValue="//Write your code here"
			onMount={handleEditorDidMount}
			onChange={(value) => setCode(value)}
		/>
	);
};

export default CodeEditor;