var init = function (params) {
	// Load modules
	exports.chat = require('./chat')(params);
};

module.exports = init;
