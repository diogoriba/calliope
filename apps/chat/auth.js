var auth = function (params) {
	// Parse args
	var app = params['express'];
	
	// Require
	var auth = require('connect-auth');

	// Configure
	app.configure(function () {
		app.use(auth([auth.Facebook({ appId: "", appSecret: "", scope: "", callback: undefined })]));
	});
};
