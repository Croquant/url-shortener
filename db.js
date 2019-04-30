const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ links: [], count: 0 })
	.write();

exports.add = function (url) {
	// add object to links
	db.get("links")
		.push({ url: url, timestamp: Date.now(), hits: 0 })
		.write();

	// update count
	db.update("count", n => n + 1)
		.write();
};