const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { compile } = require("qcompiler");
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
	res.send("Hello World!");
});

app.post("/compile", async (req, res) => {
	try {
		const data = await compile(req.body);
		res.json(data);
	} catch (error) {
		res.json({ status: false, error: error.message });
	}
});

//-------------------------------------------------

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
