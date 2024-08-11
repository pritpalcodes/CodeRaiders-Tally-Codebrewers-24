const express = require("express");
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require('./connectDB');

const { generateCodeFile, generateInputFile } = require("./generateCodeFile");
const { executeCode } = require("./executeCodeFile");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

const User = require('./model/users');
const Problem = require('./model/problem');

// Insert user on login from here
app.post('/users', async (req, res) => {
	const { uid, name, email, photoURL } = req.body;
	
	try {
		let user = await User.findOne({ uid });
		if (user === null) {
			console.log('Incoming data:', { uid, name, email, photoURL });
			user = new User({ uid, name, email, photoURL });
			let r = await user.save();
			console.log("await response", r);
		}
	  	res.status(200).json(user);
	} catch (err) {
		console.error('Error saving user data:', err.message);
		res.status(500).json({ error: err.message });
	}	  
});
  
  


// Basic Route
app.get("/", (req, res) => {
	return res.json({ message: "API is working fine." });
});

// Execute both compiler code
app.post("/run", async (req, res) => {
	const { language, code, testInput } = req.body;
	if (code === undefined) {
		return res.status(400).json({ success: false, error: "Empty code Body" });
	}
	// generate a "code file" from the code
	// then compile that cpp file
	// get output
	try {
		const codeFilePath = await generateCodeFile(language, code);
		const inputFilePath = await generateInputFile(testInput);
		const output = await executeCode(codeFilePath, language, inputFilePath);
		console.log("this is output", output);
		return res.json({ output });
	} catch (err) {
		res.status(500).json({ err });
	}
});

app.listen(port, () => {
	console.log("Listening on port 5000");
});