var init = function (params) {
	// Load modules
	exports.chat = require('./chat')(params);
	exports.auth = require('./auth')(params);
};

module.exports = init;
