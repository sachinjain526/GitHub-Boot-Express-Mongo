const jsonWebToken = require('jsonwebtoken');
module.exports = () => {
	let middleware = (req, res, next) => {
		if (req.path === "/" || req.path === "/auth/github" || req.path === "/auth/github/callback" || req.path === "/api/current_user" || req.path === "/logout") {
			next();
		} else {
			const token = req.body.token || req.query.token || req.headers['authorization'];
			if (token) {
				// verifies secret and checks exp
				jsonWebToken.verify(token, app.get('jwtSecret'), (err, decoded) => {
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' });
					} else {
						req.token = decoded;
						next();
					}
				});
			} else {
				return res.status(403).send({
					success: false,
					message: 'No token provided.'
				});
			}
		}
	}
	return middleware;
}