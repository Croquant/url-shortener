/* eslint-disable no-console */

// express js config
const express	= require("express");
const app		= express();
const port 		= 8080;
const bodyParser = require("body-parser");
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: false
}));

// db config
const db = require("./db");

// set pug as view engine
app.set("view engine", "pug");

// render index page at "/"
app.get("/", (req, res) => {
	res.render("index", { title: "index" } );
});

// get post requests at /newlink
app.post("/newlink", (req, res) => {
	db.add(req.body.url);
});

// start server
app.listen(port, () => {
	console.log("listening on port " + port);
});