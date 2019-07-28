const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		length: 255
	},
	password: String,
	unique: Boolean
});
const User = mongoose.model('Users', userSchema);
module.exports = User;