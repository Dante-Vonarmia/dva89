const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: {
    type: String,
    length: 255,
  },
  onPublic: Boolean,
  picURL: {
    type: JSON,
  },
  description: String,
  addDate: Date,
  pos: Number,
  location: String,
  pv: Number,
}, {
  collection: 'posts',
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
