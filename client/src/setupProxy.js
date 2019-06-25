const proxy = require('http-proxy-middleware');

/* forward all /api/* requests to the backend server
	at port 3001during development. */
module.exports = function(app) {
	app.use(proxy('/api', { target: 'http://localhost:3001'}));
};