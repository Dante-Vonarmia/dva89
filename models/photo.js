const mongoose = require('mongoose');
const photoSchema = mongoose.Schema({
	title: {
		type: String,
		length: 255
	},
	onPublic: Boolean,
	heroImg: Boolean,
	picURL: {
		type: JSON
	},
	description: {
		brief: String,
		camera: String,
		focal_length: String,
		aperture: String,
		exposure_time: String,
		iso: String,
	},
	album: {
		id: String,
		title: String,
		catalog: String,
	},
	addDate: Date,
	pv: Number
}, {
	collection: 'photos'
});
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;