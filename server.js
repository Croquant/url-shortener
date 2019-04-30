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

// check functions
const check = require("./check");

// set pug as view engine
app.set("view engine", "pug");

// render index page at "/"
app.get("/", (req, res) => {
	res.render("index", { title: "index" } );
});

// get post requests at /newlink
app.post("/newlink", (req, res) => {
	let url = req.body.url;
	if (check.url(url) === 2) {
		res.send("ERROR: Invalid URL");
	} else {
		if (check.url(url) === 1) {
			url = "https://" + url;
		}
		let id = db.add(url);
		res.redirect("/yourlink/" + id);
	}
});

// Your link page
app.get("/yourlink/:id", (req,res) => {
	let link = "/" + db.getlink(req.params.id).id;
	res.render("yourlink", { title: "Your link", url: link});
});

// redirect to url by id
app.get("/:id", (req, res) => {
	let link = db.getlink(req.params.id);
	if (link) {
		res.redirect(link.url);
	} else {
		res.send("ERROR: Invalid id");
	}
});

// start server
app.listen(port, () => {
	console.log("listening on port " + port);
});