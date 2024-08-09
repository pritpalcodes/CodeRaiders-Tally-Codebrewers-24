const express = require("express");
const { generateCodeFile, generateInputFile } = require("./generateCodeFile");
const { executeCode } = require("./executeCodeFile");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
	return res.json({ hello: "world" });
});

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


const uri = process.env.MONGODBURI;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const postCollection = client.db("database").collection("posts"); // this collection is for team-ekt
        const userCollection = client.db("database").collection("users"); // this collection is for team-srv

        // get
        app.get('/user', async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        })

        // We'll basically search the db for details of the user from the email passed by the frontend
        app.get('/loggedInUser', async (req, res) => {
            const email = req.query.email;
            const user = await userCollection.find({ email: email }).toArray();
            res.send(user);
        })

        app.get('/post', async (req, res) => {
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        })

        app.get('/userPost', async (req, res) => {
            const email = req.query.email;
            const post = (await postCollection.find({ email: email }).toArray()).reverse();
            res.send(post);
        })

        // post
        app.post('/register', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })

        // patch
        app.patch('/userUpdates/:email', async (req, res) => {
            const filter = req.params;
            const profile = req.body;
            const options = { upsert: true };
            const updateDoc = { $set: profile };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })


    } catch (error) {
        console.log(error);
    }
} run().catch(console.dir);





app.listen(port, () => {
	console.log("Listening on port 5000");
});