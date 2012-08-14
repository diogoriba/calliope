var init = function (params) {
	// Load modules
	require('./chat')(params);
	require('./auth')(params);
};

module.exports = init;
