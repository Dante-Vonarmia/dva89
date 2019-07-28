const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
	fname: String,
	lname: String,
	mail: String,
	addDate: Date,
	content: String
}, {
	collection: 'enquiries'
});
const Enquiries = mongoose.model('Enquiries', enquirySchema);
module.exports = Enquiries;