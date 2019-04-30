const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ links: [], count: 0 })
	.write();

exports.add = function (url) {
	// add object to links
	db.get("links")
		.push({ id: shortid.generate(), url: url, timestamp: Date.now(), hits: 0 })
		.write();

	// update count
	db.update("count", n => n + 1)
		.write();

	return db.get("links")
		.find({ url: url })
		.value().id;
};

exports.getlink = function (id) {
	return db.get("links")
		.find({ id: id })
		.update("hits", n => n + 1)
		.write();
};