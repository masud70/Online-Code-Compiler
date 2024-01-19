const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const {
	compileC,
	compileCPP,
	compileJava,
	compilePython,
} = require("qcompiler");
const app = express();
app.use(cors());
const port = 5000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use("/static", express.static(path.join(__dirname, "public")));

//----------------------Routes--------------------
app.get("/", (req, res) => {
	res.send("Hello qCompiler!");
});

app.post("/compile", async (req, res) => {
	if (req.body.language == "C") {
		try {
			console.log(req.body);
			const data = await compileC(req.body);
			console.log("C: ", data);
			res.json(data);
		} catch (error) {
			res.json({ status: false, error: error.message });
		}
	} else if (req.body.language == "CPP") {
		try {
			console.log(req.body);
			const data = await compileCPP(req.body);
			console.log("CPP: ", data);
			res.json(data);
		} catch (error) {
			res.json({ status: false, error: error.message });
		}
	} else if (req.body.language == "JAVA") {
		try {
			console.log(req.body);
			const data = await compileJava(req.body);
			console.log("JAVA: ", data);
			res.json(data);
		} catch (error) {
			res.json({ status: false, error: error.message });
		}
	} else if (req.body.language == "PYTHON") {
		try {
			console.log(req.body);
			const data = await compilePython(req.body);
			console.log("PYTHON: ", data);
			res.json(data);
		} catch (error) {
			res.json({ status: false, error: error.message });
		}
	}
});

//-------------------------------------------------

app.listen(port, () => {
	console.log(`qCompiler app listening on port ${port}`);
});
