// Img Upload
const cloudinary = require('cloudinary').v2;

module.exports = function(app) {

	// Wire request 'pre' actions
	wirePreRequest(app);

	// Wire request 'post' actions
	wirePostRequest(app);

	function wirePreRequest(app) {
		app.use(function(req, res, next) {
			// console.log(req.method +" "+ req.url);
			res.locals.req = req;
			res.locals.res = res;

			if (typeof(process.env.CLOUDINARY_URL) == 'undefined') {
				throw new Error('Missing CLOUDINARY_URL environment variable')
			} else {
				// Expose cloudinary package to view
				res.locals.cloudinary = cloudinary;
				next()
			}
		})
	}

	function wirePostRequest(app) {
		app.use(function(err, req, res, next) {
			if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
				return next()
			}
			console.log('error (500) ' + err.message);
			console.log(err.stack);
			if (~err.message.indexOf('CLOUDINARY_URL')) {
				res.status(500).render('errors/dotenv', {
					error: err
				})
			} else {
				res.status(500).render('errors/500', {
					error: err
				})
			}
		})
	}

	if (typeof(process.env.CLOUDINARY_URL) == 'undefined') {
		console.warn('!! cloudinary config is undefined !!');
		console.warn('export CLOUDINARY_URL or set dotenv file')
	} else {
		// console.log('Cloudinary Config: ');
		// console.log(cloudinary.config());
	}
}