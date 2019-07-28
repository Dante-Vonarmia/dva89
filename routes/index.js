// Router
// Front
const index               = require('./view/index');
const portfolio           = require('./view/portfolio');
const photos              = require('./view/photos');
const contact             = require('./view/contact');
const thanks              = require('./view/thanks');


// CMS
const login               = require('./view/login');
const admin               = require('./view/admin/admin');

// POST
const addPost             = require('./view/admin/post/add');
const editPost            = require('./view/admin/post/edit');
const delPost             = require('./view/admin/post/del');

// UPLOAD
const addUpload           = require('./view/admin/upload/add');
const editUpload          = require('./view/admin/upload/edit');
const delUpload           = require('./view/admin/upload/del');

// ALBUM
const addAlbum            = require('./view/admin/album/add');
const editAlbum           = require('./view/admin/album/edit');
const delAlbum            = require('./view/admin/album/del');

const enquiries           = require('./view/admin/enquiries');

// Middleware
const authorized          = require('../middlewares/authorized');
const multipart           = require('connect-multiparty');
const multipartMiddleware = multipart();

module.exports = function(app) {
	// Front-end
	app.use('/', index);
	app.use('/portfolio', portfolio);
	app.use('/photos', photos);
	app.use('/contact', contact);
	app.use('/login', login);
	app.use('/thanks', thanks);

	// Back-end
	app.use('/admin', authorized.checkLogin, admin);
	
	// Banner
	app.use('/admin/post/add', multipartMiddleware, authorized.checkLogin, addPost)
	app.use('/admin/post/edit', multipartMiddleware, authorized.checkLogin, editPost)
	app.use('/admin/post/del', authorized.checkLogin, delPost)
	
	// Upload Photo
	app.use('/admin/upload/add', multipartMiddleware, authorized.checkLogin, addUpload)
	app.use('/admin/upload/edit', multipartMiddleware, authorized.checkLogin, editUpload)
	app.use('/admin/upload/del', multipartMiddleware, authorized.checkLogin, delUpload)
	
	// Album
	app.use('/admin/album/add', authorized.checkLogin, addAlbum)
	app.use('/admin/album/edit', authorized.checkLogin, editAlbum)
	app.use('/admin/album/del', authorized.checkLogin, delAlbum)
	
	app.use('/admin/enquiries', authorized.checkLogin, enquiries);
}