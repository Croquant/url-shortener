/* eslint-disable no-console */
const express	= require("express");
const app		= express();
const port 		= 8080;

// set pug as view engine
app.set("view engine", "pug");

// render index page at "/"
app.get("/", (req, res) => {
	res.render("index", { title: "index" } );
});

// start server
app.listen(port, () => {
	console.log("listening on port " + port);
});