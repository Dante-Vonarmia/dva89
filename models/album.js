const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
	title: {
		type: String,
		length: 255
	},
	// description: String,
	addDate: Date,
	catalog: String,
}, {
	collection: 'album'
});
const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;