const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const executeCpp = (filePath) => {
    const outputDir = path.join(__dirname, "outputs");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const jobId = path.basename(filePath).split(".")[0]; // Extract jobId from file name
    const outputPath = path.join(outputDir, `${jobId}.out`); // Use .exe extension for Windows
    const inputFilePath = path.join(__dirname, "input.txt"); // Full path for input file

    return new Promise((resolve, reject) => {
        const startTime = process.hrtime(); // Start time
        const startCpuUsage = process.cpuUsage(); // Start CPU time

        exec(
            `g++ "${filePath}" -o "${outputPath}" && cd "${outputDir}" && ${jobId}.out` + 
             "< input.txt", // Use full paths
            (error, stdout, stderr) => {
                const endTime = process.hrtime(startTime); // End time
                const endCpuUsage = process.cpuUsage(startCpuUsage); // End CPU time
                const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to milliseconds

                if (error) {
                    reject({ error, stderr });
                } else {
                    const cpuTime = (endCpuUsage.user + endCpuUsage.system) / 1e6; // CPU time in seconds
                    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(3) + ' MB'; // Memory in MB

                    const result = stdout + `\nExecution Time: ${(executionTime / 1000).toFixed(3)} s`
                                   + `\nCPU Time: ${cpuTime.toFixed(3)} s`
                                   + `\nMemory Usage: ${memoryUsage}`;
                    resolve(result);
                }
            }
        );
    });
};


const executePython = (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        const startTime = process.hrtime(); // Start time
        const startCpuUsage = process.cpuUsage(); // Start CPU time

        exec(`python ${filePath} < ${inputFilePath}`, (error, stdout, stderr) => {
            const endTime = process.hrtime(startTime); // End time
            const endCpuUsage = process.cpuUsage(startCpuUsage); // End CPU time
            const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to milliseconds

            if (error) {
                reject({ error, stderr });
            } else {
                const cpuTime = (endCpuUsage.user + endCpuUsage.system) / 1e6; // CPU time in seconds
                const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(3) + ' MB'; // Memory in MB

                const result = stdout + `\nExecution Time: ${(executionTime / 1000).toFixed(3)} s`
                               + `\nCPU Time: ${cpuTime.toFixed(3)} s`
                               + `\nMemory Usage: ${memoryUsage}`;
                resolve(result);
            }
        });
    });
};

const executeJavascript = (filePath) => {
    return new Promise((resolve, reject) => {
        const startTime = process.hrtime(); // Start time
        const startCpuUsage = process.cpuUsage(); // Start CPU time

        exec(`node ${filePath}`, (error, stdout, stderr) => {
            const endTime = process.hrtime(startTime); // End time
            const endCpuUsage = process.cpuUsage(startCpuUsage); // End CPU time
            const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to milliseconds

            if (error) {
                reject({ error, stderr });
            } else {
                const cpuTime = (endCpuUsage.user + endCpuUsage.system) / 1e6; // CPU time in seconds
                const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(3) + ' MB'; // Memory in MB

                const result = stdout + `\nExecution Time: ${(executionTime / 1000).toFixed(3)} s`
                               + `\nCPU Time: ${cpuTime.toFixed(3)} s`
                               + `\nMemory Usage: ${memoryUsage}`;
                resolve(result);
            }
        });
    });
};

const executeCode = (codeFilePath, language, inputFilePath) => {
    console.log("This is path", codeFilePath);
    if (language === "cpp") {
        return executeCpp(codeFilePath);
    } else if (language === "py") {
        return executePython(codeFilePath, inputFilePath);
    } else if (language === "js") {
        return executeJavascript(codeFilePath);
    }
};

module.exports = {
    executeCode,
};
