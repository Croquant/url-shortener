// data checking functions here


// Check if valid url
// Return 0 if valid url with (http|https):// prefix
// Return 1 if valid url without (http|https):// prefix
// Return 2 if invalid
exports.url = function (url) {
	let exp_allurl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	let allurl= new RegExp(exp_allurl);
	let exp_http = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	let http = new RegExp(exp_http);

	if (url.match(allurl)) {
		if (url.match(http)) {
			return 0;
		} else {
			return 1;
		}
	} else {
		return 2;
	}
};